/**
 * Design tokens shared by web and mobile.
 *
 * Values are plain numbers / strings so they can be consumed by React Native
 * `StyleSheet` directly and turned into CSS custom properties for the web
 * (see `css-variables.ts`). Changing a value here changes both apps.
 */

export type ColorScheme = 'light' | 'dark';

// ─── BRAND PALETTE ──────────────────────────────────────────
export const palette = {
  primary: '#2F6BFF',
  primaryPressed: '#2457D6',
  primarySoft: 'rgba(47, 107, 255, 0.12)',
  success: '#2BA86B',
  warning: '#E0871F',
  danger: '#E04848',
  star: '#F5A623',
} as const;

// ─── SEMANTIC SURFACE / TEXT COLORS ─────────────────────────
export const lightColors = {
  background: '#F5F6F8',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E2E5EA',
  borderFocus: palette.primary,

  text: '#14161A',
  textSecondary: '#5C6470',
  textTertiary: '#8A929E',
  textOnPrimary: '#FFFFFF',
  placeholder: '#9AA1AC',

  chip: '#FFFFFF',
  chipBorder: '#D9DDE3',
  chipText: '#14161A',
  chipSelected: palette.primary,
  chipSelectedText: '#FFFFFF',

  badge: '#EEF1F5',
  badgeText: '#5C6470',

  primary: palette.primary,
  primaryPressed: palette.primaryPressed,
  primarySoft: palette.primarySoft,
  success: palette.success,
  warning: palette.warning,
  danger: palette.danger,
  star: palette.star,
} as const;

export const darkColors: ThemeColors = {
  background: '#0B0D10',
  surface: '#15181D',
  surfaceElevated: '#1C2026',
  border: '#262B33',
  borderFocus: '#5B8CFF',

  text: '#ECEEF1',
  textSecondary: '#A3AAB5',
  textTertiary: '#6F7784',
  textOnPrimary: '#FFFFFF',
  placeholder: '#6F7784',

  chip: '#15181D',
  chipBorder: '#2E343D',
  chipText: '#ECEEF1',
  chipSelected: '#5B8CFF',
  chipSelectedText: '#0B0D10',

  badge: '#22272E',
  badgeText: '#A3AAB5',

  primary: '#5B8CFF',
  primaryPressed: '#7AA1FF',
  primarySoft: 'rgba(91, 140, 255, 0.16)',
  success: '#3FC57F',
  warning: '#F0A04B',
  danger: '#F06565',
  star: '#F7B84B',
};

export type ThemeColors = { -readonly [K in keyof typeof lightColors]: string };

export function getColors(scheme: ColorScheme | null | undefined): ThemeColors {
  return scheme === 'dark' ? darkColors : lightColors;
}

// ─── SPACING (4pt grid) ─────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// ─── RADII ──────────────────────────────────────────────────
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

// ─── TYPOGRAPHY ─────────────────────────────────────────────
// Font family is intentionally NOT a token: each platform uses its system
// font stack (San Francisco / Roboto / Segoe) for a native feel.
export type FontWeight = '400' | '500' | '600' | '700';

export interface TextStyleToken {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeight;
  letterSpacing?: number;
}

export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.4 },
  heading: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 21, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 21, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.2 },
} as const satisfies Record<string, TextStyleToken>;

// ─── LAYOUT ─────────────────────────────────────────────────
export const layout = {
  /** Max width of the page content on wide screens. */
  maxContentWidth: 1040,
  /** Minimum card width before the grid drops a column. */
  cardMinWidth: 240,
  /** Minimum tap/click target size. */
  touchTarget: 44,
  inputHeight: 44,
  chipHeight: 36,
} as const;

// ─── ELEVATION ──────────────────────────────────────────────
export const shadow = {
  card: {
    color: '#000000',
    opacity: 0.06,
    radius: 8,
    offsetY: 2,
  },
} as const;

export const tokens = {
  palette,
  lightColors,
  darkColors,
  spacing,
  radius,
  typography,
  layout,
  shadow,
};
export type Tokens = typeof tokens;
