# Changelog

All notable changes to this project will be documented in this file.

## [1.5.0] - 2024-05-23

### Added
- **Next.js Compatibility**: Added `"use client"` directive to support App Router without server-side errors.
- **Improved SSR**: Replaced `useLayoutEffect` with `useEffect` to prevent server warnings.
- **Better Defaults**: Changed default `threshold` from 0.5 to 0.1 for faster image loading when entering the viewport.
- **Testing**: Added Vitest configuration and unit tests for robustness.
- **Performance**: Optimized style generation with `useMemo` to reduce re-renders.

### Fixed
- **Dynamic Src Bug**: Fixed an issue where changing the `src` prop on a loaded image or after an error wouldn't reset the state, causing the image to not update or load.
- **Dependency Management**: Moved `terser` to `devDependencies` to reduce production package size for users.
