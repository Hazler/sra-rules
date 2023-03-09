import { Component, ElementRef, Input } from '@angular/core';
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
   * Creates a new instance
   * @param settingsService Settings service
   * @param elRef Component element reference
   */
  constructor(settingsService: SettingsService, elRef: ElementRef) {
    settingsService.fontSize$.subscribe(f => {
      elRef.nativeElement.style.setProperty('--rules-font-size', `${f}px`);
    });
  }

  /**
   * Gets the section depth
   * @returns Depth of the section to determine the header/content size
   */
  getSectionDepth() {
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
