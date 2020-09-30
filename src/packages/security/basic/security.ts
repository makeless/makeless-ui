import HttpInterface from './../../../packages/http/http';
import RouterInterface from './../../../packages/router/router';
import ResponseInterface from './../../../packages/http/response';
import EventInterface from './../../../packages/event/event';
import StorageInterface from './../../../packages/storage/storage';
import DataInterface from '../../event/data';
import PageInterface from '../../page/page';
import ConfigurationInterface from '../../config/configuration';
import Team from './../../../models/team';
import User from './../../../models/user';
import TeamUser from '../../../models/team-user';
import {TeamRole} from '../../../enums/team-role';

export default class Security {
  user: User | null = null;
  team: Team | null = null;
  teamIndex: { [key: number]: Team | null } = {};

  readonly localStorageJwtKey: string = 'jwt-expire';
  readonly localStorageTeamKey: string = 'team';
  readonly router: RouterInterface;
  readonly http: HttpInterface;
  readonly event: EventInterface;
  readonly storage: StorageInterface;

  constructor(router: RouterInterface, http: HttpInterface, event: EventInterface, storage: StorageInterface) {
    this.router = router;
    this.http = http;
    this.event = event;
    this.storage = storage;
  }

  private removeUser(): void {
    this.user = null;
  }

  private removeTeam(): void {
    this.team = null;
    this.storage.removeItem(this.localStorageTeamKey);
  }

  private removeTeamIndex(): void {
    this.teamIndex = {};
  }

  private getExpire(): number | null {
    const expire = this.storage.getItem(this.localStorageJwtKey);

    if (expire === null || expire === '') {
      return null;
    }

    return parseInt(expire);
  }

  private setExpire(expire: Date): void {
    this.storage.setItem(this.localStorageJwtKey, expire.getTime().toString());
  }

  private removeExpire(): void {
    this.storage.removeItem(this.localStorageJwtKey);
  }

  private createTeamIndex() {
    if (this.user === null || !this.user.hasTeams()) {
      return;
    }

    this.user.teamUsers.forEach((teamUser: TeamUser) => {
      if (teamUser.team !== null && teamUser.team.id !== null) {
        this.teamIndex[teamUser.team!.id!] = teamUser.team;
      }
    });
  }

  private initTeam() {
    const storageId = this.storage.getItem(this.localStorageTeamKey);

    if (storageId !== null && this.teamIndex[parseInt(storageId)]) {
      this.team = this.teamIndex[parseInt(storageId)];
    }
  }

  private async loadUser(): Promise<any> {
    if (!this.isAuth()) {
      return;
    }

    return this.http.get('/api/auth/user').then((data) => {
      this.user = new User().create(this.http.response(data).getData().data);
      this.createTeamIndex();
      this.initTeam();
    }).catch((_) => {
      this.logout(true);
    });
  }

