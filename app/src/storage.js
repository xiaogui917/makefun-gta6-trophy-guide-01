// Storage module for Leonida Trophy Tracker
// Handles persistent browser state, progress tracking, and backup operations

export const STORAGE_KEY = 'leonida_trophy_progress_v1';

/**
 * Loads the set of earned trophy names from localStorage
 * @returns {Set<string>} Set of earned trophy names
 */
export function loadEarned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (err) {
    console.warn('Failed to load trophy progress from localStorage:', err);
    return new Set();
  }
}

/**
 * Saves the set of earned trophy names to localStorage
 * @param {Set<string>} earnedSet
 */
export function saveEarned(earnedSet) {
  try {
    const list = Array.from(earnedSet);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save trophy progress to localStorage:', err);
  }
}

/**
 * Toggles earned status for a trophy and persists change
 * @param {Set<string>} earnedSet
 * @param {string} trophyName
 * @returns {boolean} New earned state
 */
export function toggleTrophy(earnedSet, trophyName) {
  const willBeEarned = !earnedSet.has(trophyName);
  if (willBeEarned) {
    earnedSet.add(trophyName);
  } else {
    earnedSet.delete(trophyName);
  }
  saveEarned(earnedSet);
  return willBeEarned;
}

/**
 * Exports current checklist progress to a downloadable JSON file
 * @param {Set<string>} earnedSet
 */
export function exportProgress(earnedSet) {
  const payload = {
    app: 'Leonida Trophy Compendium',
    exportedAt: new Date().toISOString(),
    earnedCount: earnedSet.size,
    earned: Array.from(earnedSet),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'leonida-trophy-progress.json';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Imports progress from uploaded JSON string
 * @param {string} jsonText
 * @param {Set<string>} [validNames] Optional set of official names to filter
 * @returns {Set<string>}
 */
export function importProgress(jsonText, validNames) {
  const data = JSON.parse(jsonText);
  const list = Array.isArray(data) ? data : (data.earned ?? []);
  const nextSet = new Set();
  for (const item of list) {
    if (typeof item === 'string') {
      if (!validNames || validNames.has(item)) {
        nextSet.add(item);
      }
    }
  }
  saveEarned(nextSet);
  return nextSet;
}

/**
 * Resets all saved trophy progress
 * @returns {Set<string>}
 */
export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return new Set();
}
