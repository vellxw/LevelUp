"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-20px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="mr-[0.25em] last:mr-0 inline-block overflow-hidden py-[0.1em]">
          <span
            className={cn(
              "inline-block transition-transform duration-700",
              inView ? "translate-y-0" : "translate-y-[105%]"
            )}
            style={{
              transitionDelay: `${delay + wordIdx * 0.04}s`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
