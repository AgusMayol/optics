'use client';
import * as React from 'react';

export function useAutoWidth(
  deps = [],
  options = {
    includeParentBox: true,
    includeSelfBox: false,
  }
) {
  const ref = React.useRef(null);
  const roRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  const measure = React.useCallback(() => {
    const el = ref.current;
    if (!el) return 0;

    const base = el.getBoundingClientRect().width || 0;

    let extra = 0;

    if (options.includeParentBox && el.parentElement) {
      const cs = getComputedStyle(el.parentElement);
      const paddingX =
        (parseFloat(cs.paddingLeft || '0') || 0) +
        (parseFloat(cs.paddingRight || '0') || 0);
      const borderX =
        (parseFloat(cs.borderLeftWidth || '0') || 0) +
        (parseFloat(cs.borderRightWidth || '0') || 0);
      const isBorderBox = cs.boxSizing === 'border-box';
      if (isBorderBox) {
        extra += paddingX + borderX;
      }
    }

    if (options.includeSelfBox) {
      const cs = getComputedStyle(el);
      const paddingX =
        (parseFloat(cs.paddingLeft || '0') || 0) +
        (parseFloat(cs.paddingRight || '0') || 0);
      const borderX =
        (parseFloat(cs.borderLeftWidth || '0') || 0) +
        (parseFloat(cs.borderRightWidth || '0') || 0);
      const isBorderBox = cs.boxSizing === 'border-box';
      if (isBorderBox) {
        extra += paddingX + borderX;
      }
    }

    const dpr =
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const total = Math.ceil((base + extra) * dpr) / dpr;

    return total;
  }, [options.includeParentBox, options.includeSelfBox]);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    setWidth(measure());

    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    const ro = new ResizeObserver(() => {
      const next = measure();
      requestAnimationFrame(() => setWidth(next));
    });

    ro.observe(el);
    if (options.includeParentBox && el.parentElement) {
      ro.observe(el.parentElement);
    }

    roRef.current = ro;

    return () => {
      ro.disconnect();
      roRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  React.useLayoutEffect(() => {
    if (width === 0) {
      const next = measure();
      if (next !== 0) setWidth(next);
    }
  }, [width, measure]);

  return {
    ref,
    width,
  };
}




