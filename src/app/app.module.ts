import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule } from './app-routing.module';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { AppComponent } from './app.component';
import { SrsHeaderComponent } from './srs-header';
import { AboutModalComponent } from './srs-header/about-modal/about-modal.component';
import { SearchComponent } from './search';

import { ApplicationService } from './core/application/application.service';
import { LoginService } from './core/application/login.service';

import { ToastCustomOption } from './core/application/toast-custom-options';

import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        SrsHeaderComponent,
        AboutModalComponent,
        SearchComponent
    ],
    entryComponents: [
        AboutModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        ToastModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        ENV_PROVIDERS,
        APP_PROVIDERS,
        {
            provide: ToastOptions,
            useClass: ToastCustomOption
        },
        ApplicationService,
        LoginService
    ]
})
export class AppModule {

    constructor(
        public appRef: ApplicationRef,
        public appState: AppState
    ) { }

    public hmrOnInit(store: StoreType) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    public hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    public hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
