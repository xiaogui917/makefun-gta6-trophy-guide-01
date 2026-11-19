// Anti-Spoiler shield manager for Leonida Trophy Tracker
// Hides story-sensitive trophy names, secret mission objectives, and campaign plot twists

export const SPOILER_KEY = 'leonida_spoiler_shield_v1';

/**
 * Checks whether spoiler shielding is active (defaults to true for safe browsing)
 * @returns {boolean}
 */
export function getSpoilerShield() {
  try {
    const raw = localStorage.getItem(SPOILER_KEY);
    if (raw === null) return true; // Default ON
    return raw === 'true';
  } catch {
    return true;
  }
}

/**
 * Updates and persists spoiler shielding preference
 * @param {boolean} active
 */
export function setSpoilerShield(active) {
  try {
    localStorage.setItem(SPOILER_KEY, String(active));
  } catch (err) {
    console.error('Failed to save spoiler shield preference:', err);
  }
}

/**
 * Returns display-ready trophy text, applying spoiler masking when appropriate
 * @param {object} trophy
 * @param {boolean} isEarned
 * @param {boolean} shieldActive
 * @returns {{ isMasked: boolean, displayName: string, displayDesc: string, displayGuide: string }}
 */
export function maskTrophy(trophy, isEarned, shieldActive) {
  const shouldMask = Boolean(shieldActive && !isEarned && (trophy.hidden || trophy.category === 'story'));
  if (shouldMask) {
    return {
      isMasked: true,
      displayName: 'Secret Story Trophy',
      displayDesc: 'Plot spoiler protected. Earn this trophy or toggle off Anti-Spoiler Shield to inspect.',
      displayGuide: 'Guide details hidden until earned or revealed to prevent narrative spoilers.',
    };
  }
  return {
    isMasked: false,
    displayName: trophy.name,
    displayDesc: trophy.description,
    displayGuide: trophy.guide,
  };
}
