import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

// implémentation de CanActivate
export class AuthGuardService implements CanActivate{

  // injection du Router dans le constructor
  constructor(private router: Router) { }

// Création de méthode CanActivate qui retournera une observable booléenne , une promise booléenne ou une booléenne
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) =>
      {
        firebase.auth().onAuthStateChanged(
          (user)=> {
            // Si l'utilisateur est connecté, on lui donne accés aux routes
            if(user) {
              resolve(true);
        console.log("user id: " + firebase.auth().currentUser.uid);
            } 
            // Sinon il sera redirigé vers la page de connexion
            else {
              this.router.navigate(['/auth', 'signin']); 
              resolve(false);
            }
          }
        );
      }
    );
  }

}
