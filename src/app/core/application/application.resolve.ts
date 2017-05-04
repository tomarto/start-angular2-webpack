import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ApplicationData } from './model/application-data';
import { ApplicationService } from './application.service';

@Injectable()
export class ApplicationResolve implements Resolve<ApplicationData> {

    constructor(private applicationService: ApplicationService) {}

    public resolve(): Promise<ApplicationData> {
        return this.applicationService.getData();
    }
}
