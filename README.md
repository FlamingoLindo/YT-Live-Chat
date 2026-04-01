# YT-Live-Chat

YT-Live-Chat is an Expo and React Native app for monitoring YouTube live chat in a clean mobile interface.

It is designed for creators and moderators who want a dedicated chat view with stream preview controls, user role badges, and localization support.

<https://github.com/user-attachments/assets/ed4b5e08-1124-44f7-8dae-62f1a2f0efe9>

## Features

- Live chat timeline with auto-scroll behavior
- Stream preview toggle via embedded WebView
- Viewer count and header summary
- User role indicators for owners, moderators, sponsors, and verified users
- Context menu actions for quick moderation flows
- Localization support for `en` and `pt_br` with `i18next` and `react-i18next`
- Light and dark mode-aware styling

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- Expo Router
- `i18next` and `react-i18next`
- `react-native-webview`

## Project Structure

```text
app/
  _layout.tsx      # App shell and router layout
  index.tsx        # Main live chat screen
  (mods)/          # Moderator-related routes
  (super)/         # Super chat routes
components/
  ContextMenu/     # Stream toggle and menu actions
  Header/          # Top summary bar
  MessageCard/     # Single chat message renderer
  UserCard/        # User details and message grouping
consts/
  colors.ts        # Shared color palette
hooks/
  useTheme.ts      # Theme helpers
i18n/
  index.ts         # i18n initialization
  locales/
    en.json
    pt_br.json
services/
  yt.ts            # YouTube API integration
  dto/             # Data transfer objects
assets/
  images/
  tutorial/
```

## Localization

Translations are stored in `i18n/locales`.

- `en.json` for English
- `pt_br.json` for Brazilian Portuguese

## Notes

- Ban and moderators list features are not available yet because they require OAuth2-authenticated access.
- Messages are not rendered in real time. The app polls the API at intervals, so new messages may arrive in batches.

## Setup

1. Create your own `.env` file based on the `.examaple.env` file in the project root.
2. Install dependencies with `npm install`.
3. Set `EXPO_PUBLIC_API_URL` to a YouTube channel ID source, such as [Views4You](https://views4you.com/tools/youtube-channel-id-finder/?url=%40nasa).
4. Get a YouTube API key:
   1. Open the [Google Cloud Console](https://console.cloud.google.com/welcome?project=maximal-airfoil-473001-n9) and select API and Services.
   2. Open the Library page.
   3. Search for YouTube and select YouTube Data API v3.
   4. Enable the API.
   5. Open the Credentials tab and create an API key.
   6. Give the key a name, select the YouTube API, and create it.
5. Start the app with  `npx expo start`.

## Tutorial Images

1. API and Services: ![API and Services](/assets/tutorial/1.png)
2. Library: ![Library](/assets/tutorial/2.png)
3. YouTube Data API v3: ![YouTube Data API v3](/assets/tutorial/3.png)
4. Enable API: ![Enable API](/assets/tutorial/4.png)
5. Create credentials: ![Create credentials](/assets/tutorial/5.png)
6. Create API key: ![Create API key](/assets/tutorial/6.png)
