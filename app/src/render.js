// UI Rendering module for Leonida Trophy Compendium
// Builds accessible, responsive cards, roadmap stages, and statistical dashboards

import { maskTrophy } from './spoilers.js';

/**
 * Escapes HTML characters for safe DOM insertion
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates grade pill HTML with distinctive trophy color styles
 * @param {string} grade
 * @returns {string}
 */
export function renderGradeBadge(grade) {
  const g = (grade || 'bronze').toLowerCase();
  const label = g.charAt(0).toUpperCase() + g.slice(1);
  return `<span class="grade-badge grade-${g}">${label}</span>`;
}

/**
 * Updates the global statistics header banner
 * @param {HTMLElement} container
 * @param {object} stats
 */
export function renderStatsHeader(container, stats) {
  if (!container) return;
  const { total, earned, percent, byGrade } = stats;

  container.innerHTML = `
    <div class="stats-overview">
      <div class="stats-metric">
        <span class="metric-value">${earned} / ${total}</span>
        <span class="metric-label">Trophies Earned</span>
      </div>
      <div class="stats-metric">
        <span class="metric-value">${percent}%</span>
        <span class="metric-label">Platinum Progress</span>
      </div>
      <div class="stats-grades">
        <span class="grade-count grade-platinum" title="Platinum">${byGrade.platinum.earned}/${byGrade.platinum.total} Plat</span>
        <span class="grade-count grade-gold" title="Gold">${byGrade.gold.earned}/${byGrade.gold.total} Gold</span>
        <span class="grade-count grade-silver" title="Silver">${byGrade.silver.earned}/${byGrade.silver.total} Silver</span>
        <span class="grade-count grade-bronze" title="Bronze">${byGrade.bronze.earned}/${byGrade.bronze.total} Bronze</span>
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar-fill" style="width: ${percent}%;"></div>
    </div>
  `;
}

/**
 * Renders an individual trophy card element
 * @param {object} trophy
 * @param {boolean} isEarned
 * @param {boolean} spoilerShield
 * @returns {string} HTML string
 */
export function renderTrophyCardHtml(trophy, isEarned, spoilerShield) {
  const masked = maskTrophy(trophy, isEarned, spoilerShield);
  const earnedClass = isEarned ? 'earned' : 'locked';
  const missableBadge = trophy.missable
    ? `<span class="badge badge-missable" title="Can be missed if story choices or companion windows are passed!">⚠️ Missable</span>`
    : '';
  const hiddenBadge = trophy.hidden
    ? `<span class="badge badge-hidden">Hidden</span>`
    : '';
  const stageBadge = trophy.roadmapStage
    ? `<span class="badge badge-stage">Stage ${trophy.roadmapStage}</span>`
    : '';
  const categoryBadge = trophy.category
    ? `<span class="badge badge-category">${trophy.category.toUpperCase()}</span>`
    : '';

  return `
    <article class="trophy-card ${earnedClass}" data-trophy-id="${trophy.id}" data-name="${escapeHtml(trophy.name)}">
      <div class="card-main">
        <label class="checkbox-container" title="${isEarned ? 'Mark Locked' : 'Mark Earned'}">
          <input type="checkbox" class="trophy-checkbox" data-name="${escapeHtml(trophy.name)}" ${isEarned ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <div class="trophy-info">
          <div class="trophy-header-line">
            <span class="trophy-index">#${trophy.id}</span>
            <h3 class="trophy-title ${masked.isMasked ? 'masked-title' : ''}">${escapeHtml(masked.displayName)}</h3>
            ${renderGradeBadge(trophy.grade)}
          </div>
          <p class="trophy-desc ${masked.isMasked ? 'masked-desc' : ''}">${escapeHtml(masked.displayDesc)}</p>
          <div class="trophy-badges">
            ${categoryBadge}
            ${stageBadge}
            ${missableBadge}
            ${hiddenBadge}
          </div>
        </div>
        <button type="button" class="btn-toggle-guide" aria-label="Toggle Strategy Guide">
          <span class="guide-toggle-icon">📖 Guide</span>
        </button>
      </div>
      <div class="card-guide-drawer">
        <div class="guide-content">
          <h4>Strategy & Walkthrough</h4>
          <p class="guide-text">${escapeHtml(masked.displayGuide)}</p>
          <div class="guide-citation">
            <span class="citation-badge">📌 ${escapeHtml(trophy.citation || 'Verified Source')}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renders the full list of trophies into a container and binds event listeners
 * @param {HTMLElement} container
 * @param {Array<object>} trophyList
 * @param {Set<string>} earnedSet
 * @param {boolean} spoilerShield
 * @param {Function} onToggleEarned
 */
export function renderTrophyList(container, trophyList, earnedSet, spoilerShield, onToggleEarned) {
  if (!container) return;

  if (trophyList.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-text">No trophies found matching the selected filters.</p>
        <p class="empty-subtext">Try resetting filters or adjusting your search term.</p>
      </div>
    `;
    return;
  }

  const html = trophyList
    .map((t) => renderTrophyCardHtml(t, earnedSet.has(t.name), spoilerShield))
    .join('');
  container.innerHTML = html;

  // Bind checkbox events
  container.querySelectorAll('.trophy-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const name = e.target.getAttribute('data-name');
      if (name && onToggleEarned) {
        onToggleEarned(name);
      }
    });
  });

  // Bind guide expansion toggles
  container.querySelectorAll('.btn-toggle-guide').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.trophy-card');
      if (card) {
        card.classList.toggle('expanded');
      }
    });
  });
}

