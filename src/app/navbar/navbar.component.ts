import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from '../services/offers/offers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 // déclaration d'une variable booléenne isAuth.
  isAuth: boolean;
  idu: string;
  ida : string;
  test : string;
  

  // injection de authService
  constructor(private route: ActivatedRoute,
    private authService: AuthService, 
    private userService : UsersService,
    private offersService : OffersService,
    private router: Router,) {
     }

  ngOnInit() {
    // firebase.auth().onAuthStateChanged sera déclenché à chaque fois que l’état d’authentifcation est changé par l’utilisateur
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          // L'utilisateur est connecté
        } else {
          this.isAuth = false;
           // L'utilisateur n'est pas connecté
        }
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }
  
  onViewUser(){
    this.idu= firebase.auth().currentUser.uid;
    this.userService.onViewUser(this.idu);
  }

  onNewOffer() {
    this.router.navigate(['/offers' , 'new']);
  }


}
