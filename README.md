```markdown
# React Native Onboarding Flow

A clean, modern, and **theme-aware** onboarding experience built with **React Native**, featuring:

- **3-step onboarding** (Goal → Username → Currency)
- **Light & Dark mode** support with system sync
- **Reusable UI components** and **consistent design tokens**
- **TypeScript-ready** structure
- **Searchable currency modal** with flags
- **Smooth navigation** with progress indicator

---


## Features

- [x] Multi-step onboarding (3 steps)
- [x] Goal selection with visual feedback
- [x] Username input with character limit (15)
- [x] Currency picker with **search**, **flags**, and **country names**
- [x] Theme toggle (Light/Dark) with **system preference sync**
- [x] Persistent theme using `AsyncStorage`
- [x] Fully typed with TypeScript-ready interfaces
- [x] Reusable design system (spacing, radius, colors)
- [x] Custom `AppText` component with font weight mapping
- [x] Progress bar in header
- [x] Back navigation (disabled on first step)
- [x] Blur backdrop for currency modal

---

## Project Structure

```
src/
├── components/
│   ├── app_texts/app_text.tsx
│   ├── app_buttons/primary_button.tsx
│   ├── app_icons/
│   │   ├── checked_icons/
│   │   ├── arrow_icons/
│   │   ├── theme_icons/
│   │   └── search_icons/
│   └── custom_headers/Header.tsx
├── templates/auth/
│   ├── step_a.tsx (Goal Selection)
│   ├── step_b.tsx (Username)
│   └── step_c.tsx (Currency)
├── contexts/
│   └── ThemeProvider.tsx
├── constants/
│   ├── data.ts (GOALS, CURRENCIES)
│   ├── spacing_and_radius.ts
│   └── colors.ts
└── screens/
    └── OnboardingSteps.tsx
```

---

## Key Components

### `OnboardingSteps`
- Main screen orchestrating the 3 steps
- Manages state: `step`, `selectedGoal`, `username`, `selectedCurrency`
- Conditional rendering of step templates
- "Continue" / "Finish" button with validation

### `Step1Goal`
- Displays list of predefined goals
- Radio-style selection with check icons

### `Step2Username`
- `@username` input with live character counter
- Max 15 characters

### `Step3Currency`
- Clickable input opens **bottom sheet modal**
- Searchable `FlatList` of 25+ currencies
- Flags, names, codes, and country
- Blur background using `@react-native-community/blur`

### `ThemeProvider`
- System theme detection (`Appearance`)
- Persists user preference via `AsyncStorage`
- Provides `theme`, `colors`, `toggleTheme`

### `Header`
- Back button (disabled on step 1)
- Progress dots
- Theme toggle icon

---

## Design Tokens

### Spacing (`SPACING`)
```ts
xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, huge: 48
```

### Border Radius (`RADIUS`)
```ts
sm: 8, md: 12, lg: 16, xl: 24, full: 48, pill: 999
```

### Colors (Light & Dark)
- `primary`: `#3A5A3F` (shared)
- `accent`: `#10B981` / `#34D399`
- Responsive text, borders, surfaces

---

## Dependencies

```json
{
  "dependencies": {
    "react-native": "*",
    "react-native-safe-area-context": "*",
    "@react-native-async-storage/async-storage": "*",
    "@react-native-community/blur": "*"
  }
}
```

## Setup & Installation

1. **Clone the repo**
   ```bash

   ```

2. **Install dependencies**
   ```bash
   yarn
   ```

3. **iOS - Install Pods**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

---

## Customization

### Add New Goal
Edit `constants/data.ts`:
```ts
export const GOALS = [
  { id: 'id', label: 'goal' },
];
```

### Add Currency
```ts
{ code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', flag: 'Kenya' }
```

### Change Fonts
Update `fontMap` in `AppText.tsx`:
```ts
regular: 'ReThinkSans-Regular',
medium: 'ReThinkSans-Medium',
bold: 'ReThinkSans-Bold'
```

---


```# task-react-native-cli
