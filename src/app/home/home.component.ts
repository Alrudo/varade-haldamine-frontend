import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { Asset } from '@app/asset';
import { PropertyService } from '@app/property/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  assets: Asset[];

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
    this.getAssets();
  }

  getAssets(): void {
    this.propertyService.getAssets().subscribe((assets) => (this.assets = assets));
  }
}
