"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"

// Context local para cada instancia de HoverCard para manejar estados de interacción
const HoverCardInstanceContext = React.createContext({
  shouldKeepOpenRef: { current: false },
  setShouldKeepOpen: () => { },
  isPointerOverTriggerRef: { current: false },
  isPointerOverContentRef: { current: false },
  openHoverCard: () => { },
  delay: 600,
});

function HoverCard({
  open: controlledOpen,
  onOpenChange,
  delay = 600,
  ...props
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  // Refs locales para cada instancia de HoverCard
  const shouldKeepOpenRef = React.useRef(false);
  const isPointerOverTriggerRef = React.useRef(false);
  const isPointerOverContentRef = React.useRef(false);

  const setShouldKeepOpen = React.useCallback((value) => {
    shouldKeepOpenRef.current = value;
  }, []);

  const openHoverCard = React.useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setUncontrolledOpen(true);
    }
  }, [isControlled, onOpenChange]);

  function handleOpenChange(nextOpen, eventDetails) {
    // Lógica para mantener abierto si el mouse está sobre el trigger o el contenido
    if (!nextOpen) {
      if (
        isPointerOverTriggerRef.current ||
        isPointerOverContentRef.current ||
        shouldKeepOpenRef.current
      ) {
        if (isControlled) {
          onOpenChange?.(true);
        } else {
          setUncontrolledOpen(true);
        }
        return;
      }
    }

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    if (nextOpen) {
      setShouldKeepOpen(true);
    } else {
      setShouldKeepOpen(false);
    }

    onOpenChange?.(nextOpen, eventDetails);
  }

  return (
    <HoverCardInstanceContext.Provider
      value={{
        shouldKeepOpenRef,
        setShouldKeepOpen,
        isPointerOverTriggerRef,
        isPointerOverContentRef,
        openHoverCard,
        delay,
      }}
    >
      <PreviewCardPrimitive.Root
        data-slot="hover-card"
        open={isOpen}
        onOpenChange={handleOpenChange}
        delay={delay}
        {...props}
      />
    </HoverCardInstanceContext.Provider>
  );
}

function HoverCardTrigger({
  onClick,
  onPointerDown,
  onPointerLeave,
  onPointerEnter,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...props
} = {}) {
  const {
    setShouldKeepOpen,
    isPointerOverTriggerRef,
    isPointerOverContentRef,
    openHoverCard,
    delay,
  } = React.useContext(HoverCardInstanceContext);

  const longPressTimeoutRef = React.useRef(null);
  const isTouchActiveRef = React.useRef(false);

  React.useEffect(() => {
    return () => {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      onClick?.(event);
    },
    [onClick],
  );

  const handlePointerDown = React.useCallback(
    (event) => {
      setShouldKeepOpen(true);
      isPointerOverTriggerRef.current = true;
      event.stopPropagation();
      onPointerDown?.(event);
    },
    [onPointerDown, setShouldKeepOpen],
  );

  const handlePointerEnter = React.useCallback(
    (event) => {
      setShouldKeepOpen(true);
      isPointerOverTriggerRef.current = true;
      onPointerEnter?.(event);
    },
    [onPointerEnter, setShouldKeepOpen],
  );

  const handlePointerLeave = React.useCallback(
    (event) => {
      isPointerOverTriggerRef.current = false;
      if (!isPointerOverContentRef.current) {
        setShouldKeepOpen(false);
      }
      onPointerLeave?.(event);
    },
    [onPointerLeave, setShouldKeepOpen, isPointerOverContentRef],
  );

  const handleTouchStart = React.useCallback(
    (event) => {
      isTouchActiveRef.current = true;
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }

      longPressTimeoutRef.current = setTimeout(() => {
        if (isTouchActiveRef.current) {
          setShouldKeepOpen(true);
          isPointerOverTriggerRef.current = true;
          openHoverCard();
          // En mobile, el preventDefault evita el menú contextual al hacer long press
          if (event.cancelable) event.preventDefault();
        }
      }, delay);

      onTouchStart?.(event);
    },
    [onTouchStart, setShouldKeepOpen, openHoverCard, delay],
  );

  const handleTouchEnd = React.useCallback(
    (event) => {
      isTouchActiveRef.current = false;
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
      }
      onTouchEnd?.(event);
    },
    [onTouchEnd],
  );

  const handleTouchCancel = React.useCallback(
    (event) => {
      isTouchActiveRef.current = false;
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
      }
      onTouchCancel?.(event);
    },
    [onTouchCancel],
  );

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      {...props}
    />
  );
}

function HoverCardContent({
  className = "",
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  onPointerEnter,
  onPointerLeave,
  ...props
}) {
  const {
    setShouldKeepOpen,
    isPointerOverTriggerRef,
    isPointerOverContentRef,
  } = React.useContext(HoverCardInstanceContext);

  const handlePointerEnter = React.useCallback(
    (event) => {
      setShouldKeepOpen(true);
      isPointerOverContentRef.current = true;
      onPointerEnter?.(event);
    },
    [onPointerEnter, setShouldKeepOpen],
  );

  const handlePointerLeave = React.useCallback(
    (event) => {
      isPointerOverContentRef.current = false;
      if (!isPointerOverTriggerRef.current) {
        setShouldKeepOpen(false);
      }
      onPointerLeave?.(event);
    },
    [onPointerLeave, setShouldKeepOpen, isPointerOverTriggerRef],
  );

  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50">
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground w-72 rounded-lg p-2.5 text-xs/relaxed shadow-md ring-1 duration-100 z-50 origin-(--transform-origin) outline-hidden",
            className
          )}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          {...props} />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}


HoverCard.displayName = "HoverCard";
HoverCardTrigger.displayName = "HoverCardTrigger";
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent }

