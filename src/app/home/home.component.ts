import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

import { Property } from '@app/home/property';
import { PropertyService } from '@app/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  properties: Property[];

  constructor(private quoteService: QuoteService, private propertyService: PropertyService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties().subscribe((properties) => (this.properties = properties));
  }
}
