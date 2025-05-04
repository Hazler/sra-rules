import { Pipe, PipeTransform } from '@angular/core';
import { Attachment } from '../model/attachment';
import { SectionList } from '../model/list';
import { NewParts } from '../model/new-parts';
import { Section } from '../model/section';
import { SettingsService } from '../services/settings.service';

/**
 * Transforms text to contain <span></span> element with a different background color.
 */
@Pipe({
    name: 'highlightNew',
    standalone: false
})
export class HighlightNewPipe implements PipeTransform {

  /**
   * Creates a new instance
   * @param settingsService The settings service
   */
  constructor(private settingsService: SettingsService) {
  }

  /**
   * Transforms given text to contain elements with different background color
   * @param value The text value to transform
   * @param newParts The new parts to highlight
   * @param className Name of the class to set for the <span> element
   * @returns Transformed text
   */
  transform(value: string, newParts: NewParts, className: string = "highlight-new"): string {
    let result = value;
    if (this.settingsService.getHighlightValue() && newParts.newParts?.length) {
      newParts.newParts.forEach(p => {
        if (p == "*") {
          this.setNewRecursively(newParts, ["*"]);

          if (result)
            result = `<span class="${className}">${result}</span>`;
        }
        else if (result)
          result = result.replace(p, `<span class="${className}">${p}</span>`);
      });
    }

    return result;
  }

  /**
   * Sets value for new parts recursively
   * @param newParts The object for which the new parts values are set recursively
   * @param newPartsValues New parts values to set
   */
  private setNewRecursively(newParts: NewParts, newPartsValues: string[]) {
    let section = newParts as Section;
    if (section) {
      if (section?.children)
        section.children.forEach(sub => this.setNewRecursively(sub, newPartsValues));

      if (section?.lists)
        section.lists.forEach(list => {
          list.newParts = newPartsValues;
        })
    }
    else {
      let list = newParts as SectionList;
      if (list) {
        if (list?.list)
          list.list.forEach(l => l.newParts = ["*"]);
      }
      else {
        let attachment = newParts as Attachment;
        if (attachment) {
          if (attachment.table)
            attachment.table.forEach(s => this.setNewRecursively(s, newPartsValues));
        }
      }
    }
  }

}
