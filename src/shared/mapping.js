export const DEFAULT_SECTIONS = [
  { id:"images", name:"Images", dir:"Pictures", exts:["jpg","jpeg","png","webp","svg"] },
  { id:"videos", name:"Videos", dir:"Videos", exts:["mp4","mkv","avi","mov","webm"] },
  { id:"music", name:"Music", dir:"Music", exts:["mp3","flac","wav","ogg","m4a"] },
  { id:"gif", name:"GIF", dir:"Videos", exts:["gif"] },
  { id:"documents", name:"Documents", dir:"Documents", exts:["pdf","doc","docx","txt","md","epub"] }
];
export function findSection(sections, ext) {
  return sections.find(s => s.exts.includes(ext.toLowerCase()));
}