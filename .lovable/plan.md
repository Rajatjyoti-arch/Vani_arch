

# Add Visual Contrast and Color to the Sovereign Theme

## Problem
The current "Sovereign" theme is too achromatic. The primary color (Royal Navy #002147) is extremely dark (14% lightness), making it nearly invisible against the near-black background. Cards at `bg-white/[0.02]` are barely distinguishable. The result feels washed out and monochrome.

## Solution
Brighten key accent colors and increase card contrast while maintaining the institutional, professional tone. No neon or sci-fi — just more visible, usable colors.

## Changes

### 1. Update CSS Theme Variables (`src/index.css`)

| Variable | Current | New | Reason |
|----------|---------|-----|--------|
| `--primary` | `213 100% 14%` (near-black navy) | `213 80% 35%` (visible navy blue) | Primary buttons/links become readable |
| `--accent` | `160 50% 30%` (dark emerald) | `160 60% 40%` (brighter emerald) | Status indicators and badges pop |
| `--card` | `220 14% 6%` | `220 14% 8%` | Cards slightly more visible |
| `--border` | `220 10% 12%` | `220 10% 15%` | Borders more defined |
| `--muted-foreground` | `220 10% 45%` | `220 10% 55%` | Secondary text more readable |
| `--sovereign-navy` | `213 100% 14%` | `213 80% 35%` | Consistent with primary |
| `--sovereign-emerald` | `160 50% 30%` | `160 60% 40%` | Consistent with accent |
| `--status-safe` | `160 50% 30%` | `160 60% 42%` | Green status more visible |
| `--status-info` | `213 60% 45%` | `213 70% 50%` | Info blue more visible |

### 2. Increase Card Visibility (`src/components/ui/card.tsx`)
- Change card background from `bg-white/[0.02]` to `bg-white/[0.04]`
- Change hover from `bg-white/[0.035]` to `bg-white/[0.06]`
- Increase border opacity from `rgba(255,255,255,0.06)` to `rgba(255,255,255,0.08)`

### 3. Sidebar Accent Updates (`src/index.css`)
- `--sidebar-primary`: match the brighter emerald
- `--sidebar-accent`: bump from `220 10% 8%` to `220 10% 10%`

These are minimal, targeted changes that add meaningful visual contrast without breaking the professional institutional aesthetic.

