const perms = document.getElementById("perms");
const OPTIONAL = ["notifications"];
async function render() {
  perms.innerHTML = "";
  for (const p of OPTIONAL) {
    const has = await browser.permissions.contains({ permissions: [p] });
    const row = document.createElement("div");
    row.className = "row";
    const span = document.createElement("span");
    span.textContent = p;
    const toggle = document.createElement("div");
    toggle.className = "toggle " + (has ? "on" : "");
    toggle.dataset.p = p;
    row.appendChild(span);
    row.appendChild(toggle);
    row.querySelector(".toggle").addEventListener("click", async (e) => {
      const el = e.currentTarget;
      const granted = el.classList.contains("on");
      if (granted) {
        await browser.permissions.remove({ permissions: [p] });
        el.classList.remove("on");
      } else {
        const ok = await browser.permissions.request({ permissions: [p] });
        if (ok) el.classList.add("on");
      }
    });
    perms.appendChild(row);
  }
}
render();