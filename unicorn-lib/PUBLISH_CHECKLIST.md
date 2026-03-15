# Quick Start: Publish to NPM (Step-by-Step)

Follow these steps to publish your library to npm. Estimated time: 15-30 minutes.

---

## ✅ Pre-Flight Checklist (Do These First)

### 1. Update package.json

Edit `unicorn-lib/package.json` and update:

```json
{
  "name": "@your-org/unicorn",           // Change this!
  "version": "0.1.0",                    // Semantic versioning
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
  "private": false,  // ⚠️ CRITICAL: Must be false!
  "keywords": ["vue", "vue3", "components", "typescript", "ui"]
}
```

**Key Changes:**
- `name`: Must follow pattern `@org/name` (scoped) or `name` (unscoped)
- `private`: Must be `false`
- `author`: Your actual name and email
- `repository`: Your actual GitHub URL
- `homepage`: Your actual repo homepage

### 2. Verify Files Exist

```bash
cd unicorn-lib

# Check these files exist:
ls -la | grep -E "README|CHANGELOG|LICENSE"
# Output should show:
# - README.md
# - CHANGELOG.md  
# - LICENSE
```

All three should exist (already created).

### 3. Test the Build Locally

```bash
# Build the library
npm run build

# Check output
ls dist/
# Should show: index.mjs, index.d.mts
```

✅ **Build must succeed without errors**

### 4. Run Type Checking

```bash
npm run typecheck
# Should complete without errors
```

✅ **No TypeScript errors allowed**

---

## 🔑 NPM Account Setup

### Step 1: Create NPM Account (if you don't have one)

```bash
# Visit https://www.npmjs.com/signup
# Create account with username, email, password
# Verify email
```

### Step 2: Login to NPM

```bash
npm login
# Follow prompts:
# - Username: your-npm-username
# - Password: your password
# - Email: your-email@example.com
# - OTP: (if 2FA enabled) your one-time password

# Verify login
npm whoami
# Should print your username
```

### Step 3: Verify Access

```bash
# Check your npm profile
npm profile get
```

---

## 📝 Finalize Metadata

### Step 1: Create Git Repository (if not already done)

```bash
cd unicorn-lib

# Initialize git (if needed)
git init
git add .
git commit -m "Initial commit: Unicorn Vue 3 component library"

# Add GitHub as remote
git remote add origin https://github.com/your-org/unicorn-lib.git
git branch -M main
git push -u origin main
```

### Step 2: Version Your Package

```bash
# Option A: Auto-bump version and create tag
npm version minor
# Bumps 0.1.0 → 0.2.0 and creates git tag

# Option B: Manually set version
# Edit package.json version field, then:
git add package.json
git commit -m "Release v0.1.0"
git tag -a v0.1.0 -m "Release version 0.1.0"

# Push tags
git push origin main --tags
```

---

## 🚀 Publish to NPM

### Step 1: Final Build

```bash
npm run build
# Verify no errors
```

### Step 2: Verify Package Contents

```bash
# Dry run to see what would be published
npm publish --dry-run

# Output shows:
# - dist/index.mjs
# - dist/index.d.mts
# - package.json
# - README.md
# - LICENSE
# - CHANGELOG.md
```

### Step 3: Publish!

```bash
# For scoped package (recommended)
npm publish --access public

# For unscoped package
npm publish
```

**If you see "prepublishOnly" running, that's normal** - it auto-builds before publishing.

### Step 4: Verify Publication

```bash
# View your package on npm
npm view @your-org/unicorn

# Search for your package
npm search unicorn

# Check it on web: https://www.npmjs.com/package/@your-org/unicorn
```

---

## ✨ Test the Published Package

### Option A: Test in New Local Project

```bash
# Create test folder
mkdir test-project && cd test-project
npm init -y

# Install your package
npm install @your-org/unicorn vue@^3.5.30

# Verify it's installed
ls node_modules/@your-org/unicorn
# Should see: dist/, package.json, etc.

# Test import
node -e "console.log(require('@your-org/unicorn'))"
```

### Option B: Test in Existing Vue 3 Project

```bash
npm install @your-org/unicorn

# In a component:
import { Button } from '@your-org/unicorn'

// Use it
<Button>Click</Button>
```

---

## 🎉 After Publishing

### Celebrate! 🎊

```bash
# View your package
npm view @your-org/unicorn

# Or on web:
# https://www.npmjs.com/package/@your-org/unicorn
```

### Create GitHub Release (Optional)

1. Go to GitHub repo: https://github.com/your-org/unicorn-lib/releases
2. Click "Create a new release"
3. Select your tag (v0.1.0)
4. Add title: "Release v0.1.0"
5. Add description: Copy from CHANGELOG.md
6. Publish release

### Share Your Package! 

- Tweet about it
- Post on Vue forums
- Share in Discord communities
- Update your portfolio

---

## 📖 Making Updates & Publishing Again

### When You Add New Components

```bash
# 1. Make changes to your components
# 2. Add entry to CHANGELOG.md

# 3. Bump version (minor for new features, patch for fixes)
npm version minor
# This auto-bumps version in package.json

# 4. Push to GitHub
git push origin main --tags

# 5. Publish again
npm publish --access public
```

### Example Version History
```
0.1.0 → Initial release (Button, Card)
0.2.0 → Add Input component (npm version minor)
0.2.1 → Fix Button styling bug (npm version patch)
1.0.0 → Stable release (npm version major)
```

---

## ⚠️ Common Issues & Fixes

| Error | Solution |
|-------|----------|
| `ERR_PUBLISH_CONFLICT 410: Package not found` | Wait 5-10 mins, name might be unavailable |
| `ERR_FORBIDDEN: you don't have permission` | Check `npm whoami` and account; use `--access public` |
| `private is true` | Set `"private": false` in package.json |
| `dist/ not found` | Run `npm run build` first |
| `ERR_WRITE_EACCES: permission denied` | Check file permissions or run as admin |

---

## 🎯 Troubleshooting

### Check if package name is available

```bash
npm search @your-org/unicorn
# If empty, name is available
# If exists, choose different name e.g. @your-org/unicorn-components
```

### View what will be published

```bash
npm publish --dry-run
# Shows all files that will be included
```

### Check current version on npm

```bash
npm view @your-org/unicorn version
# Shows latest version published
```

### See all versions

```bash
npm view @your-org/unicorn versions
# Lists all versions published
```

---

## 📚 Next: Documentation Site

Consider these optional next steps:

1. **Storybook** - Interactive component showcase
2. **VitePress** - Static documentation site
3. **GitHub Pages** - Host docs for free
4. **API Docs** - Auto-generate from JSDoc

---

## 🆘 Need Help?

1. Check [NPM Publication Plan](./NPM_PUBLICATION_PLAN.md) for detailed info
2. Visit [npm docs](https://docs.npmjs.com/)
3. Check [GitHub Discussions](https://github.com/your-org/unicorn-lib/discussions)

---

**Congratulations on publishing your first package! 🚀**
