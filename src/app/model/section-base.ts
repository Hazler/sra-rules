import { NewParts } from "./new-parts";

/**
 * Represents the base for any section
 */
export interface SectionBase extends NewParts {

  /**
   * ID of the section
   */
  id: string | undefined;

  depth: number | undefined;

  indent: boolean | undefined;
  
  /**
   * Content of the section
   */
  content: string;

}