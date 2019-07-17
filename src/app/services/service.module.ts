import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService, LoginGuard, ApplicationsService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
     ],
    providers: [
        UserService,
        LoginGuard,
        ApplicationsService
    ],
    declarations: []
})

export class ServiceModule {}

