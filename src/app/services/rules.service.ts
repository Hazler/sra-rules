import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SRArules80 } from 'src/data/sra-saannot-8.0';

/**
 * Service for rules related functionalities
 */
@Injectable({
  providedIn: 'root'
})
export class RulesService {

  /**
   * The rules data
   */
  data: any = SRArules80;

  /**
   * Subject for highlight changes
   */
  private highlightChanges: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Observable variable for the highlight changes
   */
  highlightChanges$: Observable<boolean> = this.highlightChanges.asObservable();

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
