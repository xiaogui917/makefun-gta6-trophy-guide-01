// Entrypoint for make.fun gta6-trophy-guide-01 submission packaging
// Copies static application files and screenshots into MAKEFUN_OUTPUT_DIR
// Generates reproducible dossier.json via vendored makefun-frontend library

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Resolve repository root directory and target destination
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// Prepare output directory structure
mkdirSync(outputDir, { recursive: true });

// Copy static web application assets
const appSrc = join(repoRoot, 'app');
const appDest = join(outputDir, 'app');
cpSync(appSrc, appDest, { recursive: true });

// Copy high-resolution preview screenshots
const shotsSrc = join(repoRoot, 'screenshots');
const shotsDest = join(outputDir, 'screenshots');
mkdirSync(shotsDest, { recursive: true });
if (existsSync(shotsSrc)) {
  cpSync(shotsSrc, shotsDest, { recursive: true });
}

// Scorer limits and caps: reference/gate.json
const gateOptions = {
  text_max_bytes: 163840,
  screenshots: {
    max: 4,
    max_bytes: 262144,
  },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

// Compile deterministic dossier metadata for judge review
const dossierContent = buildDossier(outputDir, gateOptions);
writeFileSync(join(outputDir, 'dossier.json'), dossierContent);
