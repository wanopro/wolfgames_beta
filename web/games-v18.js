// v1.8 새 게임 (글 없이 하는 게임): 🏗️ 탑 쌓기 · 🔴 따라 하기 (⚡ 순발력) · ✂️ 폭탄 선 자르기 (🍀 운빨)
import { S, h, top, setupPanel, liveCanvas, vibe } from './core.js';
import { choice } from './games-quick.js';
import { wolfFace } from './art.js';
import { dazedWolf } from './dazed.js';

const ease = (u) => 1 - Math.pow(1 - Math.min(1, Math.max(0, u)), 3);
const font = (c, size, w = 900) => { c.font = `${w} ${size}px -apple-system, "Noto Sans KR", "Noto Sans Thai", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; };
const txt = (c, s, x, y, size, color, w = 900) => { font(c, size, w); c.fillStyle = color; c.fillText(s, x, y); };
const pill = (c, W, H, label) => { c.fillStyle = 'rgba(0,0,0,.55)'; c.beginPath(); c.roundRect(W / 2 - 110, H - 86, 220, 44, 22); c.fill(); txt(c, label, W / 2, H - 64, 17, '#fff'); };

// 🔊 짧은 소리 (WebAudio, 실패하면 조용히)
let ac = null;
function audio() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (_) { ac = null; } return ac; }
function tone(hz, dur, type = 'sine', vol = 0.22) {
  const a = audio(); if (!a) return;
  try {
    const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
    o.type = type; o.frequency.value = hz;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
  } catch (_) { /* 무시 */ }
}

function stage(root, title, setup, draw, onDown) {
  const body = h('div', { class: 'body', style: 'touch-action:none' });
  root.replaceChildren(top(title, setup), body);
  const t0 = performance.now(), now = () => (performance.now() - t0) / 1000;
  const cv = liveCanvas(body, (c, W, H) => draw(c, W, H, now()));
  cv.canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault(); const r = cv.canvas.getBoundingClientRect();
    onDown(e.clientX - r.left, e.clientY - r.top, now(), r.width, r.height);
  });
  return cv;
}

// ===================== 🏗️ 탑 쌓기 =====================
export const TS_COLS = ['#FF6B81', '#FFB74D', '#FFD54F', '#81C784', '#4DD0E1', '#64B5F6', '#9575CD', '#F06292'];
export function tower(root, back) {
  const s = S();
  let cv = null;
  const setup = () => { if (cv) { cv.stop(); cv = null; } root.replaceChildren(top(s.tsTitle, back), h('div', { class: 'body' }, setupPanel(s.tsDesc, play))); };
  const play = () => {
    const g = { blocks: null };
    const reset = (W, H) => {
      const bw = W * 0.62;
      Object.assign(g, { W, H, bh: Math.max(22, Math.min(36, H * 0.055)), blocks: [{ x: (W - bw) / 2, w: bw }], cur: { x: -bw * 0.5, w: bw, dir: 1 }, speed: W * 0.5, chips: [], fallT: 0, perfT: -9, passT: -9, landT: -9, cam: 0, last: null, tip: 1 });
    };
    const rowY = (i) => g.H - 70 - (i + 1) * g.bh + g.cam;
    const block = (c, x, y, w, bh, col) => {
      c.beginPath(); c.roundRect(x, y, w, bh - 2, 4); c.fillStyle = col; c.fill();
      c.fillStyle = 'rgba(255,255,255,.28)'; c.fillRect(x + 3, y + 2, Math.max(0, w - 6), bh * 0.2);
    };
    const colOf = (i) => (i === 0 ? '#546E7A' : TS_COLS[(i - 1) % TS_COLS.length]);
    cv = stage(root, s.tsTitle, setup, (c, W, H, t) => {
      if (!g.blocks || g.W !== W || g.H !== H) reset(W, H);
      const dt = g.last == null ? 0 : Math.min(0.05, t - g.last); g.last = t;
      const n = g.blocks.length, bh = g.bh;
      g.cam += (Math.max(0, (n + 1) * bh - H * 0.5) - g.cam) * Math.min(1, dt * 6);
      // 땅
      c.fillStyle = '#263238'; c.fillRect(0, H - 70 + g.cam, W, 400);
      if (!g.fallT) {
        const cu = g.cur; cu.x += cu.dir * g.speed * dt;
        if (cu.x < -cu.w * 0.5) { cu.x = -cu.w * 0.5; cu.dir = 1; }
        if (cu.x > W - cu.w * 0.5) { cu.x = W - cu.w * 0.5; cu.dir = -1; }
        g.blocks.forEach((b, i) => block(c, b.x, rowY(i), b.w, bh, colOf(i)));
        // 맨 위 늑대
        const tb = g.blocks[n - 1], hop = t - g.landT < 0.3 ? Math.sin((t - g.landT) / 0.3 * Math.PI) * bh * 0.5 : 0, r = bh * 0.8;
        c.save(); c.translate(tb.x + tb.w / 2, rowY(n - 1) - r * 0.62 - hop); wolfFace(c, r); c.restore();
        block(c, cu.x, rowY(n) - bh * 1.6, cu.w, bh, colOf(n));
      } else {
        const u = t - g.fallT;
        g.blocks.forEach((b, i) => {
          const k = i / Math.max(1, n - 1), d = Math.max(0, u - (n - 1 - i) * 0.04);
          c.save(); c.translate(b.x + b.w / 2 + g.tip * d * d * W * 0.7 * k, rowY(i) + bh / 2 + d * d * 900 * k * k); c.rotate(g.tip * d * 2.2 * k);
          block(c, -b.w / 2, -bh / 2, b.w, bh, colOf(i)); c.restore();
        });
        const tb = g.blocks[n - 1], r = bh * 0.8;
        c.save(); c.translate(tb.x + tb.w / 2 + g.tip * u * u * W * 0.8, rowY(n - 1) - r * 0.62 + u * u * 1100); c.rotate(g.tip * u * 5); wolfFace(c, r); c.restore();
        const cu = g.cur; block(c, cu.x, rowY(n) - bh * 1.6 + u * u * 1400, cu.w, bh, colOf(n));
      }
      // 잘려 떨어지는 조각
      g.chips = g.chips.filter((p) => t - p.t < 1.5);
      for (const p of g.chips) { const u = t - p.t; c.save(); c.globalAlpha = Math.max(0, 1 - u / 1.5); c.translate(p.x + p.w / 2, rowY(p.row) + bh / 2 + u * u * 900); c.rotate(p.dir * u * 3); block(c, -p.w / 2, -bh / 2, p.w, bh, p.col); c.restore(); }
      txt(c, s.tsFloor(n - 1), W / 2, 38, 30, '#fff');
      if (t - g.perfT < 0.8) { c.globalAlpha = 1 - (t - g.perfT) / 0.8; txt(c, '✨ PERFECT!', W / 2, 76 - (t - g.perfT) * 30, 22, '#FFD740'); c.globalAlpha = 1; }
      if (!g.fallT) {
        if (t - g.passT < 0.9) { const u = (t - g.passT) / 0.9; c.globalAlpha = 1 - u; txt(c, '👉', W / 2 + u * 60, H * 0.62, 54, '#fff'); c.globalAlpha = 1; }
        txt(c, s.tsTap, W / 2, H - 22, 14, '#9A9AB0', 700);
      } else {
        const u = t - g.fallT;
        if (u > 0.6) { c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, H * 0.3, W, 130); txt(c, s.tsFall, W / 2, H * 0.3 + 42, 30, '#FFD740'); txt(c, s.shotWord, W / 2, H * 0.3 + 92, 26, '#FF5A6E'); }
        if (u > 1.4) pill(c, W, H, s.playAgain);
      }
    }, (x, y, t) => {
      if (!g.blocks) return;
      if (g.fallT) { if (t - g.fallT > 1.4) { reset(g.W, g.H); vibe.tap(); } return; }
      const n = g.blocks.length, tb = g.blocks[n - 1], cu = g.cur;
      const L = Math.max(cu.x, tb.x), R = Math.min(cu.x + cu.w, tb.x + tb.w);
      if (R - L <= 0) { g.fallT = t; g.tip = cu.x < tb.x ? -1 : 1; vibe.strong(); tone(110, 0.6, 'sawtooth', 0.18); return; }
      let nb;
      if (Math.abs(cu.x - tb.x) < Math.max(4, g.W * 0.012)) { nb = { x: tb.x, w: cu.w }; g.perfT = t; vibe.tick(); tone(880, 0.18); }
      else {
        const left = cu.x < tb.x;
        g.chips.push({ x: left ? cu.x : R, w: left ? tb.x - cu.x : cu.x + cu.w - R, row: n, t, col: colOf(n), dir: left ? -1 : 1 });
        nb = { x: L, w: R - L }; vibe.tap(); tone(440, 0.1, 'triangle');
      }
      g.blocks.push(nb); g.landT = t; g.passT = t;
      const m = g.blocks.length;
      g.cur = { x: m % 2 ? -nb.w * 0.5 : g.W - nb.w * 0.5, w: nb.w, dir: m % 2 ? 1 : -1 };
      g.speed = Math.min(g.W * 1.7, g.speed * 1.06);
    });
  };
  setup();
  return () => { if (cv) cv.stop(); };
}

// ===================== 🔴 따라 하기 (사이먼) =====================
export const SM_COL = [['#2ECC71', '#145A32'], ['#E74C3C', '#641E16'], ['#3498DB', '#154360'], ['#F1C40F', '#7D6608']];
export const SM_HZ = [330, 392, 494, 659];
// 색약도 알아보게 모양: ● ▲ ■ ★
export function smShape(c, k, x, y, r) {
  c.beginPath();
  if (k === 0) c.arc(x, y, r, 0, Math.PI * 2);
  else if (k === 1) { c.moveTo(x, y - r); c.lineTo(x + r * 0.95, y + r * 0.75); c.lineTo(x - r * 0.95, y + r * 0.75); c.closePath(); }
  else if (k === 2) c.rect(x - r * 0.82, y - r * 0.82, r * 1.64, r * 1.64);
  else { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r * 1.05; i ? c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : c.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); }
  c.fill();
}
export function simon(root, back) {
  const s = S();
  let cv = null;
  const setup = () => { if (cv) { cv.stop(); cv = null; } root.replaceChildren(top(s.smTitle, back), h('div', { class: 'body' }, setupPanel(s.smDesc, play))); };
  const play = () => {
    audio();
    const g = {};
    const rnd = () => Math.floor(Math.random() * 4);
    const fresh = (t) => Object.assign(g, { seq: [rnd()], phase: 'show', ps: t + 0.8, inp: 0, tap: -1, tapT: -9, shown: -1, pt: t });
    fresh(0);
    const step = () => Math.max(0.3, 0.62 - g.seq.length * 0.025);
    const layout = (W, H) => { const S2 = Math.min(W - 32, H - 210), x0 = (W - S2) / 2, y0 = Math.max(100, (H - S2) / 2 + 10), gap = 12, p = (S2 - gap) / 2; return { x0, y0, p, gap }; };
    cv = stage(root, s.smTitle, setup, (c, W, H, t) => {
      const L = layout(W, H);
      let lit = -1;
      if (g.phase === 'show') {
        const st = step(), k = Math.floor((t - g.ps) / st);
        if (t >= g.ps) {
          if (k >= g.seq.length) { g.phase = 'input'; g.inp = 0; g.pt = t; }
          else if (t - g.ps - k * st < st * 0.68) { lit = g.seq[k]; if (g.shown !== k) { g.shown = k; tone(SM_HZ[lit], st * 0.68); } }
        }
      } else if (g.phase === 'ok') {
        if (t - g.pt > 1.1) { g.seq.push(rnd()); g.phase = 'show'; g.ps = t + 0.3; g.shown = -1; }
      }
      if (g.phase !== 'show' && t - g.tapT < 0.22) lit = g.tap;
      const wrongK = g.phase === 'wrong' ? g.seq[g.inp] : -1;
      for (let k = 0; k < 4; k++) {
        const x = L.x0 + (k % 2) * (L.p + L.gap), y = L.y0 + Math.floor(k / 2) * (L.p + L.gap);
        const on = k === lit || (k === wrongK && Math.sin(t * 14) > 0);
        c.save(); c.translate(x + L.p / 2, y + L.p / 2); const sc = on ? 1.04 : 1; c.scale(sc, sc);
        c.beginPath(); c.roundRect(-L.p / 2, -L.p / 2, L.p, L.p, L.p * 0.16); c.fillStyle = on ? SM_COL[k][0] : SM_COL[k][1]; c.fill();
        if (on) { c.beginPath(); c.roundRect(-L.p / 2, -L.p / 2, L.p, L.p, L.p * 0.16); c.fillStyle = 'rgba(255,255,255,.22)'; c.fill(); }
        c.fillStyle = on ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.35)'; smShape(c, k, 0, 0, L.p * 0.17);
        c.restore();
      }
      txt(c, s.smLevel(g.seq.length), W / 2, 38, 30, '#fff');
      const msg = g.phase === 'show' ? s.smWatch : g.phase === 'input' ? s.smGo : g.phase === 'ok' ? s.smOk : s.smWrong;
      const my = L.y0 + L.p * 2 + L.gap + 34;
      txt(c, msg, W / 2, Math.min(H - 110, my), 22, g.phase === 'wrong' ? '#FF5A6E' : g.phase === 'ok' ? '#FFD740' : '#fff');
      if (g.phase === 'input') { // 진행 점
        const n = g.seq.length, dw = Math.min(14, (W - 40) / n);
        for (let i = 0; i < n; i++) { c.beginPath(); c.arc(W / 2 + (i - (n - 1) / 2) * dw, 74, Math.min(4, dw * 0.35), 0, Math.PI * 2); c.fillStyle = i < g.inp ? '#FFD740' : 'rgba(255,255,255,.25)'; c.fill(); }
      }
      if (g.phase === 'wrong') {
        txt(c, s.shotWord, W / 2, Math.min(H - 110, my) + 40, 26, '#FF5A6E');
        if (t - g.pt > 1.2) pill(c, W, H, s.playAgain);
      }
    }, (x, y, t, W, H) => {
      if (g.phase === 'wrong') { if (t - g.pt > 1.2) { fresh(t); vibe.tap(); } return; }
      if (g.phase !== 'input') return;
      const L = layout(W, H);
      const cx = Math.floor((x - L.x0) / (L.p + L.gap)), cy = Math.floor((y - L.y0) / (L.p + L.gap));
      if (cx < 0 || cx > 1 || cy < 0 || cy > 1) return;
      const k = cy * 2 + cx;
      g.tap = k; g.tapT = t;
      if (k !== g.seq[g.inp]) { g.phase = 'wrong'; g.pt = t; vibe.strong(); tone(140, 0.7, 'square', 0.15); return; }
      tone(SM_HZ[k], 0.22); vibe.tap(); g.inp++;
      if (g.inp >= g.seq.length) { g.phase = 'ok'; g.pt = t; }
    });
  };
  setup();
  return () => { if (cv) cv.stop(); };
}

// ===================== ✂️ 폭탄 선 자르기 =====================
export const WC_N = [4, 5, 6, 8];
export const WC_COLS = ['#E53935', '#1E88E5', '#FDD835', '#43A047', '#8E24AA', '#FB8C00', '#ECEFF1', '#8D6E63'];
export function wireCut(root, back) {
  const s = S();
  let cv = null, n = 6;
  try { const v = +localStorage.getItem('wg-wc-n'); if (WC_N.includes(v)) n = v; } catch (_) { /* 무시 */ }
  const setup = () => {
    if (cv) { cv.stop(); cv = null; }
    root.replaceChildren(top(s.wcTitle, back), h('div', { class: 'body' }, setupPanel(s.wcDesc, play,
      choice(s.wcWires, WC_N.map((v) => [v, String(v)]), n, (v) => { n = v; try { localStorage.setItem('wg-wc-n', String(v)); } catch (_) { /* 무시 */ } }))));
  };
  const play = () => {
    const g = {};
    const order = () => { const a = [...Array(WC_COLS.length).keys()]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };
    const round = () => Object.assign(g, { cols: order(), cut: Array(n).fill(0), bomb: Math.floor(Math.random() * n), boomT: 0, safeT: -9, cuts: 0, clock: 0, last: null, snip: null });
    round();
    const geo = (W, H) => { const bx = W * 0.1, bw = W * 0.8, by = Math.max(24, H * 0.07), bhh = Math.min(140, H * 0.2); const y1 = by + bhh, y2 = H * 0.8, span = bw * 0.92, left = bx + bw * 0.04; return { bx, bw, by, bhh, y1, y2, span, left, gapX: span / n }; };
    const wireX = (G, i) => G.left + (i + 0.5) * G.gapX;
    const wirePath = (c, G, i) => { const x = wireX(G, i), amp = G.gapX * 0.32 * (i % 2 ? 1 : -1), d = G.y2 - G.y1; c.beginPath(); c.moveTo(x, G.y1); c.bezierCurveTo(x + amp, G.y1 + d * 0.33, x - amp, G.y1 + d * 0.66, x, G.y2); };
    cv = stage(root, s.wcTitle, setup, (c, W, H, t) => {
      const G = geo(W, H), dt = g.last == null ? 0 : Math.min(0.05, t - g.last); g.last = t;
      if (!g.boomT) g.clock += dt * (1 + g.cuts * 0.8);
      const shake = g.boomT && t - g.boomT < 0.5 ? (1 - (t - g.boomT) / 0.5) * 10 : 0;
      c.save(); if (shake) c.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      // 아래 단자
      c.beginPath(); c.roundRect(G.bx, G.y2 - 6, G.bw, 26, 8); c.fillStyle = '#37474F'; c.fill();
      // 선
      const midY = (G.y1 + G.y2) / 2;
      for (let i = 0; i < n; i++) {
        const col = WC_COLS[g.cols[i]];
        const drawWire = () => { wirePath(c, G, i); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 12; c.lineCap = 'round'; c.stroke(); wirePath(c, G, i); c.strokeStyle = col; c.lineWidth = 8; c.stroke(); };
        if (!g.cut[i]) { drawWire(); continue; }
        const u = t - g.cut[i], sag = ease(u / 0.4) * 14;
        c.save(); c.beginPath(); c.rect(0, 0, W, midY - 9); c.clip(); drawWire(); c.restore();
        c.save(); c.beginPath(); c.rect(0, midY + 9, W, H); c.clip(); c.translate(0, sag); drawWire(); c.restore();
        const x = wireX(G, i);
        c.fillStyle = '#FFB300'; c.beginPath(); c.arc(x, midY - 9, 4, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(x, midY + 9 + sag, 4, 0, Math.PI * 2); c.fill();
        if (u < 0.35 && i !== g.bomb) for (let k = 0; k < 6; k++) { const a = k + t * 30; c.beginPath(); c.moveTo(x, midY); c.lineTo(x + Math.cos(a) * 16, midY + Math.sin(a) * 16); c.strokeStyle = '#FFF59D'; c.lineWidth = 2; c.stroke(); }
      }
      // 나사
      for (let i = 0; i < n; i++) { c.beginPath(); c.arc(wireX(G, i), G.y2 + 7, 5, 0, Math.PI * 2); c.fillStyle = '#90A4AE'; c.fill(); }
      // 폭탄 상자 (다이너마이트 + 타이머)
      for (let k = 0; k < 3; k++) { c.beginPath(); c.roundRect(G.bx + G.bw * (0.08 + k * 0.3), G.by - 10, G.bw * 0.24, G.bhh + 12, 10); c.fillStyle = '#C62828'; c.fill(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(G.bx + G.bw * (0.1 + k * 0.3), G.by - 4, G.bw * 0.04, G.bhh); }
      c.beginPath(); c.roundRect(G.bx, G.by + G.bhh * 0.22, G.bw, G.bhh * 0.78, 12); c.fillStyle = '#263238'; c.fill();
      const tw = G.bw * 0.5, th = G.bhh * 0.42, tx = W / 2 - tw / 2, ty = G.by + G.bhh * 0.38;
      c.beginPath(); c.roundRect(tx, ty, tw, th, 8); c.fillStyle = '#0B0B0B'; c.fill();
      const sec = g.boomT ? 0 : 59 - (Math.floor(g.clock) % 60), blink = g.boomT || Math.sin(t * (6 + g.cuts * 4)) > -0.3;
      if (blink) { font(c, th * 0.72, 900); c.fillStyle = '#FF1744'; c.fillText(`00:${String(sec).padStart(2, '0')}`, W / 2, ty + th / 2 + 1); }
      c.restore();
      // ✂️ 자른 곳
      if (g.snip && t - g.snip[2] < 0.6) { const u = (t - g.snip[2]) / 0.6; c.globalAlpha = 1 - u; txt(c, '✂️', g.snip[0], g.snip[1] - u * 20, 40, '#fff'); c.globalAlpha = 1; }
      const left = g.cut.filter((v) => !v).length;
      if (!g.boomT) {
        if (t - g.safeT < 1.4) { const u = (t - g.safeT) / 1.4; c.globalAlpha = Math.min(1, (1 - u) * 3); txt(c, s.wcSafe, W / 2, G.y2 + 52, 19, '#69F0AE'); c.globalAlpha = 1; }
        else txt(c, s.wcLeft(left), W / 2, G.y2 + 52, 17, '#fff');
        txt(c, s.wcTap, W / 2, H - 22, 14, '#9A9AB0', 700);
        return;
      }
      const u = t - g.boomT;
      if (u < 0.5) { c.fillStyle = `rgba(255,240,200,${0.85 * (1 - u / 0.5)})`; c.fillRect(0, 0, W, H); }
      txt(c, '💥', W / 2, G.by + G.bhh / 2, Math.min(W, H) * 0.45 * (0.5 + 0.5 * ease(u / 0.25)), '#fff');
      if (u > 0.55) {
        const p = ease((u - 0.55) / 0.35), r = Math.min(W * 0.27, H * 0.2);
        c.fillStyle = `rgba(0,0,0,${0.6 * p})`; c.fillRect(0, 0, W, H);
        c.save(); c.globalAlpha = p; c.translate(W / 2, H * 0.45); c.scale(0.7 + 0.3 * p, 0.7 + 0.3 * p); dazedWolf(c, 0, 0, r, t); c.restore();
        c.globalAlpha = p; txt(c, s.wcBoom, W / 2, H * 0.45 + r * 1.35, 26, '#FFD740'); txt(c, s.shotWord, W / 2, H * 0.45 + r * 1.35 + 44, 26, '#FF5A6E'); c.globalAlpha = 1;
      }
      if (u > 1.3) pill(c, W, H, s.playAgain);
    }, (x, y, t, W, H) => {
      if (g.boomT) { if (t - g.boomT > 1.3) { round(); vibe.tap(); } return; }
      const G = geo(W, H);
      if (y < G.y1 - 10 || y > G.y2 + 30) return;
      let best = -1, bd = G.gapX * 0.5;
      for (let i = 0; i < n; i++) { if (g.cut[i]) continue; const d = Math.abs(x - wireX(G, i)); if (d < bd) { bd = d; best = i; } }
      if (best < 0) return;
      g.cut[best] = t; g.snip = [wireX(G, best), (G.y1 + G.y2) / 2, t];
      if (best === g.bomb) { g.boomT = t; vibe.strong(); tone(70, 0.9, 'sawtooth', 0.25); }
      else { g.cuts++; g.safeT = t; vibe.tap(); tone(1200, 0.06, 'square', 0.12); }
    });
  };
  setup();
  return () => { if (cv) cv.stop(); };
}
