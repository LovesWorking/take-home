import { colors, layout, radius, shadow, spacing, typography } from './tokens';

/**
 * Flattens the design tokens into CSS custom properties so the web app can
 * style with `var(--color-primary)`, `var(--space-md)`, etc.
 *
 * Naming: `--color-*`, `--space-*`, `--radius-*`, `--font-*-{size,line,weight,tracking}`, `--layout-*`.
 */
export function tokensToCssVariables(): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(colors)) {
    vars[`--color-${toKebab(key)}`] = value;
  }
  for (const [key, value] of Object.entries(spacing)) {
    vars[`--space-${key}`] = `${value}px`;
  }
  for (const [key, value] of Object.entries(radius)) {
    vars[`--radius-${key}`] = `${value}px`;
  }
  for (const [key, style] of Object.entries(typography)) {
    const name = toKebab(key);
    vars[`--font-${name}-size`] = `${style.fontSize}px`;
    vars[`--font-${name}-line`] = `${style.lineHeight}px`;
    vars[`--font-${name}-weight`] = style.fontWeight;
    vars[`--font-${name}-tracking`] = `${'letterSpacing' in style ? style.letterSpacing : 0}px`;
  }
  for (const [key, value] of Object.entries(layout)) {
    vars[`--layout-${toKebab(key)}`] = `${value}px`;
  }

  const { offsetY, radius: blur, color, opacity } = shadow.card;
  vars['--shadow-card'] = `0 ${offsetY}px ${blur}px ${hexToRgba(color, opacity)}`;

  return vars;
}

function toKebab(input: string): string {
  return input.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
