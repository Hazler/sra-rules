import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Rules } from 'src/app/model/rules';
import { RulesService } from 'src/app/services/rules.service';
import { SearchComponent } from '../search/search.component';

/**
 * Header for the application
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   * The rules
   */
  rules: Rules | any;

  /**
   * Occurs when the menu icon is clicked
   */
  @Output() menuClicked = new EventEmitter();

  /**
   * Occurs when the settings icon is clicked
   */
  @Output() settingsClicked = new EventEmitter();

  /**
   * Creates a new instance
   * @param rulesService The rules service
   * @param dialog Dialog for the search
   */
  constructor(rulesService: RulesService, private dialog: MatDialog) {
    rulesService.data$.subscribe(d => this.rules = d);
  }

  /**
   * Opens a search dialog
   */
  openSearch() {
    this.dialog.open(SearchComponent);
  }
}