  private async authMiddleware() {
    this.router.getVueRouter().beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth) && !this.isAuth()) {
        next({path: '/login', query: {redirect: to.fullPath}});
        return;
      }

      if (to.matched.some(record => record.meta.requiresAuth) && !this.getUser()!.isVerified() && this.isAuth()) {
        next({path: '/email-unverified'});
        return;
      }

      if (to.matched.some(record => record.meta.requiresUserAuth) && !this.getUser()) {
        next({path: '/dashboard'});
        return;
      }

      if (to.matched.some(record => record.meta.requiresTeamAuth) && !this.getTeam()) {
        next({path: '/dashboard'});
        return;
      }

      if (to.matched.some(record => record.meta.requiresTeamRoleAuth) && !this.isTeamRole(to.meta.requiresTeamRoleAuth)) {
        next({path: '/dashboard'});
        return;
      }

      if (to.matched.some(record => record.meta.guest) && this.isAuth()) {
        next({path: '/dashboard'});
        return;
      }

      next();
    });
  }

  private refreshAuth(): void {
    if (!this.isAuth()) {
      return;
    }

    setInterval(() => {
      this.http.get('/api/auth/refresh-token').then((data) => {
        this.setExpire(new Date(this.http.response(data).getData().expire));
      }).catch((_) => {
        this.logout(true);
      });
    }, 10 * 60 * 1000);
  }

  private logoutHandler(): void {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key !== this.localStorageJwtKey) {
        return;
      }

      if (!this.router.getVueRouter().currentRoute.meta.requiresAuth) {
        return;
      }

      this.router.redirectToLogin();
    });
  }

  private handleEvents(): void {
    if (!this.isAuth()) {
      return;
    }

    if (!this.event.isConnected()) {
      this.event.connect();
    }

    this.event.subscribe('go-saas', (data: DataInterface) => {
      console.log(data);
    });
  }

  public async setup(): Promise<void> {
    await this.loadUser();
    await this.authMiddleware();
    this.refreshAuth();
    this.logoutHandler();
    this.handleEvents();
  }

  public getDisplayName(): string | null {
    if (!this.isAuth()) {
      return null;
    }

    if (this.getTeam() !== null) {
      return this.getTeam()!.name;
    }

    return this.getUser()!.name;
  }

  public getUser(): User | null {
    return this.user;
  }

  public getTeam(): Team | null {
    if (this.team === null) {
      return null;
    }

    return this.team;
  }

  public isAuth(): boolean {
    const expire = this.getExpire();

    if (expire === null) {
      return false;
    }

    return expire > new Date().getTime();
  }

  public isTeamRole(role: TeamRole): boolean {
    if (!this.isAuth() || this.getUser() === null || this.getTeam() === null) {
      return false;
    }

    for (let i = 0; i < this.getUser()!.teamUsers.length; i++) {
      const teamUser = this.getUser()!.teamUsers[i];
      if (teamUser.teamId === this.getTeam()!.id && teamUser.role === role) {
        return true;
      }
    }

    return false;
  }

  public isTeamCreator(): boolean {
    if (!this.isAuth() || this.getUser() === null || this.getTeam() === null) {
      return false;
    }

    return this.getTeam()!.userId === this.getUser()!.id;
  }

  public addTeam(team: Team): void {
    if (this.user === null || team.id === null) {
      return;
    }

    this.user.teamUsers.push(team.teamUsers[0]);
    this.teamIndex[team.id] = team;
  }

  public deleteTeam(team: Team): void {
    if (this.user === null || team.id === null) {
      return;
    }

    for (let i = 0; i < this.user.teamUsers.length; i++) {
      if (team.id !== this.user.teamUsers[i].team!.id) {
        continue;
      }

      this.team = null;
      this.user.teamUsers.splice(i, 1);
      delete this.teamIndex[team.id];
      return;
    }
  }

  public switchToUser(): void {
    this.removeTeam();
    this.router.redirectToDashboard();
  }

  public switchToTeam(id: number): void {
    this.team = this.teamIndex[id];
    this.storage.setItem(this.localStorageTeamKey, id.toString());
    this.router.redirectToDashboard();
  }

  public isPageEnabled(page: PageInterface, configuration: ConfigurationInterface): boolean {
    if (page.getMeta() === null) {
      return true;
    }

    const requiresEnabledTeams = page.getMeta().requiresEnabledTeams !== undefined && page.getMeta().requiresEnabledTeams === true;
    const requiresEnabledTokens = page.getMeta().requiresEnabledTokens !== undefined && page.getMeta().requiresEnabledTokens === true;

    if (requiresEnabledTeams && !configuration.getTeams()) {
      return false;
    }

    if (requiresEnabledTokens && requiresEnabledTeams && configuration.getTeams() && !configuration.getTeams()!.getTokens()) {
      return false;
    }

    return !(requiresEnabledTokens && !requiresEnabledTeams && !configuration.getTokens());
  }

  public isPageAccessible(page: PageInterface | null): boolean {
    if (page === null) {
      return false;
    }

    if (page.getMeta() === null) {
      return true;
    }

    const requiresAuth = page.getMeta().requiresAuth !== undefined && page.getMeta().requiresAuth;
    const requiresUserAuth = page.getMeta().requiresUserAuth !== undefined && page.getMeta().requiresUserAuth;
    const requiresTeamAuth = page.getMeta().requiresTeamAuth !== undefined && page.getMeta().requiresTeamAuth;
    const requiresTeamRoleAuth = page.getMeta().requiresTeamRoleAuth !== undefined;
    const guest = page.getMeta().guest !== undefined && page.getMeta().guest;

    if (requiresAuth && !this.isAuth()) {
      return false;
    }

    if (requiresUserAuth && !this.getUser()) {
      return false;
    }

    if (requiresTeamAuth && !this.getTeam()) {
      return false;
    }

    if (requiresTeamRoleAuth && !this.isTeamRole(page.getMeta().requiresTeamRoleAuth)) {
      return false;
    }

    return !(guest && this.isAuth());
  }

  public async login(response: ResponseInterface): Promise<void> {
    this.setExpire(new Date(response.getData().expire));
    await this.loadUser();
    this.handleEvents();

    if (this.isRedirectToPath()) {
      this.router.redirectToPath(this.router.getVueRouter().currentRoute.query.redirect as string);
      return;
    }

    this.router.redirectToDashboard();
  }

  public logout(redirect: boolean): void {
    this.removeExpire();
    this.removeUser();
    this.removeTeam();
    this.removeTeamIndex();
    this.event.close();

    if (redirect) {
      this.router.redirectToLogin();
    }
  }

  private isRedirectToPath(): boolean {
    return Object.keys(this.router.getVueRouter().currentRoute.query).includes('redirect');
  }
}
