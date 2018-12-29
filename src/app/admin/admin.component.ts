import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  usersSubscription: Subscription;


  constructor(private usersService: UsersService, private router : Router) { }
  isAuth: boolean;


  ngOnInit() { 
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users : User[]) => {
        this.users = users;
      }
    );
    this.usersService.getUsers();
    this.usersService.emitUsers();
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
  
  onViewOffer(id : number) {
    this.router.navigate(['/users','view',id]);
  }

  onDeleteUser(users: User) {
    this.usersService.removeUser(users);
    
  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
