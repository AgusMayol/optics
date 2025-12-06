'use client';;
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

const HighlightContext = React.createContext(// eslint-disable-next-line @typescript-eslint/no-explicit-any
undefined);

function useHighlight() {
  const context = React.useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
}

function Highlight(
  {
    ref,
    ...props
  }
) {
  const {
    as: Component = 'div',
    children,
    value,
    defaultValue,
    onValueChange,
    className,
    style,
    transition = { type: 'spring', stiffness: 350, damping: 35 },
    hover = false,
    click = true,
    enabled = true,
    controlledItems,
    disabled = false,
    exitDelay = 200,
    mode = 'children',
  } = props;

  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);

  const [activeValue, setActiveValue] = React.useState(value ?? defaultValue ?? null);
  const [boundsState, setBoundsState] = React.useState(null);
  const [activeClassNameState, setActiveClassNameState] =
    React.useState('');

  const safeSetActiveValue = React.useCallback((id) => {
    setActiveValue((prev) => (prev === id ? prev : id));
    if (id !== activeValue) onValueChange?.(id);
  }, [activeValue, onValueChange]);

  const safeSetBounds = React.useCallback((bounds) => {
    if (!localRef.current) return;

    const boundsOffset = (props)
      ?.boundsOffset ?? {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };

    const containerRect = localRef.current.getBoundingClientRect();
    const newBounds = {
      top: bounds.top - containerRect.top + (boundsOffset.top ?? 0),
      left: bounds.left - containerRect.left + (boundsOffset.left ?? 0),
      width: bounds.width + (boundsOffset.width ?? 0),
      height: bounds.height + (boundsOffset.height ?? 0),
    };

    setBoundsState((prev) => {
      if (
        prev &&
        prev.top === newBounds.top &&
        prev.left === newBounds.left &&
        prev.width === newBounds.width &&
        prev.height === newBounds.height
      ) {
        return prev;
      }
      return newBounds;
    });
  }, [props]);

  const clearBounds = React.useCallback(() => {
    setBoundsState((prev) => (prev === null ? prev : null));
  }, []);

  React.useEffect(() => {
    if (value !== undefined) setActiveValue(value);
    else if (defaultValue !== undefined) setActiveValue(defaultValue);
  }, [value, defaultValue]);

  const id = React.useId();

  React.useEffect(() => {
    if (mode !== 'parent') return;
    const container = localRef.current;
    if (!container) return;

    const onScroll = () => {
      if (!activeValue) return;
      const activeEl = container.querySelector(`[data-value="${activeValue}"][data-highlight="true"]`);
      if (activeEl) safeSetBounds(activeEl.getBoundingClientRect());
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [mode, activeValue, safeSetBounds]);

  const render = React.useCallback((children) => {
    if (mode === 'parent') {
      return (
        <Component
          ref={localRef}
          data-slot="motion-highlight-container"
          style={{ position: 'relative', zIndex: 1 }}
          className={(props)?.containerClassName}>
          <AnimatePresence initial={false} mode="wait">
            {boundsState && (
              <motion.div
                data-slot="motion-highlight"
                animate={{
                  top: boundsState.top,
                  left: boundsState.left,
                  width: boundsState.width,
                  height: boundsState.height,
                  opacity: 1,
                }}
                initial={{
                  top: boundsState.top,
                  left: boundsState.left,
                  width: boundsState.width,
                  height: boundsState.height,
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    ...transition,
                    delay: (transition?.delay ?? 0) + (exitDelay ?? 0) / 1000,
                  },
                }}
                transition={transition}
                style={{ position: 'absolute', zIndex: 0, ...style }}
                className={cn(className, activeClassNameState)} />
            )}
          </AnimatePresence>
          {children}
        </Component>
      );
    }

    return children;
  }, [
    mode,
    Component,
    props,
    boundsState,
    transition,
    exitDelay,
    style,
    className,
    activeClassNameState,
  ]);

  return (
    <HighlightContext.Provider
      value={{
        mode,
        activeValue,
        setActiveValue: safeSetActiveValue,
        id,
        hover,
        click,
        className,
        style,
        transition,
        disabled,
        enabled,
        exitDelay,
        setBounds: safeSetBounds,
        clearBounds,
        activeClassName: activeClassNameState,
        setActiveClassName: setActiveClassNameState,
        forceUpdateBounds: (props)
          ?.forceUpdateBounds,
      }}>
      {enabled
        ? controlledItems
          ? render(children)
          : render(React.Children.map(children, (child, index) => (
        <HighlightItem key={index} className={props?.itemsClassName}>
          {child}
        </HighlightItem>
      )))
        : children}
    </HighlightContext.Provider>
  );
}

function getNonOverridingDataAttributes(element, dataAttributes) {
  return Object.keys(dataAttributes).reduce((acc, key) => {
    if ((element.props)[key] === undefined) {
      acc[key] = dataAttributes[key];
    }
    return acc;
  }, {});
}

