import { Pipe, PipeTransform } from '@angular/core';
import { Offer } from './models/Offer.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(offers: Offer[], term: any): any {
    if(term === undefined )
    return offers;
    return offers.filter(
      offer1=>
      offer1.description.toLowerCase().indexOf(term.toLowerCase()) > -1 || offer1.title.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  
    }
}