import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

export function apiRequestInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  return next(req)
    .pipe(
      tap(event => {
        //Hack-ish to avoid loader when retrieving all genres
        if (req.url.includes('genres/movies'))
          return;

        if (event.type === HttpEventType.Response || event.type === HttpEventType.ResponseHeader)
          loadingService.setLoading(false);

        if (event.type === HttpEventType.Sent)
          loadingService.setLoading(true);
      })
    );
}