/**
 * API base URL.
 *
 * Defaults to the local mock server, which works for the web app and the iOS
 * simulator out of the box. A platform can override it once at startup
 * (Android emulator, physical device, deployed backend) via `setApiBaseUrl`.
 */

const DEFAULT_API_URL = 'http://localhost:4000';

let baseUrl = DEFAULT_API_URL;

export function getApiBaseUrl(): string {
  return baseUrl;
}

export function setApiBaseUrl(url: string | undefined): void {
  baseUrl = url?.replace(/\/$/, '') || DEFAULT_API_URL;
}
