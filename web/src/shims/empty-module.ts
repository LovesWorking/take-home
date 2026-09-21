/**
 * Stand-in for React Native internals that Buoy `require`s behind try/catch
 * (bundle-URL and raw-event lookups). react-native-web doesn't ship them, and
 * both call sites already treat a missing default as "unavailable".
 */
export default null;
