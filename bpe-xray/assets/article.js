/* BPE X-Ray Vision: interactive figures.
   Data: window.RESULTS / TOK / BENCH / ALU_DEMOS / QWEN_SPLITS (assets/data.js),
   all generated from results/*.json and the Qwen3-0.6B tokenizer. */
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const R = window.RESULTS, TOK = window.TOK, BENCH = window.BENCH, DEMOS = window.ALU_DEMOS;
const NS = 'http://www.w3.org/2000/svg';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function S(tag, a = {}, p) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
function H(tag, a = {}, p) { const e = document.createElement(tag); for (const k in a) { if (k === 'text') e.textContent = a[k]; else if (k === 'html') e.innerHTML = a[k]; else e.setAttribute(k, a[k]); } if (p) p.appendChild(e); return e; }
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cssv = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const pct = v => (Math.round(v * 10) / 10).toFixed(1) + '%';
const vis = t => t.replace(/\n/g, '↵');
function showTok(t) { // leading space shown as a faint dot
  const m = t.match(/^( +)/); const lead = m ? m[1].length : 0;
  return (lead ? '<i class="tsp">' + '·'.repeat(lead) + '</i>' : '') + esc(vis(t.slice(lead)));
}

/* ------------------------------------------------------------------ */
/* tooltip                                                             */
const tip = $('#tip');
function showTip(evt, title, rows) {
  tip.innerHTML = '';
  H('div', { class: 'tt', text: title }, tip);
  rows.forEach(([name, val, col]) => { const r = H('div', { class: 'r' }, tip); const i = H('i', {}, r); i.style.background = col; H('b', { text: val }, r); H('span', { text: name }, r); });
  tip.classList.add('on');
  let x, y; if (evt && evt.clientX != null && evt.type !== 'focus') { x = evt.clientX; y = evt.clientY; } else { const rc = evt.target.getBoundingClientRect(); x = rc.left + rc.width / 2; y = rc.top; }
  const w = tip.offsetWidth, h = tip.offsetHeight; let L = x + 14, T = y - h - 12;
  if (L + w > innerWidth - 8) L = x - w - 14; if (T < 60) T = y + 18;
  tip.style.left = L + 'px'; tip.style.top = T + 'px';
}
const hideTip = () => tip.classList.remove('on');

/* ------------------------------------------------------------------ */
/* Ciechanowski-style knob slider                                       */
function knob(host, o) {
  const { min, max, step = 1, color = '--x-ink-2', ticks, label, onInput, aria } = o;
  const k = H('div', { class: 'knob' + (ticks ? ' has-ticks' : ''), tabindex: 0, role: 'slider', 'aria-valuemin': min, 'aria-valuemax': max, 'aria-label': aria || 'slider' }, host);
  k.style.setProperty('--kc', `var(${color})`);
  k.innerHTML = '<div class="tr"></div><div class="tf"></div><div class="kn"></div>';
  (ticks || []).forEach(t => { const d = H('div', { class: 'tk', text: t.label }, k); d.style.left = ((t.v - min) / (max - min) * 100) + '%'; });
  const lab = label ? H('div', { class: 'knob-label' }, host) : null;
  let v = null;
  function set(nv, force) {
    nv = Math.round((nv - min) / step) * step + min; nv = Math.max(min, Math.min(max, +nv.toFixed(6)));
    if (nv === v && !force) return; v = nv;
    const p = (v - min) / (max - min) * 100;
    k.querySelector('.kn').style.left = p + '%'; k.querySelector('.tf').style.width = p + '%';
    k.setAttribute('aria-valuenow', v); if (lab) lab.textContent = label(v);
    onInput(v);
  }
  const fromEvt = e => { const r = k.getBoundingClientRect(); return min + (e.clientX - r.left) / r.width * (max - min); };
  k.addEventListener('pointerdown', e => { k.setPointerCapture(e.pointerId); k.classList.add('drag'); set(fromEvt(e)); });
  k.addEventListener('pointermove', e => { if (k.classList.contains('drag')) set(fromEvt(e)); });
  ['pointerup', 'pointercancel'].forEach(ev => k.addEventListener(ev, () => k.classList.remove('drag')));
  k.addEventListener('keydown', e => {
    const big = (max - min) / 10;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(v + step); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(v - step); e.preventDefault(); }
    else if (e.key === 'PageUp') { set(v + big); e.preventDefault(); }
    else if (e.key === 'PageDown') { set(v - big); e.preventDefault(); }
    else if (e.key === 'Home') { set(min); e.preventDefault(); }
    else if (e.key === 'End') { set(max); e.preventDefault(); }
  });
  set(o.value, true);
  return { set: x => set(x), get: () => v };
}

function picker(host, items, cur, onPick) {
  host.innerHTML = '';
  items.forEach(([v, html]) => { const b = H('button', { html, type: 'button' }, host); if (v === cur) b.classList.add('on'); b.onclick = () => { $$('button', host).forEach(x => x.classList.remove('on')); b.classList.add('on'); onPick(v); }; });
}

/* ------------------------------------------------------------------ */
/* F_retina, re-implemented from src/char_tables.py                    */
const VOW = new Set('aeiou');
function retinaVec(s) {
  const F = new Float32Array(358), alphas = []; let vowels = 0, cons = 0, up = 0, low = 0, dbl = 0, dig = 0, prev = '';
  for (const ch of s) {
    const cl = ch.toLowerCase();
    if (cl.length === 1 && cl >= 'a' && cl <= 'z') {
      const ci = cl.charCodeAt(0) - 97; F[ci] += 1; alphas.push(ci + 1);
      if (VOW.has(cl)) vowels++; else cons++;
      if (ch !== cl) up++; else low++;
      if (cl === prev) dbl = 1; prev = cl;
    } else { if (/[0-9]/.test(ch)) dig = 1; prev = ''; }
  }
  const n = alphas.length;
  if (n) { F[26 + alphas[0]] = 1; F[53 + alphas[n - 1]] = 1; } else { F[26] = 1; F[53] = 1; }
  for (let p = 0; p < 6; p++) F[80 + p * 27 + (p < n ? alphas[p] : 0)] = 1;
  for (let p = 0; p < 4; p++) F[242 + p * 27 + (p < n ? alphas[n - 1 - p] : 0)] = 1;
  F[350] = s.length / 10; F[351] = n / 10; F[352] = vowels / 10; F[353] = cons / 10;
  F[354] = s[0] === ' ' ? 1 : 0; F[355] = dbl; F[356] = (up > 0 && low === 0) ? 1 : 0; F[357] = dig;
  return { F, alphas };
}
const letters = s => [...s.toLowerCase()].filter(c => c >= 'a' && c <= 'z');

