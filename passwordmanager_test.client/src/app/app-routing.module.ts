import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordListComponent } from './components/password-list/password-list.component';
import { AddPasswordComponent } from './components/add-password/add-password.component';

const routes: Routes = [
  { path: '', component: PasswordListComponent },
  { path: 'add-password', component: AddPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
