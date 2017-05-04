import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { User } from './model/user';
import { LoginService } from './login.service';

@Injectable()
export class UserResolve implements Resolve<User> {

    constructor(private loginService: LoginService) {}

    public resolve(): Promise<User> {
        return this.loginService.getLoggedUser();
    }
}
