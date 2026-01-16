import { cn } from "@/lib/utils"

function Skeleton({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-md animate-pulse", className)}
      {...props} />
  );
}


Skeleton.displayName = "Skeleton";

export { Skeleton }

