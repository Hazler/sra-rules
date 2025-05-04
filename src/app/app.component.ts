import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

/**
 * Main application component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  /**
   * Theme for the application
   */
  theme: string = '';

  /**
   * Creates a new instance
   * @param settingsService The setting service
   */
  constructor(private settingsService: SettingsService) { }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.setTheme(this.settingsService.getTheme());
    this.settingsService.theme$.subscribe(d => this.setTheme(d));
  }

  /**
   * Sets the theme for the application
   * @param newTheme New theme to set
   */
  private setTheme(newTheme: string) {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains(this.theme))
      body.classList.remove(this.theme);
    this.theme = newTheme;

    body.classList.add(this.theme);
  }
}
