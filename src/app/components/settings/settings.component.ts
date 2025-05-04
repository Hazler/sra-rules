import { Component } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';
import { SettingsService } from 'src/app/services/settings.service';

/**
 * Component for modifying application settings
 */
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: false
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
   * Current application rule set
   */
  currentRuleSet: string;

  /**
   * Available rule sets for the application, shorthand for the template
   */
  public ruleSets = RulesService.AvailableRuleSetNames;

  /**
   * Creates a new instance
   * @param rulesService The rules service
   */
  constructor(private settingsService: SettingsService, private rulesService: RulesService) {
    this.theme = settingsService.getTheme();
    this.currentRuleSet = rulesService.getCurrentName();

    settingsService.fontSize$.subscribe(f => this.fontSize = f);
    settingsService.highlightChanges$.subscribe(h => this.highlightChanged = h);
    settingsService.theme$.subscribe(t => this.theme = t);
    
    rulesService.data$.subscribe(d => this.currentRuleSet = d.title);
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
   * Sets the application rule set
   * @param rules Name of the rule set for the application
   */
  setRules(rules: string) {
    this.rulesService.changeRules(rules);
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
