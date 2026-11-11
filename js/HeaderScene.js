/* ============================================================
   HeaderScene.js
   ------------------------------------------------------------
   Brings the header's night-sky backdrop to life: twinkling stars,
   slowly turning gears, floating code glyphs and rising embers.
   Same layout as the class assignment's header scene (stars /
   candles / embers), re-themed to the gear-and-code logo.
   ============================================================ */

// #region Configuration
const STAR_COUNT = 70;
const EMBER_COUNT = 22;
const GLYPH_COUNT = 12;
const GLYPHS = ['</>', '{ }', '();', '01', '=>', '[ ]', '&&', '#', '//', '++'];
// Background gears: left/bottom are CSS positions, size is px, spin is seconds per turn
const BG_GEARS = [
  { left: '-4%', bottom: '-60px',  size: 260, teeth: 12, spin: 70, reverse: false },
  { left: '10%', bottom: '-110px', size: 190, teeth: 10, spin: 52, reverse: true },
  { left: '82%', bottom: '-70px',  size: 300, teeth: 14, spin: 80, reverse: true },
  { left: '70%', bottom: '-120px', size: 170, teeth: 9,  spin: 46, reverse: false }
];
const SVG_NS = 'http://www.w3.org/2000/svg';
// #endregion

// #region Small helpers
/**
 * Returns a random float between min (inclusive) and max (exclusive).
 */
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
// #endregion

// #region Star field
/**
 * Scatters STAR_COUNT twinkling star elements across the header's
 * upper sky. Each star gets its own random position, animation
 * delay, and duration so the twinkling never looks mechanical.
 */
function buildStarField(starLayer) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = randomBetween(0, 100) + '%';
    star.style.top = randomBetween(0, 70) + '%'; // keep stars above the mist
    star.style.animationDelay = randomBetween(0, 3.5) + 's';
    star.style.animationDuration = randomBetween(2.5, 5) + 's';
    fragment.appendChild(star);
  }

  starLayer.appendChild(fragment);
} // buildStarField()
// #endregion

// #region Background gears
/**
 * Builds the outline of a gear as SVG polygon points: alternating
 * tooth tips and valleys around a circle (viewBox is -100..100).
 */
function gearPoints(teeth) {
  const outer = 96;
  const inner = 76;
  const step = (Math.PI * 2) / teeth;
  const points = [];

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    // each tooth: valley start, tip start, tip end, valley end
    const angles = [a, a + step * 0.2, a + step * 0.4, a + step * 0.6];
    const radii = [inner, outer, outer, inner];
    for (let j = 0; j < 4; j++) {
      points.push(
        (Math.cos(angles[j]) * radii[j]).toFixed(1) + ',' +
        (Math.sin(angles[j]) * radii[j]).toFixed(1)
      );
    }
  }

  return points.join(' ');
} // gearPoints()

/**
 * Places the BG_GEARS in the header as slowly rotating SVG outlines
 * (they take the place of the assignment's castle silhouette).
 */
function buildBackgroundGears(gearLayer) {
  const fragment = document.createDocumentFragment();

  BG_GEARS.forEach(function (cfg) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '-100 -100 200 200');
    svg.setAttribute('class', 'bgGear' + (cfg.reverse ? ' reverse' : ''));
    svg.setAttribute('aria-hidden', 'true');
    svg.style.left = cfg.left;
    svg.style.bottom = cfg.bottom;
    svg.style.width = cfg.size + 'px';
    svg.style.height = cfg.size + 'px';
    svg.style.animationDuration = cfg.spin + 's';

    const body = document.createElementNS(SVG_NS, 'polygon');
    body.setAttribute('points', gearPoints(cfg.teeth));
    svg.appendChild(body);

    const hub = document.createElementNS(SVG_NS, 'circle');
    hub.setAttribute('r', '30');
    hub.setAttribute('fill', '#0d1117');
    svg.appendChild(hub);

    fragment.appendChild(svg);
  });

  gearLayer.appendChild(fragment);
} // buildBackgroundGears()
// #endregion

// #region Floating code glyphs
/**
 * Places GLYPH_COUNT code symbols that gently bob up and down, each
 * with its own size, float speed and delay so they drift out of sync
 * (the assignment's "floating candles", reimagined as code).
 */
function buildGlyphs(glyphLayer) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < GLYPH_COUNT; i++) {
    const glyph = document.createElement('span');
    glyph.className = 'glyph';
    glyph.textContent = GLYPHS[i % GLYPHS.length];
    glyph.style.left = randomBetween(3, 94) + '%';
    glyph.style.top = randomBetween(12, 70) + '%';
    glyph.style.fontSize = randomBetween(0.9, 1.9) + 'rem';
    glyph.style.animationDelay = randomBetween(0, 4) + 's';
    glyph.style.animationDuration = randomBetween(6, 11) + 's';
    fragment.appendChild(glyph);
  }

  glyphLayer.appendChild(fragment);
} // buildGlyphs()
// #endregion

// #region Rising embers
/**
 * Sends a steady stream of small green embers/sparkles drifting
 * upward from the bottom of the header, each with a random
 * horizontal drift, delay, and rise duration.
 */
function buildEmbers(emberLayer) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < EMBER_COUNT; i++) {
    const ember = document.createElement('span');
    ember.className = 'ember';
    ember.style.left = randomBetween(0, 100) + '%';
    ember.style.setProperty('--drift', randomBetween(-40, 40) + 'px');
    ember.style.animationDelay = randomBetween(0, 3) + 's';
    ember.style.animationDuration = randomBetween(6, 11) + 's';
    fragment.appendChild(ember);
  }

  emberLayer.appendChild(fragment);
} // buildEmbers()
// #endregion

// #region Init
/**
 * Wires up the whole header scene once the DOM is ready. Bails
 * out quietly for any layer a page doesn't include, so this file is
 * safe to include everywhere.
 */
function initHeaderScene() {
  const starLayer = document.querySelector('.starLayer');
  const gearLayer = document.querySelector('.gearLayer');
  const glyphLayer = document.querySelector('.glyphLayer');
  const emberLayer = document.querySelector('.emberLayer');

  if (starLayer) buildStarField(starLayer);
  if (gearLayer) buildBackgroundGears(gearLayer);
  if (glyphLayer) buildGlyphs(glyphLayer);
  if (emberLayer) buildEmbers(emberLayer);
} // initHeaderScene()

document.addEventListener('DOMContentLoaded', initHeaderScene);
// #endregion
