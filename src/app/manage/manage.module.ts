import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageHoldRequestsComponent } from './hold-requests/manage-hold-requests.component';
import {ManageListingsComponent} from './listings/manage-listings.component';
import {ManageListingsAddComponent} from './listings/manage-listings-add.component';
import {ManageMessagesComponent} from './messages/manage-messages.component';
import {ManageListingsContainerComponent} from './listings/manage-listings-container.component';
import { MaterialModule } from '@angular/material';
import { AuthGuardService } from '../pango-services';

export const manageRoutes: Routes = [
  {
    path: 'manage-properties',
    component: ManageComponent,
    children: [
      {
        path: '',
        redirectTo: 'listings',
        pathMatch: 'full'
      },
      {
        path: 'listings',
        component: ManageListingsContainerComponent,
        children: [
          {
            path: '',
            component: ManageListingsComponent
          },
          {
            path: 'add',
            component: ManageListingsAddComponent
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'messages',
        component: ManageMessagesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'hold-requests',
        component: ManageHoldRequestsComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(manageRoutes)
  ],
  declarations: [ManageComponent,
  ManageListingsComponent, ManageMessagesComponent,
  ManageHoldRequestsComponent, ManageListingsAddComponent,ManageListingsContainerComponent],
  bootstrap: [ManageComponent, ManageListingsComponent, ManageListingsContainerComponent]
})
export class ManageModule { }
