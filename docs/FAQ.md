# FAQ — Bhandar

**Q: Does it work on Chrome?**
A: Yes, use `manifest.chrome.json` (rename to `manifest.json`).

**Q: Why isn't my file sorted?**
A: `onDeterminingFilename` requires Firefox/Zen 128+. The system sorter service (if installed) handles fallback. Also check the extension is enabled.

**Q: Can I sort into arbitrary folders?**
A: Only subfolders of the default Downloads directory (browser security). Use the directory field per section.

**Q: How do I add a custom section?**
A: Use the "Add section" button in the sidebar (planned). For now, edit storage via the browser console.

**Q: Is it safe?**
A: Yes, no network permissions, no analytics, all data stays local.