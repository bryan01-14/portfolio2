/* ==========================================================
   Aka Abraham — Portfolio interactions
   ========================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Data ---------- */
const PROJECTS = [
  {
    cat: "ia", label: "IA · Blockchain", featured: true,
    title: "CulturaTrace CI — Traçabilité du tourisme culturel",
    img: "img/culturechain.png",
    short: "Application data-driven et blockchain qui sécurise et promeut le tourisme culturel en Côte d'Ivoire.",
    long: "CulturaTrace CI utilise la blockchain et l'intelligence artificielle pour sécuriser et promouvoir le tourisme culturel ivoirien : billets d'entrée sous forme de NFT, traçabilité des visites, détection de fraudes par IA et mise en valeur des sites patrimoniaux.",
    stack: ["Blockchain", "NFT", "IA", "React", "Node.js"],
    link: "https://github.com/bryan01-14/v0-blockchain-tourism-app"
  },
  {
    cat: "cyber", label: "Cybersécurité",
    title: "Simulation d'une attaque de contrôle à distance avec TheFatRat",
    img: "img/cs.png",
    short: "Comprendre les mécanismes des logiciels malveillants pour mieux s'en protéger.",
    long: "TheFatRat est un outil qui permet de simuler des attaques de contrôle à distance afin de comprendre les mécanismes des logiciels malveillants et les moyens de s'en protéger. Projet mené en environnement de laboratoire isolé, avec analyse des contre-mesures (antivirus, EDR, durcissement, sensibilisation).",
    stack: ["Kali Linux", "TheFatRat", "Metasploit", "Pentest"]
  },
  {
    cat: "ia", label: "IA · RAG",
    title: "Assistant virtuel pour démarches administratives",
    img: "img/virtuel.png",
    short: "Un assistant IA qui guide les citoyens dans leurs démarches grâce au RAG.",
    long: "Application web d'assistant virtuel pour les démarches administratives, avec React.js en frontend et Node.js en backend, reposant sur une implémentation RAG (Retrieval-Augmented Generation) avec LangChain et OpenAI pour fournir des réponses fiables et sourcées.",
    stack: ["React.js", "Node.js", "LangChain", "OpenAI", "RAG"]
  },
  {
    cat: "ia", label: "Machine Learning",
    title: "ManiocIA — Agriculture de précision",
    img: "img/precision.png",
    short: "Prédire la production de manioc et détecter les maladies des plantes.",
    long: "ManiocIA est une application web développée en React et Node.js qui prédit la production de manioc et analyse les maladies des plantes grâce au machine learning — un outil d'aide à la décision pour les agriculteurs.",
    stack: ["Machine Learning", "Python", "React", "Node.js"]
  },
  {
    cat: "ia", label: "Machine Learning",
    title: "Prédiction du cancer du sein",
    img: "img/ml.png",
    short: "Apprentissage supervisé pour la détection à partir d'images.",
    long: "Modèle d'apprentissage supervisé capable de détecter le cancer du sein à partir d'images médicales : préparation des données, entraînement, évaluation des performances et optimisation.",
    stack: ["Python", "Scikit-learn", "Classification"]
  },
  {
    cat: "dev", label: "Mobile", featured: true,
    title: "ExpressMiam — Livraison de repas à Abidjan",
    img: "img/expressmiam3.jpg",
    short: "Commande, géolocalisation, suivi en temps réel et paiement mobile money.",
    long: "Application mobile de livraison de repas rapide à Abidjan : géolocalisation des restaurants à proximité, commande en ligne, suivi de livraison en temps réel et paiement intégré via Orange Money, Wave, MTN Money, Visa ou à la livraison.",
    stack: ["React Native", "Node.js", "Geolocation API", "PAYTECH"],
    gallery: ["img/expressmiam6.jpg", "img/expressmiam4.jpg", "img/expressmiam5.jpg", "img/expressmiam3.jpg", "img/expressmiam2.jpg", "img/expressmiam1.jpg"]
  },
  {
    cat: "dev", label: "Web",
    title: "Gestion de salon de coiffure",
    img: "img/salon.png",
    short: "Trouver et réserver facilement un salon de coiffure.",
    long: "Application web qui permet aux clients de trouver facilement un salon de coiffure et de gérer leurs rendez-vous. Développée en PHP et Laravel.",
    stack: ["PHP", "Laravel", "MySQL"]
  },
  {
    cat: "dev", label: "Web",
    title: "Gestion des notes des étudiants",
    img: "note.png",
    short: "Plateforme de saisie et de consultation des notes.",
    long: "Application web développée en PHP permettant aux enseignants d'ajouter facilement des notes sur une plateforme et aux étudiants de les consulter.",
    stack: ["PHP", "MySQL"]
  }
];

