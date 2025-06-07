import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './pages/equipment-form/equipment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/equipment', pathMatch: 'full' },
  { path: 'equipment', component: EquipmentListComponent },
  { path: 'equipment/add', component: EquipmentFormComponent },
  { path: 'equipment/edit/:id', component: EquipmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
