import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/User.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  users: User[] = [];
  signUpForm: FormGroup;
  errorMessage: string;
  newUser : any; 
  role : boolean;
//  Rajout du formBuilder et authService pour l’authentification mais aussi du router
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private usersService : UsersService) { }

  // Initialisation du formulaire avec initForm
  ngOnInit() {
    this.initForm();
  }
  // Création de la methode initForm
  initForm(){
    //On génére le form group (avec dedans l'email, et le mot de passe qui auront chacun des Validators ( qu'il faut importer )
    this.signUpForm = this.formBuilder.group({
      id:['',],
      name: ['', [Validators.required, ]],
      lastname : ['', [Validators.required,]],
      fonction : ['', ],
      email: ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthdate: ['', [Validators.required, ]],
      phone : ['', ],
    });
  }
  // Création de la méthode onSubmit
  onSubmit(){
    // récupération des valeurs
    const name= this.signUpForm.get('name').value;
    const lastname= this.signUpForm.get('lastname').value;
    const phone = this.signUpForm.get('phone').value;
    const email= this.signUpForm.get('email').value;
    const password= this.signUpForm.get('password').value;
    const birthdate = this.signUpForm.get('birthdate').value;
    const fonction = this.signUpForm.get('fonction').value;
    const role = false;
    
    // appel de authService.createNewUser où l'on passe dedans l'email et le mot de passe
    // si l'utilisateur s'est inscrit, il y'a redirection vers l'acceuil, sinon il y'aura un message d'erreur
    this.authService.createNewUser(email, password).then(
      ()=> {

        this.router.navigate(['/home']);
       
      },
      (error)=> {
        this.errorMessage = error;   
      }
      
    ).then(
      ()=>{
        const id= firebase.auth().currentUser.uid;
        this.newUser = new User(id ,name,lastname,phone,email,password,birthdate,fonction,role); 
        this.usersService.createUser(id,this.newUser);
      },
      (error)=> {
        this.errorMessage = error;
      }
    );

  }
  




}