const CERTS = [
  ["img/cssc.png", "Cybersecurity Career Starter (CCSC)", "Académie Hack & Fix"],
  ["img/cs.png", "Cyber Security: OS Security", "Udemy"],
  ["img/cp.png", "MCP for Leaders: Architecting Context-Driven AI", "Udemy"],
  ["img/data.png", "Analyse de données", "Google · Coursera"],
  ["img/bases.png", "Bases de la gestion de projet", "Google · Coursera", "https://www.coursera.org/account/accomplishments/verify/NNSACEWFVMH6"],
  ["img/initiation.png", "Initiation au projet", "Google · Coursera", "https://www.coursera.org/account/accomplishments/verify/PQB6JXMWUB4E"],
  ["img/planicaion.png", "Planification de projet", "Google · Coursera", "https://www.coursera.org/account/accomplishments/verify/2RT8B2UP3JTE"],
  ["img/gestion.png", "Gestion Agile", "Google · Coursera", "https://www.coursera.org/account/accomplishments/verify/KCNH7N20PQ87"],
  ["img/execution.png", "Exécution de projet", "Google · Coursera"],
  ["img/recherche.png", "Recherche documentaire", "École polytechnique (l'X)"],
  ["img/Introduction.png", "Introduction to Computers and Office Productivity Software", "HKUST"],
  ["img/Creative.png", "Creative Problem-Solving", "University of Minnesota"],
  ["img/Creative Thinking.png", "Creative Thinking: Techniques and Tools for Success", "Imperial College London"],
  ["img/apprendre.png", "Apprendre comment apprendre", "Deep Teaching Solutions"],
  ["img/Study.png", "Study Skills for University Success", "UC Irvine"],
  ["img/Writing.png", "Writing Skills for University Success", "UC Irvine"],
  ["img/Speaking.png", "Speaking Skills for University Success", "UC Irvine"],
  ["img/Questions.png", "Questions, Present Progressive and Future Tenses", "UC Irvine"],
  ["certif.jpg", "Certificat de réussite", "Formation"],
  ["special.jpg", "Diplôme spécial", "Formation"]
];

/* ---------- Render projects ---------- */
const grid = $("#projectsGrid");
grid.innerHTML = PROJECTS.map((p, i) => `
  <article class="project reveal ${p.featured ? "featured" : ""}" data-cat="${p.cat}" data-i="${i}" tabindex="0">
    <div class="p-thumb"><span class="p-cat">${p.label}</span><img src="${encodeURI(p.img)}" alt="${p.title}" loading="lazy"></div>
    <div class="p-body">
      <h3>${p.title}</h3>
      <p>${p.short}</p>
      <div class="p-stack">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
      <span class="p-more">Voir le projet <i class="ri-arrow-right-line"></i></span>
    </div>
  </article>`).join("");

/* ---------- Render certs ---------- */
const certGrid = $("#certsGrid");
const SHOW = 8;
certGrid.innerHTML = CERTS.map((c, i) => `
  <div class="cert reveal ${i >= SHOW ? "extra" : ""}" data-i="${i}" ${i >= SHOW ? 'hidden' : ""}>
    <div class="cert-img"><img src="${encodeURI(c[0])}" alt="${c[1]}" loading="lazy"></div>
    <div class="cert-info"><h4>${c[1]}</h4><span>${c[2]}</span></div>
  </div>`).join("") +
  `<button class="btn btn-ghost certs-more" id="certsMore"><i class="ri-add-line"></i> Voir toutes les certifications (${CERTS.length})</button>`;

