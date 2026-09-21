/**
 * Design tokens shared by web and mobile.
 *
 * Plain numbers / strings so React Native `StyleSheet` can use them directly
 * and the web can turn them into CSS custom properties (see `css-variables.ts`).
 * Changing a value here changes both apps.
 */

// ─── COLORS ─────────────────────────────────────────────────
export const colors = {
  background: '#F5F6F8',
  surface: '#FFFFFF',
  border: '#E2E5EA',
  borderFocus: '#2F6BFF',

  text: '#14161A',
  textSecondary: '#5C6470',
  textTertiary: '#8A929E',
  textOnPrimary: '#FFFFFF',
  placeholder: '#9AA1AC',

  chip: '#FFFFFF',
  chipBorder: '#D9DDE3',
  chipText: '#14161A',
  chipSelected: '#2F6BFF',
  chipSelectedText: '#FFFFFF',

  badge: '#EEF1F5',
  badgeText: '#5C6470',

  primary: '#2F6BFF',
  primaryPressed: '#2457D6',
  primarySoft: 'rgba(47, 107, 255, 0.12)',
  danger: '#E04848',
  star: '#F5A623',
} as const;

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
// font stack for a native feel. The shapes below spread straight into a
// React Native `TextStyle`.
export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.4 },
  heading: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 21, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.2 },
} as const;

// ─── LAYOUT ─────────────────────────────────────────────────
export const layout = {
  /** Max width of the page content on wide screens (web). */
  maxContentWidth: 1040,
  /** Minimum card width before the grid drops a column (web). */
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
