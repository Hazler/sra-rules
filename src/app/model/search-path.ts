/**
 * Represents the path to a search result
 */
export interface SearchPath {
  /**
   * ID of the object / parent of the object the search result is found in
   */
  id: string | undefined;

  /**
   * Href of the object / parent of the object the search result is found in
   */
  href: string | undefined;

  /**
   * Content for the path to display
   */
  content: string;
}