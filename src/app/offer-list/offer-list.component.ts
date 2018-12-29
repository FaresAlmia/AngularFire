import { Component, OnInit, OnDestroy } from '@angular/core';
import { Offer } from '../models/Offer.model';
import { Subscription } from 'rxjs';
import { OffersService } from '../services/offers/offers.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import * as firebase from 'firebase';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy {
  term : string;
  offers: Offer[];
  offersSubscription: Subscription;

  constructor(private offersService: OffersService, private router: Router) { }
  isAuth: boolean;


  ngOnInit() {
    this.offersSubscription = this.offersService.offersSubject.subscribe(
      (offers : Offer[]) => {
        this.offers = offers;
      }
    );
    this.offersService.getOffers();
    this.offersService.emitOffers();
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
  

  onNewOffer() {
    this.router.navigate(['/offers' , 'new']);
  }
  onDeleteOffer(offer: Offer) {
    this.offersService.removeOffer(offer);
  }
  onViewOffer(id : number) {
    this.router.navigate(['/offers','view',id]);
  }
  ngOnDestroy() {
    this.offersSubscription.unsubscribe();
  }
}
