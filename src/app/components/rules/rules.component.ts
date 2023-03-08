import { AfterContentChecked, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rules } from 'src/app/model/rules';
import { RulesService } from '../../services/rules.service';

/**
 * 
 */
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements AfterContentChecked {

  /**
   * Rules for this component
   */
  data: Rules;

  /**
   * Indicates whether to highlight the changes to the rules or not
   */
  highlightChanges: boolean = false;

  /**
   * ID of the section to navigate to
   */
  sectionId: string | undefined;

  /**
   * Creates a new instance
   * @param rulesService The rules service
   * @param activatedRoute Activated route
   */
  constructor(rulesService: RulesService, activatedRoute: ActivatedRoute) {
    this.data = rulesService.data;
    rulesService.highlightChanges$.subscribe(highlight => { this.highlightChanges = highlight; });
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
