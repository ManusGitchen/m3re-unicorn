# NPM Package Publication Plan

## Overview
Complete guide to package and publish the Unicorn Vue 3 component library to npm registry.

---

## Phase 1: Pre-Publication Setup (LOCAL)

### 1. Configure Package Metadata in `package.json`

**Required fields to update:**

```json
{
  "name": "@your-scope/unicorn",           // Scoped package (preferred)
  "version": "1.0.0",                       // Semantic versioning
  "description": "Vue 3 component library with TypeScript support",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/your-org/unicorn-lib",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-org/unicorn-lib.git"
  },
  "bugs": {
    "url": "https://github.com/your-org/unicorn-lib/issues"
  },
  "keywords": [
    "vue",
    "vue3",
    "components",
    "typescript",
    "ui"
  ],
  "private": false,  // CRITICAL: Must be false to publish
  "exports": {
    ".": "./dist/index.mjs",
    "./package.json": "./package.json"
  },
  "types": "./dist/index.d.mts",
  "files": ["dist"],
  "peerDependencies": {
    "vue": "^3.5.30"
  }
}
```

**Key Points:**
- `name`: Choose scoped name for organization (`@org/pkg`) or unscoped (`pkg`)
- `private`: **MUST** be `false` to publish
- `version`: Start with `0.1.0` or `1.0.0`
- `keywords`: Help discoverability on npm
- `exports`: Keep as is for correct entry point

### 2. Create Quality Documentation

**Files to create/update:**

#### README.md (Comprehensive)
```markdown
# Unicorn Vue 3 Component Library

A modern Vue 3 component library built with TypeScript and VitePlus.

## Features
- ✨ 10+ Vue 3 components
- 📦 Tree-shakeable ESM bundle
- 🎯 Full TypeScript support
- 📝 Type definitions included
- 🎨 Customizable styling

## Installation
\`\`\`bash
npm install @your-org/unicorn
# or
yarn add @your-org/unicorn
# or  
pnpm add @your-org/unicorn
\`\`\`

## Quick Start
\`\`\`vue
<template>
  <Button variant="primary">Click Me</Button>
</template>

<script setup lang="ts">
import { Button } from '@your-org/unicorn'
</script>
\`\`\`

## Documentation
[Full docs](https://your-org.github.io/unicorn)

## Components
- Button
- Card
- [More coming...]

## License
MIT
```

#### CHANGELOG.md
```markdown
# Changelog

## [1.0.0] - 2026-03-15

### Added
- Initial release
- Button component
- Card component
- Full TypeScript support
- ESM bundle optimization

### Changed
- N/A

### Fixed
- N/A
```

#### LICENSE (MIT)
Include MIT LICENSE file in root

### 3. Prepare Components for Publication

**Checklist:**
- ✅ All components have exported type interfaces
- ✅ Components have JSDoc comments (optional but recommended)
- ✅ No internal imports from `/src` (only from dist)
- ✅ All components tested and working
- ✅ Build succeeds: `npm run build`
- ✅ No console errors or warnings

**Example component with JSDoc:**

```typescript
/**
 * Button Component
 * @example
 * ```vue
 * <Button variant="primary" size="lg">Click Me</Button>
 * ```
 */
const Button = defineComponent({
  // ...
})
```

---

## Phase 2: NPM Registry Setup

### 1. Create/Verify NPM Account

```bash
# Check if logged in
npm whoami

# If not logged in
npm login
# Follow prompts to authenticate
# Use: username, password, email, OTP (if 2FA enabled)
```

**Options:**
- Public npm registry: `https://registry.npmjs.org` (default)
- GitHub Packages: `https://npm.pkg.github.com` (if using GitHub)
- Private registry: Configure in `.npmrc`

### 2. Configure `.npmrc` (Optional)

Create `.npmrc` in project root:

```ini
# For public npm registry
registry=https://registry.npmjs.org

# Or for scoped packages with GitHub
@your-scope:registry=https://npm.pkg.github.com
```

### 3. Verify Package Name Availability

```bash
# Check if name is available
npm search @your-org/unicorn

# Or view on web
# https://www.npmjs.com/package/@your-org/unicorn
```

---

## Phase 3: Build & Test

### 1. Build the Library

```bash
npm run build

# Verify output
ls dist/
# Should see: index.mjs, index.d.mts
```

### 2. Test the Package Locally

**Option A: NPM Link (Local Testing)**

```bash
# In library folder
npm link

# In test project folder
npm link @your-org/unicorn

# In test project, use it
import { Button } from '@your-org/unicorn'
```

