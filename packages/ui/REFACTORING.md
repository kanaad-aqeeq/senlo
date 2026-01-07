# Refactoring Plan for @senlo/ui

This document outlines the planned improvements for the UI components package.

---

## 🔴 Critical Issues (P0)

### 1. Inconsistent CSS Approach

The package mixes two different styling approaches:

| Approach | Components |
|----------|------------|
| **CSS Modules** (`.module.css`) | Badge, ColorPicker, Dialog, FormField, FormGrid, FormSection, JsonEditor, Label, PageHeader, PaddingControl, Select, Slider, Textarea, ToggleGroup |
| **Global CSS** (`.css` with BEM) | Button, Card, Input |

**Problems:**
- Inconsistent developer experience
- Global CSS can cause conflicts
- Different import patterns

**Action:** Migrate Button, Card, Input to CSS Modules for consistency.

---

### 2. Hardcoded Colors

Colors are hardcoded as hex values instead of using CSS custom properties:

```css
/* Current */
background-color: #18181b;
color: #fafafa;
border-color: #e4e4e7;

/* Should be */
background-color: var(--sl-color-bg-primary);
color: var(--sl-color-text-primary);
border-color: var(--sl-color-border);
```

**Problems:**
- No theming support (dark mode impossible)
- Hard to maintain consistent colors
- Duplicated color values across files

**Action:** Create CSS variables system and refactor all components to use them.

---

## 🟡 Code Quality (P1)

### 3. Missing `forwardRef` on Components

Several components don't forward refs, limiting their composability:

| Component | Has forwardRef |
|-----------|----------------|
| Button | ✅ |
| Card | ✅ |
| Input | ✅ |
| Select | ✅ |
| ColorPicker | ✅ |
| Slider | ✅ |
| **Badge** | ❌ |
| **Dialog** | ❌ |
| **FormField** | ❌ |
| **PageHeader** | ❌ |
| **EmptyState** | ❌ |

**Action:** Add `forwardRef` to Badge, Dialog, FormField, PageHeader, EmptyState.

---

### 4. Missing `displayName`

Some components don't set `displayName`, making debugging harder:

- Badge
- Dialog
- FormField
- PageHeader
- EmptyState
- FormSection
- FormGrid
- JsonEditor
- Label
- PaddingControl
- ToggleGroup

**Action:** Add `displayName` to all components.

---

### 5. TypeScript `@ts-ignore` Comments

`ColorPicker` has `@ts-ignore` comments that should be replaced with proper typing:

```typescript
// @ts-ignore
internalRef.current = node;
// @ts-ignore
ref.current = node;
```

**Action:** Use proper ref typing or `useImperativeHandle`.

---

### 6. Inconsistent `"use client"` Directive

Some client components have `"use client"`, others don't:

| Component | Has "use client" | Needs it? |
|-----------|------------------|-----------|
| Badge | ✅ | ❌ (no hooks) |
| ColorPicker | ✅ | ✅ |
| Dialog | ✅ | ✅ |
| JsonEditor | ✅ | ✅ |
| Slider | ✅ | ✅ |
| Button | ❌ | ❌ |
| Card | ❌ | ❌ |
| Input | ❌ | ❌ |

**Action:** Remove `"use client"` from Badge (doesn't use hooks). Keep only where actually needed.

---

## 🟢 Minor Improvements (P2)

### 7. Export `cn` Utility

The `cn` utility is not exported from the package, but could be useful for consumers:

```typescript
// index.ts
export { cn } from "./lib/cn";
```

**Action:** Add export for `cn` utility.

---

### 8. Empty `styles.css` File

The `styles.css` file exists but is empty. Either:
- Add global styles/CSS variables here
- Remove if not needed

**Action:** Use for CSS variables or remove.

---

### 9. Add JSDoc Documentation

Components lack documentation:

```typescript
/**
 * A customizable button component with multiple variants and sizes.
 * 
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 */
export const Button = React.forwardRef<...>
```

**Action:** Add JSDoc to all exported components.

---

### 10. Accessibility Improvements

Some components could have better a11y:

- **Dialog**: Add `aria-describedby` for description
- **ColorPicker**: Add keyboard navigation
- **Slider**: Add `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

**Action:** Audit and improve accessibility attributes.

---

## 🔵 Future Considerations (P3)

### 11. Component Variants with CVA

Consider using `class-variance-authority` for type-safe variant handling:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("sl-btn", {
  variants: {
    variant: {
      default: "sl-btn--default",
      primary: "sl-btn--primary",
      // ...
    },
    size: {
      default: "sl-btn--default",
      sm: "sl-btn--sm",
      // ...
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

**Status:** Optional, evaluate if variants become complex.

---

### 12. Storybook for Component Documentation

Add Storybook for visual component documentation and testing.

**Status:** Low priority for open-source project.

---

## 📊 Priority Matrix

| Priority | Task | Complexity | Time Estimate |
|----------|------|------------|---------------|
| ✅ P0 | CSS Variables system | Medium | 2 hours |
| ✅ P0 | Update all components to use CSS variables | Easy | 30 min |
| ✅ P1 | Add forwardRef to all components | Easy | 20 min |
| ✅ P1 | Add displayName to all components | Trivial | 10 min |
| ✅ P1 | Fix @ts-ignore in ColorPicker | Easy | 10 min |
| ✅ P2 | Export cn utility | Trivial | 1 min |
| ✅ P2 | Add CSS variables to styles.css | Trivial | 5 min |
| ✅ P2 | Add JSDoc documentation | Medium | 30 min |
| ✅ P2 | Accessibility improvements | Medium | 1 hour |
| 🔵 P3 | CVA for variants | Medium | 1 hour |
| 🔵 P3 | Storybook setup | High | 3+ hours |

---

## Progress Tracker

- [x] P0: Create CSS variables system
- [x] P0: Update all components to use CSS variables
- [x] P1: Add forwardRef to all components
- [x] P1: Add displayName to all components
- [x] P1: Fix @ts-ignore in ColorPicker
- [x] P2: Export cn utility
- [x] P2: Add CSS variables to styles.css
- [x] P2: Add JSDoc documentation
- [x] P2: Accessibility improvements
- [ ] P3: CVA for variants (optional)
- [ ] P3: Storybook (optional)

