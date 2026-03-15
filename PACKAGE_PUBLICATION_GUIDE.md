# 📦 NPM Package Publication Guide

Your Unicorn Vue 3 Component Library is ready to be published! Here's your complete guide.

---

## 📋 Documentation Files Created

| File | Purpose | Location |
|------|---------|----------|
| **NPM_PUBLICATION_PLAN.md** | Comprehensive publishing guide | Root |
| **PUBLISH_CHECKLIST.md** | Step-by-step quick start | unicorn-lib/ |
| **README.md** | Package documentation | unicorn-lib/ |
| **CHANGELOG.md** | Version history | unicorn-lib/ |
| **LICENSE** | MIT License | unicorn-lib/ |
| **CONTRIBUTING.md** | Contributor guidelines | unicorn-lib/ |

---

## 🚀 Quick Start (5 Steps)

### Step 1: Update package.json (2 min)
```bash
cd unicorn-lib
# Edit these fields in package.json:
# - name: "@your-org/unicorn"
# - author: "Your Name <email@example.com>"
# - repository.url: "https://github.com/your-org/unicorn-lib.git"
# - homepage: "https://github.com/your-org/unicorn-lib"
# - private: false (CRITICAL!)
```

### Step 2: Setup NPM Account (5 min)
```bash
npm login
# Provide username, password, email
npm whoami  # Verify login
```

### Step 3: Initialize Git & Version (3 min)
```bash
cd unicorn-lib
git init
git add .
git commit -m "Initial: Unicorn Vue 3 library"
git remote add origin https://github.com/your-org/unicorn-lib.git
git branch -M main
git push -u origin main

# Create initial version tag
npm version minor  # Creates v0.1.0
git push origin main --tags
```

### Step 4: Build & Test (2 min)
```bash
npm run build         # Build the library
npm run typecheck     # Verify types
npm publish --dry-run # Preview what gets published
```

### Step 5: Publish! (1 min)
```bash
npm publish --access public
# Done! 🎉
```

### Verify Publication
```bash
npm view @your-org/unicorn
# Visit: https://www.npmjs.com/package/@your-org/unicorn
```

---

## 📚 Detailed Guides

### For Complete Context
👉 Read: [NPM_PUBLICATION_PLAN.md](./NPM_PUBLICATION_PLAN.md)

**Topics covered:**
- Full Phase-by-phase publication process
- Pre-publication setup checklist
- Component documentation requirements
- NPM registry configuration
- CI/CD automation with GitHub Actions
- Post-publication maintenance
- Common issues & solutions

### For Hands-On Steps
👉 Read: [unicorn-lib/PUBLISH_CHECKLIST.md](./unicorn-lib/PUBLISH_CHECKLIST.md)

**Topics covered:**
- Pre-flight checklist (build, types, metadata)
- NPM account setup
- Git repository initialization
- Version management
- Publishing step-by-step
- Testing the published package
- Making updates & re-publishing

---

## 🎯 What's Already Done

✅ **Library Setup**
- Vue 3.5.30 installed
- TypeScript configured (strict mode)
- VitePlus + tsdown build system
- Components created (Button, Card)
- Build proven working

✅ **Publishing Infrastructure**
- package.json configured with exports
- dist/ output structure correct
- Type definitions generated (.d.mts)
- ESM bundle optimized

✅ **Documentation**
- README.md comprehensive
- CHANGELOG.md prepared
- LICENSE file added
- CONTRIBUTING.md for developers
- Publication guides ready

---

## 🔄 Publishing Workflow

### Initial Release (0.1.0)
```
1. Update package.json metadata
2. npm login (verify account)
3. git setup & push
4. npm version minor (creates v0.1.0)
5. npm publish --access public
6. Create GitHub Release
```

### Subsequent Updates
```
1. Make component changes
2. Update CHANGELOG.md
3. npm version minor (or patch)
4. git push origin main --tags
5. npm publish --access public
```

---

## 📦 Package Contents (What Gets Published)