/* ================================================================== */
/* HERO: token lens. Each card stacks an ID face and a character face;  */
/* the lens clips every card's character face to the lens band.         */
(function hero() {
  const stage = $('#hero-stage'); if (!stage) return;
  const [toks, ids] = TOK.hero, Q = 'r';
  const row = H('div', { class: 'trow' }, stage);
  const cards = toks.map((t, i) => {
    const c = H('div', { class: 'tk' }, row);
    const card = H('div', { class: 'tc' }, c);
    H('span', { class: 'f-id', text: ids[i] }, card);
    const m = t.match(/^( +)/), lead = m ? m[1].length : 0;
    const ch = H('span', { class: 'f-ch', html: (lead ? '<i class="tsp">' + '·'.repeat(lead) + '</i>' : '') + [...vis(t.slice(lead))].map(x => x === Q ? '<b>' + x + '</b>' : esc(x)).join('') }, card);
    const eh = H('div', { class: 'eh' }, c), off = H('div', { class: 'eh-off' }, eh), on = H('div', { class: 'eh-on' }, eh);
    const h = Array(26).fill(0); letters(t).forEach(x => h[x.charCodeAt(0) - 97]++);
    for (let j = 0; j < 26; j++) { H('i', {}, off); const bb = H('i', {}, on); bb.style.height = (h[j] ? 6 + 5 * h[j] : 3) + 'px'; if (h[j]) bb.classList.add(String.fromCharCode(97 + j) === Q ? 'q' : 'on'); }
    return { c, faces: [ch, on] };
  });
  const lens = H('div', { class: 'lens' }, stage);
  const grab = H('div', { class: 'grab' }, stage);
  let pos = 0;
  const lensW = W => Math.min(300, Math.max(130, W * (W < 600 ? .42 : .26)));
  function place(p) {
    pos = Math.max(0, Math.min(1, p));
    const sr = stage.getBoundingClientRect(), rr = row.getBoundingClientRect();
    const W = rr.width, lw = lensW(W), L = rr.left - sr.left + pos * (W - lw), Rt = L + lw;
    lens.style.left = L + 'px'; lens.style.width = lw + 'px';
    lens.style.top = (rr.top - sr.top - 14) + 'px'; lens.style.height = (rr.height + 22) + 'px';
    cards.forEach(({ c, faces }) => {
      const cr = c.getBoundingClientRect(), x0 = cr.left - sr.left, x1 = x0 + cr.width;
      const a = Math.max(0, Math.min(cr.width, L - x0)), b = Math.max(0, Math.min(cr.width, x1 - Rt));
      const clip = (a + b >= cr.width) ? 'inset(0 100% 0 0)' : `inset(0 ${b}px 0 ${a}px)`;
      faces.forEach(f => f.style.clipPath = clip);
    });
  }
  const k = knob($('#hero-knob'), { min: 0, max: 1, step: 0.001, value: 0, color: '--x-ink-2', aria: 'Lens position', onInput: v => place(v) });
  let dragging = false;
  const toP = e => { const r = row.getBoundingClientRect(), lw = lensW(r.width); return (e.clientX - r.left - lw / 2) / (r.width - lw); };
  grab.addEventListener('pointerdown', e => { dragging = true; grab.setPointerCapture(e.pointerId); k.set(toP(e)); });
  grab.addEventListener('pointermove', e => { if (dragging) k.set(toP(e)); });
  grab.addEventListener('pointerup', () => dragging = false);
  addEventListener('resize', () => place(pos));
  const target = () => { const r = row.getBoundingClientRect(), lw = lensW(r.width), c = cards[toks.indexOf('aw')].c.getBoundingClientRect(); return Math.max(0, Math.min(1, (c.left + c.width / 2 - r.left - lw / 2) / (r.width - lw))); };
  const go = () => {
    place(0); const T = target();
    if (reduced) { k.set(T); return; }
    const t0 = performance.now(), dur = 1800;
    (function step(now) { const u = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - u, 3); k.set(T * e); if (u < 1) requestAnimationFrame(step); })(t0);
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(go));
})();

/* ================================================================== */
/* Figure 1: benchmark splits                                          */
(function bench() {
  const host = $('#bench'); if (!host) return;
  BENCH.bench.forEach(b => {
    const c = H('div', { class: 'cell' }, host);
    H('div', { class: 'h', text: b.h }, c); H('div', { class: 's', text: b.s }, c);
    b.tok.forEach(([tk]) => {
      const ex = H('div', { class: 'ex' }, c);
      tk.forEach((t, i) => { const sp = H('span', { html: showTok(t) }, ex); const nx = tk[i + 1]; if (b.h.startsWith('Cross') && nx && t.slice(-1) === nx[0]) sp.classList.add('dbl'); if (b.h.startsWith('Cross') && i > 0 && tk[i - 1].slice(-1) === t[0]) sp.classList.add('dbl'); });
    });
  });
})();

/* ================================================================== */
/* Figure 2: anatomy of F_retina                                       */
(function anatomy() {
  const host = $('#anat'); if (!host) return;
  const A = BENCH.anat, order = ['berry', 'str', ' strawberry', 'keeper', 'loon', ' appear'];
  let cur = 'berry';
  picker($('#anat-pick'), order.map(t => [t, '<code>' + showTok(t) + '</code>']), cur, t => { cur = t; draw(); });
  const SEG = [
    { name: 'letter counts', a: 0, n: 26, cols: 26, lab: i => String.fromCharCode(97 + i), kind: 'count' },
    { name: 'first letter', a: 26, n: 27, cols: 27 },
    { name: 'last letter', a: 53, n: 27, cols: 27 },
    ...[0, 1, 2, 3, 4, 5].map(p => ({ name: 'letter ' + (p + 1), a: 80 + p * 27, n: 27, cols: 27, grp: 'first six letters' })),
    ...[0, 1, 2, 3].map(p => ({ name: p ? 'last − ' + p : 'last', a: 242 + p * 27, n: 27, cols: 27, grp: 'last four letters' })),
    { name: 'scalars (8)', a: 350, n: 8, cols: 8, kind: 'scalar', lab: i => ['len', 'alpha', 'vow', 'cons', 'space', 'dbl', 'upper', 'digit'][i] },
  ];
  const SC = ['length / 10', 'alphabetic length / 10', 'vowels / 10', 'consonants / 10', 'leading space', 'internal double', 'all upper-case', 'has digit'];
  const lt = j => j === 0 ? '∅' : String.fromCharCode(96 + j);
  function draw() {
    host.innerHTML = '';
    const { F, alphas } = retinaVec(cur);
    const top = H('div', { class: 'anat-top' }, host);
    const tk = H('div', { class: 'anat-tok' }, top);
    H('div', { class: 'tc', html: showTok(cur) }, tk); H('div', { class: 'id', text: 'token ' + A[cur] }, tk);
    const sl = H('div', {}, top); H('div', { class: 'slots-l', text: 'E_alpha_chars [16]' }, sl);
    const slots = H('div', { class: 'slots' }, sl);
    for (let i = 0; i < 16; i++) { const v = alphas[i]; H('span', { class: v ? '' : 'e', text: v ? String.fromCharCode(96 + v) : '0' }, slots); }
    const SEGC = { count: ['--x-retina', 'letter counts'], fl: ['--x-lora', 'first / last letter'], pos: ['--x-alu', 'first six / last four letters'], scalar: ['--x-sky', 'scalars'] };
    const lg = H('div', { class: 'seglegend' }, host); Object.values(SEGC).forEach(([c, n]) => { const sp = H('span', {}, lg); const i = H('i', {}, sp); i.style.background = `var(${c})`; sp.appendChild(document.createTextNode(n)); });
    const ro = H('div', { class: 'anat-readout', text: 'Hover a cell to see what it encodes.' }, host);
    const bc = H('div', { class: 'barcode' }, host);
    const cw = 15, ch = 15, gap = 2, lw = 196, top0 = 22;
    let y = top0; const rows = [];
    SEG.forEach((s, si) => { if (s.grp && (si === 0 || SEG[si - 1].grp !== s.grp)) y += 10; else if (!s.grp && si) y += 10; rows.push(y); y += ch + gap; });
    const W = lw + 27 * (cw + gap) + 10, Ht = y + 8;
    const svg = S('svg', { width: W, height: Ht, viewBox: `0 0 ${W} ${Ht}`, role: 'img', 'aria-label': 'F_retina vector layout' }, bc);
    for (let j = 0; j < 27; j++) { const t = S('text', { x: lw + j * (cw + gap) + cw / 2, y: 12, 'text-anchor': 'middle', 'font-size': 9.5, style: 'fill:var(--x-ink-3)' }, svg); t.textContent = lt(j); }
    SEG.forEach((s, si) => {
      const yy = rows[si];
      const t = S('text', { x: lw - 10, y: yy + 11, 'text-anchor': 'end', 'font-size': 10.5, style: 'fill:var(--x-ink-2)' }, svg); t.textContent = s.name;
      if (s.grp && (si === 0 || SEG[si - 1].grp !== s.grp)) { const g = S('text', { x: 0, y: yy + 11, 'font-size': 10.5, style: 'fill:var(--x-ink-3)' }, svg); g.textContent = s.grp; }
      for (let j = 0; j < s.n; j++) {
        const idx = s.a + j, v = F[idx];
        const x = lw + (s.kind === 'count' ? j + 1 : j) * (cw + gap);
        let fill = 'var(--x-card)', op = 1;
        const segC = s.kind === 'count' ? '--x-retina' : s.kind === 'scalar' ? '--x-sky' : s.grp ? '--x-alu' : '--x-lora';
        if (s.kind === 'count') { if (v) { fill = String.fromCharCode(97 + j) === 'r' ? 'var(--x-amber)' : `var(${segC})`; op = Math.min(1, .55 + .25 * v); } }
        else if (s.kind === 'scalar') { if (v) { fill = `var(${segC})`; op = Math.min(1, .3 + v); } }
        else if (v) { fill = j === 0 ? 'var(--x-ink-3)' : `var(${segC})`; }
        const r = S('rect', { x, y: yy, width: cw, height: ch, rx: 3.5, style: `fill:${fill};opacity:${op};stroke:var(--x-paper-edge);stroke-width:1` }, svg);
        if (s.kind === 'count' && v) { const n = S('text', { x: x + cw / 2, y: yy + 11, 'text-anchor': 'middle', 'font-size': 9.5, style: 'fill:var(--global-bg-color,#fff);font-weight:700' }, svg); n.textContent = v; }
        
        const desc = s.kind === 'count' ? `count of '${String.fromCharCode(97 + j)}' = ${v}` : s.kind === 'scalar' ? `${SC[j]} = ${(+v.toFixed(2))}` : `${s.name}${s.grp ? ' (' + s.grp + ')' : ''} is ${j === 0 ? '"none"' : "'" + lt(j) + "'"}: ${v}`;
        r.addEventListener('pointerenter', () => { ro.textContent = `F_retina[${idx}]  ·  ${desc}`; r.style.stroke = 'var(--x-ink)'; });
        r.addEventListener('pointerleave', () => { r.style.stroke = 'var(--x-paper-edge)'; });
      }
    });
  }
  draw();
})();

