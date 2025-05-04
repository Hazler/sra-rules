import { Component, ElementRef } from '@angular/core';
import { Rules } from 'src/app/model/rules';
import { SearchResult } from 'src/app/model/search-result';
import { RulesService } from 'src/app/services/rules.service';
import { SearchService } from 'src/app/services/search.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SearchStatus } from '../../model/search-status';

/**
 * Search component
 */
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: false
})
export class SearchComponent {

  /**
   * Search results from the rules
   */
  searchResults: SearchResult[] = [];

  /**
   * The text to search with
   */
  searchText: string;

  /**
   * The rules to search through
   */
  private rules: Rules | any;

  /**
   * Current status of the serach
   */
  status: SearchStatus;

  /**
   * Shorthand for SearchStatus enum
   */
  SearchStatus = SearchStatus;

  /**
   * Creates a new instance
   * @param rulesService The rules service
   * @param searchService The search service
   */
  constructor(rulesService: RulesService, private searchService: SearchService, settingsService: SettingsService, elRef: ElementRef) {
    this.searchText = this.searchService.getSearchText();
    this.status = this.searchService.getStatus();

    this.searchService.status$.subscribe(status => this.status = status);
    this.searchService.searchResults$.subscribe(results => this.searchResults = results);
    this.searchService.searchText$.subscribe(text => this.searchText = text);
    rulesService.data$.subscribe(d => this.rules = d);

    settingsService.fontSize$.subscribe(f => {
      elRef.nativeElement.style.setProperty('--rules-font-size', `${f}px`);
    });
  }

  /**
   * Searches the rules for the input text
   * @param textInputElement The search textbox
   */
  onTextChanged(textInputElement: any) {
    let str: string = textInputElement.value;

    this.searchResults = [];

    this.searchService.search(this.rules, str);
  }

  /**
   * Calls to clear the search information
   */
  clearSearch() {
    this.searchService.clearSearch();
  }
}
