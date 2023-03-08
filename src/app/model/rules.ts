import { Attachment } from "./attachment";
import { Category } from "./category";
import { Section } from "./section";

/**
 * Represents the rules
 */
export interface Rules {

  /**
   * Title for the rules
   */
  title: string;

  /**
   * Last words / epilogue for the rules
   */
  lastWords: string;

  /**
   * Actual rules in separate sections
   */
  content: Section[];

  /**
   * The categories within the rules
   */
  categories: Category[];

  /**
   * The attachments for the rules
   */
  attachments: Attachment[];
}