import { Component } from '@angular/core';
import { SearchResult } from 'src/app/model/search-result';
import { Section } from 'src/app/model/section';
import { RulesService } from 'src/app/services/rules.service';

/**
 * Search component
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  /**
   * Search results from the rules
   */
  searchResults: SearchResult[] = [];

  /**
   * The text to search with
   */
  searchText: string = '';

  /**
   * Creates a new instance
   * @param rulesService The rules service
   */
  constructor(private rulesService: RulesService) {
  }

  /**
   * Searches the rules for the input text
   * @param textInputElement The search textbox
   */
  onTextChanged(textInputElement: any) {
    let str: string = textInputElement.value;

    this.searchText = '';

    if (str.length > 2) {
      this.searchResults = [];
      this.searchText = str;
      let sections: Section[] = this.rulesService.data.content;
      sections.forEach(s => this.searchSection(s, str.toLowerCase()));
    }
  }

  /**
   * Searches a section for given search text
   * @param section Section and it's children to search for given search text
   * @param searchText The text to search for in section and it's children
   * @param path The path to the section being searched for
   */
  private searchSection(section: Section, searchText: string, path: { id: string | undefined, href: string | undefined, content: string } | undefined = undefined) {
    if (section.id || section.href) {
      if (section.header)
        path = { id: section.id, href: section.href, content: section.header };
      else if (section.content)
        path = { id: section.id, href: section.href, content: section.content };
    }

    if (section.header?.toLowerCase().includes(searchText))
      this.searchResults.push({ content: `${section.id ?? ''} ${section.header}`, path: path, id: section.id ?? section.href });
    else if (section.content?.toLowerCase().includes(searchText))
      this.searchResults.push({ content: `${section.id ?? ''} ${section.content}`, path: path, id: section.id ?? section.href });
    else if (section.id?.toLowerCase().includes(searchText))
      this.searchResults.push({ content: `${section.id} ${section.header ?? section.content}`, path: path, id: section.id ?? section.href })
    else if (section.lists?.length > 0) {
      section.lists.forEach(l => {
        if (l.content?.includes(searchText))
          this.searchResults.push({ content: l.content, path: path, id: section.id ?? section.href });
      });
    }

    section.children?.forEach(s => this.searchSection(s, searchText, path));
  }
}
