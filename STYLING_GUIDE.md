# Sports.Live - Styling and Icon Guide

## Overview

This document describes the styling implementation and icon usage in the Sports.Live NBA web application.

## Design Philosophy

- **Simple and Clean**: Minimal clutter, focus on data presentation
- **Great Overview**: Clear visual hierarchy for easy scanning
- **Mobile-First**: Responsive design optimized for all screen sizes
- **Data-Focused**: Icons and visual elements support information consumption

## Icon System

### Library

We use [Lucide React](https://lucide.dev/) for all icons. Lucide provides:

- Consistent design language
- Customizable size and color
- Accessible by default
- Lightweight bundle size

### Icon Usage by Component

#### Navigation & UI

- `ChevronLeft` / `ChevronRight` - Date navigation
- `Calendar` - Date indicator
- `Loader2` - Loading states
- `ChevronDown` / `ChevronUp` - Expandable sections

#### Game Information

- `MapPin` - Venue location
- `Tv` - Broadcast channels
- `Shield` - Team icon background

#### Statistics Icons

- `TrendingUp` - Points scored
- `Target` - Rebounds and field goals
- `Users` - Assists
- `Zap` - Steals
- `Shield` - Blocks
- `Clock` - Minutes played
- `Activity` - Free throw attempts

#### Rating System

- `Star` - Rating indicator
- `ThumbsUp` - Positive vote
- `ThumbsDown` - Negative vote

## Component Styling

### TeamIcon Component

Located in `components/game/TeamIcon.tsx`

**Features:**

- Color-coded team badges using NBA team colors
- Shield icon overlay for depth
- Responsive sizing: `sm`, `md`, `lg`, `xl`
- Hover effects for interactivity

**Usage:**

```tsx
<TeamIcon teamAbbreviation="LAL" teamName="Los Angeles Lakers" size="lg" />
```

### PlayerStatsTable Component

Located in `components/game/PlayerStatsTable.tsx`

**Features:**

- Expandable player rows for detailed statistics
- Icon-based stat categories
- Responsive grid layout
- Calculated percentages for shooting stats
- Mobile-optimized display

**Key Stats Displayed:**

- Basic: Points, Rebounds, Assists, Steals, Blocks
- Advanced: Field Goal %, 3-Point %, Free Throw %
- Time: Minutes played
- Fouls: Personal fouls

### GameCard Component

Located in `components/game/GameCard.tsx`

**Enhanced Features:**

- Large team icons with color identification
- Gradient backgrounds for visual appeal
- Clear VS divider between teams
- Prominent score display when revealed
- Spoiler protection with warning modal
- Expandable player statistics section
- Game rating integration

**States:**

- Scheduled: Gray badge, no scores
- Live: Animated red badge with pulse
- Final: Green badge, scores available

### DatePicker Component

Located in `components/shared/DatePicker.tsx`

**Features:**

- Calendar icon for visual identification
- Chevron navigation buttons
- "Jump to Today" quick action
- Responsive button sizing

## Color Scheme

### Team Colors

Each team has distinctive colors for easy recognition:

```typescript
// Examples:
Lakers: 'bg-purple-700 text-yellow-400';
Celtics: 'bg-green-700 text-white';
Warriors: 'bg-blue-600 text-yellow-400';
```

### Status Colors

- **Live**: Red with pulse animation
- **Final**: Green
- **Scheduled**: Gray

### UI Colors

- **Primary**: Blue (600-700 range)
- **Accent**: Purple (600-700 range)
- **Success**: Green
- **Warning**: Yellow/Orange
- **Error**: Red

## Responsive Design

### Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

### Grid Layout

- Mobile: 1 column
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns (`lg:grid-cols-3`)

## Typography

### Font Sizes

- **Hero**: `text-4xl` to `text-5xl` (36-48px)
- **Heading**: `text-2xl` to `text-3xl` (24-30px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Font Weights

- **Bold**: Headlines and team names
- **Semibold**: Section titles
- **Medium**: Default text
- **Regular**: Secondary information

## Spacing System

Following Tailwind's spacing scale:

- **Tight**: `gap-2` (8px)
- **Normal**: `gap-4` (16px)
- **Relaxed**: `gap-6` (24px)
- **Loose**: `gap-8` (32px)

## Effects & Animations

### Shadows

- **Cards**: `shadow-sm` to `shadow-lg`
- **Hover**: Increased shadow on hover
- **Focus**: Ring effect with `focus:ring-2`

### Transitions

- **Duration**: 200ms for most interactions
- **Easing**: Default ease for smooth animations
- **Hover**: Scale or shadow changes

### Special Effects

- **Gradient Text**: Main header (blue to purple)
- **Gradient Backgrounds**: Cards and buttons
- **Pulse Animation**: Live game indicator

## Accessibility

### Icon Accessibility

- All icons have `aria-hidden="true"`
- Descriptive text accompanies icons
- Button labels provided via `aria-label`

### Color Contrast

- Meets WCAG 2.1 AA standards
- High contrast mode supported
- Dark mode compatible

### Focus States

- Visible focus rings on interactive elements
- Keyboard navigation supported
- Logical tab order maintained

## Mock Data

### Player Statistics

Generated via `lib/mockPlayerStats.ts`

**Realistic Distributions:**

- Points: 0-35 range, higher for guards
- Rebounds: 0-15 range, higher for centers
- Minutes: Starters 25-40, bench 0-25
- Shooting %: FG 40-55%, 3PT 30-45%, FT 75-95%

## Best Practices

### Adding New Icons

1. Import from lucide-react
2. Use consistent sizing (`w-4 h-4` to `w-6 h-6`)
3. Apply appropriate color classes
4. Add descriptive title/aria-label

### Styling New Components

1. Follow existing patterns
2. Use Tailwind utility classes
3. Maintain responsive breakpoints
4. Test in dark mode
5. Ensure accessibility

### Performance

- Icons are tree-shaken (only imported ones included)
- Gradients used sparingly
- Animations respect `prefers-reduced-motion`
- Images optimized via Next.js Image component

## Future Enhancements

Potential improvements:

- Real team logos from CDN
- Animated stat charts
- More detailed player cards
- Shot charts and heat maps
- Video highlights integration
- Real-time score updates with animations

## References

- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js Image](https://nextjs.org/docs/api-reference/next/image)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
