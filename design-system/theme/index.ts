// Design system theme - TheraForge-inspired unified styling

import { colors, urgencyColors, statusColors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
  colors,
  urgencyColors,
  statusColors,
  typography,
  textStyles,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

// Export individual modules for convenience
export * from './colors';
export * from './typography';
export * from './spacing';
