// Platinum Roadmap definitions, overview metrics, and phase progress tracking

export const ROADMAP_META = {
  estimatedHours: '85 - 105 Hours',
  difficultyRating: '4 / 10 (Moderate Open-World Grind)',
  minimumPlaythroughs: 1,
  missableCount: 4,
  missableNames: [
    'Actions Speak Louder',
    'Hot Together',
    'Retail Therapy',
    'Sneakthief',
  ],
  summaryText: 'Follow this 5-stage sequential roadmap to earn all 55 trophies efficiently without missable lockouts. Maintain a manual backup save before the Chapter 3 climax.',
};

export const ROADMAP_STAGES = [
  {
    stage: 1,
    title: 'Stage 1: Main Story Campaign & Partner Synergy',
    duration: '35 - 40 Hours',
    trophyCount: 18,
    missableNotice: '4 Critical Missables to watch during this stage!',
    description: 'Play through Chapters 1 through 4 and the finale. Focus on the core heist preparations and partner missions. Keep your partner companion active during free-roam to knock out partner-dependent combat and robbery trophies before late-game world state shifts.',
    keyActionItems: [
      'Complete Chapter 1 through Chapter 4 storyline missions.',
      'CRITICAL: In Chapter 3 climax, choose the joint loyalty oath for "Actions Speak Louder".',
      'During early/mid story free-roam with partner, clear "Hot Together" (4-star escape) and "Retail Therapy" (3 store robberies).',
      'In the Vivaldi Diamond Heist, select the stealth infiltration gas route for "Sneakthief".',
    ],
  },
  {
    stage: 2,
    title: 'Stage 2: Strangers & Freaks Strands',
    duration: '12 - 15 Hours',
    trophyCount: 6,
    missableNotice: 'None (Unmissable in post-game free roam)',
    description: 'Travel across Leonida to resolve all 8 major Stranger & Freak chains marked on your GPS. These introduce unique characters, offshore salvage expeditions, and swamp delivery chains.',
    keyActionItems: [
      'Resolve Andy\'s 4-part therapy and rehabilitation questline.',
      'Investigate Kenton\'s sunken cargo wreck offshore in the Keys.',
      'Assist motorcycle drifter Billy across outpost challenges.',
      'Fulfill Randy\'s swamp contraband supply drops.',
      'Finish Tyrone\'s music studio dispute arc to unlock "Strangers & Freaks" silver trophy.',
    ],
  },
  {
    stage: 3,
    title: 'Stage 3: World Exploration, WAiNK Spots & Card Sets',
    duration: '15 - 20 Hours',
    trophyCount: 6,
    missableNotice: 'None (Trackable anytime in free roam)',
    description: 'Explore the vast map of Leonida, clear the fog-of-war across all counties, snap WAiNK check-ins at 100 landmarks, and hunt down 3 complete collectible card decks.',
    keyActionItems: [
      'Unfog the entire territory map across Vice City and rural counties.',
      'Tag 100 WAiNK photo spots for "You WAiNKer!".',
      'Gather all 30 collectible cards across 3 themed decks.',
      'Test-drive and register 100 distinct vehicle classes.',
    ],
  },
  {
    stage: 4,
    title: 'Stage 4: Activities, 250 Stunts & Range Gold Medals',
    duration: '15 - 20 Hours',
    trophyCount: 14,
    missableNotice: 'None (Repeatable challenges)',
    description: 'Master all Leonida pastimes: hit gold targets on 42 shooting range trials, complete 250 aerial stunt maneuvers, win 20 races and all Top Fun drone courses.',
    keyActionItems: [
      'Earn Gold in all 42 Ammu-Nation target challenges for "The Shootist".',
      'Execute 250 aerial jumps, rolls, and drifts for "Cunning Stunts".',
      'Win 20 street, boat, and off-road races, plus all drone courses.',
      'Try each activity type once: bowling, arcade cabinet, meditation, and fishing.',
    ],
  },
  {
    stage: 5,
    title: 'Stage 5: Bank Vaults, 100% Checklist & Platinum Cleanup',
    duration: '8 - 12 Hours',
    trophyCount: 11,
    missableNotice: 'None (Final culmination)',
    description: 'Execute high-value bank vault robberies, purchase all 7 lock-up garages, wash $250k marked cash, and push overall game completion to 100% to crown yourself Leonida Legend.',
    keyActionItems: [
      'Crack 5 commercial bank vaults for "Maximum Withdrawal".',
      'Launder $250,000 marked bills through front businesses.',
      'Purchase all Dynasty8 garage real estate.',
      'Attain 100% completion in the stats screen for "A Long Road".',
      'Unlock Platinum Trophy: "Vice Got a Price!".',
    ],
  },
];
