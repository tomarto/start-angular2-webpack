import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Headers, Http, RequestOptions } from '@angular/http';
import { User } from './model/user';

@Injectable()
export class LoginService {

    constructor(private http: Http) {}

    public getLoggedUser(): Promise<User> {
        return this.http.get('http://localhost:8080/sds/userProfile')
                .toPromise()
                .then((response) => response.json().profile as User)
                .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error ocurred', error);
        return Promise.reject(error.message || error);
    }
}