```
@your-org/unicorn (npm package)
├── dist/
│   ├── index.mjs          (Main bundle)
│   └── index.d.mts        (Type definitions)
├── package.json           (Package metadata)
├── README.md              (Documentation)
├── LICENSE                (MIT License)
└── CHANGELOG.md           (Version history)
```

**What does NOT get published:**
- src/ folder (only dist/)
- tests/ folder
- .git/ folder
- node_modules/
- dev files

---

## ✨ Key Features for End Users

Your published package will have:

```bash
npm install @your-org/unicorn vue@^3.5.30
```

```typescript
import { Button, Card } from '@your-org/unicorn'
import type { ButtonProps } from '@your-org/unicorn'

// Full TypeScript support
// Tree-shakeable imports
// Zero extra dependencies
// ESM bundle optimized
```

---

## 🎓 Understanding the Process

### Why These Files Are Important

| File | Why | Impact |
|------|-----|--------|
| **package.json** | Defines package metadata | npm uses it for registry |
| **README.md** | First thing users see | Critical for adoption |
| **CHANGELOG.md** | Tracks what changed | Users trust transparency |
| **LICENSE** | Legal terms | Required for open source |
| **types** | TypeScript support | Enables type-safe usage |
| **dist/** | Production build | What actually runs |

### Why These Settings Matter

| Setting | Value | Reason |
|---------|-------|--------|
| `private` | **false** | Must be false to publish |
| `exports` | "./dist/index.mjs" | Correct entry point |
| `types` | "./dist/index.d.mts" | Enables TypeScript |
| `files` | ["dist"] | Only publish dist/ |
| `peerDependencies` | "vue": "^3.5.30" | Vue not bundled |

---

## 🚨 Critical Reminders

⚠️ **Before you npm publish:**

1. ✅ `"private": false` in package.json
2. ✅ `npm run build` succeeds
3. ✅ `npm run typecheck` passes
4. ✅ `npm whoami` shows your username
5. ✅ Git is initialized and pushed
6. ✅ Package name is available on npm

---

## 💡 Pro Tips

### Naming Your Package
```
✅ Good: @your-org/unicorn, @org/ui-components
❌ Avoid: unicorn-lib (too generic)
❌ Avoid: @org/unicorn-lib (redundant -lib)
```

### Versioning Strategy
```
0.1.0 → First release (or beta)
0.2.0 → Add features (npm version minor)
0.2.1 → Fix bugs (npm version patch)
1.0.0 → Stable release (npm version major)
```

### After Publishing
```
📊 Monitor: npm stats & downloads
💬 Respond: to GitHub issues/PRs
📝 Document: component usage with examples
🔄 Release: updates monthly or quarterly
```

---

## 🔗 Helpful Resources

- **npm Publishing Guide:** https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- **Semantic Versioning:** https://semver.org/
- **Keep a Changelog:** https://keepachangelog.com/
- **Vue 3 Component Guide:** https://vuejs.org/guide/components/index.html

---

## ❓ FAQ

**Q: What if the package name is taken?**
A: Use a scoped name instead: `@your-org/unicorn` instead of just `unicorn`

**Q: How do I republish an update?**
A: Change code → Update CHANGELOG → `npm version minor` → `npm publish`

**Q: Can I unpublish a version?**
A: Only within 72 hours of publishing (and only to npm, not public registries)

**Q: What about private packages?**
A: You'd need npm Pro; keep `private: false` for public

---

## 🎉 You're Ready!

Everything is prepared for publishing. Choose your next step:

1. **Just publishing?** → Follow [PUBLISH_CHECKLIST.md](./unicorn-lib/PUBLISH_CHECKLIST.md)
2. **Want full details?** → Read [NPM_PUBLICATION_PLAN.md](./NPM_PUBLICATION_PLAN.md)
3. **Setting up automation?** → See GitHub Actions section in plan
4. **Adding more components?** → Check [CONTRIBUTING.md](./unicorn-lib/CONTRIBUTING.md)

---

**Happy publishing! 🚀**

Questions? Check the detailed guides or npm documentation.