/* ================================================================== */
/* Figure 3: ALU gating timeline                                       */
(function gate() {
  const host = $('#gate'); if (!host) return;
  const [toks] = TOK.alu; // ['[X','RAY',' count',' r',' |',' strawberry',']=','3','\n']
  const N = toks.length, P = 7; // prompt length
  const open = toks.map((_, i) => 1), close = toks.map((_, i) => i >= 6 ? 1 : 0);
  const opPos = 2, argPos = 3, sepPos = 4;
  const active = toks.map((_, i) => (i === 6 || i === 7) ? 1 : 0);
  const writes = { 6: '3', 7: '↵' };
  const note = {
    1: 'The tag opens. Nothing is closed yet, so the ALU is the identity: <b>logits are bit-identical</b>.',
    2: 'Still parsing. The ALU is silent.', 3: 'The op token <code>count</code> is recognised by a vocabulary indicator.',
    4: 'The argument <code>r</code> sets the query letter.', 5: 'The separator <code>|</code> marks where the span begins.',
    6: '<code>" strawberry"</code> is one token. Its row in <code>E_hist</code> holds r = 3.',
    7: 'The span closes at <code>]=</code>. The ALU computes Σ E_hist[span][\'r\'] = 3 and writes <b>3</b>.',
    8: 'The digit is emitted. The ALU writes the terminator.', 9: 'Done. The ALU falls silent again: <b>bit-identical</b> from here on.'
  };
  let t = 7;
  function draw() {
    host.innerHTML = '';
    const g = H('div', { class: 'gate' }, host), tb = H('table', {}, g), body = H('tbody', {}, tb);
    const tr = (cls, label, cells) => { const r = H('tr', { class: cls }, body); H('th', { text: label }, r); cells.forEach(([txt, c]) => H('td', { class: c || '', html: txt }, r)); };
    tr('tok', 'token', toks.map((x, i) => [showTok(x), i >= t ? 'fut' : (i === t - 1 ? 'cur' : '')]));
    const bit = (arr, f) => arr.map((v, i) => [i < t ? String(v) : '', i < t && v ? 'on' : '']);
    tr('bit', 'opened', bit(open));
    tr('bit', 'op · arg · |', toks.map((_, i) => [i < t ? (i === opPos ? 'op' : i === argPos ? 'arg' : i === sepPos ? '|' : '·') : '', i < t && [opPos, argPos, sepPos].includes(i) ? 'on' : '']));
    tr('bit cl', 'closed', bit(close));
    tr('act', 'ALU active', active.map((v, i) => [i < t ? (v ? 'on' : '·') : '', i < t && v ? 'on' : '']));
    tr('wr', 'writes', toks.map((_, i) => [i < t && writes[i] ? writes[i] : '', i < t && writes[i] ? 'w' : '']));
    tr('dh', '‖Δh‖', active.map((v, i) => [i < t ? (v ? 'γ' : '0') : '', i < t && v ? 'nz' : '']));
    H('div', { class: 'gate-note', html: note[t] }, host);
  }
  knob($('#gate-knob'), { min: 1, max: N, step: 1, value: t, color: '--x-alu', aria: 'Generation step', label: v => `step ${v} of ${N}` + (v > P ? '  ·  generated' : '  ·  prompt'), onInput: v => { t = v; draw(); } });
})();

/* ================================================================== */
/* Figure 4: ReLU digit extractor                                      */
(function digits() {
  const host = $('#digits'); if (!host) return;
  const relu = x => Math.max(0, x), step = (x, t) => relu(x - (t - 1)) - relu(x - t);
  const hund = n => { let s = 0; for (let c = 1; c < 10; c++) s += step(n, 100 * c); return s; };
  host.innerHTML = '<div class="digits"><div class="dg-plot"></div><div class="dg-out"></div></div>';
  const plot = $('.dg-plot', host), out = $('.dg-out', host);
  function draw(n) {
    const W = Math.max(300, plot.clientWidth || 460), Hh = 230, m = { l: 34, r: 10, t: 14, b: 30 };
    const pw = W - m.l - m.r, ph = Hh - m.t - m.b, X = v => m.l + pw * v / 999, Y = v => m.t + ph * (1 - v / 9);
    plot.innerHTML = '';
    const svg = S('svg', { viewBox: `0 0 ${W} ${Hh}`, width: W, height: Hh }, plot);
    for (let v = 0; v <= 9; v += 3) { S('line', { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), style: 'stroke:var(--x-grid)' }, svg); const t = S('text', { x: m.l - 8, y: Y(v) + 4, 'text-anchor': 'end', 'font-size': 11, style: 'fill:var(--x-ink-3)' }, svg); t.textContent = v; }
    [0, 250, 500, 750, 999].forEach(v => { const t = S('text', { x: X(v), y: Hh - 10, 'text-anchor': 'middle', 'font-size': 11, style: 'fill:var(--x-ink-3)' }, svg); t.textContent = v; });
    let d = ''; for (let v = 0; v <= 999; v += 1) d += (v ? 'L' : 'M') + X(v).toFixed(1) + ',' + Y(hund(v)).toFixed(1);
    S('path', { d, fill: 'none', style: 'stroke:var(--x-alu);stroke-width:2;stroke-linejoin:round' }, svg);
    const yv = hund(n);
    S('line', { x1: X(n), x2: X(n), y1: m.t, y2: Hh - m.b, style: 'stroke:var(--x-ink-3);stroke-dasharray:2 3' }, svg);
    S('circle', { cx: X(n), cy: Y(yv), r: 5, style: 'fill:var(--x-alu);stroke:var(--x-paper);stroke-width:2' }, svg);
    const lab = S('text', { x: m.l + 4, y: m.t + 10, 'font-size': 11.5, style: 'fill:var(--x-ink-2)' }, svg); lab.textContent = 'hundreds digit = Σ relu_step(n, 100c)';
    const rem = n - 100 * yv; let tens = 0; for (let c = 1; c < 10; c++) tens += step(rem, 10 * c); const ones = rem - 10 * tens;
    const ds = [yv, tens, ones], lead = n < 100 ? (n < 10 ? 2 : 1) : 0;
    out.innerHTML = `<div class="dg-n">n = ${n}</div><div class="dg-digits">${ds.map((x, i) => `<span class="${i < lead ? 'lead' : ''}">${x}</span>`).join('')}</div><div class="dg-lbl"><span>hundreds</span><span>tens</span><span>ones</span></div>
      <div class="dg-eq">rem = ${n} − 100·${yv} = ${rem}<br>tens = Σ relu_step(${rem}, 10c) = ${tens}<br>ones = ${rem} − 10·${tens} = ${ones}</div>`;
  }
  let cur = 347;
  knob($('#digits-knob'), { min: 0, max: 999, step: 1, value: cur, color: '--x-alu', aria: 'n', onInput: v => { cur = v; draw(v); } });
  new ResizeObserver(() => draw(cur)).observe(plot);
})();

/* ================================================================== */
/* Figure 6: recorded ALU log                                          */
(function log() {
  const host = $('#alu-log'); if (!host) return;
  const pick = [['count_real', 0, 'count'], ['length_real', 0, 'len'], ['nth_real', 0, 'nth'], ['spell_real', 1, 'spell'], ['reverse_real', 0, 'reverse'], ['rot13_real', 0, 'rot13'], ['reverse_nonce', 1, 'reverse · pseudo'], ['count_multiword', 0, 'count · multi-word']];
  pick.forEach(([k, i, l]) => { const d = (DEMOS[k] || [])[i]; if (!d) return; H('div', { html: `<span class="lbl">${esc(l)}</span>${esc(d.p)}<u>${esc(d.o)}</u>` }, host); });
})();

