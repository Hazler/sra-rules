/**
 * Represents a reference to a section
 */
export interface SectionRef {

  /**
   * ID of the section the reference is pointing to
   */
  id: string;

  /**
   * Content of the owning section to display as the reference link
   */
  content: string;
}