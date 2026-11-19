// Filtering, search, and progress statistical computations for trophies

/**
 * Computes comprehensive completion statistics
 * @param {Array<object>} trophies
 * @param {Set<string>} earnedSet
 * @returns {object} Completion breakdown
 */
export function calculateStats(trophies, earnedSet) {
  const total = trophies.length;
  const earned = earnedSet.size;
  const percent = total > 0 ? Math.round((earned / total) * 100) : 0;

  const byGrade = {
    platinum: { total: 0, earned: 0 },
    gold: { total: 0, earned: 0 },
    silver: { total: 0, earned: 0 },
    bronze: { total: 0, earned: 0 },
  };

  const byCategory = {
    story: { total: 0, earned: 0 },
    strangers: { total: 0, earned: 0 },
    activities: { total: 0, earned: 0 },
    collectibles: { total: 0, earned: 0 },
    heists: { total: 0, earned: 0 },
    missable: { total: 0, earned: 0 },
  };

  for (const t of trophies) {
    const isEarned = earnedSet.has(t.name);
    if (byGrade[t.grade]) {
      byGrade[t.grade].total += 1;
      if (isEarned) byGrade[t.grade].earned += 1;
    }
    if (byCategory[t.category]) {
      byCategory[t.category].total += 1;
      if (isEarned) byCategory[t.category].earned += 1;
    }
    if (t.missable) {
      byCategory.missable.total += 1;
      if (isEarned) byCategory.missable.earned += 1;
    }
  }

  return { total, earned, percent, byGrade, byCategory };
}

/**
 * Filters trophies array according to active query filters
 * @param {Array<object>} trophies
 * @param {object} criteria
 * @param {Set<string>} earnedSet
 * @returns {Array<object>} Filtered list of trophies
 */
export function filterTrophies(trophies, criteria, earnedSet) {
  const {
    search = '',
    category = 'all',
    grade = 'all',
    status = 'all',
    stage = 'all',
  } = criteria;

  const query = search.trim().toLowerCase();

  return trophies.filter((t) => {
    const isEarned = earnedSet.has(t.name);

    // Status filter
    if (status === 'earned' && !isEarned) return false;
    if (status === 'locked' && isEarned) return false;

    // Grade filter
    if (grade !== 'all' && t.grade !== grade) return false;

    // Category filter
    if (category === 'missable') {
      if (!t.missable) return false;
    } else if (category !== 'all' && t.category !== category) {
      return false;
    }

    // Roadmap Stage filter
    if (stage !== 'all' && String(t.roadmapStage) !== String(stage)) {
      return false;
    }

    // Text search filter
    if (query.length > 0) {
      const matchName = t.name.toLowerCase().includes(query);
      const matchDesc = t.description.toLowerCase().includes(query);
      const matchGuide = (t.guide || '').toLowerCase().includes(query);
      const matchCat = (t.category || '').toLowerCase().includes(query);
      if (!matchName && !matchDesc && !matchGuide && !matchCat) {
        return false;
      }
    }

    return true;
  });
}