/* ================================================================== */
/* Figure 9: three architectures, with labelled arrows                  */
function arrowDefs(svg, id) {
  const d = S('defs', {}, svg);
  [['k', 'var(--x-ink-2)'], ['b', 'var(--x-retina)'], ['g', 'var(--x-ink-3)'], ['v', 'var(--x-alu)']].forEach(([n, c]) => {
    const m = S('marker', { id: `${id}-${n}`, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, d);
    S('path', { d: 'M0 1 L10 5 L0 9 z', style: `fill:${c}` }, m);
  });
}
function T(svg, x, y, txt, o = {}) { const t = S('text', { x, y, 'text-anchor': o.a || 'start', 'font-size': o.fs || 11, style: `fill:${o.c || 'var(--x-ink-2)'};${o.mono ? 'font-family:var(--x-mono);' : ''}${o.w ? 'font-weight:' + o.w + ';' : ''}` }, svg); t.textContent = txt; return t; }
function box(svg, x, y, w, h, o = {}) { return S('rect', { x, y, width: w, height: h, rx: o.rx ?? 8, style: `fill:${o.fill || 'var(--x-card)'};stroke:${o.stroke || 'var(--x-paper-edge)'};stroke-width:${o.sw || 1}${o.dash ? ';stroke-dasharray:' + o.dash : ''}` }, svg); }
function arrow(svg, d, id, kind = 'k', o = {}) { return S('path', { d, fill: 'none', 'marker-end': `url(#${id}-${kind})`, style: `stroke:${kind === 'b' ? 'var(--x-retina)' : kind === 'v' ? 'var(--x-alu)' : kind === 'g' ? 'var(--x-ink-3)' : 'var(--x-ink-2)'};stroke-width:${o.sw || 1.4}${o.dash ? ';stroke-dasharray:' + o.dash : ''}` }, svg); }

(function arch() {
  const host = $('#arch3'); if (!host) return;
  const A = [
    { v: ['no', 'Ignored'], h: 'Layer-0 injection + LoRA', s: 'F_retina is added to the input embeddings; LoRA adapts every layer.', at: [0], kind: 'l0', m: ['70.8%', '−2.4', '10%'] },
    { v: ['meh', 'Weakly used'], h: 'Generic cross-attention (V1)', s: 'Attention taps read raw F_retina at layers 14, 20 and 24. Host frozen.', at: [14, 20, 24], kind: 'v1', m: ['55.0%', '−17.1', '16%'] },
    { v: ['yes', 'Read causally'], h: 'BPE-V2 Word Retina', s: 'A compiled recurrence builds word-level invariants; taps at 16, 20 and 24. Host frozen.', at: [16, 20, 24], kind: 'v2', m: ['97.1%', '−42.6', '88%'], win: true },
  ];
  A.forEach((a, ai) => {
    const bx = H('div', { class: 'a' + (a.win ? ' win' : '') }, host);
    H('span', { class: 'verdict ' + a.v[0], text: a.v[1] }, bx); H('div', { class: 'ah', text: a.h }, bx); H('div', { class: 'as', text: a.s }, bx);
    const W = 320, Ht = 200, id = 'arch' + ai, svg = S('svg', { viewBox: `0 0 ${W} ${Ht}`, role: 'img', 'aria-label': a.h }, bx);
    arrowDefs(svg, id);
    const x0 = 58, lw = 5.4, gap = 2, yL = 112, hL = 44, lx = i => x0 + i * (lw + gap) + lw / 2;
    // input tokens -> stack
    ['str', 'aw', 'berry'].forEach((t, i) => { box(svg, 2, yL - 3 + i * 17, 38, 14, { rx: 2 }); T(svg, 21, yL + 7 + i * 17, t, { a: 'middle', fs: 9, mono: 1 }); });
    arrow(svg, `M42 ${yL + hL / 2} H${x0 - 6}`, id);
    for (let i = 0; i < 28; i++) S('rect', { x: x0 + i * (lw + gap), y: yL, width: lw, height: hL, rx: 1, style: `fill:${a.kind === 'l0' ? 'var(--x-lora)' : 'var(--x-frozen)'};opacity:${a.kind === 'l0' ? .55 : 1}` }, svg);
    arrow(svg, `M${lx(27) + 6} ${yL + hL / 2} H${lx(27) + 26}`, id);
    T(svg, lx(27) + 31, yL + hL / 2 + 5, '3', { fs: 14, c: 'var(--x-ink)', w: 600, mono: 1 });
    [0, 27, ...a.at.filter(i => i)].forEach(i => T(svg, lx(i), yL + hL + 13, String(i), { a: 'middle', fs: 8.5, c: 'var(--x-ink-3)', mono: 1 }));
    T(svg, x0, yL + hL + 30, a.kind === 'l0' ? '✎ every layer LoRA-adapted' : '❄ all 28 layers frozen', { fs: 9.5, c: a.kind === 'l0' ? 'var(--x-lora-ink)' : 'var(--x-ink-3)' });
    // source box(es): two-line, so connecting lines never cross labels
    const col = a.kind === 'v2' ? 'b' : 'k';
    let srcX;
    const two = (x, w, l1, l2, o = {}) => { box(svg, x, 8, w, 40, o); T(svg, x + w / 2, 24, l1, { a: 'middle', fs: 10.5, c: o.ink || 'var(--x-ink)', mono: 1, w: o.ink ? 600 : 400 }); T(svg, x + w / 2, 39, l2, { a: 'middle', fs: 9, c: 'var(--x-ink-3)' }); };
    if (a.kind === 'v2') {
      two(58, 92, 'F_retina', 'per token');
      arrow(svg, 'M152 28 H172', id);
      two(176, 112, 'word scanner', 'Σ per-token rows', { fill: 'var(--x-retina-wash)', stroke: 'var(--x-retina)', ink: 'var(--x-retina-ink)' });
      srcX = 232;
    } else {
      two(96, 124, 'F_retina[ids]', a.kind === 'l0' ? 'per-token features' : 'raw per-token features');
      srcX = 158;
    }
    const busY = 76, lo = Math.min(srcX, ...a.at.map(lx)), hi = Math.max(srcX, ...a.at.map(lx));
    S('path', { d: `M${srcX} 48 V${busY} M${lo} ${busY} H${hi}`, fill: 'none', style: `stroke:${col === 'b' ? 'var(--x-retina)' : 'var(--x-ink-2)'};stroke-width:1.4` }, svg);
    a.at.forEach(i => arrow(svg, `M${lx(i)} ${busY} V${yL - 3}`, id, col));
    if (a.kind === 'l0') T(svg, hi + 6, busY + 4, 'added at layer 0', { fs: 9.5 });
    else T(svg, lo - 6, busY + 4, 'residual taps', { a: 'end', fs: 9.5, c: col === 'b' ? 'var(--x-retina-ink)' : 'var(--x-ink-2)' });
    const m = H('div', { class: 'am' }, bx);
    [['perceptual', a.m[0]], ['ablation Δ', a.m[1]], ['illusion fidelity', a.m[2]]].forEach(([l, v]) => H('div', { html: `<b>${v}</b>${l}` }, m));
  });
})();

/* ================================================================== */
/* Figure 4: ALU block diagram                                          */
(function aluDiagram() {
  const host = $('#alu-diagram'); if (!host) return;
  const W = 1080, Ht = 300, id = 'ad', svg = S('svg', { viewBox: `0 0 ${W} ${Ht}`, role: 'img', 'aria-label': 'X-Ray ALU block diagram' }, host);
  arrowDefs(svg, id);
  const yT = 34, hT = 64, cy = yT + hT / 2;
  // frozen path
  box(svg, 10, yT, 178, hT); T(svg, 22, yT + 22, 'Input tokens', { fs: 12.5, c: 'var(--x-ink)', w: 600 });
  T(svg, 22, yT + 42, '[XRAY count r |', { fs: 11.5, mono: 1 }); T(svg, 22, yT + 57, ' strawberry]=', { fs: 11.5, mono: 1 });
  arrow(svg, `M188 ${cy} H226`, id);
  box(svg, 230, yT, 330, hT); T(svg, 242, yT + 20, 'Frozen transformer · 28 layers', { fs: 12.5, c: 'var(--x-ink)', w: 600 });
  for (let i = 0; i < 28; i++) S('rect', { x: 244 + i * 11, y: yT + 30, width: 8, height: 24, rx: 2, style: 'fill:var(--x-frozen)' }, svg);
  T(svg, 548, yT + 20, '❄ frozen', { a: 'end', fs: 10.5, c: 'var(--x-ink-3)' });
  arrow(svg, `M560 ${cy} H596`, id);
  box(svg, 600, yT, 130, hT); T(svg, 665, cy - 3, 'final', { a: 'middle', fs: 12.5, c: 'var(--x-ink)', w: 600 }); T(svg, 665, cy + 14, 'RMSNorm', { a: 'middle', fs: 12.5, c: 'var(--x-ink)', w: 600 });
  arrow(svg, `M730 ${cy} H770`, id);
  S('circle', { cx: 784, cy, r: 13, style: 'fill:var(--x-alu-wash);stroke:var(--x-alu);stroke-width:1.6' }, svg); T(svg, 784, cy + 5, '+', { a: 'middle', fs: 16, c: 'var(--x-alu-ink)', w: 600 });
  arrow(svg, `M797 ${cy} H836`, id);
  box(svg, 840, yT, 104, hT); T(svg, 892, cy + 5, 'lm_head', { a: 'middle', fs: 12.5, c: 'var(--x-ink)', w: 600, mono: 1 });
  arrow(svg, `M944 ${cy} H980`, id);
  box(svg, 984, yT, 86, hT, { stroke: 'var(--x-alu)', fill: 'var(--x-alu-wash)', rx: 10 }); T(svg, 1027, yT + 22, 'next token', { a: 'middle', fs: 11, c: 'var(--x-ink-2)' }); T(svg, 1027, yT + 50, '3', { a: 'middle', fs: 22, c: 'var(--x-alu-ink)', w: 600, mono: 1 });
  // ALU lane
  const yB = 196, hB = 76, cyB = yB + hB / 2;
  S('rect', { x: 216, y: yB - 26, width: 690, height: hB + 40, rx: 14, style: 'fill:var(--x-alu-wash);stroke:var(--x-alu);stroke-width:1;stroke-dasharray:4 4' }, svg);
  T(svg, 232, yB - 10, 'X-RAY ALU · hand-compiled, 0 trained parameters', { fs: 10.5, c: 'var(--x-alu-ink)', mono: 1, w: 600 });
  const stage = (x, w, n, t1, t2, t3) => { box(svg, x, yB, w, hB, { fill: 'var(--x-card)', stroke: 'var(--x-alu)', rx: 10 }); T(svg, x + 12, yB + 20, n + '  ' + t1, { fs: 12.5, c: 'var(--x-ink)', w: 600 }); T(svg, x + 12, yB + 41, t2, { fs: 11, mono: 1 }); T(svg, x + 12, yB + 59, t3, { fs: 11, c: 'var(--x-ink-3)' }); };
  stage(232, 206, '1', 'Read', 'indicators + prefix sums', 'op = count · arg = r · span');
  stage(470, 220, '2', 'Compute', "Σ E_hist[span]['r'] = 3", 'ReLU digit extractor');
  stage(722, 170, '3', 'Write', "+ γ·W_write['3']", 'argmax becomes "3"');
  arrow(svg, `M438 ${cyB} H466`, id, 'v'); arrow(svg, `M690 ${cyB} H718`, id, 'v');
  arrow(svg, `M784 ${yB - 26} V${cy + 16}`, id, 'v');
  T(svg, 792, 150, 'active only inside', { fs: 10.5, c: 'var(--x-ink-2)' }); T(svg, 792, 164, '[XRAY …]= ; else identity', { fs: 10.5, c: 'var(--x-ink-2)', mono: 1 });
  // token ids into Read, bank into Compute
  arrow(svg, `M99 ${yT + hT} V${cyB} H228`, id, 'g');
  T(svg, 108, 150, 'token IDs', { fs: 10.5, c: 'var(--x-ink-3)' });
  box(svg, 470, 118, 220, 30, { dash: '3 3' }); T(svg, 580, 137, 'CharWeightBank · E_hist, E_alpha_chars', { a: 'middle', fs: 10.5, c: 'var(--x-ink-2)', mono: 1 });
  arrow(svg, `M580 148 V${yB - 4}`, id, 'g');
})();

/* ================================================================== */
/* Figure 8: retina scan                                               */
(function scan() {
  const host = $('#scan'); if (!host) return;
  const WORDS = { strawberry: 'r', balloon: 'l', bookkeeper: 'e', mississippi: 's' };
  let word = 'strawberry', c = 8, kb = null;
  function state(tokens, upto) {
    let off = 0, hist = Array(26).fill(0), grid = Array(16).fill(0), dbl = 0, prevLast = '', len = 0, done = 0;
    for (const t of tokens) {
      const end = off + t.length; if (end > upto) break;
      const L = letters(t);
      if (prevLast && L[0] === prevLast) dbl = 1;            // cross-token double: prev_last · first
      if (retinaVec(t).F[355]) dbl = 1;                        // internal double flag
      L.forEach((ch, j) => { hist[ch.charCodeAt(0) - 97]++; if (len + j < 16) grid[len + j] = ch.charCodeAt(0) - 96; });
      len += L.length; prevLast = L[L.length - 1] || ''; off = end; done++;
    }
    return { hist, grid, dbl, len, done };
  }
  function diff(a, b) { let d = 0; a.hist.forEach((v, i) => d = Math.max(d, Math.abs(v - b.hist[i]))); a.grid.forEach((v, i) => { if (v !== b.grid[i]) d = Math.max(d, 1); }); d = Math.max(d, Math.abs(a.dbl - b.dbl), Math.abs(a.len - b.len)); return d; }
  function rowEl(parent, title, tokens, st, q) {
    const box = H('div', {}, parent);
    H('div', { class: 'sr-h', html: `<span>${esc(title)}</span><span>${tokens.length} tokens</span>` }, box);
    const tr = H('div', { class: 'sr-toks' }, box); let off = 0;
    tokens.forEach((t, i) => {
      const end = off + t.length, cls = end <= c ? 'done' : (off < c ? 'part' : '');
      const sp = H('span', { class: cls, html: [...t].map(ch => ch === q ? `<b class="q">${esc(ch)}</b>` : esc(ch)).join('') }, tr);
      const nx = tokens[i + 1]; if (nx && end + nx.length <= c && t.slice(-1) === nx[0]) sp.classList.add('seamR');
      off = end;
    });
    const hr = H('div', { class: 'st-row' }, box); H('div', { class: 'st-l', text: 'histogram' }, hr);
    const hh = H('div', { class: 'st-hist' }, hr); const mx = 3;
    st.hist.forEach((v, i) => { const ch = String.fromCharCode(97 + i); const d = H('div', { class: ch === q ? 'q' : '' }, hh); const b = H('i', {}, d); b.style.height = Math.min(100, v / mx * 100) + '%'; H('span', { text: ch }, d); });
    const gr = H('div', { class: 'st-row' }, box); H('div', { class: 'st-l', text: 'char grid' }, gr);
    const gg = H('div', { class: 'st-grid' }, gr); st.grid.forEach(v => H('span', { class: v ? '' : 'e', text: v ? String.fromCharCode(96 + v) : '.' }, gg));
    const sr = H('div', { class: 'st-row' }, box); H('div', { class: 'st-l', text: 'scalars' }, sr);
    H('div', { class: 'st-sc', html: `len <b>${st.len}</b>  ·  double <b class="${st.dbl ? 'on' : ''}">${st.dbl}</b>  ·  matched_cnt('${q}') <b>${st.hist[q.charCodeAt(0) - 97]}</b>` }, sr);
  }
  function draw() {
    host.innerHTML = '';
    const q = WORDS[word], A = TOK.alts[word];
    const ca = A.canon[0], aa = A.alt[0];
    const s1 = state(ca, c), s2 = state(aa, c);
    const rows = H('div', { class: 'scan-rows' }, host);
    rowEl(rows, "Qwen3's tokenization", ca, s1, q); rowEl(rows, 'Alternative valid split', aa, s2, q);
    const d = diff(s1, s2);
    H('div', { class: 'scan-diff', html: `max |Δ state| = <b class="${d === 0 ? 'eq0' : ''}">${d}</b>` + (d === 0 ? (c >= word.length ? '  ·  identical for any tokenization' : '  ·  both have consumed the same characters') : '  ·  one tokenization is mid-token') }, host);
  }
  picker($('#scan-pick'), Object.keys(WORDS).map(w => [w, w]), word, w => { word = w; c = Math.min(c, w.length); rebuildKnob(); });
  function rebuildKnob() { const kh = $('#scan-knob'); kh.innerHTML = ''; kb = knob(kh, { min: 0, max: word.length, step: 1, value: Math.min(c, word.length), color: '--x-retina', aria: 'Characters read', label: v => `${v} of ${word.length} characters read`, onInput: v => { c = v; draw(); } }); }
  rebuildKnob();
})();

/* ================================================================== */
/* Figure 12: optical illusion                                         */
(function illusion() {
  const host = $('#ill'); if (!host) return;
  const P = {
    v2_frozen: { name: 'BPE-V2 (frozen host)', fid: 88, p: { '-2': '1', '-1': '2', '0': '3', '1': '3', '2': '3', '3': '3' } },
    v2_lora: { name: 'BPE-V2 + LoRA', fid: 94, p: { '-2': '1', '-1': '2', '0': '3', '1': '2', '2': '2', '3': '2' } },
    v1_frozen: { name: 'Generic V1 (frozen)', fid: 16, p: { '-2': '3', '-1': '3', '0': '3', '1': '3', '2': '3', '3': '3' } },
    l0_lora: { name: 'Layer-0 + LoRA', fid: 10, p: { '-2': '3', '-1': '3', '0': '3', '1': '3', '2': '3', '3': '3' } },
  };
  let arch = 'v2_frozen', d = -1;
  picker($('#ill-pick'), Object.entries(P).map(([k, v]) => [k, v.name]), arch, a => { arch = a; draw(); });
  const toks = TOK.hero[0].slice(0, 19);
  function draw() {
    const c = P[arch], pred = c.p[d], tgt = String(3 + d), ok = pred === tgt;
    let r = [1, 0, 2], rem = -d; if (d >= 0) r[2] += d; else for (let i = 2; i >= 0 && rem > 0; i--) { const t = Math.min(r[i], rem); r[i] -= t; rem -= t; }
    const orig = [1, 0, 2];
    host.innerHTML = `<div class="ill">
      <div class="ill-col"><h5>Input tokens · fixed</h5><div class="ill-prompt">${toks.map((t, i) => `<span class="${i === 14 ? 'pert' : ''}">${showTok(t)}</span>`).join(' ')}</div></div>
      <div class="arr" aria-hidden="true">→</div>
      <div class="ill-col"><h5>F_retina['r'] per token</h5><div class="ill-ret">${['str', 'aw', 'berry'].map((t, i) => `<div class="c"><div class="b ${orig[i] !== r[i] ? 'ed' : ''}"><i style="height:${r[i] / 5 * 100}%"></i><em>${r[i]}</em></div>${t}</div>`).join('')}<div class="c"><div class="b ${d ? 'ed' : ''}"><i style="height:${(3 + d) / 6 * 100}%"></i><em>${3 + d}</em></div>word</div></div></div>
      <div class="arr" aria-hidden="true">→</div>
      <div class="ill-col ill-out"><h5>Next-token prediction</h5><div class="ill-pred ${ok ? 'y' : 'n'}">${pred}</div>
        <div class="ill-st">illusion target ${tgt} · true count 3<br>${ok ? '<span class="c-retina">follows the retina</span>' : 'ignores the edit'}</div>
        <div class="ill-sweep">${[-2, -1, 0, 1, 2, 3].map(v => `<div data-d="${v}" class="${c.p[v] === String(3 + v) ? 'hit' : ''} ${v === d ? 'cur' : ''}">δ ${v > 0 ? '+' : ''}${v}<b>${c.p[v]}</b></div>`).join('')}</div></div>
    </div><div class="ill-note">${esc(c.name)} · systematic fidelity <b>${c.fid}%</b> (25 words, n = 50)</div>`;
    $$('.ill-sweep div', host).forEach(el => el.onclick = () => kb.set(+el.dataset.d));
  }
  const kb = knob($('#ill-knob'), { min: -2, max: 3, step: 1, value: d, color: '--x-amber', aria: 'delta', ticks: [-2, -1, 0, 1, 2, 3].map(v => ({ v, label: (v > 0 ? '+' : '') + v })), onInput: v => { d = v; draw(); } });
})();

/* ================================================================== */
/* Charts                                                              */
const ENT = {
  v2_frozen: { name: 'BPE-V2 Word Retina (frozen)', short: 'Word Retina', c: '--x-retina' },
  v2_lora: { name: 'BPE-V2 + LoRA', short: 'V2 + LoRA', c: '--x-blue2' },
  plain_lora: { name: 'Plain LoRA', short: 'LoRA', c: '--x-lora' },
  v1_frozen: { name: 'Generic V1 (frozen)', short: 'V1', c: '--x-v1', dash: '6 5' },
  v1_lora: { name: 'Generic V1 + LoRA', short: 'V1 + LoRA', c: '--x-v1' },
  retina_lora: { name: 'Layer-0 retina + LoRA', short: 'Layer-0', c: '--x-l0', dash: '2 4' },
  l0_lora: { name: 'Layer-0 retina + LoRA', short: 'Layer-0', c: '--x-l0' },
};
function legend(el, items) { const L = H('div', { class: 'legend' }, el); items.forEach(it => { const s = H('span', {}, L); const i = H('i', { class: (it.line ? 'ln' : '') + (it.dash ? ' dash' : '') }, s); i.style.background = `var(${it.c})`; i.style.setProperty('--c', `var(${it.c})`); if (it.hollow) { i.style.background = 'transparent'; i.style.boxShadow = `inset 0 0 0 2px var(${it.c})`; } s.appendChild(document.createTextNode(it.name)); }); }

/* dot-row chart (Cleveland dots / dumbbells) */
function dotRows(el, o) {
  const W = Math.max(300, el.clientWidth), small = W < 520;
  const lw = o.labelW ? (small ? o.labelW * .78 : o.labelW) : (small ? 96 : 132), m = { l: lw, r: o.rightPad ?? 44, t: o.title ? 58 : 24, b: 10 };
  const rh = small ? 24 : 26; let y = m.t; const ys = [];
  o.rows.forEach((r, i) => { if (r.group && (i === 0 || o.rows[i - 1].group !== r.group)) y += 22; ys.push(y + rh / 2); y += rh; });
  const Ht = y + m.b, pw = W - m.l - m.r, X = v => m.l + pw * v / 100;
  const svg = S('svg', { viewBox: `0 0 ${W} ${Ht}`, width: W, height: Ht, role: 'img', 'aria-label': o.aria || '' }, el);
  if (o.title) { const t = S('text', { x: 0, y: 14, class: 'ttl' }, svg); t.textContent = o.title; if (o.sub) { const s = S('text', { x: 0, y: 30, 'font-size': 11.5 }, svg); s.textContent = o.sub; } }
  [0, 25, 50, 75, 100].forEach(v => { S('line', { x1: X(v), x2: X(v), y1: m.t - 6, y2: Ht - m.b, class: 'grid' }, svg); const t = S('text', { x: X(v), y: m.t - 10, 'text-anchor': 'middle', 'font-size': 11 }, svg); t.textContent = v + (v === 100 ? '%' : ''); });
  if (o.valueKey && o.valueHead) { const t = S('text', { x: W - 2, y: m.t - 10, 'text-anchor': 'end', 'font-size': 11, style: 'fill:var(--x-ink-2);font-weight:600' }, svg); t.textContent = o.valueHead; }
  if (o.groupTint) { const gs = {}; o.rows.forEach((r, i) => { if (!r.group) return; (gs[r.group] = gs[r.group] || []).push(ys[i]); }); Object.entries(gs).forEach(([g, yy]) => { const c = o.groupTint[g]; if (c) S('rect', { x: m.l - 4, y: Math.min(...yy) - rh / 2, width: pw + 8, height: Math.max(...yy) - Math.min(...yy) + rh, rx: 8, style: `fill:var(${c})` }, svg); }); }
  o.rows.forEach((r, i) => {
    const yc = ys[i];
    if (r.group && (i === 0 || o.rows[i - 1].group !== r.group)) { const g = S('text', { x: 2, y: yc - rh / 2 - 6, 'font-size': 10.5, style: 'fill:var(--x-ink-3);letter-spacing:.06em;text-transform:uppercase' }, svg); g.textContent = r.group.toUpperCase(); }
    const grp = S('g', { class: 'row', tabindex: 0, 'aria-label': r.label + ': ' + o.series.map(s => s.name + ' ' + (r.v[s.key] == null ? 'n/a' : pct(r.v[s.key]))).join(', ') }, svg);
    S('rect', { x: 0, y: yc - rh / 2, width: W, height: rh, class: 'hl', style: 'fill:transparent', rx: 3 }, grp);
    const lt = S('text', { x: m.l - 12, y: yc + 4, 'text-anchor': 'end', class: 'tl', 'font-size': small ? 11.5 : 12.5 }, grp); lt.textContent = r.label;
    const vals = o.series.map(s => r.v[s.key]).filter(v => v != null);
    if (o.connect !== false && vals.length > 1) S('line', { x1: X(Math.min(...vals)), x2: X(Math.max(...vals)), y1: yc, y2: yc, style: 'stroke:var(--x-frozen);stroke-width:5;stroke-linecap:round' }, grp);
    o.series.forEach(s => { const v = r.v[s.key]; if (v == null) return; S('circle', { cx: X(v), cy: yc, r: 6.5, style: s.hollow ? `fill:var(--x-card);stroke:var(${s.c});stroke-width:2.2` : `fill:var(${s.c});stroke:var(--x-card);stroke-width:2` }, grp); });
    if (o.valueKey && r.v[o.valueKey] != null) { const v = r.v[o.valueKey]; const t = S('text', { x: W - 2, y: yc + 4, class: 'vl', 'text-anchor': 'end' }, grp); t.textContent = o.valueFmt ? o.valueFmt(r) : Math.round(v); }
    const on = e => showTip(e, r.label, o.series.filter(s => r.v[s.key] != null).map(s => [s.name, pct(r.v[s.key]), cssv(s.c)]));
    grp.addEventListener('pointermove', on); grp.addEventListener('pointerleave', hideTip); grp.addEventListener('focus', on); grp.addEventListener('blur', hideTip);
  });
}

function lineChart(el, o) {
  const W = Math.max(300, el.clientWidth), small = W < 560, Ht = small ? 260 : 300, m = { l: 36, r: small ? 12 : 130, t: 14, b: 38 };
  const svg = S('svg', { viewBox: `0 0 ${W} ${Ht}`, width: W, height: Ht, role: 'img', 'aria-label': o.aria }, el);
  const pw = W - m.l - m.r, ph = Ht - m.t - m.b, lx = o.x.map(Math.log2), x0 = Math.min(...lx), x1 = Math.max(...lx);
  const X = i => m.l + 14 + (pw - 28) * (lx[i] - x0) / (x1 - x0), Y = v => m.t + ph * (1 - v / 100);
  [0, 25, 50, 75, 100].forEach(v => { S('line', { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), class: 'grid' }, svg); const t = S('text', { x: m.l - 8, y: Y(v) + 4, 'text-anchor': 'end', 'font-size': 11 }, svg); t.textContent = v + (v === 100 ? '%' : ''); });
  o.x.forEach((v, i) => { const t = S('text', { x: X(i), y: Ht - m.b + 18, 'text-anchor': 'middle', 'font-size': 11.5 }, svg); t.textContent = v.toLocaleString(); });
  const xt = S('text', { x: m.l + pw / 2, y: Ht - 2, 'text-anchor': 'middle', 'font-size': 11 }, svg); xt.textContent = 'training examples (log scale)';
  S('rect', { x: m.l, y: Y(o.ref), width: pw, height: Y(0) - Y(o.ref), style: 'fill:var(--x-frozen);opacity:.55' }, svg); S('line', { x1: m.l, x2: W - m.r, y1: Y(o.ref), y2: Y(o.ref), style: 'stroke:var(--x-l0);stroke-width:1.5' }, svg);
  const rt = S('text', { x: m.l + 6, y: Y(o.ref) - 6, 'font-size': 11 }, svg); rt.textContent = 'frozen base · ' + pct(o.ref);
  const xh = S('line', { y1: m.t, y2: Ht - m.b, style: 'stroke:var(--x-ink-3);stroke-width:1;opacity:0' }, svg);
  o.series.forEach(s => {
    S('path', { d: s.values.map((v, i) => (i ? 'L' : 'M') + X(i) + ',' + Y(v)).join(''), fill: 'none', style: `stroke:var(${s.c});stroke-width:${s.dash ? 2 : 3};stroke-linejoin:round;stroke-linecap:round${s.dash ? ';stroke-dasharray:' + s.dash : ''}` }, svg);
    s.values.forEach((v, i) => S('circle', { cx: X(i), cy: Y(v), r: s.dash ? 3.5 : 5, style: `fill:var(${s.c});stroke:var(--x-card);stroke-width:2` }, svg));
  });
  if (!small) { // end labels, nudged apart with leader lines when needed
    const ends = o.series.map(s => ({ s, y: Y(s.values.at(-1)) })).sort((a, b) => a.y - b.y);
    let last = -1e9; ends.forEach(e => { e.ly = Math.max(e.y, last + 15); last = e.ly; });
    ends.forEach(e => { const xe = X(o.x.length - 1); if (Math.abs(e.ly - e.y) > 1) S('path', { d: `M${xe + 6},${e.y} L${xe + 14},${e.ly}`, fill: 'none', style: 'stroke:var(--x-rule-2)' }, svg); const t = S('text', { x: xe + 16, y: e.ly + 4, 'font-size': 11.5, style: 'fill:var(--x-ink-2)' }, svg); t.textContent = `${e.s.short} ${pct(e.s.values.at(-1))}`; });
  }
  const ov = S('rect', { x: m.l, y: m.t, width: pw, height: ph, class: 'hit', tabindex: 0, 'aria-label': 'Values by training-set size' }, svg);
  let ki = o.x.length - 1;
  const at = (i, e) => { xh.setAttribute('x1', X(i)); xh.setAttribute('x2', X(i)); xh.style.opacity = 1; showTip(e, o.x[i].toLocaleString() + ' examples', [...o.series].sort((a, b) => b.values[i] - a.values[i]).map(s => [s.name, pct(s.values[i]), cssv(s.c)]).concat([['frozen base', pct(o.ref), cssv('--x-base')]])); };
  ov.addEventListener('pointermove', e => { const r = svg.getBoundingClientRect(), px = (e.clientX - r.left) * (W / r.width); let b = 0, dd = 1e9; o.x.forEach((_, i) => { const q = Math.abs(X(i) - px); if (q < dd) { dd = q; b = i; } }); ki = b; at(b, e); });
  ov.addEventListener('pointerleave', () => { xh.style.opacity = 0; hideTip(); });
  ov.addEventListener('focus', e => at(ki, e)); ov.addEventListener('blur', () => { xh.style.opacity = 0; hideTip(); });
  ov.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { ki = Math.max(0, Math.min(o.x.length - 1, ki + (e.key === 'ArrowRight' ? 1 : -1))); at(ki, { type: 'focus', target: ov }); e.preventDefault(); } });
}

