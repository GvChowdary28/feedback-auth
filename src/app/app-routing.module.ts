import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoginComponent } from './shared/components/login/login.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { authGuard } from './_helper/auth.guard';
import { Role } from './_model/user';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", redirectTo: "feedback", pathMatch:'full'},
  {path: "home", component: HomeComponent},
  {path: "feedback", component: FeedbackComponent},
  {path: "dashboard", component: FeedbackListComponent, canActivate:[authGuard], data: { roles: [Role.Admin] }},
  {path: "login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
