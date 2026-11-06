# Installation Guide — Bhandar

## Firefox / Zen Browser
1. Download `bhandar-0.1.0.zip` from releases (or build locally).
2. Open `about:debugging` → "This Firefox" → "Load Temporary Add-on".
3. Select `manifest.json` from the project folder.
4. The sidebar appears under View → Sidebar → Bhandar.

## Chrome / Edge
1. Open `chrome://extensions`, enable Developer mode.
2. Click "Load unpacked" and select the project folder (use `manifest.chrome.json` renamed to `manifest.json`).
3. Pin the extension and open the popup.

## Android Firefox
1. Use Firefox Nightly or Fennec with extension support.
2. Install via `about:debugging` over USB, or sideload the .xpi.
3. Use the popup for permission toggles (sidebar not available on Android).

## Build from source
```bash
npm install
npm test
web-ext build
```