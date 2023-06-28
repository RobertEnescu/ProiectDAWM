import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TripsComponent } from './trips/trips.component';
import { AuthGuard } from '../helpers/auth.guard';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddTripComponent } from './add-trip/add-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { EditComponent } from './edit/edit.component';
@NgModule({
  providers: [AuthGuard],
  declarations: [TripsComponent, AddTripComponent, EditComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzCardModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDatePickerModule,
  ],
})
export class DashboardModule {}
