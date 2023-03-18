/**
 * Defines available statuses for search
 */
export enum SearchStatus {
  /**
   * Waiting for input / required amount of characters
   */
  WaitingForInput = 0,

  /**
   * Searching
   */
  Searching,

  /**
   * Search is complete
   */
  Complete
}