function HighlightItem(
  {
    ref,
    as,
    children,
    id,
    value,
    className,
    style,
    transition,
    disabled = false,
    activeClassName,
    exitDelay,
    asChild = false,
    forceUpdateBounds,
    ...props
  }
) {
  const itemId = React.useId();
  const {
    activeValue,
    setActiveValue,
    mode,
    setBounds,
    clearBounds,
    hover,
    click,
    enabled,
    className: contextClassName,
    style: contextStyle,
    transition: contextTransition,
    id: contextId,
    disabled: contextDisabled,
    exitDelay: contextExitDelay,
    forceUpdateBounds: contextForceUpdateBounds,
    setActiveClassName,
  } = useHighlight();

  const Component = as ?? 'div';
  const element = children;
  const childValue =
    id ?? value ?? element.props?.['data-value'] ?? element.props?.id ?? itemId;
  const isActive = activeValue === childValue;
  const isDisabled = disabled === undefined ? contextDisabled : disabled;
  const itemTransition = transition ?? contextTransition;

  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);

  React.useEffect(() => {
    if (mode !== 'parent') return;
    let rafId;
    let previousBounds = null;
    const shouldUpdateBounds =
      forceUpdateBounds === true ||
      (contextForceUpdateBounds && forceUpdateBounds !== false);

    const updateBounds = () => {
      if (!localRef.current) return;

      const bounds = localRef.current.getBoundingClientRect();

      if (shouldUpdateBounds) {
        if (
          previousBounds &&
          previousBounds.top === bounds.top &&
          previousBounds.left === bounds.left &&
          previousBounds.width === bounds.width &&
          previousBounds.height === bounds.height
        ) {
          rafId = requestAnimationFrame(updateBounds);
          return;
        }
        previousBounds = bounds;
        rafId = requestAnimationFrame(updateBounds);
      }

      setBounds(bounds);
    };

    if (isActive) {
      updateBounds();
      setActiveClassName(activeClassName ?? '');
    } else if (!activeValue) clearBounds();

    if (shouldUpdateBounds) return () => cancelAnimationFrame(rafId);
  }, [
    mode,
    isActive,
    activeValue,
    setBounds,
    clearBounds,
    activeClassName,
    setActiveClassName,
    forceUpdateBounds,
    contextForceUpdateBounds,
  ]);

  if (!React.isValidElement(children)) return children;

  const dataAttributes = {
    'data-active': isActive ? 'true' : 'false',
    'aria-selected': isActive,
    'data-disabled': isDisabled,
    'data-value': childValue,
    'data-highlight': true,
  };

  const commonHandlers = hover
    ? {
        onMouseEnter: (e) => {
          setActiveValue(childValue);
          element.props.onMouseEnter?.(e);
        },
        onMouseLeave: (e) => {
          setActiveValue(null);
          element.props.onMouseLeave?.(e);
        },
      }
    : click
      ? {
          onClick: (e) => {
            setActiveValue(childValue);
            element.props.onClick?.(e);
          },
        }
      : {};

  if (asChild) {
    if (mode === 'children') {
      return React.cloneElement(element, {
        key: childValue,
        ref: localRef,
        className: cn('relative', element.props.className),
        ...getNonOverridingDataAttributes(element, {
          ...dataAttributes,
          'data-slot': 'motion-highlight-item-container',
        }),
        ...commonHandlers,
        ...props,
      }, <>
        <AnimatePresence initial={false} mode="wait">
          {isActive && !isDisabled && (
            <motion.div
              layoutId={`transition-background-${contextId}`}
              data-slot="motion-highlight"
              style={{
                position: 'absolute',
                zIndex: 0,
                ...contextStyle,
                ...style,
              }}
              className={cn(contextClassName, activeClassName)}
              transition={itemTransition}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  ...itemTransition,
                  delay:
                    (itemTransition?.delay ?? 0) +
                    (exitDelay ?? contextExitDelay ?? 0) / 1000,
                },
              }}
              {...dataAttributes} />
          )}
        </AnimatePresence>

        <Component
          data-slot="motion-highlight-item"
          style={{ position: 'relative', zIndex: 1 }}
          className={className}
          {...dataAttributes}>
          {children}
        </Component>
      </>);
    }

    return React.cloneElement(element, {
      ref: localRef,
      ...getNonOverridingDataAttributes(element, {
        ...dataAttributes,
        'data-slot': 'motion-highlight-item',
      }),
      ...commonHandlers,
    });
  }

  return enabled ? (
    <Component
      key={childValue}
      ref={localRef}
      data-slot="motion-highlight-item-container"
      className={cn(mode === 'children' && 'relative', className)}
      {...dataAttributes}
      {...props}
      {...commonHandlers}>
      {mode === 'children' && (
        <AnimatePresence initial={false} mode="wait">
          {isActive && !isDisabled && (
            <motion.div
              layoutId={`transition-background-${contextId}`}
              data-slot="motion-highlight"
              style={{
                position: 'absolute',
                zIndex: 0,
                ...contextStyle,
                ...style,
              }}
              className={cn(contextClassName, activeClassName)}
              transition={itemTransition}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  ...itemTransition,
                  delay:
                    (itemTransition?.delay ?? 0) +
                    (exitDelay ?? contextExitDelay ?? 0) / 1000,
                },
              }}
              {...dataAttributes} />
          )}
        </AnimatePresence>
      )}

      {React.cloneElement(element, {
        style: { position: 'relative', zIndex: 1 },
        className: element.props.className,
        ...getNonOverridingDataAttributes(element, {
          ...dataAttributes,
          'data-slot': 'motion-highlight-item',
        }),
      })}
    </Component>
  ) : (
    children
  );
}

export { Highlight, HighlightItem, useHighlight };
