import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../services/settings.service';

/**
 * Adds the theme name to the image name before the extension.
 */
@Pipe({
    name: 'themedImage',
    pure: false,
    standalone: false
})
export class ThemedImagePipe implements PipeTransform {

  constructor(private settingsService: SettingsService) {
  }

  /**
   * Transforms name of the image to contain the theme
   * @param imgName Image name
   * @returns Modified image name
   */
  transform(imgName: string): string {
    let extensionDot: number = imgName.lastIndexOf(".");
    if (extensionDot)
      return `${imgName.substring(0, extensionDot)}-${this.settingsService.getTheme()}${imgName.substring(extensionDot)}`;

    return imgName;
  }

}
