import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { DataResolver } from './app.resolver';
import { SearchComponent } from './search';
import { SrsHeaderComponent } from './srs-header';

import { ApplicationResolve } from './core/application/application.resolve';
import { BuildResolve } from './core/application/build.resolve';
import { UserResolve } from './core/application/user.resolve';

export const ROUTES: Routes = [
    {
        path: '',
        resolve: {
            applicationData: ApplicationResolve,
            buildData: BuildResolve,
            loggedUser: UserResolve
        },
        children: [
            {
                path: '',
                component: SrsHeaderComponent,
                outlet: 'srs-header'
            },
            {
                path: 'search',
                component: SearchComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ],
    providers: [
        ApplicationResolve,
        BuildResolve,
        UserResolve
    ]
})
export class AppRoutingModule { }
