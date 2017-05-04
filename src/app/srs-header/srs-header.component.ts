import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApplicationData } from '../core/application/model/application-data';
import { BuildData } from '../core/application/model/build-data';
import { User } from '../core/application/model/user';
import { AppRole } from '../core/application/model/app-role';
import { AboutModalComponent } from './about-modal/about-modal.component';

@Component({
    moduleId: module.id + '',
    selector: 'srs-header',
    templateUrl: './srs-header.component.html',
    styleUrls: ['./srs-header.component.css']
})
export class SrsHeaderComponent implements OnInit {

    public applicationData: ApplicationData;
    public buildData: BuildData;
    public loggedUser: User;

    public srsHeaderClass: string;
    public apps: AppRole[];

    constructor(
            private route: ActivatedRoute,
            private toastr: ToastsManager,
            private vcr: ViewContainerRef,
            private modalService: NgbModal) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    public ngOnInit(): void {
        this.route.parent.data.subscribe((data) => {
            this.applicationData = data.applicationData;
            this.buildData = data.buildData;
            this.loggedUser = data.loggedUser;
        });

        this.srsHeaderClass = this.getSrsHeaderClass();
        this.apps = this.getApps();
    }

    public appTransition(): void {
        this.toastr.info('Working...');
    }

    public openAboutModal(): void {
        const modalRef = this.modalService.open(AboutModalComponent);
        modalRef.componentInstance.applicationData = this.applicationData;
        modalRef.componentInstance.buildData = this.buildData;
    }

    private getSrsHeaderClass(): string {
        return this.applicationData.environment === 'production' ? 'srs-header' : 'non-prod';
    }

    private getApps(): AppRole[] {
        let apps: AppRole[] = [];
        let appFound: boolean = false;
        this.loggedUser.srsAppRoles.forEach((appRole) => {
            if ('SDS' === appRole.appName) {
                appRole.current = true;
                appFound = true;
            }
            apps.push(appRole);
        });

        if (!appFound) {
            let currentApp = new AppRole();
            currentApp.appName = 'SDS';
            currentApp.current = true;
            apps.push(currentApp);
        }

        return apps;
    }
}
