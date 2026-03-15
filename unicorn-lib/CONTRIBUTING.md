# Contributing to Unicorn

Thank you for your interest in contributing! This document provides guidelines and instructions.

## Getting Started

### Prerequisites
- Node.js 18+ (Node 18 LTS or later recommended)
- npm, yarn, or pnpm
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib.git
cd unicorn-lib

# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm run test
```

## Development Workflow

### Creating New Components

Follow the existing component pattern in `src/components/`:

1. **Create Component File**
```typescript
// src/components/MyComponent/index.ts
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

/**
 * MyComponent - Brief description
 * @example
 * ```vue
 * <MyComponent variant="primary">Content</MyComponent>
 * ```
 */
const MyComponent = defineComponent({
  name: 'MyComponent',
  props: {
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
    },
  },
  setup(props, { slots, attrs }) {
    // Implementation
    return { /* exposed */ }
  },
  template: `<div><!-- template --></div>`,
})

export { MyComponent }

export interface MyComponentProps {
  variant?: 'primary' | 'secondary'
}
```

2. **Export from index.ts**
```typescript
// src/index.ts
export { MyComponent } from './components/MyComponent'
export type { MyComponentProps } from './components/MyComponent'
```

3. **Add Tests** (in `tests/`)
```typescript
// tests/MyComponent.test.ts
import { describe, it, expect } from 'vitest'
import { MyComponent } from '../src'

describe('MyComponent', () => {
  it('renders with variant prop', () => {
    // Test implementation
  })
})
```

4. **Update Demo** (in `src/demo.ts`)
```typescript
import { MyComponent } from '../components/MyComponent'

// Add to demo app
```

5. **Update Documentation**
   - Add to README.md
   - Update CHANGELOG.md
   - Add JSDoc comments

## Code Standards

### TypeScript
- Strict mode enabled
- Use `PropType<T>` for props
- Export interfaces for all components
- No `any` types

### Component Guidelines
- Use Composition API with `setup()`
- Use `computed()` for computed properties
- Use `defineComponent()` for component definition
- Include JSDoc comments
- Support attributes spreading (`v-bind="$attrs"`)

### Testing
- Unit tests for each component
- Test props and variants
- Test slot rendering
- Test event emission

### Commits
```bash
git add .
git commit -m "feat: add MyComponent with variants"
# Or: "fix: button click handler"
# Or: "docs: update README"
# Or: "test: add MyComponent tests"
```

## Building & Testing

```bash
# Type checking
npm run typecheck

# Run tests
npm run test

# Build library
npm run build

# Verify dist output
ls dist/
```

## Pull Request Process

1. **Fork and branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** following code standards

3. **Test locally**
   ```bash
   npm run test
   npm run typecheck
   npm run build
   ```

4. **Commit with meaningful messages**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/my-feature
   ```

6. **PR Description Template**
   ```markdown
   ## Changes
   - What changed
   - Why it changed
   
   ## Testing
   - How to test
   - What was tested
   
   ## Checklist
   - [ ] Tests pass
   - [ ] Types pass
   - [ ] Build succeeds
   - [ ] Documentation updated
   ```

## Release Process

**For Maintainers Only:**

```bash
# 1. Update CHANGELOG.md
# 2. Update version
npm version minor

# 3. Push to main
git push origin main --tags

# 4. Publish to npm
npm publish --access public
```

## Questions?

- **Issues**: File a GitHub issue
- **Discussions**: Use GitHub discussions 
- **Contacts**: See MAINTAINERS.md

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
