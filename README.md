# Leonida Trophy Compendium

[![make.fun](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/xiaogui917/makefun-gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/xiaogui917/makefun-gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

An offline, zero-network web application serving as the definitive guide and checklist tracker for all 55 PlayStation 5 trophies in Grand Theft Auto VI.

Built with pure vanilla web technologies (HTML5, modern CSS3, ES modules) requiring zero build steps, zero external CDNs, and zero runtime dependencies.

## Key Features

- **Complete Official Trophy Database**: Covers all 55 PS5 trophies (1 Platinum, 2 Gold, 6 Silver, 46 Bronze) with exact official titles, descriptions, and tiers.
- **Interactive Checklist & Progress Persistence**: Instant progress saving via `localStorage`. Visual progress bar and grade completion breakdown.
- **5-Stage Platinum Roadmap**: Structured sequence from prologue to 100% completion with time estimates (85 - 105 total hours) and stage priorities.

- **4 Critical Missable Alerts**: Explicit warnings and preparation advice for missable trophies (*Actions Speak Louder*, *Hot Together*, *Retail Therapy*, *Sneakthief*).
- **Anti-Spoiler Protection Mode**: Built-in spoiler shield masks hidden story trophy names and campaign mission spoilers until unlocked.
- **Cited Guidance**: Every trophy walkthrough provides clear actionable advice citing community compendiums (PSNProfiles, PowerPyx, GTA Series Guides).
- **Multi-Dimensional Filters & Instant Search**: Filter by Category (Story, Strangers, Activities, Collectibles, Heists, Missable), Grade, or Status, with real-time text search.
- **Data Portability**: Full JSON export and import capabilities for backup or cross-device transfer.

## Getting Started

### Local Development Server

Run the static server using Node 22 (no packages required):

```bash
node serve.ts
# or specify a custom port:
node serve.ts --port 8903
```

Then navigate to `http://localhost:8080/` in any desktop browser.

### Packaging for Submission

Compile the submission bundle and dossier with:

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT License. See [LICENSE](LICENSE) for details.
