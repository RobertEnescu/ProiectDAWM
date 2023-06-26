import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { TabelListaComponent } from '../tabel-lista/tabel-lista.component';

const routes: Routes = [
  {
    path: 'tabel',
    component: TabelListaComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to protect the route
  },
  { path: '**', redirectTo: 'tabel' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
