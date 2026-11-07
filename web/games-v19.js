// v1.9 게임 — 🐺 늑대 야바위 (🍀 운빨) — 앱 V19Games.kt 와 같은 방식
import { S, h, top, setupPanel, vibe, stepper } from './core.js';
import { coin } from './art.js';
import { stage, tone } from './games-v18.js';

const easeIO = (u) => { u = Math.min(1, Math.max(0, u)); return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; };
const font = (c, size, w = 900) => { c.font = `${w} ${size}px -apple-system, "Noto Sans KR", "Noto Sans Thai", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; };
const txt = (c, s, x, y, size, color, w = 900) => { font(c, size, w); c.fillStyle = color; c.fillText(s, x, y); };
export const YB_COLS = ['#FF5A6E', '#4FC3F7', '#FFD54F', '#69F0AE', '#BA68C8', '#FF9800'];

/** 🐺 야바위 늑대 (앞모습). open: 입 0~1, mood: 0 보통 · 1 통과(웃음) · -1 꽝(땀) */
export function yWolf(c, x, y, r, open, mood = 0, t = 0) {
  c.save(); c.translate(x, y);
  c.beginPath(); c.ellipse(0, r * 1.02, r * 0.85, r * 0.16, 0, 0, 7); c.fillStyle = 'rgba(0,0,0,.35)'; c.fill();
  for (const s of [-1, 1]) {
    c.beginPath(); c.moveTo(s * r * 0.28, -r * 0.62); c.lineTo(s * r * 0.78, -r * 1.25); c.lineTo(s * r * 0.92, -r * 0.3); c.closePath(); c.fillStyle = '#7C8593'; c.fill();
    c.beginPath(); c.moveTo(s * r * 0.44, -r * 0.6); c.lineTo(s * r * 0.74, -r * 1.02); c.lineTo(s * r * 0.82, -r * 0.42); c.closePath(); c.fillStyle = '#F6AFC0'; c.fill();
  }
  c.beginPath(); c.ellipse(0, 0, r, r * 0.92, 0, 0, 7); c.fillStyle = '#9AA3AF'; c.fill();
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * r * 0.92, r * 0.05); c.lineTo(s * r * 1.15, r * 0.25); c.lineTo(s * r * 0.9, r * 0.42); c.closePath(); c.fillStyle = '#9AA3AF'; c.fill(); }
  for (const s of [-1, 1]) {
    if (mood === 1) { c.beginPath(); c.arc(s * r * 0.36, -r * 0.2, r * 0.13, Math.PI * 1.1, Math.PI * 1.9); c.strokeStyle = '#2B2B33'; c.lineWidth = r * 0.07; c.lineCap = 'round'; c.stroke(); }
    else { c.beginPath(); c.ellipse(s * r * 0.36, -r * 0.2, r * 0.13, r * 0.15, 0, 0, 7); c.fillStyle = '#2B2B33'; c.fill(); c.beginPath(); c.arc(s * r * 0.32, -r * 0.26, r * 0.05, 0, 7); c.fillStyle = '#fff'; c.fill(); }
    c.beginPath(); c.ellipse(s * r * 0.62, r * 0.16, r * 0.13, r * 0.08, 0, 0, 7); c.fillStyle = 'rgba(255,130,150,.55)'; c.fill();
  }
  c.beginPath(); c.ellipse(0, r * 0.38, r * 0.5, r * 0.36 + open * r * 0.22, 0, 0, 7); c.fillStyle = '#F1EEE8'; c.fill();
  c.beginPath(); c.ellipse(0, r * 0.16, r * 0.13, r * 0.09, 0, 0, 7); c.fillStyle = '#2B2B33'; c.fill();
  if (open > 0.04) {
    c.beginPath(); c.ellipse(0, r * 0.5 + open * r * 0.12, r * 0.32, r * 0.05 + open * r * 0.3, 0, 0, 7); c.fillStyle = '#5A1E2B'; c.fill();
    c.fillStyle = '#fff'; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * r * 0.24, r * 0.5 - open * r * 0.16); c.lineTo(s * r * 0.14, r * 0.5 - open * r * 0.16); c.lineTo(s * r * 0.19, r * 0.5 - open * r * 0.04); c.closePath(); c.fill(); }
    c.beginPath(); c.ellipse(0, r * 0.62 + open * r * 0.2, r * 0.14, r * 0.07, 0, 0, 7); c.fillStyle = '#F48FB1'; c.fill();
  } else {
    c.beginPath(); c.moveTo(-r * 0.16, r * 0.36); c.quadraticCurveTo(-r * 0.08, r * 0.46, 0, r * 0.36); c.quadraticCurveTo(r * 0.08, r * 0.46, r * 0.16, r * 0.36); c.strokeStyle = '#2B2B33'; c.lineWidth = r * 0.05; c.lineCap = 'round'; c.stroke();
  }
  if (mood === -1) { c.beginPath(); c.ellipse(r * 0.78, -r * 0.55 + Math.sin(t * 6) * 2, r * 0.09, r * 0.14, 0.3, 0, 7); c.fillStyle = '#4FC3F7'; c.fill(); }
  c.restore();
}

// ===================== 🐺 늑대 야바위 =====================
// 늑대 수 = 인원 (1명이면 2마리). 한 마리만 코인을 못 먹음 → 섞기 약 8초(점점 빨라짐) → 한 명씩 골라서 빈 입이면 원샷
export const YB_EAT_END = 3.0;
export function ybSwaps(n, rnd = Math.random) {
  const sw = []; let d = 0.62;
  const pair = () => { const a = Math.floor(rnd() * n); let b = Math.floor(rnd() * (n - 1)); if (b >= a) b++; return [a, b]; };
  while (d > 0.1) { sw.push([...pair(), d]); d *= 0.92; }
  for (let k = 0; k < 12; k++) sw.push([...pair(), 0.1]);
  return sw;
}
/** 자리: 1~3마리 한 줄, 4마리 2×2, 5마리 3+2, 6마리 3×2 — 화면 위아래 넓게 */
export function ybSlots(n, W, H) {
  const rows = n <= 3 ? [n] : n === 4 ? [2, 2] : [3, n - 3], k = Math.min(W / 390, H / 700, 1.5);
  const R = (n <= 2 ? 64 : n <= 4 ? 58 : 52) * k, out = [];
  rows.forEach((cnt, r) => {
    const y = rows.length === 1 ? H * 0.5 : H * (0.36 + r * 0.33);
    for (let i = 0; i < cnt; i++) out.push({ x: W / 2 + (i - (cnt - 1) / 2) * (cnt === 3 ? W * 0.31 : W * 0.38), y: y + (cnt === 3 && i === 1 ? R * 0.5 : 0) });
  });
  return { slot: out, R, k };
}

export function yabawi(root, back) {
  const s = S();
  let cv = null, P = 4;
  try { const v = +localStorage.getItem('wg-yb-n'); if (v >= 1 && v <= 6) P = v; } catch (_) { /* 무시 */ }
  const setup = () => {
    if (cv) { cv.stop(); cv = null; }
    root.replaceChildren(top(s.ybTitle, back), h('div', { class: 'body' }, setupPanel(s.ybDesc, play,
      stepper(s.players, P, 1, 6, (v) => { P = v; try { localStorage.setItem('wg-yb-n', String(v)); } catch (_) { /* 무시 */ } }))));
  };
  const play = () => {
    const N = Math.max(2, P), g = {};
    const round = (t) => {
      const sw = ybSwaps(N);
      Object.assign(g, { base: t, empty: Math.floor(Math.random() * N), sw, shEnd: YB_EAT_END + sw.reduce((a, x) => a + x[2], 0), cur: 0, picked: {}, hitT: 0, doneT: 0, eaten: 0, swapIdx: -1 });
      g.eat = [...Array(N).keys()].filter((k) => k !== g.empty); g.step = 1.6 / g.eat.length;
    };
    round(0);
    // 늑대 k 의 지금 위치 (섞는 중이면 둥글게 돌아서 자리 바꿈)
    const where = (tt, S0) => {
      const pos = [...Array(N).keys()]; let at = YB_EAT_END;
      for (let j = 0; j < g.sw.length; j++) {
        const [a, b, d] = g.sw[j];
        if (tt < at) break;
        const wa = pos.indexOf(a), wb = pos.indexOf(b);
        if (tt < at + d) {
          const u = easeIO((tt - at) / d), out = pos.map((sl) => ({ ...S0[sl] }));
          const A = S0[a], B = S0[b], dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L * 60, ny = dx / L * 60, sn = Math.sin(u * Math.PI);
          out[wa] = { x: A.x + dx * u + nx * sn, y: A.y + dy * u + ny * sn }; out[wb] = { x: B.x - dx * u - nx * sn, y: B.y - dy * u - ny * sn };
          return { out, fast: d < 0.2, j };
        }
        pos[wa] = b; pos[wb] = a; at += d;
      }
      return { out: pos.map((sl) => ({ ...S0[sl] })), fast: false, j: g.sw.length };
    };
    cv = stage(root, s.ybTitle, setup, (c, W, H, t) => {
      const tt = t - g.base, { slot, R, k: sc } = ybSlots(N, W, H), { out, fast, j } = where(tt, slot);
      const eatAt = (k) => 0.6 + g.eat.indexOf(k) * g.step;
      // 소리: 코인 먹을 때 · 섞기 시작할 때
      const eatenNow = tt < YB_EAT_END ? g.eat.filter((k) => tt > eatAt(k) + 0.45).length : g.eat.length;
      if (eatenNow > g.eaten) { g.eaten = eatenNow; tone(880 + eatenNow * 60, 0.08, 'triangle', 0.16); }
      if (tt >= YB_EAT_END && tt < g.shEnd && j !== g.swapIdx) { g.swapIdx = j; if (g.sw[j] && g.sw[j][2] > 0.2) tone(320, 0.05, 'sine', 0.08); }
      // 사람 점 (지금 고를 사람 밝게)
      const dotR = Math.min(14, W / (P * 3.2));
      for (let i = 0; i < P; i++) {
        const x = W / 2 + (i - (P - 1) / 2) * dotR * 2.8;
        c.globalAlpha = tt > g.shEnd && !g.hitT && !g.doneT && i === g.cur ? 1 : 0.35;
        c.beginPath(); c.arc(x, 34, dotR, 0, 7); c.fillStyle = YB_COLS[i]; c.fill(); txt(c, String(i + 1), x, 35, dotR * 0.95, '#000'); c.globalAlpha = 1;
      }
      // 늑대
      for (let k = 0; k < N; k++) {
        const p = out[k], pk = g.picked[k];
        let open = 0, mood = 0;
        if (tt < YB_EAT_END) {
          open = Math.min(1, tt / 0.5);
          if (k !== g.empty && tt > eatAt(k) + 0.45) open = Math.max(0, 1 - (tt - eatAt(k) - 0.45) / 0.2);
          if (tt > 2.5) open = Math.max(0, open - (tt - 2.5) / 0.3);
        }
        if (pk) { open = Math.min(1, (t - pk.t) / 0.25); mood = k === g.empty ? -1 : 1; }
        if (fast && tt >= YB_EAT_END && tt < g.shEnd) { c.globalAlpha = 0.25; yWolf(c, p.x + (Math.random() - 0.5) * 16 * sc, p.y + (Math.random() - 0.5) * 16 * sc, R, 0); c.globalAlpha = 1; }
        const bob = tt > g.shEnd ? Math.sin(t * 5 + k) * 3 : 0;
        const big = pk && k === g.empty ? 1 + 0.25 * Math.min(1, (t - pk.t) / 0.3) + Math.sin(t * 10) * 0.03 : 1;
        yWolf(c, p.x, p.y + bob, R * big, open, mood, t);
        if (pk && k !== g.empty) {
          coin(c, p.x, p.y + R * 0.55 - Math.min(1, (t - pk.t) / 0.4) * 30 * sc, 16 * sc, 1);
          if (t - pk.t > 0.3) {
            c.beginPath(); c.arc(p.x, p.y - R * 1.55, 15 * sc, 0, 7); c.fillStyle = YB_COLS[pk.p]; c.fill();
            txt(c, String(pk.p + 1), p.x, p.y - R * 1.55 + 1, 15 * sc, '#000'); txt(c, '✅', p.x + 26 * sc, p.y - R * 1.55, 20 * sc, '#fff');
          }
        }
      }
      // 날아가는 코인
      if (tt < YB_EAT_END) {
        for (const k of g.eat) {
          const u = (tt - eatAt(k)) / 0.45; if (u < 0 || u > 1) continue;
          const x0 = W / 2, y0 = 84, x1 = slot[k].x, y1 = slot[k].y + R * 0.5;
          coin(c, x0 + (x1 - x0) * u, y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 80 * sc, (18 - 6 * u) * sc, 1, 1 - Math.abs(Math.sin(u * 9)) * 0.7);
        }
        const left = g.eat.length - g.eat.filter((k) => tt > eatAt(k)).length;
        if (left > 0) { coin(c, W / 2, 84, 18 * sc, 1); txt(c, '× ' + left, W / 2 + 44 * sc, 84, 18 * sc, '#FFD740'); }
      }
      // 안내 · 결과
      const fs = Math.min(20, W / 19);
      if (g.hitT) {
        const u = t - g.hitT;
        if (u > 0.4) {
          const v = u - 0.4, k2 = (0.6 + 0.4 * Math.min(1, v / 0.25)) * Math.min(1, W / 380), sh = v < 0.4 ? Math.sin(v * 60) * 7 * (1 - v / 0.4) : 0;
          const e = out[g.empty], cy = e.y > H / 2 ? Math.max(110, H * 0.2) : H - 130;
          c.fillStyle = `rgba(0,0,0,${0.55 * Math.min(1, v / 0.25)})`; c.fillRect(0, 0, W, H);
          yWolf(c, e.x, e.y, R * (1.25 + Math.sin(t * 10) * 0.03), 1, -1, t);
          c.save(); c.translate(W / 2 + sh, cy); c.scale(k2, k2);
          c.beginPath(); c.roundRect(-165, -82, 330, 164, 26); c.fillStyle = 'rgba(12,12,18,.94)'; c.fill(); c.strokeStyle = '#FF5A6E'; c.lineWidth = 4; c.stroke();
          txt(c, s.ybHit, 0, -34, 40, '#FF5A6E'); txt(c, s.ybShot(g.picked[g.empty].p + 1), 0, 30, 34, '#FFD740');
          c.restore();
        }
        if (u > 1.4) txt(c, s.playAgain, W / 2, H - 22, 15, '#9A9AB0', 700);
      } else if (g.doneT) {
        txt(c, s.ybPass(g.cur), W / 2, H - 70, fs, '#69F0AE');
        if (t - g.doneT > 1) txt(c, s.playAgain, W / 2, H - 22, 15, '#9A9AB0', 700);
      } else if (tt < YB_EAT_END) txt(c, s.ybEating, W / 2, H - 60, fs, '#fff');
      else if (tt < g.shEnd) txt(c, s.ybShuffle, W / 2, H - 60, fs, '#fff');
      else {
        const last = Object.values(g.picked).filter((x) => x.p === g.cur - 1)[0];
        if (last && t - last.t < 1.5) txt(c, s.ybPass(g.cur), W / 2, H - 60, fs, '#69F0AE');
        else txt(c, s.ybPick(g.cur + 1), W / 2, H - 60, fs, YB_COLS[g.cur]);
      }
    }, (x, y, t, W, H) => {
      const tt = t - g.base;
      if (g.hitT) { if (t - g.hitT > 1.4) { round(t); vibe.tap(); } return; }
      if (g.doneT) { if (t - g.doneT > 1) { round(t); vibe.tap(); } return; }
      if (tt < g.shEnd) return;
      const { slot, R } = ybSlots(N, W, H), { out } = where(tt, slot);
      let best = -1, bd = R * 1.3;
      for (let k = 0; k < N; k++) { if (g.picked[k]) continue; const d = Math.hypot(x - out[k].x, y - out[k].y); if (d < bd) { bd = d; best = k; } }
      if (best < 0) return;
      g.picked[best] = { t, p: g.cur };
      if (best === g.empty) { g.hitT = t; vibe.strong(); tone(90, 0.7, 'sawtooth', 0.22); }
      else { g.cur++; vibe.tap(); tone(1320, 0.12, 'triangle', 0.18); if (g.cur >= P) g.doneT = t; }
    });
  };
  setup();
  return () => { if (cv) cv.stop(); };
}
