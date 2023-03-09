import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for providing application settings
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  /**
   * Subject for highlight changes
   */
  private highlightChanges: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Observable variable for the highlight changes
   */
  highlightChanges$: Observable<boolean> = this.highlightChanges.asObservable();

  /**
   * Subject for font size
   */
  private fontSize: BehaviorSubject<number> = new BehaviorSubject(14);

  /**
   * Observable variable for the font size
   */
  fontSize$: Observable<number> = this.fontSize.asObservable();

  /**
   * Changes the font size. Size is limited between 1-24
   * @param value The value to set the font-size to
   */
  changeFontSize(value: number) {
    if (value <= 0 || value > 24)
      return;

    this.fontSize.next(value);
  }

  /**
   * Changes the value of the "highlighChanges" subject
   * @param value The value to set the highlight on/off with
   */
  changeHighlight(value: boolean) {
    this.highlightChanges.next(value);
  }

  /**
   * Gets the value indicating whether the changes should be highlighted or not
   * @returns Current value for highlighting changes
   */
  getHighlightValue(): boolean {
    return this.highlightChanges.getValue();
  }
}
