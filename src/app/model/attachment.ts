import { CategoryField } from "./category";
import { NewParts } from "./new-parts";
import { Section } from "./section";
import { SuperScript } from "./super-script";

/**
 * Represents an attachment
 */
export interface Attachment extends NewParts {

  /**
   * ID of the attachment
   */
  id: string;

  /**
   * Header of the attachment
   */
  header: string;

  /**
   * Category field to use for the attachment
   */
  categoryField: keyof typeof CategoryField;

  /**
   * Table contents for the attachment
   */
  table: Section[];

  /**
   * Superscripts for the attachment
   */
  superscripts: SuperScript[];
}