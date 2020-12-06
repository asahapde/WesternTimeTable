import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateSchedulesComponent } from './private-schedules/private-schedules.component';
import { PolicyComponent } from './policy/policy.component';
import { LogComponent } from './log/log.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoauthComponent } from './noauth/noauth.component';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SchedulesComponent,
    LoginComponent,
    RegisterComponent,
    PrivateSchedulesComponent,
    PolicyComponent,
    LogComponent,
    AdminComponent,
    ProfileComponent,
    NavbarComponent,
    NoauthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
