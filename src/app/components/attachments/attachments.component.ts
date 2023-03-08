import { Component, Input } from '@angular/core';
import { Attachment } from 'src/app/model/attachment';
import { Category } from 'src/app/model/category';
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
   * Creates a new instance
   * @param windowService Window service
   */
  constructor(public windowService: WindowService) {
  }
}
