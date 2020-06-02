import HttpInterface from './../../../packages/http/http';
import RouterInterface from './../../../packages/router/router';
import ResponseInterface from './../../../packages/http/response';
import EventInterface from './../../../packages/event/event';
import StorageInterface from './../../../packages/storage/storage';
import DataInterface from '../../event/data';
import PageInterface from "../../page/page";
import User from './../../../models/user';
import Team from './../../../models/team';
import ConfigurationInterface from "../../config/configuration";

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

    this.user.teams.forEach((team: Team) => {
      if (team.id !== null) {
        this.teamIndex[team.id] = team;
      }
    });
  }

  private initTeam() {
    const storageId = this.storage.getItem(this.localStorageTeamKey);

    if (storageId !== null && this.teamIndex[parseInt(storageId)]) {
      this.team = this.teamIndex[parseInt(storageId)];
    }
  }

  private loadUser(): void {
    if (!this.isAuth()) {
      return;
    }

    this.http.get('/api/auth/user').then((data) => {
      this.user = new User().create(this.http.response(data).getData().data);
      this.createTeamIndex();
      this.initTeam();
      window.dispatchEvent(new Event('user-loaded'));
    }).catch((_) => {
      this.logout(true);
    });
  }

  private authMiddleware(): void {
    this.router.getRouter().beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth) && !this.isAuth()) {
        next({path: '/login'});
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

      if (!this.router.getRouter().currentRoute.meta.requiresAuth) {
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

  public setup(): void {
    this.loadUser();
    this.authMiddleware();
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

  public isTeamOwner(): boolean {
    if (!this.isAuth() || this.getUser() === null || this.getTeam() === null) {
      return false;
    }

    return this.getTeam()!.userId === this.getUser()!.id;
  }

  public addTeam(team: Team): void {
    if (this.user === null || team.id === null) {
      return;
    }

    this.user.teams.push(team);
    this.teamIndex[team.id] = team;
  }

  public deleteTeam(team: Team): void {
    if (this.user === null || team.id === null) {
      return;
    }

    for (let i = 0; i < this.user.teams.length; i++) {
      if (team.id !== this.user.teams[i].id) {
        continue;
      }

      this.team = null;
      this.user.teams.splice(i, 1);
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

  public isPageUsable(page: PageInterface, configuration: ConfigurationInterface): boolean {
    if (page.getMeta() === null) {
      return true;
    }

    const requiresEnabledTeams = page.getMeta().requiresEnabledTeams !== undefined && page.getMeta().requiresEnabledTeams === true;
    const requiresEnabledTokens = page.getMeta().requiresEnabledTokens !== undefined && page.getMeta().requiresEnabledTokens === true;

    if (requiresEnabledTokens && !requiresEnabledTeams && !configuration.getTokens()) {
      return false;
    }

    if (requiresEnabledTeams && !configuration.getTeams()) {
      return false;
    }

    return !(requiresEnabledTokens && configuration.getTeams() && !configuration.getTeams()!.getTokens());
  }

  public isPageAccessible(page: PageInterface | null): boolean {
    if (page === null) {
      return false;
    }

    if (page.getMeta() === null) {
      return true;
    }

    const requiresAuth = page.getMeta().requiresAuth !== undefined && page.getMeta().requiresAuth;
    const requiresTeamAuth = page.getMeta().requiresTeamAuth !== undefined && page.getMeta().requiresTeamAuth;
    const guest = page.getMeta().guest !== undefined && page.getMeta().guest;

    if (requiresAuth && !this.isAuth()) {
      return false;
    }

    if (requiresTeamAuth && !this.getTeam()) {
      return false;
    }

    return !(guest && this.isAuth());
  }

  public login(response: ResponseInterface): void {
    this.setExpire(new Date(response.getData().expire));
    this.loadUser();
    this.handleEvents();
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
}
