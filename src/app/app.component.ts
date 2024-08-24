import { Component, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from "../services/loading.service";
import { Movie } from '../models/movie';
import { DateResponseWithTotalResults, SearchService } from './services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SearchService]
})
export class AppComponent implements OnInit {
  protected results!: DateResponseWithTotalResults<Movie>;
  protected movies$!: Observable<DateResponseWithTotalResults<Movie>>;

  constructor(
    private destroyRef: DestroyRef,
    protected LoadingService: LoadingService,
    protected SearchService: SearchService) {
  }

  ngOnInit(): void {
    this.SearchService.results$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((results) => {
        this.results = results;
      })
    this.movies$ = this.SearchService.results$;
    this.SearchService.search('', '');
  }
}
