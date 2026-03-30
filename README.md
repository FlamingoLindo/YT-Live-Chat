# YT-Live-Chat

YT-Live-Chat is an Expo + React Native app focused on monitoring YouTube live chat in a clean mobile interface.

It is designed for creators and moderators who want a dedicated chat view with stream preview controls, user role badges, and localization support.

<https://github.com/user-attachments/assets/ed4b5e08-1124-44f7-8dae-62f1a2f0efe9>

## Features

- Live chat timeline with auto-scroll behavior
- Stream preview toggle via embedded WebView
- Viewer count and header summary
- User role indicators (owner, moderator, sponsor, verified)
- Context menu actions for quick moderation flows
- Localization support (`en` and `pt_br`) with `i18next` + `react-i18next`
- Light and dark mode-aware styling

## Tech Stack

- Expo SDK 54
- React Native 0.81
- Expo Router (file-based routing)
- TypeScript
- i18next / react-i18next
- react-native-webview

## Project Structure

```text
app/
 _layout.tsx      # App shell and router layout
 index.tsx        # Main live chat screen
components/
 ContextMenu/     # Stream toggle + language/menu actions
 Header/          # Top summary bar
 MessageCard/     # Single chat message renderer
 UserCard/        # User details and message grouping
dto/
 dto.ts           # Stream and message types
i18n/
 index.ts         # i18n initialization
 locales/
  en.json
  pt_br.json
```

## Localization

Translations are stored in `i18n/locales`.

- `en.json` for English
- `pt_br.json` for Brazilian Portuguese

## Notes

- The app currently uses a stream id in `app/index.tsx` (`STREAM_ID`) for preview behavior.
- Message and stream data contracts are defined in `dto/dto.ts`.
- There are still many features to be added.
