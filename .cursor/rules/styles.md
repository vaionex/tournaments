# Styling Rules
description: Rules for styling and CSS conventions using Tailwind CSS
pattern: **/*.{css,scss,js,jsx,ts,tsx}

## Tailwind Class Organization

1. Layout Classes
   - Position (relative, absolute, etc.)
   - Display (flex, grid, block)
   - Width/Height
   - Margin/Padding

2. Typography
   - Font family
   - Font size
   - Font weight
   - Text color

3. Visual Styles
   - Background
   - Border
   - Shadow
   - Opacity

## Component Style Pattern

```typescript
// Good
<div className="
  relative flex items-center  // Layout
  p-4 my-2                   // Spacing
  text-sm font-medium       // Typography
  bg-white rounded-lg       // Visual
  hover:bg-gray-50         // Interactive
  dark:bg-gray-800         // Theme variants
">

// Bad - Mixed concerns, harder to read
<div className="text-sm bg-white p-4 flex relative rounded-lg">
```

## Responsive Design

- Use mobile-first approach
- Standard breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## Theme Variables

- Use CSS variables for theme values
- Follow dark mode conventions
- Maintain consistent color palette

@file ../docs/cursor/rules.md 