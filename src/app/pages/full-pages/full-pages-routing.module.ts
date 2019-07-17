import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from './gallery/gallery-page.component';
import { InvoicePageComponent } from './invoice/invoice-page.component';
import { HorizontalTimelinePageComponent } from './timeline/horizontal/horizontal-timeline-page.component';
import { VerticalTimelinePageComponent } from './timeline/vertical/vertical-timeline-page.component';
import { UserProfilePageComponent } from './user-profile/user-profile-page.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

import { UsersComponent } from './users/users.component';
import { ApplicationsComponent } from './applications/applications.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ApplicationComponent } from './applications/application.component';


import { LoginGuard } from '../../services/service.index';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'verticaltimeline',
        component: VerticalTimelinePageComponent,
        data: {
          title: 'Vertical Timeline Page'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password Page'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'kb',
        component: KnowledgeBaseComponent,
        data: {
          title: 'Knowledge Base'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        data: {
          title: 'Applications'
        }
      },
      {
        path: 'application/:id',
        component: ApplicationComponent,
        data: {
          title: 'Application'
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: 'Transactions'
        }
      },
      {
        path: 'my-applications',
        component: MyApplicationsComponent,
        data: {
          title: 'My Applications'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
