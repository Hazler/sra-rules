import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Sanitizes a string to SafeHtml
 */
@Pipe({
    name: 'sanitizeHtml',
    standalone: false
})
export class SanitizeHtmlPipe implements PipeTransform {

  /**
   * Creates a new instance
   * @param sanitizer Dom sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
  }  

  /**
   * Transforms a string to SafeHtml
   * @param value String to sanitize
   * @returns Sanitized SafeHtml
   */
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value ?? '');
  }
}