import { SectionList } from "./list";
import { SectionBase } from "./section-base";

/**
 * Represents a section with header and/or children/lists or other content
 */
export interface Section extends SectionBase {

  /**
   * Header of the section
   */
  header: string | undefined;

  /**
   * Subheader of the section
   */
  subheader: string | undefined;

  /**
   * Hyperlink reference to this section, if ID is not available
   */
  href: string | undefined;

  /**
   * Path to image to display
   */
  img: string | undefined;

  /**
   * Alternative text to display instead of image.
   */
  imgAlt: string | undefined;

  /**
   * Children for the section
   */
  children: Section[];

  /**
   * Lists for the section
   */
  lists: SectionList[];

  /**
   * Superscript for the section
   */
  superscript: string;
}