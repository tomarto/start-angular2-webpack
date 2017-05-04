import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Headers, Http, RequestOptions } from '@angular/http';
import { ApplicationData } from './model/application-data';
import { BuildData } from './model/build-data';

@Injectable()
export class ApplicationService {

    constructor(private http: Http) {}

    public getData(): Promise<ApplicationData> {
        return this.http.get('http://localhost:8080/sds/api/application')
                .toPromise()
                .then((response) => response.json() as ApplicationData)
                .catch(this.handleError);
    };

    public getBuildData(): Promise<BuildData> {
        return this.http.get('http://localhost:8080/sds/appBuildConfig')
                .toPromise()
                .then((response) => response.json() as BuildData)
                .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error ocurred', error);
        return Promise.reject(error.message || error);
    }
}
