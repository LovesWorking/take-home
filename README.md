# Take Home

A minimal TypeScript Expo app with one screen displaying **Hello World**. Uses `expo-dev-client` for development builds and strict TypeScript checking.

Uses Expo SDK 55 to support the installed Xcode 26.2. Expo SDK 56 and 57 require Xcode 26.4 or newer.

## Run locally

```sh
npm install
npm run ios
# or
npm run android
```

The first run generates the native project, builds and installs the development client, and starts Metro. iOS requires Xcode and an iOS simulator; Android requires Android Studio and an emulator or connected device.

After installing the development build, start subsequent development sessions with:

```sh
npm start
```

Open the installed development build. Edit `App.tsx` to change the home screen. Run `npm run typecheck` to check TypeScript. Rebuild with `npm run ios` or `npm run android` after adding native dependencies or changing native configuration. Generated `ios/` and `android/` folders are ignored by Git.

## Expo documentation

- [Blank template](https://docs.expo.dev/more/create-expo/)
- [TypeScript setup](https://docs.expo.dev/guides/typescript/)
- [Local development builds](https://docs.expo.dev/guides/local-app-development/)
- [Development client](https://docs.expo.dev/versions/latest/sdk/dev-client/)
