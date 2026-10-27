/* ============================================================
   ★ CONFIGURATION — seul bloc à modifier pour compléter le site ★
   Laissez une valeur vide tant qu'elle n'est pas confirmée par le propriétaire.
   ============================================================ */
const CONFIG = {
  phoneDisplay: "+229 01 64 62 75 75",
  phoneE164: "+2290164627575",
  phoneConfirmed: false,          // passer à true après confirmation du numéro
  whatsapp: "",                   // numéro officiel, format 229XXXXXXXXXX (sans + ni espaces)
  hoursText: "",                  // ex : "Lun–Dim : 11h00 – 02h00" (laisser vide si non confirmé)
  social: { facebook: "", instagram: "", tiktok: "" },   // URL réelles uniquement
  plusCode: "9JM3+W4J Sèmè-Podji, Bénin"
};

/* Plats DE DÉMONSTRATION — à remplacer par la carte officielle (demo:false, price réel, allergens si fournis). */
const DISHES = [
  { id: "d1", name: "Plat traditionnel d'exemple", cat: "Plats traditionnels", desc: "Exemple de démonstration pour tester la carte.", price: 3000, ok: true, demo: true },
  { id: "d2", name: "Autre plat d'exemple", cat: "Plats traditionnels", desc: "Exemple de démonstration.", price: 3500, ok: true, demo: true },
  { id: "d3", name: "Grillade d'exemple", cat: "Grillades", desc: "Exemple de démonstration.", price: 4500, ok: true, demo: true },
  { id: "d4", name: "Accompagnement d'exemple", cat: "Accompagnements", desc: "Exemple de démonstration.", price: 1000, ok: true, demo: true },
  { id: "d5", name: "Entrée d'exemple", cat: "Entrées", desc: "Exemple de démonstration.", price: 2000, ok: false, demo: true },
  { id: "d6", name: "Boisson d'exemple", cat: "Boissons", desc: "Exemple de démonstration.", price: 800, ok: true, demo: true },
  { id: "d7", name: "Dessert d'exemple", cat: "Desserts", desc: "Exemple de démonstration.", price: 1500, ok: true, demo: true }
];
const CATS = ["Tous", "Plats traditionnels", "Grillades", "Accompagnements", "Entrées", "Boissons", "Desserts"];

/* Avis fournis par le propriétaire — ne pas modifier, ne pas en inventer. */
const REVIEWS = [
  { a: "Promesse Phs", t: "Excellent restaurant. Le lieu est idéal et très chic. La cuisine est savoureuse, le service impeccable et l’ambiance agréable. Je recommande vivement." },
  { a: "Sidi MASSIM-OUALI", t: "C'est un lieu coquet, j'ai aimé. Ils ont tenté de ramener la nature en ville avec le style déco. Félicitations à son promoteur. En plus c'est relaxant. Je recommande ce lieu pour des gens qui ont besoin d'écouter de la bonne mélodie sans trop de bruit." },
  { a: "Gbigbogodo Aubin", t: "Un confort inoubliable, un accueil chaleureux et formidable... C'est juste un paradis sur terre. Je vous conseille vivement ce resto." }
];

/* Galerie : illustrations temporaires (dégradés). Remplacer par { src:"photos/x.jpg", ... } quand les vraies photos arrivent. */
const GALLERY = [
  { c: "Plats et boissons", l: "Illustration — plats", bg: "#1B4D3E,#C9A45C" },
  { c: "Plats et boissons", l: "Illustration — boissons", bg: "#12382D,#8A6B2A" },
  { c: "Cadre intérieur", l: "Illustration — salle", bg: "#0C2820,#2f6b55" },
  { c: "Cadre intérieur", l: "Illustration — décor naturel", bg: "#2f6b55,#E3CB97" },
  { c: "Ambiance", l: "Illustration — soirée", bg: "#202522,#C9A45C" },
  { c: "Espaces de restauration", l: "Illustration — espace repas", bg: "#1B4D3E,#EFE9DA" }
];

