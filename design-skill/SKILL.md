---
name: Designing-Skill—CLISkill
description: Use this skill for beginner designers with a guided, hands-on starter that scaffolds simple design projects (landing page, logo, mobile UI) and actionable checklists to learn the design process.
compatibility: Javascript
---

# Designing Skill — CLI Skill Definition

## Name

Designing Skill — Node.js CLI Template Generator

## Purpose

Provide beginner designers with a guided, hands-on starter that scaffolds simple design projects (landing page, logo, mobile UI) and actionable checklists to learn the design process.

## Learning Objectives

- Understand the basic design process: brief → sketch → prototype → iterate.
- Produce an initial design brief and checklist for any small project.
- Generate simple starter files you can open in a browser or a design tool and iterate from.

## Audience

Beginners and non-designers who want a quick, structured way to start a design project.

## Deliverables (generated)

- `design-brief.md` — a concise project brief.
- `checklist.md` — step-by-step actions to complete the starter.
- Simple templates:
  - Landing page: `index.html`, `styles.css`.
  - Logo: `logo.svg` (placeholder).
  - Mobile UI: `README.md` with artboard suggestions.

## Usage

1. Open a terminal in the project folder (`D:\DocumentViewerExtension\Design-Skill`).
2. Install dependencies:

```bash
npm install
```

3. Run the CLI:

```bash
npm start
# or when installed globally: design-skill
```

4. Follow prompts and open `output/<name>` to view generated files.

## Commands (ssh-like summary)

- `npm install` — install dependencies.
- `npm start` — launch interactive generator.

## How it teaches

Each generated template ships with a short `design-brief.md` and a `checklist.md` describing concrete next steps (sketches, iterations, exports). The CLI nudges learners to pick a primary color and name their concept so they practice creating a design brief.

## Extensibility

To add new templates or update flows, edit `index.js` and add a new generator function following the existing patterns (`generateLanding`, `generateLogo`, `generateMobile`). Keep outputs under `output/<name>`.

## Troubleshooting

- If you see permission errors on Windows, run the terminal as Administrator or use a different output path.
- If dependencies fail to install, ensure Node.js >=14 is installed.

## Contribution

Add issues or pull requests to expand templates, improve checklists, or add automated exports (SVG/PNG) tooling.
