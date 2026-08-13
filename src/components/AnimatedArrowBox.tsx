import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * The recurring dashed-border square with an arrow that slides in on hover.
 * Used on every "read more" style link across the site.
 */
export default function AnimatedArrowBox({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "up-right";
  className?: string;
}) {
  return (
    <span
      className={`relative grid size-8 shrink-0 place-items-center rounded-lg border border-dashed border-foreground/30 transition-colors duration-300 group-hover:border-foreground/60 group-hover:bg-foreground group-hover:text-background overflow-hidden ${className}`}
    >
      <span className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-x-full">
        {direction === "right" ? (
          <ArrowRight size={14} />
        ) : (
          <ArrowUpRight size={14} />
        )}
      </span>
      <span className="absolute inset-0 flex items-center justify-center -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0">
        {direction === "right" ? (
          <ArrowRight size={14} />
        ) : (
          <ArrowUpRight size={14} />
        )}
      </span>
    </span>
  );
}