/* ---------------- utilitaires ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => new Intl.NumberFormat("fr-FR").format(n).replace(/[\u202f\u00a0]/g, " ") + " FCFA";
const waUrl = text => CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}` : null;
const NO_WA = "Le numéro WhatsApp officiel n'est pas encore configuré : aucun envoi n'a été effectué. Appelez le restaurant.";
const mapsQ = encodeURIComponent(CONFIG.plusCode);
const phoneOk = v => /^(\+|00)?\d{8,15}$/.test(v.replace(/[\s.\-()]/g, ""));

function setErr(input, msg) {
  const e = input.parentElement.querySelector(".err");
  if (e) e.textContent = msg || "";
  input.toggleAttribute("aria-invalid", !!msg);
  if (msg) input.setAttribute("aria-invalid", "true");
  return !msg;
}
const isBot = f => f.elements.website && f.elements.website.value !== "";

/* ---------------- navigation ---------------- */
const burger = $("#burger"), nav = $("#nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  document.body.style.overflow = open ? "hidden" : "";
});
$$("#nav a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }));
document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) burger.click(); });

/* ---------------- contacts, horaires, réseaux ---------------- */
$("#year").textContent = new Date().getFullYear();
$("#phoneLine").textContent = CONFIG.phoneDisplay + (CONFIG.phoneConfirmed ? "" : " (numéro à confirmer)");
$("#footPhone").textContent = CONFIG.phoneDisplay + (CONFIG.phoneConfirmed ? "" : " (à confirmer)");
$("#hoursLine").textContent = CONFIG.hoursText || "Horaires à confirmer. Une indication Google mentionne une fermeture à 02 h 00.";
["#callBtn", "#mCall"].forEach(s => $(s).href = "tel:" + CONFIG.phoneE164);
["#routeBtn", "#mRoute"].forEach(s => $(s).href = "https://www.google.com/maps/dir/?api=1&destination=" + mapsQ);
$("#map").src = "https://www.google.com/maps?q=" + mapsQ + "&output=embed";
const wb = $("#waBtn");
if (CONFIG.whatsapp) { wb.href = waUrl("Bonjour PETRO PALACE,"); wb.target = "_blank"; wb.rel = "noopener"; }
else { wb.setAttribute("aria-disabled", "true"); wb.textContent = "WhatsApp (numéro à confirmer)"; }
const soc = Object.entries(CONFIG.social).filter(([, u]) => u);
if (soc.length) {
  const box = $("#socials"); box.textContent = "";
  soc.forEach(([n, u]) => { const a = document.createElement("a"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.textContent = n[0].toUpperCase() + n.slice(1) + " "; box.append(a); });
}

/* ---------------- avis ---------------- */
REVIEWS.forEach(r => {
  const b = document.createElement("blockquote"), p = document.createElement("p"), f = document.createElement("footer");
  p.textContent = "« " + r.t + " »"; f.textContent = r.a; b.append(p, f); $("#reviews").append(b);
});

/* ---------------- carte et panier ---------------- */
let cat = "Tous", cart = {};
try { cart = JSON.parse(localStorage.getItem("pp-cart") || "{}"); } catch (e) { cart = {}; }
const saveCart = () => { try { localStorage.setItem("pp-cart", JSON.stringify(cart)); } catch (e) {} };

function chips(box, list, current, onPick) {
  box.textContent = "";
  list.forEach(c => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = c; b.setAttribute("aria-pressed", c === current);
    b.onclick = () => onPick(c); box.append(b);
  });
}

function renderDishes() {
  const q = $("#search").value.trim().toLowerCase();
  chips($("#filters"), CATS, cat, c => { cat = c; renderDishes(); });
  const box = $("#dishes"); box.textContent = "";
  const list = DISHES.filter(d => (cat === "Tous" || d.cat === cat) && (d.name + " " + d.desc).toLowerCase().includes(q));
  if (!list.length) { box.textContent = "Aucun plat ne correspond à votre recherche."; return; }
  list.forEach(d => {
    const el = document.createElement("article"); el.className = "dish" + (d.ok ? "" : " unavail");
    const ph = document.createElement("div"); ph.className = "ph";
    if (d.demo) { const t = document.createElement("span"); t.className = "tag"; t.textContent = "Exemple de démonstration"; ph.append(t); }
    const body = document.createElement("div"); body.className = "body";
    const c = document.createElement("span"); c.className = "cat"; c.textContent = d.cat;
    const h = document.createElement("h3"); h.textContent = d.name;
    const p = document.createElement("p"); p.textContent = d.desc;
    const row = document.createElement("div"); row.className = "row";
    const pr = document.createElement("span"); pr.className = "price"; pr.textContent = d.price == null ? "Prix à confirmer" : fmt(d.price) + (d.demo ? " (démo)" : "");
    const btn = document.createElement("button"); btn.type = "button"; btn.className = "btn btn-dark";
    btn.textContent = d.ok && d.price != null ? "Ajouter à ma commande" : "Indisponible";
    btn.disabled = !d.ok || d.price == null;
    btn.onclick = () => { cart[d.id] = (cart[d.id] || 0) + 1; saveCart(); renderCart(); };
    row.append(pr, btn); body.append(c, h, p, row); el.append(ph, body); box.append(el);
  });
}
$("#search").addEventListener("input", renderDishes);

