import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'departments',
    component:DepartmentsComponent,
    canActivate: [authGuard]
  },
  {
    path:'',
    component:DepartmentsComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
