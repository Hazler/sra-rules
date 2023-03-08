import { SectionBase } from "./section-base";
import { SubSection } from "./sub-section";

/**
 * Represents a list belonging to a section
 */
export interface SectionList extends SectionBase {

  /**
   * Type of the list
   */
  listType: string;

  /**
   * Indicates whether the list continues from the previous list or not
   */
  listContinues: boolean;

  /**
   * The actual list contents
   */
  list: SubSection[];
}