function cartLines() {
  return Object.entries(cart).map(([id, q]) => ({ d: DISHES.find(x => x.id === id), q })).filter(l => l.d && l.q > 0);
}
function renderCart() {
  const ul = $("#cart"); ul.textContent = "";
  const lines = cartLines(); let total = 0, count = 0;
  if (!lines.length) { const li = document.createElement("li"); li.textContent = "Votre panier est vide. Ajoutez des plats depuis la carte."; ul.append(li); }
  lines.forEach(({ d, q }) => {
    total += d.price * q; count += q;
    const li = document.createElement("li");
    const nm = document.createElement("span"); nm.className = "nm"; nm.textContent = d.name + " — " + fmt(d.price);
    const qty = document.createElement("span"); qty.className = "qty";
    const mk = (txt, label, delta) => { const b = document.createElement("button"); b.type = "button"; b.textContent = txt; b.setAttribute("aria-label", label + " " + d.name);
      b.onclick = () => { cart[d.id] = Math.max(0, (cart[d.id] || 0) + delta); if (!cart[d.id]) delete cart[d.id]; saveCart(); renderCart(); }; return b; };
    const n = document.createElement("span"); n.textContent = q;
    qty.append(mk("−", "Retirer un", -1), n, mk("+", "Ajouter un", 1)); li.append(nm, qty); ul.append(li);
  });
  $("#total").textContent = fmt(total);
  const bd = $("#badge"); bd.textContent = count; bd.hidden = !count;
}

const of = $("#orderForm");
$$("input[name=mode]", of).forEach(r => r.addEventListener("change", () => { $("#addrRow").hidden = of.elements.mode.value !== "Livraison"; }));
of.addEventListener("submit", e => {
  e.preventDefault(); const st = $("#orderStatus"); st.textContent = "";
  if (isBot(of)) return;
  const f = of.elements, lines = cartLines();
  let ok = setErr(f.name, f.name.value.trim().length < 2 ? "Indiquez votre nom." : "");
  ok = setErr(f.phone, phoneOk(f.phone.value) ? "" : "Numéro invalide, ex : +229 01 64 00 00 00.") && ok;
  const delivery = f.mode.value === "Livraison";
  ok = setErr(f.address, delivery && f.address.value.trim().length < 5 ? "Indiquez l'adresse de livraison." : "") && ok;
  if (!lines.length) { st.textContent = "Votre panier est vide."; ok = false; }
  if (!ok) return;
  const total = lines.reduce((s, l) => s + l.d.price * l.q, 0);
  const msg = ["Bonjour PETRO PALACE, je souhaite passer commande :", ...lines.map(l => `• ${l.q} × ${l.d.name} (${fmt(l.d.price * l.q)})`),
    `Sous-total : ${fmt(total)} (frais de livraison éventuels à confirmer)`, `Mode : ${f.mode.value}`, delivery ? `Adresse : ${f.address.value.trim()}` : "",
    `Nom : ${f.name.value.trim()}`, `Téléphone : ${f.phone.value.trim()}`, f.notes.value.trim() ? `Observations : ${f.notes.value.trim()}` : "",
    "(Commande non confirmée tant que le restaurant n'a pas répondu.)"].filter(Boolean).join("\n");
  const url = waUrl(msg);
  if (!url) { st.textContent = NO_WA; return; }
  window.open(url, "_blank", "noopener");
  st.textContent = "WhatsApp s'ouvre avec votre commande. Elle n'est pas confirmée tant que le restaurant ne vous a pas répondu.";
});

