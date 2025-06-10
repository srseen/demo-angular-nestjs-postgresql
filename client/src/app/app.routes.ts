import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './pages/equipment-form/equipment-form.component';
import { LandingComponent } from './pages/landing-page/landing-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Redirect root to landing page
  { path: '', component: LandingComponent, pathMatch: 'full' },
  // Auth routes
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Authenticated routes
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'equipment',
    component: EquipmentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'eqipment/add',
    component: EquipmentFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment/edit/:id',
    component: EquipmentFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