function bars(el, o) {
  const W = Math.max(300, el.clientWidth), small = W < 520, lw = small ? 108 : 190, m = { l: lw, r: 46, t: 24, b: 8 }, rh = 30;
  const Ht = m.t + m.b + rh * o.rows.length, pw = W - m.l - m.r, X = v => m.l + pw * v / 100;
  const svg = S('svg', { viewBox: `0 0 ${W} ${Ht}`, width: W, height: Ht, role: 'img', 'aria-label': o.aria }, el);
  [0, 25, 50, 75, 100].forEach(v => { S('line', { x1: X(v), x2: X(v), y1: m.t - 6, y2: Ht - m.b, class: 'grid' }, svg); const t = S('text', { x: X(v), y: m.t - 10, 'text-anchor': 'middle', 'font-size': 11 }, svg); t.textContent = v + (v === 100 ? '%' : ''); });
  o.rows.forEach((r, i) => {
    const yc = m.t + rh * i + rh / 2, w = X(r.v) - X(0), rr = Math.min(4, w);
    const g = S('g', { class: 'row', tabindex: 0, 'aria-label': `${r.name}: ${r.v}%` }, svg);
    S('rect', { x: 0, y: yc - rh / 2, width: W, height: rh, class: 'hl', style: 'fill:transparent', rx: 3 }, g);
    const t = S('text', { x: m.l - 12, y: yc + 4, 'text-anchor': 'end', class: 'tl', 'font-size': small ? 11.5 : 12.5 }, g); t.textContent = small ? r.short : r.name;
    S('rect', { x: X(0), y: yc - 9, width: pw, height: 18, rx: 9, style: 'fill:var(--x-frozen);opacity:.55' }, g); S('rect', { x: X(0), y: yc - 9, width: Math.max(18, w), height: 18, rx: 9, style: `fill:var(${r.c})` }, g);
    const v = S('text', { x: X(0) + w + 8, y: yc + 4, class: 'vl' }, g); v.textContent = Math.round(r.v) + '%';
    const on = e => showTip(e, r.name, [['edits followed', pct(r.v), cssv(r.c)]]);
    g.addEventListener('pointermove', on); g.addEventListener('pointerleave', hideTip); g.addEventListener('focus', on); g.addEventListener('blur', hideTip);
  });
}

