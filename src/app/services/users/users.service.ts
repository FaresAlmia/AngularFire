import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { User } from '../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  users: User[] = [];
  usersSubject = new Subject<User[]>();
  constructor(private authService: AuthService, private router: Router) { }

  onViewUser(idu : any) {
    this.router.navigate(['/user',idu]);
  }



  emitUsers() {
    this.usersSubject.next(this.users);
  }

  saveUsers() {
    
    firebase.database().ref('/users/').set(this.users);
  }

  getUsers() {
    firebase.database().ref('/users/' )
    .on('value', (data) =>{
      this.users = data.val() ? data.val() : [];
      this.emitUsers();
    });
  }

  getSingleUser(id:number) {
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/users/'+ id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  createUser(idu,user : User) {
    firebase.database().ref('/users/').child(idu).set(user);
   
  }

  removeUser(user : User) {
    const userIndexToRemove = this.users.findIndex(
      (userEL) =>  {
        if(userEL == user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }
}

