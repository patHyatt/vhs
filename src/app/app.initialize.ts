import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

export function initializeAppFactory(moviesService: MovieService): () => Observable<{ token: string }> {
    return () => moviesService.initialize();
}