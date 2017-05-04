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

import { LoginService } from './login.service';
import { User } from './model/user';

describe('ApplicationService (mockBackend)', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                LoginService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        }).compileComponents();
    }));

    it('can instantiate service when inject service',
            inject([LoginService], (service: LoginService) => {
        expect(service instanceof LoginService).toBe(true);
    }));

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new LoginService(http);
        expect(service instanceof LoginService).toBe(true, 'new service should be ok');
    }));

    it('can provide the mockBackend as XHRBackend',
            inject([XHRBackend], (backend: MockBackend) => {
        expect(backend).not.toBeNull('backend should be provided');
    }));

    describe('when getLoggedUser()', () => {
        let backend: MockBackend;
        let service: LoginService;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new LoginService(http);
        }));

        it('should have expected return success response (then)', async(inject([], () => {
            let options = new ResponseOptions(
                {
                    status: 200,
                    body: {
                        profile: {
                            firstName: 'Test',
                            lastName: 'Last',
                            internal: false,
                            username: 'TestLast@test.com'
                        }
                    }
                });
            backend.connections.subscribe((c: MockConnection) =>
                    c.mockRespond(new Response(options)));

            service.getLoggedUser()
                .then((result) => {
                    expect(result.firstName).toBe('Test');
                    expect(result.lastName).toBe('Last');
                    expect(result.internal).toBeFalsy();
                    expect(result.username).toBe('TestLast@test.com');
                });
        })));

        it('should have expected return error response (catch)', async(inject([], () => {
            let options = new ResponseOptions(
                    {type: ResponseType.Error, status: 500});
            backend.connections.subscribe((c: MockConnection) =>
                    c.mockError(new ErrorResponse(options)));

            service.getLoggedUser()
                .catch((result) => {
                    expect(result.status).toBe(500, 'should have expected error response');
                });
        })));
    });
});
