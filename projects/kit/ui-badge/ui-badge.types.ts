export type Badge = string | number | undefined | null;
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgePosition =
  | 'above after'
  | 'above before'
  | 'below before'
  | 'below after'
  | 'before'
  | 'after'
  | 'above'
  | 'below';