const CH = {};
CH.alu = () => {
  const el = $('#chart-alu'); el.innerHTML = '';
  const split = $('#fig-alu .seg button.on').dataset.v;
  const wrap = H('div', {}, el); legend(wrap, [{ name: 'Base model (2-shot)', c: '--x-v1', hollow: true }, { name: '+ X-Ray ALU', c: '--x-alu' }]);
  const grid = H('div', {}, el); const W = el.clientWidth, cols = W < 760 ? 1 : 3; grid.style.cssText = `display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px`;
  const T = [['count', 'count'], ['length', 'length'], ['nth', 'nth'], ['spell', 'spell'], ['reverse', 'reverse'], ['rot13', 'rot13']];
  Object.keys(R.alu).forEach(model => {
    const A = R.alu[model], cell = H('div', {}, grid);
    const rows = T.map(([k, l]) => ({ label: l, v: { b: A[k + '_' + split][0], a: A[k + '_' + split][1] } }));
    if (split === 'real') rows.push({ label: 'multi-word', v: { b: A.count_multiword[0], a: A.count_multiword[1] } });
    dotRows(cell, { title: model, sub: `compiled in ${R.aluCompile[model].toFixed(1)} s`, rows, labelW: 82, rightPad: 18, series: [{ key: 'b', name: 'Base (2-shot)', c: '--x-v1', hollow: true }, { key: 'a', name: '+ ALU', c: '--x-alu' }], aria: model });
  });
};
CH.eff = () => {
  const el = $('#chart-eff'); el.innerHTML = '';
  const j = +$('#fig-eff .seg button.on').dataset.v, E = R.eff;
  const series = ['v2_frozen', 'plain_lora', 'retina_lora', 'v1_frozen'].map(k => ({ ...ENT[k], values: E[k].map(r => r[j]) }));
  legend(el, series.map(s => ({ name: s.name, c: s.c, line: true, dash: s.dash })));
  const box = H('div', {}, el);
  lineChart(box, { x: E.v2_frozen.map(r => r[0]), series, ref: j === 1 ? R.baseReal.perc : R.baseReal.all, aria: 'Accuracy versus training examples' });
};
CH.tasks = () => {
  const el = $('#chart-tasks'); el.innerHTML = '';
  const T = R.perTask, names = ['count', 'length', 'nth', 'double', 'cross-token doubles', 'multi-word count', 'anagram', 'delete', 'replace', 'reverse'];
  const grp = i => i < 5 ? 'perceptual' : i < 7 ? 'OOD (never trained)' : 'string surgery';
  const series = [{ key: 'plain_lora', ...ENT.plain_lora }, { key: 'v2_lora', ...ENT.v2_lora }, { key: 'v2_frozen', ...ENT.v2_frozen }];
  legend(el, series.slice().reverse().map(s => ({ name: s.name, c: s.c })));
  const box = H('div', {}, el);
  dotRows(box, { rows: names.map((n, i) => ({ label: n, group: grp(i), v: { plain_lora: T.plain_lora[i], v2_lora: T.v2_lora[i], v2_frozen: T.v2_frozen[i] } })), series, valueKey: 'v2_frozen', valueHead: 'V2', valueFmt: r => Math.round(r.v.v2_frozen), labelW: 150, rightPad: 50, groupTint: { perceptual: '--x-retina-wash', 'OOD (never trained)': '--x-alu-wash', 'string surgery': '--x-lora-wash' }, aria: 'Per-task accuracy' });
};
CH.ablate = () => {
  const el = $('#chart-ablate'); el.innerHTML = '';
  const B = R.blind, names = ['held-out words', 'pseudowords', 'compound', 'cross-token doubles'];
  legend(el, [{ name: 'Retina on', c: '--x-retina' }, { name: 'Ablated (scale = 0)', c: '--x-v1', hollow: true }]);
  const box = H('div', {}, el);
  dotRows(box, { rows: names.map((n, i) => ({ label: n, v: { on: B.on[i], off: B.off[i] } })), series: [{ key: 'off', name: 'Ablated', c: '--x-v1', hollow: true }, { key: 'on', name: 'Retina on', c: '--x-retina' }], valueKey: 'on', valueHead: 'Δ', valueFmt: r => '−' + (r.v.on - r.v.off).toFixed(1), labelW: 150, rightPad: 60, aria: 'Ablation' });
};
CH.fid = () => {
  const el = $('#chart-fid'); el.innerHTML = '';
  bars(el, { rows: ['l0_lora', 'v1_lora', 'v1_frozen', 'v2_frozen', 'v2_lora'].map(k => ({ name: ENT[k].name, short: ENT[k].short, c: k.startsWith('v2') ? ENT[k].c : '--x-l0', v: R.fid[k] })), aria: 'Illusion fidelity' });
};
CH.stress = () => {
  const el = $('#chart-stress'); el.innerHTML = '';
  const order = ['v2_frozen', 'v2_lora', 'plain_lora', 'v1_frozen'];
  const a = H('div', { class: 'chartbox' }, el), b = H('div', { class: 'chartbox' }, el);
  const mk = (box, title, sub, data, k1, k2, n1, n2) => {
    legend(box, [{ name: n1, c: '--x-ink-2', hollow: true }, { name: n2, c: '--x-ink-2' }]);
    const inner = H('div', {}, box);
    // per-entity colour: draw each row with its own series colour
    const rows = order.map(k => ({ label: ENT[k].short, v: { [k1 + k]: data[k][0], [k2 + k]: data[k][1] } }));
    const series = order.flatMap(k => [{ key: k1 + k, name: n1, c: ENT[k].c, hollow: true }, { key: k2 + k, name: n2, c: ENT[k].c }]);
    dotRows(inner, { title, sub, rows, series, labelW: 96, rightPad: 14, aria: title });
  };
  mk(a, 'Compound pseudowords', 'all 7 tasks (○) vs. perceptual (●)', { v2_frozen: [R.compound.v2_frozen[1], R.compound.v2_frozen[0]], v2_lora: [R.compound.v2_lora[1], R.compound.v2_lora[0]], plain_lora: [R.compound.plain_lora[1], R.compound.plain_lora[0]], v1_frozen: [R.compound.v1_frozen[1], R.compound.v1_frozen[0]] }, 'a', 'p', 'all 7 tasks', 'perceptual');
  mk(b, 'Re-tokenization', 'canonical (○) vs. random re-split (●) · count, length, nth, reverse', R.retok, 'c', 's', 'canonical', 'random re-split');
};

(function numberFigures() {
  let n = 0;
  $$('d-article figure figcaption > strong:first-child').forEach(st => { if (/^Figure \d+\./.test(st.textContent)) { n++; st.textContent = `Figure ${n}.`; } });
})();

function wire(figId, fn) { $$(`#${figId} .seg`).forEach(s => $$('button', s).forEach(btn => btn.onclick = () => { $$('button', s).forEach(x => x.classList.remove('on')); btn.classList.add('on'); fn(); })); }
wire('fig-alu', CH.alu); wire('fig-eff', CH.eff);
function drawAll() { Object.values(CH).forEach(f => { try { f(); } catch (e) { console.error(e); } }); }
drawAll();
let rt, lastW = innerWidth; addEventListener('resize', () => { if (Math.abs(innerWidth - lastW) < 4) return; lastW = innerWidth; clearTimeout(rt); rt = setTimeout(drawAll, 120); });
})();
