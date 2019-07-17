import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalsComponent, NgbdModalContent } from '../../components/bootstrap/modals/modals.component';

import { GalleryPageComponent } from './gallery/gallery-page.component';
import { InvoicePageComponent } from './invoice/invoice-page.component';
import { HorizontalTimelinePageComponent } from './timeline/horizontal/horizontal-timeline-page.component';
import { HorizontalTimelineComponent } from './timeline/horizontal/component/horizontal-timeline.component';
import { VerticalTimelinePageComponent } from './timeline/vertical/vertical-timeline-page.component';
import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

// Mios
import { UsersComponent } from './users/users.component';
import { ApplicationsComponent } from './applications/applications.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PipesModule } from '../../pipes/pipes.module';

import { TranslateModule } from '@ngx-translate/core';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ModalInfoComponent } from './users/modal-info/modal-info.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ApplicationComponent } from './applications/application.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        PipesModule,
        AutocompleteLibModule,
        TranslateModule
    ],
    declarations: [
        GalleryPageComponent,
        InvoicePageComponent,
        HorizontalTimelinePageComponent,
        HorizontalTimelineComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        SearchComponent,
        FaqComponent,
        KnowledgeBaseComponent,
        UsersComponent,
        ApplicationsComponent,
        TransactionsComponent,
        ChangePasswordComponent,
        ModalInfoComponent,
        MyApplicationsComponent,
        ModalsComponent,
        NgbdModalContent,
        ApplicationComponent
    ],
    entryComponents: [NgbdModalContent]
})
export class FullPagesModule { }
