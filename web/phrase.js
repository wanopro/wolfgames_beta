// 🗣️ 회화 카드: 자주 쓰는 말을 현지어 큰 글씨로 (인터넷 없이, 문구는 i18n 에서)
import { S, h, btn, top, vibe, lang, LANGS, SEP } from './core.js';
import { STRINGS } from './i18n.js';

export const PH_ICONS = ['🚻', '👉', '🧾', '💰', '🌶️', '🌿', '🧊', '💧', '🍺', '🥡', '💳', '🏷️', '📄', '📸', '📶', '💊', '🆘', '🥜'];
const KEY = 'wg-ph-to';
const main = (x) => String(x).split(SEP)[0];
function defaultTo() {
  try { const v = localStorage.getItem(KEY); if (v && STRINGS[v]) return v; } catch (_) { /* 무시 */ }
  if (lang.second) return lang.second;
  return lang.current === 'en' ? 'ko' : 'en';
}

export function phraseScreen(root, back) {
  const s = S();
  let to = defaultTo();
  const mine = STRINGS[lang.current].phrases.split('|');
  const list = h('div', { style: 'display:flex;flex-direction:column;gap:8px' });
  const chips = h('div', { class: 'phlangs' });
  const draw = () => {
    const theirs = STRINGS[to].phrases.split('|');
    chips.replaceChildren(...LANGS.map((L) => btn([h('span', { class: 'flag' }, L.flag), L.label], () => { to = L.code; try { localStorage.setItem(KEY, to); } catch (_) { /* 무시 */ } vibe.tap(); draw(); }, 'chip' + (L.code === to ? ' on' : ''))));
    list.replaceChildren(...mine.map((m, i) => btn([h('span', { class: 'phic' }, PH_ICONS[i]), h('div', { class: 'phtx' }, h('b', {}, m), to !== lang.current ? h('span', {}, theirs[i]) : null)], () => { vibe.tap(); show(i); }, 'phrow')));
  };
  const show = (i) => {
    const theirs = STRINGS[to].phrases.split('|'), n = theirs.length;
    const wrap = h('div', { class: 'qrfull phfull' });
    const paint = () => {
      wrap.replaceChildren(
        h('div', { class: 'phbig-ic' }, PH_ICONS[i]),
        h('div', { class: 'phbig' }, theirs[i]),
        to !== lang.current ? h('div', { class: 'phsmall' }, mine[i]) : null,
        h('div', { class: 'qrbar' },
          btn('‹', () => { i = (i + n - 1) % n; vibe.tap(); paint(); }, 'qrbtn2'),
          btn(main(s.qrClose), () => wrap.remove(), 'qrbtn'),
          btn('›', () => { i = (i + 1) % n; vibe.tap(); paint(); }, 'qrbtn2')));
    };
    paint(); root.append(wrap);
  };
  draw();
  root.append(top(`🗣️ ${s.phTitle}`, back), h('div', { class: 'scroll', style: 'gap:10px' },
    h('div', { class: 'desc' }, s.phDesc),
    h('div', { class: 'lbl', style: 'color:var(--sub);font-size:14px' }, s.phTo), chips, list));
}
