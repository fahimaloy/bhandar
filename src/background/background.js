// background.js
const DEFAULT_SECTIONS = [
  { id: "images", name: "Images", dir: "Pictures", exts: ["jpg","jpeg","png","webp","svg","bmp"] },
  { id: "videos", name: "Videos", dir: "Videos", exts: ["mp4","mkv","avi","mov","webm"] },
  { id: "music", name: "Music", dir: "Music", exts: ["mp3","flac","wav","ogg","m4a"] },
  { id: "gif", name: "GIF", dir: "Videos", exts: ["gif"] },
  { id: "documents", name: "Documents", dir: "Documents", exts: ["pdf","doc","docx","txt","md","epub"] }
];

async function getSections() {
  const { sections } = await browser.storage.local.get("sections");
  return sections || DEFAULT_SECTIONS;
}

async function getSettings() {
  const { settings } = await browser.storage.local.get("settings");
  return settings || { showModal: false };
}

browser.downloads.onDeterminingFilename.addListener(async (item, suggest) => {
  const sections = await getSections();
  const settings = await getSettings();
  const name = item.filename || "";
  const ext = name.split(".").pop().toLowerCase();
  let targetSection = sections.find(s => s.exts.includes(ext));
  if (!targetSection) {
    suggest();
    return;
  }
  if (settings.showModal) {
    // show modal via sidebar message; for now auto
  }
  const base = name.split("/").pop();
  suggest({ filename: targetSection.dir + "/" + base, conflictAction: "uniquify" });
});
EOF