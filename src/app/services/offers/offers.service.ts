import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Offer } from '../../models/Offer.model';

@Injectable()

export class OffersService {

  offers: Offer[] = [];
  offersSubject = new Subject<Offer[]>();

  constructor() { }

  emitOffers() {
    this.offersSubject.next(this.offers);
  }

  saveOffers() {
    firebase.database().ref('/offers').set(this.offers);
  }

  getOffers() {
    firebase.database().ref('/offers')
    .on('value', (data) =>{
      this.offers= data.val() ? data.val() : [];
      this.emitOffers();
    });
  }

  getSingleOffer(id:number) {
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/offers/'+ id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  createNewOffer(newOffer : Offer) {
    this.offers.push(newOffer);
    this.saveOffers();
    this.emitOffers();
  }

  removeOffer(offer : Offer) {
    const offerIndexToRemove = this.offers.findIndex(
      (offerEL) =>  {
        if(offerEL == offer) {
          return true;
        }
      }
    );
      
    this.offers.splice(offerIndexToRemove, 1);
    this.saveOffers();
    this.emitOffers();
  }
}
