import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Window observation service
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService {

  /**
   * Screen width limit for portrait mode
   */
  private readonly portraitScreenWidthLimit: number = 780;

  /**
   * Behavior subject for checking whether the window is in mobile mode or not
   */
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth <= this.portraitScreenWidthLimit);

  /**
   * Observable value for mobile mode
   */
  isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  /**
   * Viewport size observer
   */
  private viewportObserver: ResizeObserver = new ResizeObserver(() => this.zone.run(() => {
    const isMobile = window.innerWidth <= this.portraitScreenWidthLimit;
    if (this.isMobileSubject.getValue() != isMobile)
      this.isMobileSubject.next(isMobile);
  }));

  /**
   * Creates a new instance
   * @param zone Angular zone
   */
  constructor(private zone: NgZone) {
    this.viewportObserver.observe(document.body);
  }

  /**
   * Destroys the service
   */
  ngOnDestroy(): void {
    this.viewportObserver.disconnect();
  }
}
