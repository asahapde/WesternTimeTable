import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PolicyComponent } from './policy/policy.component';
import { LogComponent } from './log/log.component';
import { ProfileComponent } from './profile/profile.component';
import { NoauthComponent } from './noauth/noauth.component';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  { path: 'courses', component: CoursesComponent},
  { path: 'schedules', component: SchedulesComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'noauth', component: NoauthComponent },
  { path: 'log', component: LogComponent, canActivate:[AuthGuard, AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: '',   redirectTo: 'courses', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
