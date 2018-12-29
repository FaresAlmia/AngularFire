import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers/offers.service';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/Offer.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  offerForm : FormGroup;
  idu: string;

  constructor(private formBuilder: FormBuilder,
    private offersService: OffersService,
    private router:Router) { 
      this.idu = firebase.auth().currentUser.uid;
    }

  ngOnInit() {
  this.initForm();
  }
  initForm(){
    this.offerForm= this.formBuilder.group( {
      title: ['', Validators.required],
      description: ['', Validators.required],
      entreprise: ['', Validators.required],
      secteur: ['', Validators.required],
      typecontrat : ['', ],

      
      
    });
  }
  
  onSaveOffer(){
    const title = this.offerForm.get('title').value;
    const description = this.offerForm.get('description').value;
    const creatorID = firebase.auth().currentUser.uid;
    const entreprise = this.offerForm.get('entreprise').value;
    const secteur = this.offerForm.get('secteur').value;
    const typecontrat = this.offerForm.get('typecontrat').value;
    const newOffer = new Offer(title, description,entreprise,secteur,typecontrat, creatorID);
    this.offersService.createNewOffer(newOffer);
    this.router.navigate( ['/offers']);
  }

}
