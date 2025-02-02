import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loading$ = new BehaviorSubject<boolean>(false);

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }
}