**Option B: Pack and Install**

```bash
# Create .tgz file
npm pack

# In test project
npm install ../path/to/unicorn-lib-1.0.0.tgz
```

### 3. Verify Build Quality

```bash
# Type checking
npm run typecheck

# Tests
npm run test

# Build should complete without errors
npm run build
```

---

## Phase 4: Version Management

### 1. Update Version

**Manual way:**
```bash
npm version major|minor|patch
# Example: npm version minor
# Updates version in package.json and creates git tag
```

**Using bumpp (configured in project):**
```bash
npx bumpp
# Interactive version selection and git tagging
```

**Semantic Versioning:**
- `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes

### 2. Update CHANGELOG.md

Document all changes in this version before publishing.

### 3. Create Git Tag

```bash
git add .
git commit -m "Release v1.0.0"
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
```

---

## Phase 5: Publish to NPM

### 1. Publish Command

```bash
# Automatic build happens (prepublishOnly hook)
npm publish

# For scoped package with access
npm publish --access public
```

**The prepublishOnly script will:**
- Run `pnpm run build` (configured in package.json)
- Build the library
- Create dist/ folder
- Then publish

### 2. Verify Publication

```bash
# Check published version
npm view @your-org/unicorn

# Search on npm
npm search unicorn

# Install in new project to test
npm install @your-org/unicorn
```

---

## Phase 6: Post-Publication

### 1. Git: Create Release

```bash
# On GitHub, create a Release from tag
# Add CHANGELOG content to release notes
# GitHub will create a release page automatically
```

### 2. Install & Test in New Project

```bash
# Create test project
mkdir test-unicorn && cd test-unicorn
npm init -y
npm install @your-org/unicorn vue@^3.5.30

# Create test file
# Import and use components
```

### 3. Announce

- Post on Twitter/social media
- Update portfolio/docs
- Link to npm package page
- Share on Vue forums

---

## Phase 7: Ongoing Maintenance

### Publishing Updates

```bash
# Make changes
# Update CHANGELOG.md
npm version minor  # or patch/major
git push origin main --tags

npm publish
```

### Versioning Strategy

- Use **semver** (semantic versioning)
- **Rarely** publish 0.x.y long-term
- Release **major** version for breaking changes
- Release **minor** for new components/features
- Release **patch** for bug fixes

### CI/CD (Recommended)

Configure GitHub Actions to auto-publish:

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Checklist: Before Publishing v1.0.0

- [ ] **package.json** configured (name, version, description, author, repo)
- [ ] **private: false** in package.json
- [ ] **README.md** updated with features, installation, usage
- [ ] **CHANGELOG.md** documenting v1.0.0 changes
- [ ] **LICENSE** file (MIT or chosen license)
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] Tests pass: `npm run test`
- [ ] All components documented
- [ ] Local test successful (`npm link` or `npm pack`)
- [ ] NPM account verified: `npm whoami`
- [ ] Package name available on npm
- [ ] Git repository configured
- [ ] Git tag created: `v1.0.0`

---

## Quick Reference: Publish Process

```bash
# 1. Make final changes
# 2. Update CHANGELOG.md
# 3. Bump version
npm version minor

# 4. Push to git
git push origin main --tags

# 5. Publish (auto-runs build via prepublishOnly)
npm publish --access public

# 6. Verify
npm view @your-org/unicorn
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Private package" error | Set `"private": false` in package.json |
| "No such file" in dist | Run `npm run build` first |
| "Unauthorized" on publish | Run `npm login` and authenticate |
| Package name taken | Use scoped name `@your-org/pkg` |
| TypeScript errors | Run `npm run typecheck` and fix |
| Peer dependency warnings | Add Vue to consumer's package.json |

---

## Next Steps

1. **Immediate:**
   - [ ] Update package.json metadata
   - [ ] Create comprehensive README.md
   - [ ] Create CHANGELOG.md
   - [ ] Add LICENSE file

2. **Before First Publish:**
   - [ ] Verify `npm whoami` works
   - [ ] Check package name availability
   - [ ] Local test with `npm link`
   - [ ] Build passes `npm run build`

3. **Publish:**
   - [ ] `npm publish --access public`
   - [ ] Verify on npmjs.com
   - [ ] Test install in new project

4. **After Publish:**
   - [ ] Create GitHub Release
   - [ ] Share with community
   - [ ] Monitor for issues

---

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Creating Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [GitHub Actions for npm](https://github.com/actions/setup-node)
