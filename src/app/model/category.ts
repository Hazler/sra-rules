import { NewParts } from "./new-parts";
import { Section } from "./section";

/**
 * Represents a category for the rules
 */
export interface Category extends NewParts {

  /**
   * ID of the category
   */
  id: string;

  /**
   * Name of the category
   */
  name: string;

  /**
   * Rifle rules for the category
   */
  rifle: Section[];

  /**
   * Handgun rules for the category
   */
  handgun: Section[];

  /**
   * Sniper rules for the category
   */
  sniper: Section[];

  /**
   * Shotgun rules for the category
   */
  shotgun: Section[];

  /**
   * Gear rules for the category
   */
  gear: Section[];
}

export enum CategoryField {
  rifle,

  handgun,

  sniper,

  shotgun,

  gear
}