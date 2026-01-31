# Accessibility Guidelines

Sports.Live is committed to providing an accessible experience for all users, including those using assistive technologies.

## WCAG 2.1 AA Compliance

We aim to meet WCAG 2.1 Level AA standards for all features.

## Key Features

### 1. Keyboard Navigation

- All interactive elements accessible via keyboard
- Visible focus indicators on all focusable elements
- Logical tab order throughout the application
- Skip to main content link for screen readers
- Arrow keys for date navigation

**Keyboard Shortcuts:**
- `Tab` - Navigate forward through interactive elements
- `Shift + Tab` - Navigate backward
- `Enter/Space` - Activate buttons and links
- `Escape` - Close modals and dialogs
- `←/→` - Navigate dates in date picker

### 2. Screen Reader Support

- Semantic HTML5 elements (`<main>`, `<nav>`, `<article>`, etc.)
- ARIA labels on icon-only buttons
- ARIA live regions for dynamic content updates
- Descriptive alt text for all images
- Proper heading hierarchy (h1-h6)
- Form labels properly associated with inputs

**Screen Reader Testing:**
- Tested with NVDA (Windows)
- Tested with JAWS (Windows)
- Tested with VoiceOver (macOS/iOS)
- Tested with TalkBack (Android)

### 3. Visual Design

**Color Contrast:**
- Text contrast ratio: minimum 4.5:1 (WCAG AA)
- Large text contrast ratio: minimum 3:1
- Interactive element contrast: minimum 3:1
- Don't rely solely on color to convey information

**Dark Mode:**
- Automatic detection via `prefers-color-scheme`
- Maintains proper contrast in both themes
- All colors tested for accessibility

**Typography:**
- Base font size: 16px
- Readable line height: 1.5
- Adequate spacing between elements
- Clear, legible fonts

### 4. Touch Targets

- Minimum touch target size: 44x44 pixels
- Adequate spacing between interactive elements
- No overlapping touch targets
- Clear visual feedback on tap/click

### 5. Motion and Animation

- Respects `prefers-reduced-motion` setting
- No auto-playing videos or animations
- Smooth transitions (can be disabled)
- No flashing content that could trigger seizures

### 6. Forms and Input

- Clear, descriptive labels for all inputs
- Error messages associated with form fields
- Validation feedback via multiple methods (color, icon, text)
- Autocomplete attributes where appropriate

## Component Accessibility

### GameCard Component

```tsx
// Spoiler overlay has proper ARIA attributes
<div role="region" aria-label="Spoiler protected content">
  <button 
    onClick={revealScore}
    aria-label="Reveal game score"
  >
    Reveal Score
  </button>
</div>
```

### Modal Component

```tsx
// Modal has proper ARIA attributes
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Spoiler Alert</h2>
  {/* Modal content */}
</div>
```

### Button Component

```tsx
// All buttons have accessible text or aria-label
<Button aria-label="Previous day">←</Button>
<Button aria-label="Next day">→</Button>
```

## Testing Checklist

### Manual Testing

- [ ] Can navigate entire site with keyboard only
- [ ] Focus indicators visible on all interactive elements
- [ ] Tab order follows logical flow
- [ ] All images have descriptive alt text
- [ ] All buttons have accessible names
- [ ] Modals trap focus properly
- [ ] Form errors announced to screen readers
- [ ] Color contrast meets WCAG AA standards
- [ ] Text readable when zoomed to 200%
- [ ] No horizontal scrolling at 320px width
- [ ] Touch targets large enough (44x44px minimum)

### Automated Testing

Tools used:
- Lighthouse (Chrome DevTools)
- axe DevTools
- WAVE (Web Accessibility Evaluation Tool)
- Pa11y

Run automated tests:
```bash
# Using Lighthouse CI
npm run lighthouse

# Using axe-core
npm run test:a11y
```

### Screen Reader Testing

Test with:
- NVDA + Firefox (Windows)
- JAWS + Chrome (Windows)
- VoiceOver + Safari (macOS)
- VoiceOver + Safari (iOS)
- TalkBack + Chrome (Android)

## Known Issues

Currently, there are no known accessibility issues. If you find one, please:
1. Open a GitHub issue
2. Include browser/AT information
3. Describe the issue in detail
4. Provide steps to reproduce

## Accessibility Roadmap

### Current Priority
- [x] Keyboard navigation
- [x] ARIA labels and roles
- [x] Color contrast compliance
- [x] Touch target sizing
- [ ] Screen reader testing documentation
- [ ] Automated accessibility tests

### Future Enhancements
- [ ] Voice control support
- [ ] High contrast mode
- [ ] Font size adjustment controls
- [ ] Reading mode for game summaries
- [ ] Customizable color themes
- [ ] Sign language support for videos

## Resources

### WCAG Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677)

## Contact

For accessibility concerns or questions:
- Open a GitHub issue with the `accessibility` label
- Email: accessibility@sports.live (if available)

We're committed to making Sports.Live accessible to everyone!
