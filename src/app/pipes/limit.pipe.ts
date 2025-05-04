import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms text by limiting it to a certain length from the provided position
 */
@Pipe({
    name: 'limit',
    standalone: false
})
export class LimitPipe implements PipeTransform {

  /**
   * Transforms given text to contain elements with different background color
   * @param text The text value to transform
   * @param value The value to highlight
   * @returns Transformed text
   */
  transform(text: string, type: string, length: number, value: string | undefined = undefined): string {
    if (length > 0 && text && text.length > length)
      if (type == 'start') {
        return `${text.substring(0, text.indexOf(' ', length))}...`;
      } else if (type == 'around' && value) {
        let regex = new RegExp(value, "i");
        let match = text.match(regex);
        if (match) {
          let index = match.index ?? -1;
          if (index >= 0) {
            let start = Math.max(0, index - length / 2);
            let end = Math.min(text.length, index + length / 2);
            return `${start > 0 ? '...' : ''}${text.substring(start, end)}${end < text.length ? '...' : ''}`;
          }
        }
      }

    return text;
  }

}
