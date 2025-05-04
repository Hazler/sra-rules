import { Pipe, PipeTransform } from '@angular/core';
import { SectionBase } from '../model/section-base';
import { SubSection } from '../model/sub-section';

/**
 * Transforms references of a subsection to hyperlinks
 */
@Pipe({
    name: 'refs',
    standalone: false
})
export class TransformRefsPipe implements PipeTransform {

  /**
   * Replaces reference content with hyperlinks
   * @param value The text to transform
   * @param section The section to check for any references to transform with
   * @returns Transformed text
   */
  transform(value: string, section: SectionBase): string {
    let result = value;
    let subSection = section as SubSection;
    if (!!subSection)
      if (!!subSection.refs && subSection.refs.length > 0) {
        subSection.refs.forEach(r => {
          result = result.replace(r.content, `<a href="#${r.id}">${r.content}</a>`)
        });
      }

    return result;
  }
}