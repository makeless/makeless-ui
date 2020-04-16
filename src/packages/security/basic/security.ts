import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';
import Response from '@/packages/http/axios/response';
import User from '@/models/user';
import Team from '@/models/team';

export default class Security {
  user: User | null = null;
  team: Team | null = null;
  teamIndex: { [key: number]: Team | null } = {};

  readonly localStorageJwtKey: string = 'jwt-expire';
  readonly localStorageTeamKey: string = 'team';
  readonly router: RouterInterface;
  readonly http: HttpInterface;

  constructor(router: RouterInterface, http: HttpInterface) {
    this.router = router;
    this.http = http;
  }

  private removeUser(): void {
    this.user = null;
  }

  private removeTeam(): void {
    this.team = null;
    localStorage.removeItem(this.localStorageTeamKey);
  }

  private removeTeamIndex(): void {
    this.teamIndex = {};
  }

  private getExpire(): number | null {
    const expire = localStorage.getItem(this.localStorageJwtKey);

    if (expire === null || expire === '') {
      return null;
    }

    return parseInt(expire);
  }

  private setExpire(expire: Date): void {
    localStorage.setItem(this.localStorageJwtKey, expire.getTime().toString());
  }

  private removeExpire(): void {
    localStorage.removeItem(this.localStorageJwtKey);
  }

  private redirectToLogin() {
    if (this.router.getRouter().currentRoute.name === 'login') {
      return;
    }

    this.router.getRouter().push({name: 'login'}).then(null);
  }

  private redirectToDashboard() {
    if (this.router.getRouter().currentRoute.name === 'dashboard') {
      return;
    }

    this.router.getRouter().push({name: 'dashboard'}).then(null);
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
    const storageId = localStorage.getItem(this.localStorageTeamKey);

    if (storageId !== null) {
      this.team = this.teamIndex[parseInt(storageId)];
    }
  }

  private loadUser(): void {
    if (!this.isAuth()) {
      return;
    }

    this.http.get('/api/auth/user').then((data) => {
      this.user = new User().create(new Response(data).getData().data);
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
        const response = new Response(data);
        this.setExpire(new Date(response.getData().expire));
      }).catch(() => {
        this.removeExpire();
        this.router.getRouter().push('login').then(null);
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

      this.router.getRouter().push('login').then(null);
    });
  }

  public setup(): void {
    this.loadUser();
    this.authMiddleware();
    this.refreshAuth();
    this.logoutHandler();
  }

  public getDisplayName(): string | null {
    if (this.user === null) {
      return null;
    }

    if (this.team === null || this.team.id === null) {
      return this.user.getFullName();
    }

    const team = this.teamIndex[this.team.id];

    if (team === null) {
      return null;
    }

    return team.name;
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

  public switchToUser(): void {
    this.removeTeam();
  }

  public switchToTeam(id: number): void {
    this.team = this.teamIndex[id];
    localStorage.setItem(this.localStorageTeamKey, id.toString());
  }

  public login(response: ResponseInterface): void {
    this.setExpire(new Date(response.getData().expire));
    this.loadUser();
    this.redirectToDashboard();
  }

  public logout(redirect: boolean): void {
    this.removeExpire();
    this.removeUser();
    this.removeTeam();
    this.removeTeamIndex();

    if (redirect) {
      this.redirectToLogin();
    }
  }
}
