import { Component, ElementRef, Input } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Section } from '../../model/section';

/**
 * Component for displaying a section and it's contents
 */
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  /**
   * The section to display
   */
  @Input() section!: Section;

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
      if (this.section) {
        let result = results.find(r => r.id == this.section.id);
        if (result)
          this.searchText = result.match;
        else
          this.searchText = '';
      }
    });
  }

  /**
   * Gets the section depth
   * @returns Depth of the section to determine the header/content size
   */
  getSectionDepth() {
    if (this.section.depth)
      return this.section.depth;

    if (this.section.id && this.section.id.length == 1 && Number.parseInt(this.section.id))
      return 0;

    let depth = this.section.id?.match(/\./g)?.length ?? -1;

    // hack to have 7.x display correctly
    if (depth == 1 && !this.section.header)
      depth++;

    return depth;
  }

  /**
   * Gets a start value for a list
   * @param index Index of the list of a section
   * @returns Start value for the list
   */
  getStartValue(index: number) {
    let result = 1;
    if (this.section.lists[index].listContinues)
      if (index) {
        let count = 0;
        this.section.lists.forEach((list, i) => {
          if (i < index) {
            count += list.list.length;
          }
        });

        result = count + 1;
      }

    return result;
  }
}
