# Project Structure Documentation

This document explains the purpose of each folder and file in the project.

---

## Root Directory

- **app.json**: Expo configuration file. Defines app name, icons, plugins, and platform-specific settings.
- **package.json**: Lists project dependencies, scripts, and metadata.
- **package-lock.json**: Auto-generated file that locks dependency versions.
- **tsconfig.json**: TypeScript configuration file.
- **eslint.config.js**: ESLint configuration for code linting.
- **README.md**: Basic project setup and Expo documentation links.
- **commands.txt**: (storing command for references.)

---

## Folders

### app/

Main source folder for app screens and routing (Expo Router):

- **+not-found.tsx**: Custom 404 (not found) page for undefined routes.
- **(tabs)/**: Contains tab-based navigation screens and layout.
  - **_layout.tsx**: Layout component for the tab navigator.
  - **index.tsx**: Main/home tab screen.
  - **explore.tsx**: Explore tab screen.

### assets/

Static assets for the app:

- **fonts/**: Custom fonts used in the app.
  - **SpaceMono-Regular.ttf**: Example custom font file.
- **images/**: Image assets for icons, splash screens, and logos.
  - **adaptive-icon.png**: Adaptive icon for Android.
  - **favicon.png**: Favicon for web.
  - **icon.png**: Main app icon.
  - **partial-react-logo.png, react-logo.png, <react-logo@2x.png>, <react-logo@3x.png>**: Various logo images.
  - **splash-icon.png**: Splash screen image.

### components/

Reusable UI components:

- **Collapsible.tsx**: Component for collapsible/expandable content.
- **ExternalLink.tsx**: Component for rendering external links.
- **HapticTab.tsx**: Tab component with haptic feedback.
- **HelloWave.tsx**: Animated waving hand or greeting component.
- **ParallaxScrollView.tsx**: ScrollView with parallax effect.
- **ThemedText.tsx**: Text component with theme support.
- **ThemedView.tsx**: View component with theme support.
- **ui/**: Platform-specific and shared UI primitives.
  - **IconSymbol.tsx / IconSymbol.ios.tsx**: Icon components (with iOS-specific version).
  - **TabBarBackground.tsx / TabBarBackground.ios.tsx**: Tab bar background components (with iOS-specific version).

### constants/

(Currently empty; typically used for storing constant values like colors, strings, etc.)

### hooks/

Custom React hooks for shared logic:

- **useColorScheme.ts**: Detects the current color scheme (light/dark mode).
- **useColorScheme.web.ts**: Web-specific color scheme detection.
- **useThemeColor.ts**: Returns themed colors based on current theme and color name.

### scripts/

Utility scripts for project maintenance:

- **reset-project.js**: Script to reset the project to a starter state.

---

## Notes

- Some files (e.g., `app/_layout.tsx`, `app/login.tsx`, `app/signup.tsx`, `constants/Colors.ts`) are deleted or missing.
- The `constants/` folder is currently empty but is typically used for shared constant values.

---

This documentation should help you understand the structure and purpose of each part of the project. For more details, refer to the code in each file or the [Expo documentation](https://docs.expo.dev/).
