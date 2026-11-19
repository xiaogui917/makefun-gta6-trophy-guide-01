// Leonida Trophy Compendium - Main Application Controller
// Orchestrates state management, views, filtering, anti-spoiler shielding, and data persistence

import { trophies } from '../data/trophies.js';
import {
  loadEarned,
  saveEarned,
  toggleTrophy,
  exportProgress,
  importProgress,
  clearProgress,
} from './storage.js';
import { getSpoilerShield, setSpoilerShield } from './spoilers.js';
import { calculateStats, filterTrophies } from './filters.js';
import { ROADMAP_STAGES, ROADMAP_META } from './roadmap.js';
import {
  renderStatsHeader,
  renderTrophyList,
  renderRoadmapView,
  renderMissablesView,
} from './render.js';

// Application State
let earnedSet = loadEarned();
let spoilerShield = getSpoilerShield();
let currentTab = 'checklist'; // 'checklist' | 'roadmap' | 'missables' | 'settings'
const filterState = {
  search: '',
  category: 'all',
  grade: 'all',
  status: 'all',
  stage: 'all',
};

// DOM References
const statsContainer = document.getElementById('stats-header-container');
const trophyListContainer = document.getElementById('trophy-list-container');
const roadmapViewContainer = document.getElementById('roadmap-view-container');
const missablesViewContainer = document.getElementById('missables-view-container');
const settingsViewContainer = document.getElementById('settings-view-container');

const filterToolbar = document.getElementById('filter-toolbar');
const searchInput = document.getElementById('search-input');
const spoilerToggle = document.getElementById('spoiler-toggle');

/**
 * Handles checkbox toggle for a specific trophy
 * @param {string} trophyName
 */
function handleToggleTrophy(trophyName) {
  toggleTrophy(earnedSet, trophyName);
  updateUi();
}

/**
 * Refreshes current active view
 */
function refreshCurrentView() {
  // Update header stats
  const stats = calculateStats(trophies, earnedSet);
  renderStatsHeader(statsContainer, stats);

  // Hide all view containers
  trophyListContainer.style.display = 'none';
  roadmapViewContainer.style.display = 'none';
  missablesViewContainer.style.display = 'none';
  settingsViewContainer.style.display = 'none';
  filterToolbar.style.display = 'none';

  if (currentTab === 'checklist') {
    filterToolbar.style.display = 'flex';
    trophyListContainer.style.display = 'grid';
    const filtered = filterTrophies(trophies, filterState, earnedSet);
    renderTrophyList(trophyListContainer, filtered, earnedSet, spoilerShield, handleToggleTrophy);
  } else if (currentTab === 'roadmap') {
    roadmapViewContainer.style.display = 'flex';
    renderRoadmapView(roadmapViewContainer, ROADMAP_STAGES, trophies, earnedSet, spoilerShield, handleToggleTrophy);
  } else if (currentTab === 'missables') {
    missablesViewContainer.style.display = 'block';
    renderMissablesView(missablesViewContainer, trophies, earnedSet, spoilerShield, handleToggleTrophy);
  } else if (currentTab === 'settings') {
    settingsViewContainer.style.display = 'block';
    updateSettingsView(stats);
  }
}

/**
 * Full UI refresh
 */
export function updateUi() {
  refreshCurrentView();
}

/**
 * Updates dynamic stats in the settings view
 * @param {object} stats
 */
function updateSettingsView(stats) {
  const statsSpan = document.getElementById('settings-stats-summary');
  if (statsSpan) {
    statsSpan.textContent = `${stats.earned} of ${stats.total} trophies earned (${stats.percent}%).`;
  }
}

/**
 * Initializes filter button groups
 */
function initFilterButtons() {
  // Category buttons
  document.querySelectorAll('#category-filters .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#category-filters .filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.category = btn.getAttribute('data-category') || 'all';
      updateUi();
    });
  });

  // Grade buttons
  document.querySelectorAll('#grade-filters .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#grade-filters .filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.grade = btn.getAttribute('data-grade') || 'all';
      updateUi();
    });
  });

  // Status buttons
  document.querySelectorAll('#status-filters .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#status-filters .filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.status = btn.getAttribute('data-status') || 'all';
      updateUi();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.search = e.target.value;
      updateUi();
    });
  }
}

/**
 * Sets up tab navigation
 */
function initTabs() {
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.getAttribute('data-tab') || 'checklist';
      updateUi();
    });
  });
}

/**
 * Initializes backup operations and settings handlers
 */
function initSettingsHandlers() {
  const btnExport = document.getElementById('btn-export');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      exportProgress(earnedSet);
    });
  }

  const fileImport = document.getElementById('file-import');
  if (fileImport) {
    fileImport.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const validNames = new Set(trophies.map((t) => t.name));
        earnedSet = importProgress(text, validNames);
        alert(`Successfully imported progress! ${earnedSet.size} trophies marked earned.`);
        updateUi();
      } catch (err) {
        alert('Invalid progress file. Please upload a valid JSON backup.');
      }
    });
  }

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all tracked trophy progress? This cannot be undone.')) {
        earnedSet = clearProgress();
        updateUi();
      }
    });
  }

  if (spoilerToggle) {
    spoilerToggle.checked = spoilerShield;
    spoilerToggle.addEventListener('change', (e) => {
      spoilerShield = e.target.checked;
      setSpoilerShield(spoilerShield);
      updateUi();
    });
  }
}

// Main initialisation on load
window.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initFilterButtons();
  initSettingsHandlers();
  updateUi();
});
