import { Shortcode } from "./types";

export const variant = Shortcode.COMMON; // use Shortcode.DISCORD if you want Discord shortcodes, e.g :flag_es: vs :flag-es:

/**
 * A list of alternative shortcodes to use.
 * 
 * The key is the old shortcode, and the value is the replacement.
 */
export const replacements: Record<string, string> = {
};

/**
 * List of processes to disable shortcodes for if its window is active.
 */
export const disabledProcesses = [
  "Discord.exe",
  "slack.exe",
].map(m => `#IfWinNotActive, ahk_exe ${m}`);
