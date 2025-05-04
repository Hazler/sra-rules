import { AfterContentChecked, Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rules } from 'src/app/model/rules';
import { SettingsService } from 'src/app/services/settings.service';
import { RulesService } from '../../services/rules.service';

/**
 * Displays the rules
 */
@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css'],
    standalone: false
})
export class RulesComponent implements AfterContentChecked {

  /**
   * Rules for this component
   */
  data: Rules | any;

  /**
   * Indicates whether to highlight the changes to the rules or not
   */
  highlightChanges: boolean;

  /**
   * ID of the section to navigate to
   */
  sectionId: string | undefined;

  /**
   * Creates a new instance
   * @param rulesService The rules service
   * @param settingsService The settings service
   * @param activatedRoute Activated route
   */
  constructor(rulesService: RulesService, settingsService: SettingsService, activatedRoute: ActivatedRoute) {
    this.highlightChanges = settingsService.getHighlightValue();
    rulesService.data$.subscribe(d => this.data = d);
    settingsService.highlightChanges$.subscribe(highlight => { this.highlightChanges = highlight; });
    activatedRoute.url.subscribe(url => {
      let route = url.at(0);
      if (route) {
        this.sectionId = route.path;
      }
    })
  }

  /**
   * Navigates to a section if the "sectionId" is set
   */
  ngAfterContentChecked() {
    if (this.sectionId) {
      document.getElementById(this.sectionId)?.scrollIntoView();
    }
  }

}
