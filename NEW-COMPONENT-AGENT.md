# new-component-agent Implementation Summary

## Overview

A specialized AI agent has been created to automate the development of new Vue 3 UI components for the m3re-unicorn component library. This agent ensures consistency, accessibility, and adherence to established patterns.

## Files Created

### Agent Configuration
- **Location:** `~/.claude/agents/new-component-agent.json`
- **Model:** Claude Sonnet 4.6
- **Tools:** Read, Write, Edit, Grep, Glob, Bash, Figma MCP tools, WebFetch

### Documentation
1. **`~/.claude/projects/.../memory/MEMORY.md`**
   - Project-wide memory including agent overview
   - Component architecture patterns
   - Design system tokens reference
   - Quick reference for all project context

2. **`~/.claude/projects/.../memory/new-component-agent-guide.md`**
   - Comprehensive usage guide (4000+ words)
   - Detailed workflow explanation
   - Code pattern examples
   - Troubleshooting section
   - Best practices

3. **`~/.claude/agents/README.md`**
   - Agent directory index
   - Quick reference for all agents
   - Agent creation best practices

## How It Works

### Two-Stage Workflow

#### Stage 1: Planning (Requires Approval)
1. Analyzes component requirements
2. If Figma URL provided:
   - Extracts design context
   - Auto-maps colors to design tokens
   - Documents mapping decisions
3. Designs architecture:
   - Props structure with TypeScript types
   - Accessibility features (ARIA, keyboard nav)
   - Mobile-first responsive strategy
   - Design token mappings
4. **Presents plan and waits for approval**

#### Stage 2: Implementation (After Approval)
1. Creates component files:
   - `src/components/{name}.ts` - Vue component
   - `src/components/{name}.css` - Styles
2. Updates exports:
   - `src/index.ts` - Add component exports
   - `src/styles.css` - Import CSS
3. Adds demo:
   - `demo.html` - Comprehensive examples + nav link
4. **Generates verification checklist**

## Key Features

### ✅ Figma Integration
- Automatically parses Figma URLs
- Extracts design context via MCP
- Auto-maps colors to closest design tokens
- Uses screenshots as visual reference

### ✅ Accessibility-First (WCAG 2.1 AA)
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Color contrast verification
- Touch target sizing (44x44px min)

### ✅ Mobile-First Responsive
- Base styles for mobile (320px+)
- min-width media queries
- Touch-friendly interactions
- Responsive typography/spacing
- Multiple breakpoint testing

### ✅ Design Token Integration
- Zero hard-coded colors
- All values mapped to tokens
- Theme compatibility (light/dark)
- Utility class usage
- Typography token leverage

### ✅ Comprehensive Testing
- Detailed verification checklist
- Visual, accessibility, code quality, integration tests
- Specific test instructions
- TypeScript type checking
- Browser console verification

## Usage Examples

### Basic Invocation
```
User: "Create a Badge component with status colors"

Main Agent:
1. Gather requirements
2. Invoke Agent tool:
   - subagent_type: "new-component-agent"
   - prompt: "Create Badge component with status variants (success/warning/error/info),
             sizes (sm/md/lg), filled and outlined styles."
```

### With Figma
```
User: "Implement this design as a Tooltip component:
https://figma.com/design/ABC123/Project?node-id=1-2"

Main Agent:
1. Extract fileKey=ABC123, nodeId=1:2
2. Invoke Agent tool:
   - subagent_type: "new-component-agent"
   - prompt: "Create Tooltip component from Figma design.
             URL: https://figma.com/design/ABC123/Project?node-id=1-2"
```

## Component Pattern Enforced

### TypeScript Structure
```typescript
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type Variant = 'primary' | 'secondary'

const Component = defineComponent({
  name: 'ComponentName',
  props: {
    variant: { type: String as PropType<Variant>, default: 'primary' }
  },
  setup(props, { slots }) {
    const classes = computed(() => ({
      'component': true,
      [`component-${props.variant}`]: true
    }))
    return { classes }
  },
  template: `<div :class="classes"><slot /></div>`
})

export { Component }
export interface ComponentProps { /* ... */ }
export type { Variant }
```

