import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie';
import { NgIf } from '@angular/common';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { ImgFallbackModule } from 'ngx-img-fallback';

@Component({
    selector: 'app-movie',
    standalone: true,
    imports: [NgIf, DurationPipe, ImgFallbackModule],
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    @Input() movie!: Movie;
    placeholder: string = '';

    ngOnInit(): void {
        this.placeholder = `https://eu.ui-avatars.com/api/?name=${this.movie.title.replace(/[^0-9A-Z]+/gi, "")}`;
    }
}