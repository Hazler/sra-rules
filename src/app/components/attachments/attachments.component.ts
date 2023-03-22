import { Component, ElementRef, Input } from '@angular/core';
import { Attachment } from 'src/app/model/attachment';
import { Category } from 'src/app/model/category';
import { SettingsService } from 'src/app/services/settings.service';
import { WindowService } from '../../services/window.service';

/**
 * Component for displaying attachments
 */
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent {

  /**
   * Attachments to display
   */
  @Input() attachments: Attachment[] = [];

  /**
   * Categories containing data for attachments
   */
  @Input() categories: Category[] = [];

  /**
   * Selected index for the tab group
   */
  public selectedIndex: number = 0;

  /**
   * Creates a new instance
   * @param windowService Window service
   */
  constructor(public windowService: WindowService, settingsService: SettingsService, elRef: ElementRef) {
    settingsService.fontSize$.subscribe(f => {
      elRef.nativeElement.style.setProperty('--rules-font-size', `${f}px`);
    });
  }
}
