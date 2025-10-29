'use client';;
import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { motion, AnimatePresence } from 'motion/react';

import { Highlight, HighlightItem } from '@/components/animate-ui/primitives/effects/highlight';
import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import { AutoHeight } from '@/components/animate-ui/primitives/effects/auto-height';

const [TabsProvider, useTabs] =
  getStrictContext('TabsContext');

function Tabs(props) {
  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
  });

  return (
    <TabsProvider value={{ value, setValue }}>
      <TabsPrimitive.Root data-slot="tabs" {...props} onValueChange={setValue} />
    </TabsProvider>
  );
}

function TabsHighlight({
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}) {
  const { value } = useTabs();

  return (
    <Highlight
      data-slot="tabs-highlight"
      controlledItems
      value={value}
      transition={transition}
      click={false}
      {...props} />
  );
}

function TabsList(props) {
  return <TabsPrimitive.List data-slot="tabs-list" {...props} />;
}

function TabsHighlightItem(props) {
  return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

function TabsTrigger(props) {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" {...props} />;
}

function TabsContent({
  value,
  forceMount,
  transition = { duration: 0.5, ease: 'easeInOut' },
  ...props
}) {
  return (
    <AnimatePresence mode="wait">
      <TabsPrimitive.Content asChild forceMount={forceMount} value={value}>
        <motion.div
          data-slot="tabs-content"
          layout
          layoutDependency={value}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={transition}
          {...props} />
      </TabsPrimitive.Content>
    </AnimatePresence>
  );
}

const defaultTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

function isAutoMode(props) {
  return !('mode' in props) || props.mode === 'auto-height';
}

function TabsContents(props) {
  const { value } = useTabs();

  if (isAutoMode(props)) {
    const { transition = defaultTransition, ...autoProps } = props;

    return (
      <AutoHeight
        data-slot="tabs-contents"
        deps={[value]}
        transition={transition}
        {...autoProps} />
    );
  }

  const { transition = defaultTransition, style, ...layoutProps } = props;

  return (
    <motion.div
      data-slot="tabs-contents"
      layout="size"
      layoutDependency={value}
      style={{ overflow: 'hidden', ...style }}
      transition={{ layout: transition }}
      {...layoutProps} />
  );
}

export { Tabs, TabsHighlight, TabsHighlightItem, TabsList, TabsTrigger, TabsContent, TabsContents };
