import { NewParts } from "./new-parts";

/**
 * Represents a superscript
 */
export interface SuperScript extends NewParts {

  /**
   * ID of the superscript
   */
  id: string;

  /**
   * Content of the superscript
   */
  content: string;

}