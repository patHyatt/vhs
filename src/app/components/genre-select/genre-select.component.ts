import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { MovieService } from '../../../services/movie.service';
import { take } from 'rxjs';
import { Genre } from '../../../models/genre';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-genre-select',
    templateUrl: './genre-select.component.html',
    imports: [FormsModule, NgFor]
})
export class GenreSelectComponent implements OnInit {
    protected genres: string[] = [];
    genre: string = '';

    constructor(
        private MovieService: MovieService,
        private SearchService: SearchService
    ) { }

    ngOnInit(): void {
        this.MovieService.getMoviesByGenre$()
            .pipe(
                take(1)
            )
            .subscribe(genres => {
                this.genres = genres.data.map((genre: Genre) => genre.title);
            })
    }

    trackByGenre(index: number, genre: string): string {
        return genre;
    }

    set(genre: any): void {
        const query = this.SearchService.query;
        this.SearchService.search(query.term, genre);
    }
}
