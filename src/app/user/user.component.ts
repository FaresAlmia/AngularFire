import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { injectRenderer2 } from '@angular/core/src/render3/view_engine_compatibility';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  usersSubscription: Subscription;
  email: string;
  id: any;
  ref: firebase.database.Reference;
  key: string;
  isAuth: boolean;
  id2: any;

  constructor(private route: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router) {
    this.id = firebase.auth().currentUser.uid;
    console.log(this.id);
    this.ref = firebase.database().ref('/users/');
    this.ref.orderByChild('id').equalTo(this.id).on("value", function (snapshot) {
      snapshot.forEach((function (child) {
        console.log("Child key : " + child.key)
      }
      ));
    }
    );
    console.log(this.id2);
  }





  ngOnInit() {
    console.log("Ceci est le child key : " + this.id2);
    this.user = new User('', '', '', '', '', '', '', '', false);
    this.userService.getSingleUser(this.id).then(
      (user: User) => {
        this.user = user;
        console.log("Ceci est l'id : " + this.id);

      }
    );
  }



}
