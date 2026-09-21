import { FloatingDevTools } from '@buoy-gg/core';
import { useExternalSync, useExternalSyncSocket } from '@buoy-gg/external-sync';
import { LicenseManager, useLicense } from '@buoy-gg/license';
import { reactQueryToolPreset, useReactQuerySyncAdapter } from '@buoy-gg/react-query';
import { useEffect } from 'react';

// The Query tool has no web preset yet; hand the native one to the web dial.
// Its React Native UI renders through react-native-web (see vite.config.ts).
// Native icons take a render context and read `size` from it; the web dial passes a number.
const queryTool = {
  ...reactQueryToolPreset,
  icon: (size: number) =>
    reactQueryToolPreset.icon({ size, slot: 'dial' } as Parameters<typeof reactQueryToolPreset.icon>[0]),
};

/**
 * One id per browser tab, like Buoy's own web identity: `sessionStorage` so two
 * tabs show up in Desktop as two devices instead of colliding on one id.
 */
function getDeviceId(): string {
  const key = 'buoy-device-id';
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const id = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return 'web';
  }
}

const deviceId = getDeviceId();
const deviceName = `take-home web (${deviceId.slice(-4)})`;

/**
 * Device → Buoy Desktop bridge. Core's web `FloatingDevTools` doesn't mount
 * external sync ("Desktop sync is native-only"), so this is the same wiring
 * core's native `AutoExternalSync` does, using external-sync's public hooks:
 * open the broker socket, announce the Query tool's sync adapter, and report
 * the license tier so Desktop can adopt the key. The broker defaults to
 * Desktop on this machine (localhost:42831); set VITE_BUOY_SOCKET_URL otherwise.
 */
function DesktopSync() {
  const query = useReactQuerySyncAdapter();
  const { isPro, tier } = useLicense();
  const { socket } = useExternalSyncSocket({
    deviceName,
    socketURL: import.meta.env.VITE_BUOY_SOCKET_URL,
    persistentDeviceId: deviceId,
    platform: 'web',
  });

  // The license validates asynchronously, usually after the handshake, so the
  // tier is sent as an event whenever it resolves and on every (re)connect.
  useEffect(() => {
    if (!socket) return;
    const emitLicense = () => {
      if (!LicenseManager.hasAccountAccess() || !socket.connected) return;
      socket.emit('device-license', { isPro: isPro ? '1' : '0', tier: tier ?? (isPro ? 'pro' : 'free') });
    };
    if (socket.connected) emitLicense();
    socket.on('connect', emitLicense);
    return () => {
      socket.off('connect', emitLicense);
    };
  }, [socket, isPro, tier]);

  useExternalSync({ tools: query ? { query } : {}, socket, deviceId });
  return null;
}

/**
 * Buoy's floating dev menu, same as mobile, plus the Desktop bridge. Loaded
 * only in development via a dynamic import in `main.tsx`, so none of this (or
 * react-native-web) reaches the production bundle. The Query tool and its sync
 * adapter read the QueryClient from context, so this must render inside
 * `QueryClientProvider`.
 */
export default function DevTools() {
  return (
    <>
      <FloatingDevTools licenseKey={import.meta.env.VITE_BUOY_KEY} apps={[queryTool]} />
      <DesktopSync />
    </>
  );
}
