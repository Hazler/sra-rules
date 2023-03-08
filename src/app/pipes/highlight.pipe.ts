import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms text to contain <span></span> element with a different background color.
 */
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  /**
   * Transforms given text to contain elements with different background color
   * @param text The text value to transform
   * @param value The value to highlight
   * @returns Transformed text
   */
  transform(text: string, value: string): string {
    let regex = new RegExp(value, "i");
    let match = text.match(regex);
    if (match) {
      if (match.length > 0)
        return text.replace(match[0], `<span style="background-color: lightgreen;">${match[0]}</span>`);
    }

    return text;
  }

}
