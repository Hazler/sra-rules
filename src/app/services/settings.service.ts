import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for providing application settings
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  /**
   * Name for the font size cookie value.
   */
  static readonly FontSizeCookie: string = 'FontSize';

  /**
   * Name for the highlight changes cookie value.
   */
  static readonly HighlightChangesCookie: string = 'HighlighChanges';

  /**
   * Name for the theme cookie value.
   */
  static readonly ThemeCookie: string = 'Theme';

  /**
   * Default theme value.
   */
  static readonly DefaultTheme: string = 'light';

  /**
   * Default font size value.
   */
  static readonly DefaultFontSize: number = 14;

  /**
   * Minimum font size for settings
   */
  static readonly MinFontSize: number = 6;

  /**
   * Maximum font size for settings
   */
  static readonly MaxFontSize: number = 24;

  /**
   * Available themes for the application.
   */
  static readonly AvailableThemes: { key: string, displayValue: string }[] = [
    { key: 'light', displayValue: 'Valoisa' },
    { key: 'dark', displayValue: 'Pimeä' }
  ];

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
   * Subject for the application theme
   */
  private theme: BehaviorSubject<string> = new BehaviorSubject(SettingsService.DefaultTheme);

  /**
   * Observable variable for theme
   */
  theme$: Observable<string> = this.theme.asObservable();

  /**
   * Creates a new instance
   * @param cookieService The cookie service
   */
  constructor(private cookieService: CookieService) {
    if (cookieService.check(SettingsService.FontSizeCookie))
      this.changeFontSize(Number.parseInt(cookieService.get(SettingsService.FontSizeCookie)));

    if (cookieService.check(SettingsService.HighlightChangesCookie)) {
      this.changeHighlight(cookieService.get(SettingsService.HighlightChangesCookie) == "true");
    }

    if (cookieService.check(SettingsService.ThemeCookie)) {
      this.changeTheme(cookieService.get(SettingsService.ThemeCookie));
    }
  }

  /**
   * Changes the font size. Size is limited between 1-24
   * @param value The value to set the font-size to
   */
  changeFontSize(value: number) {
    if (value < SettingsService.MinFontSize || value > SettingsService.MaxFontSize)
      return;

    this.fontSize.next(value);
    this.cookieService.set(SettingsService.FontSizeCookie, `${value}`);
  }

  /**
   * Changes the value of the "highlighChanges" subject
   * @param value The value to set the highlight on/off with
   */
  changeHighlight(value: boolean) {
    this.highlightChanges.next(value);
    this.cookieService.set(SettingsService.HighlightChangesCookie, String(value));
  }

  /**
   * Changes the theme for the application
   * @param value The value to set for the application theme
   */
  changeTheme(value: string) {
    this.theme.next(value);
    this.cookieService.set(SettingsService.ThemeCookie, value);
  }

  /**
   * Gets the current theme value
   * @returns Current theme value
   */
  getTheme() {
    return this.theme.getValue();
  }

  /**
   * Gets the value indicating whether the changes should be highlighted or not
   * @returns Current value for highlighting changes
   */
  getHighlightValue(): boolean {
    return this.highlightChanges.getValue();
  }
}
