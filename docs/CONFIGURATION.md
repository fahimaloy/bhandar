# Configuration Guide — Bhandar

## Storage
Config is stored in `browser.storage.local` under keys `sections` and `settings`.

## Sections
Each section: `{ id, name, dir, exts[] }`. Default presets cannot be deleted. Custom sections can be added.

## Settings
- `showModal`: boolean. When true, a modal appears on each download.

## Directories
Directories are relative to the default Downloads folder (browser security). Use names like `Pictures`, `Videos`, `Documents`. Custom folders are auto-created by the browser.