/* ---------------- réservation ---------------- */
const rf = $("#resForm"), today = new Date(); today.setHours(0, 0, 0, 0);
rf.elements.date.min = new Date(today - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
rf.addEventListener("submit", e => {
  e.preventDefault(); const f = rf.elements, box = $("#resSummary"); box.hidden = true;
  if (isBot(rf)) return;
  let ok = setErr(f.name, f.name.value.trim().length < 2 ? "Indiquez votre nom." : "");
  ok = setErr(f.phone, phoneOk(f.phone.value) ? "" : "Numéro invalide, ex : +229 01 64 00 00 00.") && ok;
  ok = setErr(f.date, !f.date.value ? "Choisissez une date." : new Date(f.date.value + "T00:00") < today ? "La date ne peut pas être passée." : "") && ok;
  ok = setErr(f.time, f.time.value ? "" : "Choisissez une heure.") && ok;
  const g = +f.guests.value;
  ok = setErr(f.guests, Number.isInteger(g) && g >= 1 && g <= 30 ? "" : "Entre 1 et 30 personnes (au-delà, appelez-nous).") && ok;
  if (!ok) return;
  const d = new Date(f.date.value + "T00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const msg = `Bonjour PETRO PALACE, demande de réservation :\nNom : ${f.name.value.trim()}\nTéléphone : ${f.phone.value.trim()}\nDate : ${d}\nHeure : ${f.time.value}\nPersonnes : ${g}` + (f.note.value.trim() ? `\nDemande : ${f.note.value.trim()}` : "");
  box.textContent = "";
  const st = document.createElement("span"); st.className = "state"; st.textContent = "Demande prête — en attente d'envoi et de confirmation";
  const pre = document.createElement("pre"); pre.textContent = msg;
  const note = document.createElement("p"); note.className = "small"; note.textContent = "Votre table n'est réservée que lorsque le restaurant vous confirme la demande.";
  box.append(st, pre, note);
  const url = waUrl(msg);
  if (url) { const a = document.createElement("a"); a.className = "btn btn-gold"; a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Envoyer par WhatsApp"; box.append(a); }
  else { const p = document.createElement("p"); p.textContent = NO_WA; box.append(p); }
  box.hidden = false; box.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* ---------------- contact ---------------- */
const cf = $("#contactForm");
cf.addEventListener("submit", e => {
  e.preventDefault(); const f = cf.elements, st = $("#contactStatus"); st.textContent = "";
  if (isBot(cf)) return;
  let ok = setErr(f.name, f.name.value.trim().length < 2 ? "Indiquez votre nom." : "");
  ok = setErr(f.message, f.message.value.trim().length < 10 ? "Message trop court (10 caractères minimum)." : "") && ok;
  if (!ok) return;
  const url = waUrl(`Message de ${f.name.value.trim()} :\n${f.message.value.trim()}`);
  if (!url) { st.textContent = NO_WA; return; }
  window.open(url, "_blank", "noopener"); st.textContent = "WhatsApp s'ouvre avec votre message. Il n'est envoyé qu'une fois validé dans WhatsApp.";
});

/* ---------------- galerie et lightbox ---------------- */
let gcat = "Tous", shown = [], idx = 0;
const grad = bg => `linear-gradient(135deg,${bg.split(",")[0]},${bg.split(",")[1]})`;
function renderGallery() {
  chips($("#gfilters"), ["Tous", ...new Set(GALLERY.map(g => g.c))], gcat, c => { gcat = c; renderGallery(); });
  const box = $("#gallery"); box.textContent = ""; shown = GALLERY.filter(g => gcat === "Tous" || g.c === gcat);
  shown.forEach((g, i) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "g"; b.style.background = grad(g.bg);
    b.textContent = g.l; b.setAttribute("aria-label", "Agrandir : " + g.l); b.onclick = () => openLb(i); box.append(b);
  });
}
const lb = $("#lightbox"), fig = $("#lbFig");
function showLb() { const g = shown[idx]; fig.style.background = grad(g.bg); fig.textContent = g.l + " (illustration temporaire)"; fig.classList.remove("zoom"); }
function openLb(i) { idx = i; showLb(); lb.hidden = false; $("#lbClose").focus(); }
const step = d => { idx = (idx + d + shown.length) % shown.length; showLb(); };
$("#lbPrev").onclick = () => step(-1); $("#lbNext").onclick = () => step(1);
$("#lbClose").onclick = () => { lb.hidden = true; };
fig.onclick = () => fig.classList.toggle("zoom");
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1);
});

renderDishes(); renderCart(); renderGallery();
