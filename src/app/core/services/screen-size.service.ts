import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService implements OnDestroy {
  private resizeSubscription: Subscription;
  private screenWidthSubject: BehaviorSubject<number>;

  constructor() {
    this.screenWidthSubject = new BehaviorSubject<number>(window.innerWidth);
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.screenWidthSubject.next(window.innerWidth);
    });
  }

  get screenWidth$(): Observable<number> {
    return this.screenWidthSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }
}
