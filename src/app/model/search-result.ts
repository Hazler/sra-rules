/**
 * Represents a search result
 */
export interface SearchResult {

  /**
   * ID of the search result, used for navigating to the correct section
   */
  id: string | undefined;

  /**
   * Content of the search result
   */
  content: string;

  /**
   * The path to the search result
   */
  path: { id: string | undefined, href: string | undefined, content: string } | undefined;
}