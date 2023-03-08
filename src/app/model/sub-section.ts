import { SectionBase } from "./section-base";
import { SectionRef } from "./section-ref";

/**
 * Represents a subsection which can reference to other sections
 */
export interface SubSection extends SectionBase {

  /**
   * References to other sections
   */
  refs: SectionRef[];

}