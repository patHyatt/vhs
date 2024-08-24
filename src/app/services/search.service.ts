import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, firstValueFrom, switchMap } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { DataResponse } from '../../models/data-response';
import { Movie } from '../../models/movie';
import { MovieQuery } from '../../models/movie-query';

type SearchQuery = {
    term: string;
    page: number;
    genre: string;
};

export type DateResponseWithTotalResults<T> = DataResponse<T> & { totalResults: number };

@Injectable()
export class SearchService {
    query: SearchQuery = { term: '', page: 1, genre: '' };
    search$: BehaviorSubject<SearchQuery> = new BehaviorSubject<SearchQuery>(this.query);

    private DELAY_IN_MS = 300 as const;
    private PAGE_SIZE = 6 as const;
    results$: Observable<DateResponseWithTotalResults<Movie>>;

    constructor(
        private MovieService: MovieService
    ) {
        this.results$ = this.search$
            .pipe(
                debounceTime(this.DELAY_IN_MS),
                switchMap(async searchTerm => {
                    const query = {
                        number: searchTerm.page,
                        size: this.PAGE_SIZE,
                        search: searchTerm.term,
                        genre: searchTerm.genre
                    } as MovieQuery;

                    //Retrieves summary movie information for provided page/term/genre/size
                    const movies = await firstValueFrom(this.MovieService.getMovies$(query));

                    //Iterates over results and retrieves/hydrates a full movie object containing all of its details
                    for (let slot = 0; slot < movies.data.length; slot++) {
                        const id = movies.data[slot].id;
                        const movie = await firstValueFrom(this.MovieService.getMovie$(id));
                        movies.data[slot] = movie;
                    }

                    //If there is 0-1 pages, just set total results to count of items
                    let totalResults = movies.data.length
                    //To get total # of results, we need # of pages and number of items on last page, since it could be less than PAGE_SIZE
                    if (movies.totalPages > 1) {
                        const lastPageQuery = structuredClone(query);
                        lastPageQuery.number = movies.totalPages;
                        const lastPage = await firstValueFrom(this.MovieService.getMovies$(lastPageQuery));
                        totalResults = (query.size * (movies.totalPages - 1)) + lastPage.data.length;
                    }

                    return { ...movies, totalResults };
                })
            )
    }

    search(term: string, genre: string) {
        this.query.page = 1;
        this.query.term = term;
        this.query.genre = genre;
        this.search$.next(this.query);
    }

    pagePrevious() {
        this.query.page--;
        this.search$.next(this.query);
    }

    pageNext() {
        this.query.page++;
        this.search$.next(this.query);
    }
}