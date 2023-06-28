import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { TabelListaComponent } from '../tabel-lista/tabel-lista.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripsComponent },
  { path: 'add_trip', component: AddTripComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