$("#certsMore").addEventListener("click", e => {
  const extras = $$(".cert.extra");
  const open = extras[0].hidden;
  extras.forEach(el => { el.hidden = !open; if (open) requestAnimationFrame(() => el.classList.add("in")); });
  e.currentTarget.innerHTML = open ? '<i class="ri-subtract-line"></i> Réduire' : `<i class="ri-add-line"></i> Voir toutes les certifications (${CERTS.length})`;
});

/* ---------- Boot ---------- */
window.addEventListener("load", () => {
  setTimeout(() => { $("#boot").classList.add("done"); startTyping(); startTerminal(); }, reduced ? 0 : 1300);
});

/* ---------- Typing roles ---------- */
const ROLES = ["Ingénieur Cybersécurité", "Pentester & Ethical Hacker", "Auditeur des Systèmes d'Information", "Analyste SOC · Microsoft Sentinel", "Machine Learning & GenAI", "Data Engineer en devenir"];
function startTyping() {
  const el = $("#typed");
  if (reduced) { el.textContent = ROLES[0]; return; }
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = ROLES[r];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; r = (r + 1) % ROLES.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

/* ---------- Terminal ---------- */
function startTerminal() {
  const lines = [
    ['<span class="p">$</span> whoami', 0],
    ['aka_abraham', 1],
    ['<span class="p">$</span> cat profil.json', 0],
    ['{ <span class="k">"rôle"</span>: <span class="v">"Ingénieur cyber & IA"</span>,', 1],
    ['  <span class="k">"école"</span>: <span class="v">"ESATIC"</span>,', 1],
    ['  <span class="k">"stages"</span>: [<span class="v">"Orange CI"</span>, <span class="v">"OSEP"</span>] }', 1],
    ['<span class="p">$</span> nmap --motivation abraham', 0],
    ['PORT     STATE  SERVICE', 1],
    ['443/tcp  <span class="p">open</span>   opportunités', 1]
  ];
  const term = $("#term");
  let i = 0;
  (function next() {
    if (i >= lines.length) return;
    term.innerHTML += lines[i][0] + "\n";
    i++;
    setTimeout(next, lines[i - 1][1] ? 180 : 650);
  })();
}

/* ---------- Network canvas ---------- */
(function net() {
  const cv = $("#net"), ctx = cv.getContext("2d");
  let w, h, pts = [], mouse = { x: -999, y: -999 };
  const DPR = Math.min(devicePixelRatio || 1, 2);
  function size() {
    w = innerWidth; h = innerHeight;
    cv.width = w * DPR; cv.height = h * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.min(90, Math.floor(w * h / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
  }
  size(); addEventListener("resize", size);
  addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) { ctx.strokeStyle = `rgba(77,216,255,${(1 - d / 130) * .18})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 180) { ctx.strokeStyle = `rgba(57,255,159,${(1 - md / 180) * .5})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      ctx.fillStyle = md < 180 ? "rgba(57,255,159,.9)" : "rgba(140,170,220,.5)";
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduced) requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- Cursor glow ---------- */
const glow = $("#glow");
if (matchMedia("(pointer:fine)").matches) {
  addEventListener("mousemove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
} else glow.remove();

/* ---------- Scroll: progress, nav, to-top, active link ---------- */
const nav = $("#nav"), prog = $("#progress"), toTop = $("#toTop");
const sections = $$("main section[id]");
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (y / max * 100) + "%";
  nav.classList.toggle("scrolled", y > 30);
  toTop.classList.toggle("show", y > 700);
  let cur = "";
  sections.forEach(s => { if (y >= s.offsetTop - 160) cur = s.id; });
  $$(".nav-links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur && !a.classList.contains("nav-cta")));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- Mobile menu ---------- */
const burger = $("#burger"), links = $("#navLinks");
burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
$$("a", links).forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); links.classList.remove("open"); }));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });

