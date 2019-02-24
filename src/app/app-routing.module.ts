import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AllContactsComponent } from './pages/all-contacts/all-contacts.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    component: AllContactsComponent
  },
  {
    path: 'contacts/new',
    canActivate: [AuthGuard],
    component: NewContactComponent
  },
  {
    path: 'contacts/:id',
    canActivate: [AuthGuard],
    component: ContactComponent
  },
  {
    path: 'contacts/:id/edit',
    canActivate: [AuthGuard],
    component: EditContactComponent
  },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  {
    path: 'profile/edit',
    canActivate: [AuthGuard],
    component: EditProfileComponent
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