### CSS Structure
```css
@import '../tokens/colors.css';
@import '../tokens/typography.css';

.component {
  /* Use tokens only */
  color: var(--color-text);
}

.component:focus-visible {
  outline: 2px solid var(--color-primary);
}

[data-theme="dark"] .component {
  /* Dark theme adjustments */
}

@media (min-width: 768px) {
  /* Responsive styles */
}
```

## Verification Checklist Generated

For each component, the agent generates a comprehensive checklist:

### Visual Verification
- Open demo.html in browser
- Check all variants render correctly
- Test light and dark themes
- Verify responsive at 375px, 768px, 1280px+
- Compare to Figma design (if applicable)

### Accessibility Verification
- Tab through interactive elements
- Test keyboard activation (Enter/Space/Escape)
- Verify focus indicators visible
- Screen reader testing
- Check color contrast (WCAG AA)
- Verify touch targets ≥44x44px
- Ensure no keyboard traps

### Code Quality Checks
- Run `npm run typecheck` (no errors)
- Check browser console (no errors)
- Verify only tokens used (no hard-coded values)
- Confirm pattern compliance
- Verify exports in index.ts
- Confirm CSS import in styles.css

### Integration Test
- Component renders in demo.html
- No console errors/warnings
- Theme switching works smoothly
- Navigation link functional
- Correct section scrolling

## Benefits

1. **Consistency:** All components follow the same pattern
2. **Speed:** Automates boilerplate creation
3. **Quality:** Built-in accessibility and responsive design
4. **Safety:** Two-stage approval prevents unwanted code
5. **Documentation:** Auto-generates comprehensive demos
6. **Testing:** Provides detailed verification checklists

## Best Practices

### For Invoking the Agent
1. Gather all requirements first
2. Include Figma URL if available
3. Wait for plan approval
4. Review verification checklist
5. Actually run the checklist!

### For Component Design
1. Keep components focused (single responsibility)
2. Prefer composition over complexity
3. Make variants orthogonal (size + color + style)
4. Use slots for customization
5. Provide sensible defaults

## Success Criteria

A component is successfully created when:
- ✅ Follows Button/Card pattern
- ✅ Uses design tokens exclusively
- ✅ Supports light and dark themes
- ✅ Mobile-first responsive
- ✅ Meets WCAG 2.1 AA standards
- ✅ Includes comprehensive demo
- ✅ Passes TypeScript checking
- ✅ Zero console errors
- ✅ Includes usage guidelines
- ✅ Documented in navigation

## Next Steps

To use the agent:

1. **Request a new component:**
   ```
   "Create a [ComponentName] component with [requirements]"
   ```

2. **Agent presents plan** → Review carefully

3. **Approve plan** → "Yes, proceed"

4. **Agent implements** → Generates files + checklist

5. **Run verification** → Use the checklist

6. **Test manually** → Open demo.html, test interactions

7. **Commit changes** → Standard git workflow

## Troubleshooting

### Agent doesn't wait for approval
- Check that Stage 1/2 separation is clear in prompt
- Ensure "WAIT FOR USER APPROVAL" is emphasized

### Colors don't match Figma exactly
- Agent auto-maps to closest tokens
- Review mapping in plan
- Override if needed: "Use --color-warning instead"

### Accessibility features missing
- Review checklist - should include all WCAG AA
- Common: focus indicators, aria-labels, semantic HTML

### TypeScript errors after implementation
- Agent should run typecheck before finishing
- Check PropType usage
- Verify exports in index.ts

## Documentation Links

- **Main Guide:** `~/.claude/projects/.../memory/new-component-agent-guide.md`
- **Quick Reference:** `~/.claude/projects/.../memory/MEMORY.md`
- **Agent Config:** `~/.claude/agents/new-component-agent.json`
- **Agent Directory:** `~/.claude/agents/README.md`

---

**Agent Status:** ✅ Ready for use
**Last Updated:** 2026-03-17
**Version:** 1.0
