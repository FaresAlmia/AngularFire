import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/Offer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css']
})
export class SingleOfferComponent implements OnInit {

  offer : Offer;

  constructor(private route: ActivatedRoute,
  private offersService: OffersService,
  private router: Router) { }

  ngOnInit() {
    this.offer = new Offer('','','','','','');
    const id= this.route.snapshot.params['id'];
    this.offersService.getSingleOffer(+id).then(
      (offer : Offer) => {
        this.offer = offer;
      }
    );
  }

  onBack() {
    this.router.navigate(['/offers']);
  }

}