/**
 * Renders the Platinum Roadmap interactive overview
 * @param {HTMLElement} container
 * @param {Array<object>} stages
 * @param {Array<object>} allTrophies
 * @param {Set<string>} earnedSet
 * @param {boolean} spoilerShield
 * @param {Function} onToggleEarned
 */
export function renderRoadmapView(container, stages, allTrophies, earnedSet, spoilerShield, onToggleEarned) {
  if (!container) return;

  const html = stages
    .map((stage) => {
      const stageTrophies = allTrophies.filter((t) => t.roadmapStage === stage.stage);
      const stageEarned = stageTrophies.filter((t) => earnedSet.has(t.name)).length;
      const stagePercent = stageTrophies.length > 0 ? Math.round((stageEarned / stageTrophies.length) * 100) : 0;

      const actionsHtml = stage.keyActionItems
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('');

      const trophiesHtml = stageTrophies
        .map((t) => renderTrophyCardHtml(t, earnedSet.has(t.name), spoilerShield))
        .join('');

      return `
        <section class="roadmap-stage-block" id="stage-${stage.stage}">
          <div class="stage-header">
            <div class="stage-title-wrap">
              <span class="stage-number-badge">STAGE ${stage.stage}</span>
              <h2>${escapeHtml(stage.title)}</h2>
            </div>
            <div class="stage-meta-pills">
              <span class="meta-pill">⏱️ ${escapeHtml(stage.duration)}</span>
              <span class="meta-pill">🏆 ${stageEarned} / ${stageTrophies.length} Earned (${stagePercent}%)</span>
              <span class="meta-pill pill-alert">${escapeHtml(stage.missableNotice)}</span>
            </div>
          </div>
          <p class="stage-description">${escapeHtml(stage.description)}</p>
          <div class="stage-action-box">
            <h4>Stage Action Priorities</h4>
            <ul class="stage-action-list">${actionsHtml}</ul>
          </div>
          <div class="stage-trophies-container">
            ${trophiesHtml}
          </div>
        </section>
      `;
    })
    .join('');

  container.innerHTML = html;

  // Bind checkbox events
  container.querySelectorAll('.trophy-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const name = e.target.getAttribute('data-name');
      if (name && onToggleEarned) {
        onToggleEarned(name);
      }
    });
  });

  // Bind guide expansion toggles
  container.querySelectorAll('.btn-toggle-guide').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.trophy-card');
      if (card) {
        card.classList.toggle('expanded');
      }
    });
  });
}

/**
 * Renders the Missables Alert view
 * @param {HTMLElement} container
 * @param {Array<object>} allTrophies
 * @param {Set<string>} earnedSet
 * @param {boolean} spoilerShield
 * @param {Function} onToggleEarned
 */
export function renderMissablesView(container, allTrophies, earnedSet, spoilerShield, onToggleEarned) {
  if (!container) return;
  const missables = allTrophies.filter((t) => t.missable);

  const intro = `
    <div class="missables-banner">
      <div class="missables-header-text">
        <h3>🚨 Missable Trophies Warning</h3>
        <p>There are <strong>4 critical missable trophies</strong> in Grand Theft Auto VI. These trophies depend on story narrative choices in Chapter 3, companion presence during robberies, or specific heist approaches. Review these requirements carefully and create manual hard saves before advancing past Chapter 3.</p>
      </div>
    </div>
  `;

  const cardsHtml = missables
    .map((t) => renderTrophyCardHtml(t, earnedSet.has(t.name), spoilerShield))
    .join('');

  container.innerHTML = intro + `<div class="missables-list">${cardsHtml}</div>`;

  // Bind checkbox events
  container.querySelectorAll('.trophy-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const name = e.target.getAttribute('data-name');
      if (name && onToggleEarned) {
        onToggleEarned(name);
      }
    });
  });

  // Bind guide expansion toggles
  container.querySelectorAll('.btn-toggle-guide').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.trophy-card');
      if (card) {
        card.classList.toggle('expanded');
      }
    });
  });
}
