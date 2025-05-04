/**
 * SVG path data for common icons used in the menu
 * Storing these in a separate file makes them easier to manage and reuse
 */
export const SVG_PATHS: Record<string, string> = {
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  chevron: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z',
  question: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z'
};

/**
 * Mapping from icon name aliases to their canonical names
 * This allows using different names for the same icon
 */
export const ICON_ALIASES: Record<string, string> = {
  'bars': 'menu',
  'hamburger': 'menu',
  'arrow-left': 'back',
  'chevron-right': 'chevron',
  'right': 'chevron'
};