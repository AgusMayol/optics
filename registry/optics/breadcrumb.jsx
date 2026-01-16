import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({
  className = "",
  ...props
}) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props} />
  );
}

function BreadcrumbList({
  className = "",
  ...props
}) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground gap-1.5 text-xs/relaxed flex flex-wrap items-center break-words",
        className
      )}
      {...props} />
  );
}

function BreadcrumbItem({
  className = "",
  ...props
}) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("gap-1 inline-flex items-center", className)}
      {...props} />
  );
}

function BreadcrumbLink({
  className = "",
  render = undefined,
  ...props
}) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps({
      className: cn("hover:text-foreground transition-colors", className),
    }, props),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
}

function BreadcrumbPage({
  className = "",
  ...props
}) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props} />
  );
}

function BreadcrumbSeparator({
  children = null,
  className = "",
  ...props
}) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}>
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  );
}

function BreadcrumbEllipsis({
  className = "",
  ...props
}) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("size-4 [&>svg]:size-3.5 flex items-center justify-center", className)}
      {...props}>
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  );
}


Breadcrumb.displayName = "Breadcrumb";
BreadcrumbList.displayName = "BreadcrumbList";
BreadcrumbItem.displayName = "BreadcrumbItem";
BreadcrumbLink.displayName = "BreadcrumbLink";
BreadcrumbPage.displayName = "BreadcrumbPage";
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

