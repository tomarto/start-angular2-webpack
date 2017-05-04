import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationData } from '../../core/application/model/application-data';
import { BuildData } from '../../core/application/model/build-data';

@Component({
    moduleId: module.id + '',
    selector: 'about-modal',
    templateUrl: './about-modal.component.html'
})
export class AboutModalComponent {
    @Input()
    public applicationData: ApplicationData;

    @Input()
    public buildData: BuildData;

    constructor(public activeModal: NgbActiveModal) {}
}
