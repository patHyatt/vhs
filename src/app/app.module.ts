import { APP_INITIALIZER, NgModule, provideZoneChangeDetection } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterOutlet } from "@angular/router";
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { CassetteComponent } from './components/cassette/cassette.component';
import { MovieComponent } from "./components/movie/movie.component";
import { apiRequestInterceptor } from './interceptors/api-request.interceptor';
import { initializeAppFactory as appInitializeFactory } from './app.initialize';
import { MovieService } from '../services/movie.service';
import { TelevisionStaticComponent } from './components/television-static/television-static.component';
import { GenreSelectComponent } from './components/genre-select/genre-select.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    NgForOf,
    AsyncPipe,
    FormsModule,
    NgOptimizedImage,
    NgIf,
    CassetteComponent,
    MovieComponent,
    TelevisionStaticComponent,
    GenreSelectComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeFactory,
      multi: true,
      deps: [MovieService]
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([
        apiRequestInterceptor
      ])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
