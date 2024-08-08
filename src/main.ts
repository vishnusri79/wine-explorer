import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, CanActivateFn } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ApiDataComponent } from './app/api-data/api-data.component';
import { FormComponent } from './app/form/form.component';
import { RegisterComponent } from './app/register/register.component';
import { LoginComponent } from './app/login/login.component';
import { ProfileComponent } from './app/profile/profile.component';
import { provideHttpClient } from '@angular/common/http';
import { WineService } from './app/wine.service';
import { AuthService } from './app/auth.service';
import { AuthGuard } from './app/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'api-data', component: ApiDataComponent },
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    WineService,
    AuthService,
    AuthGuard
  ],
}).catch(err => console.error(err));
