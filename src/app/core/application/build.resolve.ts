import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { BuildData } from './model/build-data';
import { ApplicationService } from './application.service';

@Injectable()
export class BuildResolve implements Resolve<BuildData> {

    constructor(private applicationService: ApplicationService) {}

    public resolve(): Promise<BuildData> {
        return this.applicationService.getBuildData();
    }
}
