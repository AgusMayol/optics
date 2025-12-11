---
description: Rules for modern React Optimization
globs: *
alwaysApply: false
---
# React Optimization Rules

## Core Principles

Optimize for real performance bottlenecks, not perceived ones. Profile before optimizing. Premature optimization adds complexity without guaranteed benefits.

## Component Optimization

Use React.memo for expensive pure components that receive the same props frequently. Avoid wrapping every component—this adds overhead.

Implement useMemo for expensive calculations, not simple operations. Reserve for computationally intensive transformations, filtered/sorted large arrays, or complex object creations.

Apply useCallback when passing callbacks to memoized children or when callbacks are dependencies in useEffect/useMemo. Don't use it everywhere.

## State Management

Keep state as local as possible. Lift state only when necessary for sharing between components.

Avoid storing derived values in state. Calculate them during render or use useMemo for expensive derivations.

Split large state objects into smaller, independent pieces to prevent unnecessary re-renders.

Use state updater functions when new state depends on previous state to avoid stale closures.

## Rendering Optimization

Implement key props correctly in lists. Use stable, unique identifiers, never array indices for dynamic lists.

Break large components into smaller ones. This enables more granular re-rendering and improves code organization.

Use React.lazy and Suspense for code-splitting routes and heavy components.

Avoid creating objects or functions in render. Define them outside the component or memoize them.

## Event Handlers

Bind event handlers in the component body or use arrow functions in class properties, not in JSX.

Debounce or throttle expensive event handlers like scroll, resize, or input changes.

## Lists and Virtualization

Implement virtualization for long lists using libraries like react-window or react-virtual.

Avoid inline arrow functions in list item props unless the list is small and static.

## Context Optimization

Split contexts by update frequency. Separate rarely-changing and frequently-changing values.

Memoize context values to prevent unnecessary provider re-renders.

Consider using multiple smaller contexts instead of one large context.

## Images and Assets

Lazy load images below the fold using native loading="lazy" or intersection observers.

Serve appropriately sized images. Use responsive images with srcset.

Consider next-gen formats like WebP with fallbacks.

## Bundle Optimization

Tree-shake libraries by using named imports instead of default imports where possible.

Analyze bundle size regularly with tools like webpack-bundle-analyzer.

Lazy load heavy third-party libraries when possible.

## Effects and Side Effects

Keep useEffect dependencies arrays accurate. Missing dependencies cause stale closures, unnecessary dependencies cause extra runs.

Clean up side effects properly to prevent memory leaks.

Avoid useEffect for derived state. Prefer calculating during render.

## Profiling

Use React DevTools Profiler to identify actual bottlenecks.

Measure performance with Chrome DevTools Performance tab.

Monitor real user metrics, not just development environment performance.

## Anti-Patterns to Avoid

Never mutate state directly. Always create new objects/arrays.

Avoid excessive prop drilling. Use context or composition patterns.

Don't optimize without measuring. Optimization adds complexity.

Avoid anonymous functions as useEffect dependencies.

Don't use index as key in dynamic lists.