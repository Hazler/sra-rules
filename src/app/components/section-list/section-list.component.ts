import { Component, ElementRef, Input } from '@angular/core';
import { SectionList } from 'src/app/model/list';
import { SearchService } from 'src/app/services/search.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
  standalone: false
})
export class SectionListComponent {

  /**
   * The section list to display
   */
  @Input() list!: SectionList;

  /**
   * Start value for the list, if needed
   */
  @Input() startValue!: number;

  /**
   * The current search text
   */
  searchText: string;

  /**
   * Creates a new instance
   * @param settingsService Settings service
   * @param searchService Search service
   * @param elRef Component element reference
   */
  constructor(settingsService: SettingsService, searchService: SearchService, elRef: ElementRef) {
    this.searchText = searchService.getSearchText();
    settingsService.fontSize$.subscribe(f => {
      elRef.nativeElement.style.setProperty('--rules-font-size', `${f}px`);
    });

    searchService.searchResults$.subscribe(results => {
      if (this.list) {
        console.log(results);
        let result = results.find(r => r.id == this.list.id);
        if (result)
          this.searchText = result.match;
        else
          this.searchText = '';
      }
    });
  }
}
