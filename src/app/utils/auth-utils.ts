import { Router } from '@angular/router';

import { User } from '../model/securedUser.class';

export class AuthUtils {

    public static convertUserToToken(user: User): string {
        const username: string = user.username;
        const password: string = user.password;
        const roles: string[] = [];
        for (const rol of user.roles) {
            roles.push(rol.role);
        }
        return btoa(username + '::' + password + '::' + roles.toString());
    }

    public static getUsername(): string {
        return atob(this.getCookie()).split('::')[0];
    }

    public static getPassword(): string {
        return atob(this.getCookie()).split('::')[1];
    }

    public static getRoles(): string {
        return atob(this.getCookie()).split('::')[2];
    }

    public static isLogged(): boolean {
        return this.getCookie() !== undefined && this.getCookie !== null;
    }

    public static setCookie(user: User): void {
        document.cookie = 'TSESSIONID=' + this.convertUserToToken(user) + '; path=/';
    }

    public static deleteCookie(): void {
        document.cookie = 'TSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }

    public static getCookie(): string {
        const value = '; ' + document.cookie;
        const parts = value.split('; TSESSIONID=');

        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    public static logout(route: Router): void {
        this.deleteCookie();
        route.navigate(['login']);
    }

    public static loggin(user: User, route: Router): void {
        console.log(user);
        this.setCookie(user);
        route.navigate(['main/', user.id]);
    }
}