/* ---------- Counters ---------- */
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
    let t0 = null;
    const step = ts => { t0 ??= ts; const k = Math.min((ts - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); cio.unobserve(el);
  });
}, { threshold: .6 });
$$("[data-count]").forEach(el => cio.observe(el));

/* ---------- Tabs ---------- */
$$(".tab").forEach(t => t.addEventListener("click", () => {
  $$(".tab").forEach(x => x.classList.remove("active"));
  $$(".panel").forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  const panel = $("#" + t.dataset.tab);
  panel.classList.add("active");
  $$(".reveal", panel).forEach(el => el.classList.add("in"));
}));

/* ---------- Filters ---------- */
$$(".filter").forEach(f => f.addEventListener("click", () => {
  $$(".filter").forEach(x => x.classList.remove("active"));
  f.classList.add("active");
  const k = f.dataset.f;
  $$(".project").forEach(p => {
    const show = k === "all" || p.dataset.cat === k;
    p.classList.toggle("hide", !show);
    if (show) p.classList.add("in");
  });
}));

/* ---------- Tilt ---------- */
if (matchMedia("(pointer:fine)").matches && !reduced) {
  $$(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

/* ---------- Modal ---------- */
const modal = $("#modal"), mc = $("#modalContent");
function openModal(html) { mc.innerHTML = html; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("lock"); modal.querySelector(".modal-box").scrollTop = 0; }
function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); }
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function openProject(i) {
  const p = PROJECTS[i];
  openModal(`
    <div class="m-img"><img src="${encodeURI(p.img)}" alt="${p.title}"></div>
    <div class="m-body">
      <span class="p-cat" style="position:static">${p.label}</span>
      <h3>${p.title}</h3>
      <p>${p.long}</p>
      ${p.gallery ? `<div class="m-gallery">${p.gallery.map(g => `<img src="${g}" alt="Aperçu" loading="lazy">`).join("")}</div>` : ""}
      <div class="p-stack">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
      <div class="m-links">
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn btn-primary"><i class="ri-github-fill"></i> Voir sur GitHub</a>` : ""}
        <a href="https://github.com/bryan01-14" target="_blank" rel="noopener" class="btn btn-ghost"><i class="ri-folder-open-line"></i> Tous mes dépôts</a>
      </div>
    </div>`);
}
grid.addEventListener("click", e => { const card = e.target.closest(".project"); if (card) openProject(+card.dataset.i); });
grid.addEventListener("keydown", e => { if (e.key === "Enter") { const card = e.target.closest(".project"); if (card) openProject(+card.dataset.i); } });

certGrid.addEventListener("click", e => {
  const card = e.target.closest(".cert"); if (!card) return;
  const c = CERTS[+card.dataset.i];
  openModal(`
    <div class="m-img contain"><img src="${encodeURI(c[0])}" alt="${c[1]}"></div>
    <div class="m-body"><h3>${c[1]}</h3><p class="mono g">${c[2]}</p>
    ${c[3] ? `<a href="${c[3]}" target="_blank" rel="noopener" class="btn btn-primary"><i class="ri-verified-badge-line"></i> Vérifier le certificat</a>` : ""}</div>`);
});

/* ---------- Music ---------- */
const music = $("#music"), audio = $("#audio");
music.addEventListener("click", () => {
  if (audio.paused) { audio.play().then(() => music.classList.add("playing")).catch(() => {}); }
  else { audio.pause(); music.classList.remove("playing"); }
});

/* ---------- Contact (mailto) ---------- */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const n = $("#cf-name").value, m = $("#cf-email").value, s = $("#cf-subject").value, t = $("#cf-msg").value;
  const body = `${t}\n\n— ${n} (${m})`;
  location.href = `mailto:abraham.aka2025@esatic.edu.ci?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`;
});

$("#year").textContent = new Date().getFullYear();
