import { Component, Output, EventEmitter } from '@angular/core';
import { Rules } from 'src/app/model/rules';
import { Section } from 'src/app/model/section';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent {

  /**
   * Occurs when a navigation item is clicked
   */
  @Output() navItemClicked = new EventEmitter();

  /**
   * Data for the navigation
   */
  data: Rules;

  /**
   * Cache for storing the open/close states of the expandable sections
   */
  opened: any = {};

  /**
   * Creates a new instance
   * @param rulesService The rules service
   */
  constructor(private rulesService: RulesService) {
    this.data = rulesService.data;
    this.data.content.map((s: Section) => {
      if (s.id)
        this.opened[s.id] = { isOpen: false, isExpandable: s.children.some(c => c.header) };
    });
  }

  /**
   * Gets the command sections from the rules
   * @returns Collection containing the command sections
   */
  getCommands() {
    let four = this.data.content.find((c: Section) => c.id == "4");
    let fourTwo = four?.children.find(c => c.id == "4.2");
    return fourTwo?.children.find(c => c.id = "4.2.1")?.children;
  }

  /**
   * Toggles the opened/closed state of the section
   * @param section The section to open or close
   */
  openClose(section: Section) {
    if (section.id)
      this.opened[section.id].isOpen = !this.opened[section.id].isOpen;
  }

  /**
   * Changes the value for highlighting the changes
   * @param event Checkbox event
   */
  onHighlightChanged(event: any) {
    this.rulesService.changeHighlight(event.checked);
  }
}
