import { getColors, themeToCssVariables, type ColorScheme } from '@take-home/shared';
import { useEffect } from 'react';

const DARK_QUERY = '(prefers-color-scheme: dark)';

export function getSystemColorScheme(): ColorScheme {
  return window.matchMedia?.(DARK_QUERY).matches ? 'dark' : 'light';
}

/**
 * Writes the shared design tokens onto `<html>` as CSS custom properties.
 * All component CSS reads `var(--color-*)`, `var(--space-*)` etc., so this is
 * the single bridge between the token file and the web styling.
 */
export function applyTheme(scheme: ColorScheme): void {
  const root = document.documentElement;
  const vars = themeToCssVariables(getColors(scheme));
  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }
  root.dataset['theme'] = scheme;
}

/** Re-applies the theme when the OS light/dark preference changes. */
export function useSystemTheme(): void {
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => applyTheme(getSystemColorScheme());
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
}
