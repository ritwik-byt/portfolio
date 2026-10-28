import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { featured, more, milestones, setup } from './data.js';
import { playIntro } from './intro.js';
import { initLakehouse3D } from './lakehouse3d.js';

document.documentElement.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Work: Featured projects on the left, sticky screen on the right ---------- */
const featuredContainer = document.getElementById('featured');
if (featuredContainer) {
  featuredContainer.innerHTML = featured.map((p, i) => `
    <article class="work reveal" data-i="${i}">
      ${p.shot ? `<a href="${p.live || p.repo}" target="_blank" rel="noopener"><img class="work-shot" src="${p.shot}" alt="${esc(p.name)} dashboard preview" loading="lazy"></a>` : ''}
      <div class="work-idx">0${i + 1} // ${esc(p.code)}</div>
      <h3 class="work-name">${esc(p.name)}</h3>
      <p class="work-tag">${esc(p.tagline)}</p>
      <div class="work-status"><span class="status ${p.status}">${p.statusText}</span><span>${esc(p.year)}</span></div>
      <p class="work-desc">${esc(p.desc)}</p>
      <ul class="work-notes">${p.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
      ${p.stack.length ? `<div class="stack">${p.stack.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
      <div class="work-links">
        ${p.live ? `<a class="link-arrow" href="${p.live}" target="_blank" rel="noopener">Interactive Live Demo</a>` : ''}
        ${p.repo ? `<a class="link-arrow" href="${p.repo}" target="_blank" rel="noopener">GitHub Repository</a>` : ''}
      </div>
    </article>`).join('');
}

const screenFrame = document.getElementById('screenFrame');
if (screenFrame) {
  screenFrame.insertAdjacentHTML(
    'afterbegin',
    featured.map((p, i) => `<img src="${p.shot}" alt="" class="${i === 0 ? 'on' : ''}" decoding="async">`).join('')
  );
  screenFrame.style.cursor = 'pointer';
  screenFrame.addEventListener('click', () => {
    if (shotNow >= 0 && featured[shotNow]) {
      const dest = featured[shotNow].live || featured[shotNow].repo;
      if (dest) window.open(dest, '_blank', 'noopener');
    }
  });
}

const shots = screenFrame ? [...screenFrame.querySelectorAll('img')] : [];
const screenIdx = document.getElementById('screenIdx');
const screenUrl = document.getElementById('screenUrl');
const workEls = [...document.querySelectorAll('.work')];
let shotNow = -1;

function setShot(i) {
  if (i === shotNow || !shots.length) return;
  const prev = shotNow;
  shotNow = i;
  shots.forEach((img, k) => {
    img.classList.toggle('on', k === i);
    img.classList.toggle('below', k > i);
  });
  workEls.forEach((el, k) => el.classList.toggle('hot', k === i));
  if (screenIdx) screenIdx.textContent = `0${i + 1} / 0${featured.length}`;
  if (screenUrl) {
    screenUrl.innerHTML = featured[i].live
      ? `<a href="${featured[i].live}" target="_blank" rel="noopener" style="color:var(--amber); text-decoration: underline; text-underline-offset: 4px;">${esc(featured[i].name)} ↗</a>`
      : esc(featured[i].name);
  }
  if (prev >= 0 && screenFrame) {
    screenFrame.classList.remove('scan');
    void screenFrame.offsetWidth;
    screenFrame.classList.add('scan');
  }
}

function updateWork() {
  const mid = window.innerHeight * 0.55;
  let active = 0;
  workEls.forEach((el, i) => {
    if (el.getBoundingClientRect().top < mid) active = i;
  });
  setShot(active);
}

/* ---------- Archive Projects Table (Earlier Pipelines & Systems) ---------- */
const archiveEl = document.getElementById('archive');
if (archiveEl) {
  archiveEl.innerHTML = more.map((p) => `
    <div class="arow reveal">
      <span class="arow-name">${esc(p.name)}</span>
      <span class="arow-desc">${esc(p.desc)}</span>
      <span class="arow-stack">${p.stack.map(esc).join(' · ')}</span>
      <span class="arow-year">${esc(p.year)}</span>
      <span class="arow-links">
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
        ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
      </span>
    </div>`).join('');
}

/* ---------- Capabilities Section ---------- */
const capsEl = document.getElementById('caps');
if (capsEl) {
  capsEl.innerHTML = setup.map((s, i) => `
    <li class="xr-card${i === 0 ? ' on' : ''}" data-i="${i}">
      <p class="xr-part"><span>0${i + 1}</span> // ${esc(s.label)}</p>
      <h3>${esc(s.title)}</h3>
      <p class="xr-line">${esc(s.line)}</p>
      <ul>${s.items.map(([a, b]) => `<li><span>${esc(a)}</span><span>${esc(b)}</span></li>`).join('')}</ul>
    </li>`).join('');
}

const xrStepsEl = document.getElementById('xrSteps');
if (xrStepsEl) {
  xrStepsEl.innerHTML = setup.map((s, i) => `<li class="${i === 0 ? 'on' : ''}"><span>0${i + 1}</span>${esc(s.label)}</li>`).join('');
}

const xrSection = document.getElementById('capabilities');
if (xrSection) {
  if (reduceMotion) {
    xrSection.classList.add('static');
  } else {
    initLakehouse3D(setup);
  }
}

/* ---------- Journey: Milestones & Scroll-Driven Progress Track ---------- */
const milestonesList = document.getElementById('milestones');
if (milestonesList) {
  milestonesList.innerHTML = milestones.map((m, i) => `
    <li class="ms" data-i="${i}">
      <span class="ms-t">T0${i + 1}</span>
      <div>
        <div class="ms-meta">${esc(m.corner)} · ${esc(m.when)}</div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.text)}</p>
      </div>
    </li>`).join('');
}

const track = document.getElementById('track');
const driven = document.getElementById('driven');
const mapCar = document.getElementById('mapCar');
const mapNow = document.getElementById('mapNow');
const cornersG = document.getElementById('corners');
const msEls = milestonesList ? [...milestonesList.children] : [];
let total = 0;
let cornerEls = [];

if (track && driven && cornersG) {
  const d = track.getAttribute('d');
  driven.setAttribute('d', d);
  total = track.getTotalLength();
  driven.setAttribute('stroke-dasharray', `0 ${total}`);

  const NS = 'http://www.w3.org/2000/svg';
  cornerEls = milestones.map((m, i) => {
    const pt = track.getPointAtLength(m.f * total);
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'corner');
    g.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    g.innerHTML = `<circle r="14"></circle><text text-anchor="middle" dy="4">${i + 1}</text>`;
    cornersG.appendChild(g);
    return g;
  });
}

function placeMarker(frac) {
  if (!track || !mapCar || !driven) return;
  const L = Math.max(0, Math.min(1, frac)) * total;
  const pt = track.getPointAtLength(L);
  mapCar.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
  driven.setAttribute('stroke-dasharray', `${L} ${total}`);
}

function updateJourney() {
  if (!msEls.length) return;
  const mid = window.innerHeight * 0.5;
  let active = 0;
  let frac = 0;
  for (let i = 0; i < msEls.length; i++) {
    const r = msEls[i].getBoundingClientRect();
    if (r.top <= mid) {
      active = i;
      const within = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
      const from = milestones[i].f;
      const to = i < milestones.length - 1 ? milestones[i + 1].f : 1;
      frac = from + (to - from) * within;
    }
  }
  const first = msEls[0].getBoundingClientRect();
  if (first.top > mid) {
    frac = Math.max(0, milestones[0].f * (1 - Math.min(1, (first.top - mid) / mid)));
  }
  placeMarker(frac);
  msEls.forEach((el, i) => {
    el.classList.toggle('hot', i === active && first.top <= mid);
    el.classList.toggle('done', i < active);
  });
  cornerEls.forEach((el, i) => {
    el.classList.toggle('hot', i === active && first.top <= mid);
    el.classList.toggle('done', i < active);
  });
  if (mapNow) mapNow.textContent = first.top <= mid ? milestones[active].corner : 'Start Pipeline';
}

/* ---------- Nav & Scroll Events ---------- */
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href')));

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    let current = -1;
    sections.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) current = i;
    });
    if (max > 0 && window.scrollY >= max - 4) current = sections.length - 1;
    navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
    updateJourney();
    updateWork();
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

/* ---------- Reveal on Scroll ---------- */
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Contact Section & Copy Email ---------- */
const copyBtn = document.getElementById('copyEmail');
const email = document.getElementById('email');
if (copyBtn && email) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email.textContent.trim());
      copyBtn.textContent = 'Copied!';
    } catch {
      const r = document.createRange();
      r.selectNodeContents(email);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      copyBtn.textContent = 'Selected';
    }
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 2000);
  });
}

/* ---------- Local IST Clock ---------- */
const clock = document.getElementById('clock');
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const tick = () => {
    clock.textContent = `${fmt.format(new Date())} IST`;
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- Live "Building Now" Tracker ---------- */
const nowEl = document.getElementById('now');
if (nowEl) {
  nowEl.innerHTML = `<i></i>Active: <a href="https://github.com/ritwik-byt/ecommerce-lakehouse" target="_blank" rel="noopener" style="color:var(--amber);">Cloud Medallion Lakehouse</a> · AWS Certified Data Engineer – Associate`;
  nowEl.hidden = false;
}

/* ---------- Lenis Smooth Scrolling ---------- */
let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({ anchors: { offset: 0 }, lerp: 0.11 });
  const raf = (t) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  const sync = () => {
    if (document.documentElement.classList.contains('intro-on')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  };
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  sync();
}

/* ---------- Intro Triggering & Replay ---------- */
if (document.documentElement.classList.contains('intro-on')) {
  playIntro();
}

const replayBtn = document.getElementById('replayIntro');
if (replayBtn) {
  replayBtn.addEventListener('click', () => {
    document.documentElement.classList.add('intro-on');
    window.scrollTo({ top: 0, behavior: 'instant' });
    playIntro();
  });
}
const replayNavBtn = document.getElementById('replayIntroNav');
if (replayNavBtn) {
  replayNavBtn.addEventListener('click', () => {
    document.documentElement.classList.add('intro-on');
    window.scrollTo({ top: 0, behavior: 'instant' });
    playIntro();
  });
}
