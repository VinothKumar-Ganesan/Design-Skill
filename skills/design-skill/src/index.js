#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

async function generateLanding(outDir, answers) {
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${answers.name} — Landing</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>${answers.name}</h1>
    <p>${answers.description}</p>
  </header>
  <main>
    <section class="hero">
      <h2>Hero section</h2>
      <p>Primary color: ${answers.primaryColor}</p>
    </section>
  </main>
</body>
</html>`;

  const css = `:root{--primary:${answers.primaryColor}}\nbody{font-family:Arial,Helvetica,sans-serif;color:#222;padding:24px}\n.header{margin-bottom:16px}\n.hero{background:var(--primary);color:#fff;padding:32px;border-radius:8px}`;

  await writeFile(path.join(outDir, 'index.html'), html);
  await writeFile(path.join(outDir, 'styles.css'), css);
  await writeFile(path.join(outDir, 'design-brief.md'), `# Design Brief - ${answers.name}\n\n${answers.description}\n\nPrimary color: ${answers.primaryColor}\n`);
  await writeFile(path.join(outDir, 'checklist.md'), `# Checklist\n\n- [ ] Define target audience\n- [ ] Sketch hero & CTA\n- [ ] Choose imagery\n- [ ] Export assets`);
}

async function generateLogo(outDir, answers) {
  const brief = `# Logo Brief - ${answers.name}\n\n${answers.description}\n\nPrimary color: ${answers.primaryColor}\n`;
  const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="${answers.primaryColor}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="28">${answers.name}</text></svg>`;
  await writeFile(path.join(outDir, 'logo.svg'), placeholderSvg);
  await writeFile(path.join(outDir, 'design-brief.md'), brief);
  await writeFile(path.join(outDir, 'checklist.md'), `# Checklist\n\n- [ ] Explore concepts\n- [ ] Create 3 variants\n- [ ] Test in monochrome\n- [ ] Export SVG/PNG`);
}

async function generateMobile(outDir, answers) {
  await writeFile(path.join(outDir, 'design-brief.md'), `# Mobile App UI Brief - ${answers.name}\n\n${answers.description}\n\nPrimary color: ${answers.primaryColor}\n`);
  await writeFile(path.join(outDir, 'checklist.md'), `# Checklist\n\n- [ ] Define user flows\n- [ ] Wireframe main screens\n- [ ] Create components (buttons, cards)\n- [ ] Create prototype in Figma`);
  await writeFile(path.join(outDir, 'README.md'), `Open your design tool and start wireframing. Suggested artboard sizes:\n- Phone (375x812)\n- Tablet (768x1024)`);
}

async function main() {
  console.log(chalk.cyan('\nDesigning Skill — CLI template generator (Beginner)\n'));

  const answers = await inquirer.prompt([
    { name: 'name', message: 'Project / concept name', default: 'MyDesign' },
    { name: 'description', message: 'Short description', default: 'A simple design starter' },
    { name: 'primaryColor', message: 'Primary color (CSS hex or name)', default: '#0b74de' },
    { type: 'list', name: 'template', message: 'Choose a starter template', choices: ['Landing Page', 'Logo', 'Mobile App UI'] },
    { type: 'confirm', name: 'openOutput', message: 'Create output folder now?', default: true }
  ]);

  const outDir = path.resolve(process.cwd(), 'output', answers.name.replace(/[^a-z0-9-_]/gi, '_'));

  if (answers.template === 'Landing Page') await generateLanding(outDir, answers);
  else if (answers.template === 'Logo') await generateLogo(outDir, answers);
  else await generateMobile(outDir, answers);

  console.log(chalk.green(`\nGenerated template at: ${outDir}`));
  console.log(chalk.yellow('\nOpen the folder and follow the checklist files to continue designing.'));
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
