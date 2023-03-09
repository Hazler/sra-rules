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
  public fontSize: number = 14;

  /**
   * Creates a new instance
   * @param rulesService The rules service
   */
  constructor(private settingsService: SettingsService) {
    settingsService.fontSize$.subscribe(f => this.fontSize = f);
  }

  /**
   * Changes the value for highlighting the changes
   * @param event Checkbox event
   */
  onHighlightChanged(event: any) {
    this.settingsService.changeHighlight(event.checked);
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
