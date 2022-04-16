export enum Shortcode {
  /**
   * Emoji shortcodes used by Discord.
   */
  DISCORD,

  /**
   * Commonly-agreed on shortcodes used by Slack, Campfire, GitHub, etc.
   */
  COMMON,
}

export interface PartialEmojiData {
  /**
   * The Unicode codepoint, as 4-5 hex digits. Where an emoji needs 2 or more 
   * codepoints, they are specified like 1F1EA-1F1F8. 
   * 
   * For emoji that need to specifiy a variation selector (-FE0F), that is 
   * included here.
   */
  unified: string;

  /**
   * For emoji that also have usage without a variation selector, that version is 
   * included here (otherwise is null).
   */
  non_qualified: string | null;

  /**
   * The name of the image file.
   */
  image: string;

  /**
   * The X position of the image in the spritesheets.
   */
  sheet_x: number;

  /**
   * The Y position of the image in the spritesheets.
   */
  sheet_y: number;

  /**
   * Emoji version in which this codepoint/sequence was added 
   * (previously Unicode version).
   */
  added_in: string;

  /**
   * A flag for whether the Apple image set has an image (named by the image prop) available.
   */
  has_img_apple: boolean;

  /**
   * A flag for whether the Google image set has an image (named by the image prop) available.
   */
  has_img_google: boolean;

  /**
   * A flag for whether the Twitter image set has an image (named by the image prop) available.
   */
  has_img_twitter: boolean;

  /**
   * A flag for whether the Facebook image set has an image (named by the image prop) available.
   */
  has_img_facebook: boolean;
}

export interface EmojiData extends PartialEmojiData {
  /**
   * The Unicode name of the emoji, in SHOUTY UPPERCASE.
   */
  name: string; 

  /**
   * The legacy Unicode codepoint used by Docomo.
   */
  docomo: string | null;

  /**
   * The legacy Unicode codepoint used by au.
   */
  au: string | null;

  /**
   * The legacy Unicode codepoint used by SoftBank.
   */
  softbank: string | null;

  /**
   * The legacy Unicode codepoint used by Google.
   */
  google: string | null;

  /**
   * The commonly-agreed upon shortcode for the emoji, as supported in Slack,
   * Campfire, GitHub, etc. via :colon_syntax:
   */
  short_name: string;

  /**
   * An array of all known shortcodes.
   */
  short_names: string[];

  /**
   * An emoticon (e.g. `:)`) version of the emoji, or null where none exists.
   */
  text: string | null;

  /**
   * An array of emoticons that should turn into this emoji. Each emoticon
   * will only appear against a single emoji entry.
   */
  texts: string[] | null;

  /**
   * Category group name,
   */
  category: string;

  /**
   * Sub-category group name.
   */
  sub_category: string;

  /**
   * Global sorting index for all emoji, based on Unicode CLDR ordering.
   */
  sort_order: number;

  /**
   * For emojis with multiple skin tone variations, a list of alternative glyphs,
   * keyed by the skin tone. 
   * 
   * For emojis that support multiple skin tones within a single emoji, 
   * each skin tone is separated by a dash character.
   */
  skin_variations: Record<string, PartialEmojiData>;

  /**
   * Emojis that are no longer used, in preference of gendered versions.
   */
  obsoletes?: string;

  /**
   * Emoji that are no longer used, in preference of gendered versions.
   */
  obsoleted_by?: string;
}
