import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalsComponent } from './rentals.component';
import { RouterModule, Routes } from '@angular/router';
import { RentalsSearchComponent } from './search/rentals-search.component';
import { RentalsAlertsComponent } from './alerts/rentals-alerts.component';
import { RentalsFavoritesComponent } from './favorites/rentals-favorites.component';
import { MaterialModule } from '@angular/material';
import { AuthGuardService } from '../pango-services';

export const rentalsRoutes: Routes = [
  {
    path: 'rentals',
    component: RentalsComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: RentalsSearchComponent
      },
      {
        path: 'favorites',
        component: RentalsFavoritesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'alerts',
        component: RentalsAlertsComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(rentalsRoutes)
  ],
  declarations: [RentalsComponent, RentalsSearchComponent, RentalsFavoritesComponent, RentalsAlertsComponent],
  bootstrap: [RentalsComponent, RentalsSearchComponent]
})
export class RentalsModule { }
