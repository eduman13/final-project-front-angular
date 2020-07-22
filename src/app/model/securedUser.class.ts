export class User {

    id: number;
    username: string;
    password: string;
    roles: Roles[];

    public getBasicAuth() {
        return 'Basic ' + btoa(this.username + ':' + this.password);
    }

    constructor(json: any) {
        this.id = json.id;
        this.username = json.username;
        this.password = json.password;
        this.roles = json.roles;
    }
}

class Roles {
    id: number;
    role: string;
}