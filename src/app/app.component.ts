import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
      // Initialisation de firebase
  var config = {
    apiKey: "AIzaSyBe4Dja_rmHKB3kv4CPoJaE5WkWCvN_AdY",
    authDomain: "angularfire-projet.firebaseapp.com",
    databaseURL: "https://angularfire-projet.firebaseio.com",
    projectId: "angularfire-projet",
    storageBucket: "angularfire-projet.appspot.com",
    messagingSenderId: "660825163670"
  };
  firebase.initializeApp(config);
  }
}
