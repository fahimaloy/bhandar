const browser = globalThis.browser || globalThis.chrome;
const dashboard = document.getElementById("dashboard");
const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("modal");

let sections = [];
let settings = { showModal: false };

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

async function load() {
  const data = await browser.storage.local.get(["sections","settings"]);
  sections = data.sections || [
    { id:"images", name:"Images", dir:"Pictures", exts:["jpg","jpeg","png","webp","svg"] },
    { id:"videos", name:"Videos", dir:"Videos", exts:["mp4","mkv","avi","mov","webm"] },
    { id:"music", name:"Music", dir:"Music", exts:["mp3","flac","wav","ogg","m4a"] },
    { id:"gif", name:"GIF", dir:"Videos", exts:["gif"] },
    { id:"documents", name:"Documents", dir:"Documents", exts:["pdf","doc","docx","txt","md","epub"] }
  ];
  settings = data.settings || { showModal: false };
  render();
}

let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => browser.storage.local.set({ sections, settings }), 300);
}

function render() {
  dashboard.replaceChildren();
  sections.forEach(sec => {
    const div = document.createElement("div");
    div.className = "section";
    div.dataset.id = sec.id;
    const header = document.createElement("h2");
    header.textContent = sec.name + "  ";
    const small = document.createElement("small");
    small.textContent = "→ " + sec.dir;
    header.appendChild(small);
    const exts = document.createElement("div");
    exts.className = "exts";
    exts.dataset.section = sec.id;
    sec.exts.forEach(e => {
      const card = document.createElement("div");
      card.className = "card";
      card.draggable = true;
      card.tabIndex = 0;
      card.textContent = "." + e;
      card.dataset.ext = e;
      card.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("text/plain", JSON.stringify({ext:e, from:sec.id}));
        card.classList.add("dragging");
      });
      card.addEventListener("dragend", () => card.classList.remove("dragging"));
      exts.appendChild(card);
    });
    exts.addEventListener("dragover", ev => { ev.preventDefault(); exts.classList.add("drop-target"); });
    exts.addEventListener("dragleave", () => exts.classList.remove("drop-target"));
    exts.addEventListener("drop", ev => {
      ev.preventDefault();
      exts.classList.remove("drop-target");
      let data;
      try { data = JSON.parse(ev.dataTransfer.getData("text/plain")); } catch { return; }
      const from = sections.find(s=>s.id===data.from);
      const to = sections.find(s=>s.id===sec.id);
      if (!from || !to || from===to) return;
      from.exts = from.exts.filter(x=>x!==data.ext);
      if (!to.exts.includes(data.ext)) to.exts.push(data.ext);
      save();
      render();
      toast("Moved ." + data.ext + " → " + to.name);
    });
    div.appendChild(header);
    div.appendChild(exts);
    dashboard.appendChild(div);
  });
}

themeToggle.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
});

const saved = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", saved);
themeToggle.textContent = saved === "dark" ? "🌙" : "☀️";

load();