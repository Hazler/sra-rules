import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

/**
 * Component for modifying application settings
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  /**
   * Application base font size
   */
  public fontSize: number = SettingsService.DefaultFontSize;

  /**
   * Highlight changes setting
   */
  public highlightChanged: boolean = false;

  /**
   * Application theme
   */
  public theme: string;

  /**
   * Available application themes
   */
  public themes = SettingsService.AvailableThemes;

  /**
   * Creates a new instance
   * @param rulesService The rules service
   */
  constructor(private settingsService: SettingsService) {
    this.theme = settingsService.getTheme();

    settingsService.fontSize$.subscribe(f => this.fontSize = f);
    settingsService.highlightChanges$.subscribe(h => this.highlightChanged = h);
    settingsService.theme$.subscribe(t => this.theme = t);
  }

  /**
   * Changes the value for highlighting the changes
   * @param event Checkbox event
   */
  onHighlightChanged(event: any) {
    this.settingsService.changeHighlight(event.checked);
  }

  /**
   * Sets the application theme
   * @param theme Theme to set for the application
   */
  setTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }

  /**
   * Increases the application font size
   */
  increaseFontSize() {
    this.settingsService.changeFontSize(this.fontSize + 1);
  }

  /**
   * Decreases the application font size
   */
  decreaseFontSize() {
    this.settingsService.changeFontSize(this.fontSize - 1);
  }

}
