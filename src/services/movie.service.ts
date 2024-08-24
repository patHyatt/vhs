import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from "rxjs";
import { Movie } from "../models/movie";
import { Genre } from '../models/genre';
import { DataResponse } from '../models/data-response';
import { Paging } from '../models/paging';
import { MovieQuery } from '../models/movie-query';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private URL_BASE = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com' as const;
  private DEFAULT_PAGE_SIZE = 25 as const;
  private DEFAULT_PAGING = {
    number: 1,
    size: this.DEFAULT_PAGE_SIZE
  } as const;

  private authToken: string = '';

  constructor(private http: HttpClient) {
  }

  /** Retrieves an auth token and adds to services's state for reuse */
  initialize() {
    return this.getAuthToken$()
      .pipe(
        take(1),
        tap(({ token }) => this.authToken = token)
      )
  }

  /**
   * Methods below DO NOT require authentication
   */

  getAuthToken$(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.URL_BASE}/auth/token`);
  }

  getHealth$(): Observable<object> {
    return this.http.get<object>(`${this.URL_BASE}/healthcheck`);
  }

  /**
   * Methods below REQUIRE authentication
   */

  private getHttpOptions(params?: Object) {
    const options: Record<string, object> = {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    };

    if (params !== undefined) {
      options['params'] = params;
    }

    return options;
  }

  getMoviesByGenre$(paging?: Paging) {
    paging = paging ?? this.DEFAULT_PAGING;
    const options = this.getHttpOptions({
      page: paging?.number ?? 1,
      limit: paging?.size ?? this.DEFAULT_PAGE_SIZE
    });

    return this.http.get<DataResponse<Genre>>(`${this.URL_BASE}/genres/movies`, options);
  }

  getMovies$(movieQuery: MovieQuery) {
    movieQuery = movieQuery ?? { search: '', genre: '', number: 1, size: this.DEFAULT_PAGE_SIZE };
    const options = this.getHttpOptions({
      page: movieQuery?.number ?? 1,
      limit: movieQuery?.size ?? 25,
      search: movieQuery.search,
      genre: movieQuery.genre
    });

    return this.http.get<DataResponse<Movie>>(`${this.URL_BASE}/movies`, options);
  }

  getMovie$(id: string) {
    const options = this.getHttpOptions();
    return this.http.get<Movie>(`${this.URL_BASE}/movies/${id}`, options);
  }

  getAllMovies$(paging?: Paging) {
    paging = paging ?? this.DEFAULT_PAGING;
    const options = this.getHttpOptions({
      page: paging?.number ?? 1,
      limit: paging?.size ?? 25
    });
    return this.http.get<DataResponse<Movie>>(`${this.URL_BASE}/movies/titles`, options);
  }

  getGenreStatistics$(id: number) {
    const options = this.getHttpOptions();
    return this.http.get(`${this.URL_BASE}/movies/genres/${id}`, options);
  }
}
