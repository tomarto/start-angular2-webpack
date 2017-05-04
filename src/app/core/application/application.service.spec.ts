import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions, ResponseType
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { ErrorResponse } from '../testing/error-response';

import { ApplicationService } from './application.service';
import { BuildData } from './model/build-data';

describe('ApplicationService (mockBackend)', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                ApplicationService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        }).compileComponents();
    }));

    it('can instantiate service when inject service',
            inject([ApplicationService], (service: ApplicationService) => {
        expect(service instanceof ApplicationService).toBeTruthy();
    }));

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new ApplicationService(http);
        expect(service instanceof ApplicationService).toBeTruthy();
    }));

    it('can provide the mockBackend as XHRBackend',
            inject([XHRBackend], (backend: MockBackend) => {
        expect(backend).not.toBeNull('backend should be provided');
    }));

    describe('when getData()', () => {
        let backend: MockBackend;
        let service: ApplicationService;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new ApplicationService(http);
        }));

        it('should have expected return success response (then)', async(inject([], () => {
            let options = new ResponseOptions({status: 200, body: {appname: 'SAM', appversion: '1.0.0'}});
            backend.connections.subscribe((c: MockConnection) =>
                    c.mockRespond(new Response(options)));

            service.getData()
                .then((result) => {
                    expect(result.appname).toBe('SAM');
                    expect(result.appversion).toBe('1.0.0');
                });
        })));

        it('should have expected return error response (catch)', async(inject([], () => {
            let options = new ResponseOptions(
                    {type: ResponseType.Error, status: 500});
            backend.connections.subscribe((c: MockConnection) =>
                    c.mockError(new ErrorResponse(options)));

            service.getData()
                .catch((result) => {
                    expect(result.status).toBe(500, 'should have expected error response');
                });
        })));
    });

    describe('when getBuildData()', () => {
        let backend: MockBackend;
        let service: ApplicationService;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new ApplicationService(http);
        }));

        it('should have expected return success response (then)', async(inject([], () => {
            let options = new ResponseOptions({status: 200, body: {buildDate: '01/01/2017', version: '1.0.0'}});
            backend.connections.subscribe((c: MockConnection) =>
                    c.mockRespond(new Response(options)));

            service.getBuildData()
                .then((result) => {
                    expect(result.buildDate).toBe('01/01/2017');
                    expect(result.version).toBe('1.0.0');
                });
        })));

        it('should have expected return error response (catch)', async(inject([], () => {
            let options = new ResponseOptions(
                    {type: ResponseType.Error, status: 500});
            backend.connections.subscribe((c: MockConnection) =>
                    c.mockError(new ErrorResponse(options)));

            service.getBuildData()
                .catch((result) => {
                    expect(result.status).toBe(500, 'should have expected error response');
                });
        })));
    });
});
