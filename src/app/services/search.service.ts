import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Attachment } from '../model/attachment';
import { Rules } from '../model/rules';
import { SearchResult } from '../model/search-result';
import { Section } from '../model/section';
import { SearchPath } from '../model/search-path';
import { Category } from '../model/category';
import { SearchStatus } from '../model/search-status';
import { SectionList } from '../model/list';

/**
 * Service for providing application search functionality
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  /**
   * Search results from the rules
   */
  private searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>([]);

  /**
   * Observable variable for search results
   */
  searchResults$ = this.searchResults.asObservable();

  /**
   * The text to search with
   */
  private searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Observable variable for the search text
   */
  searchText$ = this.searchText.asObservable();

  /**
   * Curren status of the search functionality
   */
  private status: BehaviorSubject<SearchStatus> = new BehaviorSubject<SearchStatus>(SearchStatus.WaitingForInput);

  /**
   * Observable search status
   */
  status$ = this.status.asObservable();

  /**
   * The last text which has been attempted to be searched, used to avoid searching while user is typing.
   */
  private lastSearchText: string = '';

  /**
   * Minimum required text length to commit a search
   */
  static readonly MinSearchLength = 3;

  /**
   * Creates a new instance
   */
  constructor() { }

  /**
   * Gets the current search text
   * @returns Current search text
   */
  getSearchText() {
    return this.searchText.getValue();
  }

  /**
   * Gets the current status value
   * @returns Current status value
   */
  getStatus() {
    return this.status.getValue();
  }

  /**
   * Clears all search information.
   */
  clearSearch() {
    this.searchText.next('');
    this.searchResults.next([]);
    this.status.next(SearchStatus.WaitingForInput);
  }

  /**
   * Searches the given rules with given search text
   * @param rules The rules to search
   * @param searchText Text to search with
   */
  search(rules: Rules, searchText: string) {
    this.lastSearchText = searchText;
    if (searchText?.trim().length >= SearchService.MinSearchLength) {
      this.status.next(SearchStatus.Searching);

      setTimeout(() => {
        if (searchText === this.lastSearchText) {
          this.searchText.next(searchText);

          let results: SearchResult[] = [];

          rules.content?.forEach(s => this.searchSection(s, searchText, results));
          rules.attachments?.forEach(a => this.searchAttachment(a, rules.categories, searchText, results));

          this.searchResults.next(results);
          this.status.next(SearchStatus.Complete);
        }
      }, 500);
    }
    else
      this.status.next(SearchStatus.WaitingForInput);
  }

  /**
   * Searches a section for given search text
   * @param section Section and it's children to search for given search text
   * @param searchText The text to search for in section and it's children
   * @param path The path to the section being searched for
   */
  private searchSection(section: Section, searchText: string, results: SearchResult[], path: SearchPath | undefined = undefined) {
    if (section.id || section.href) {
      if (section.header)
        path = { id: section.id, href: section.href, content: `${section.id ?? ''} ${section.header}` };
      else if (section.content)
        path = { id: section.id, href: section.href, content: `${section.id ?? ''} ${section.content}` };
    }

    let regex = new RegExp(searchText, "i");
    let headerMatch = section.header?.match(regex);
    if (headerMatch && headerMatch.length > 0)
      results.push({ content: `${section.id ?? ''} ${section.header}`, path: path, id: section.id ?? section.href, match: headerMatch[0] });
    else {
      let contentMatch = section.content?.match(regex);
      if (contentMatch && contentMatch.length > 0)
        results.push({ content: `${section.id ?? ''} ${section.content}`, path: path, id: section.id ?? section.href, match: contentMatch[0] });
      else {
        let idMatch = section.id?.match(regex);
        if (idMatch && idMatch.length > 0)
          results.push({ content: `${section.id} ${section.header ?? section.content}`, path: path, id: section.id ?? section.href, match: idMatch[0] })
        else
          if (section.lists?.length > 0) {
            section.lists.forEach(list => this.searchList(list, regex, results, path));
          }
      }
    }

    section.children?.forEach(s => this.searchSection(s, searchText, results, path));
  }

  /**
   * Searches list contents for given search text
   * @param sectionList A list and it's children to search for given search text
   * @param searchText The text to search for in list and it's children
   * @param path The path to the section being searched for
   */
  private searchList(sectionList: SectionList, regex: RegExp, results: SearchResult[], path: SearchPath | undefined = undefined) {
    let sectionListContentMatch = sectionList.content?.match(regex);
    if (sectionListContentMatch && sectionListContentMatch.length > 0)
      results?.push({ content: sectionList.content, path: path, id: sectionList.id, match: sectionListContentMatch[0] });

    sectionList.list?.forEach(item => {
      let listContentMatch = item.content?.match(regex);
      if (listContentMatch && listContentMatch.length > 0)
        results?.push({ content: item.content, path: path, id: sectionList.id, match: listContentMatch[0] });

      if (item.lists?.length > 0)
        item.lists.forEach(list => this.searchList(list, regex, results, path));
    })
  }

  /**
   * Searches an attachment for given search text
   * @param attachment The attachment to search for
   * @param categories Available categories
   * @param searchText The text to search for
   * @param results Collection to which the found search results are added
   * @param path Path to the item
   */
  private searchAttachment(attachment: Attachment, categories: Category[], searchText: string, results: SearchResult[], path: SearchPath | undefined = undefined) {
    if (attachment.id) {
      if (attachment.header)
        path = { id: attachment.id, href: undefined, content: attachment.header };
    }

    let regex = new RegExp(searchText, "i");
    let headerMatch = attachment.header?.match(regex);
    if (headerMatch && headerMatch.length > 0)
      results.push({ content: `${attachment.header}`, path: path, id: attachment.id, match: headerMatch[0] });
    else if (attachment.table?.length > 0)
      attachment.table.forEach(t => this.searchSection(t, searchText, results, path));
    else if (attachment.superscripts?.length > 0) {
      attachment.superscripts.forEach(ss => {
        let superscriptMatch = ss.content?.match(regex);
        if (superscriptMatch && superscriptMatch.length > 0)
          results?.push({ content: ss.content, path: path, id: ss.id, match: superscriptMatch[0] });
      });
    }

    if (attachment.categoryField) {
      categories.forEach(c => {
        let categoryField = c[attachment.categoryField];
        if (categoryField && categoryField.length > 0)
          categoryField.forEach(cf => this.searchSection(cf, searchText, results, path));
      });
    }
  }
}
