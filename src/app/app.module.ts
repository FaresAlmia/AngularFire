import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import des components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
//import des élements nécessaires à l'authentification
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';;
import { Routes, RouterModule } from '@angular/router';
import { DepositCvComponent } from './deposit-cv/deposit-cv.component';
//import des élements nécessaires aux offres
import { OfferListComponent } from './offer-list/offer-list.component';
import { SingleOfferComponent } from './offer-list/single-offer/single-offer.component';
import { OfferFormComponent } from './offer-list/offer-form/offer-form.component';
import { OffersService } from './services/offers/offers.service';
import { UserComponent } from './user/user.component';
import { UsersService } from './services/users/users.service';
import { AdminComponent } from './admin/admin.component';
import { SearchPipe } from './search.pipe';
import { EmployerComponent } from './employer/employer.component';
import { TransitionComponent } from './auth/signup/transition/transition.component';


//configuration des paths
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'auth/offers', component: OfferListComponent},
  { path: 'offers/new', component: OfferFormComponent},
  { path: 'offers/view/:id', component: SingleOfferComponent},
  { path: 'user/:idu', component: UserComponent},
  { path: 'admin', canActivate: [AuthGuardService],component: AdminComponent},
  { path: 'offerform',canActivate: [AuthGuardService], component: OfferFormComponent},
  { path: 'signup', component: TransitionComponent},


  // canActivate fera donner l'accès à l'utilisateur à un path précis, et cela sera géré par AuthGuardService
  { path: 'home', component: HomeComponent},
  { path: 'deposit-cv',canActivate: [AuthGuardService], component: DepositCvComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    NavbarComponent,
    HomeComponent,
    DepositCvComponent,
    OfferListComponent,
    SingleOfferComponent,
    OfferFormComponent,
    UserComponent,
    AdminComponent,
    SearchPipe,
    EmployerComponent,
    TransitionComponent,
    

  ],
  //Ajout de FormsModule,ReactiveFormsModule,HttpClientModule
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes) 
  ],
  //Injection de AuthService et AuthGuardService
  providers: [
    AuthService,
    AuthGuardService,
    OffersService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
