import {
  getColors,
  layout,
  radius,
  shadow,
  spacing,
  typography,
  type ColorScheme,
  type ThemeColors,
} from '@take-home/shared';
import { useColorScheme, type TextStyle } from 'react-native';

export interface Theme {
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  layout: typeof layout;
  /** Typography tokens as ready-to-spread React Native text styles. */
  text: Record<keyof typeof typography, TextStyle>;
  /** Card elevation as React Native shadow + Android elevation props. */
  cardShadow: {
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
    elevation: number;
  };
}

/**
 * Resolves the shared design tokens for the current OS color scheme.
 * This is the mobile counterpart of `web/src/theme/apply-theme.ts`.
 */
export function useTheme(): Theme {
  const scheme: ColorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  const text = Object.fromEntries(
    Object.entries(typography).map(([key, style]) => [
      key,
      {
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        fontWeight: style.fontWeight,
        letterSpacing: 'letterSpacing' in style ? style.letterSpacing : undefined,
      } satisfies TextStyle,
    ]),
  ) as Theme['text'];

  return {
    scheme,
    colors: getColors(scheme),
    spacing,
    radius,
    layout,
    text,
    cardShadow: {
      shadowColor: shadow.card.color,
      shadowOpacity: shadow.card.opacity,
      shadowRadius: shadow.card.radius,
      shadowOffset: { width: 0, height: shadow.card.offsetY },
      elevation: 2,
    },
  };
}
