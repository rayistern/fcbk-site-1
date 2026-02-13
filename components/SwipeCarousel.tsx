"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

interface SwipeCarouselProps {
  children: ReactNode[];
}

export function SwipeCarousel({ children }: SwipeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = children.length;

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const itemWidth = el.offsetWidth * 0.82;
    const index = Math.round(el.scrollLeft / itemWidth);
    setActiveIndex(Math.min(index, count - 1));
  }, [count]);

  return (
    <div>
      <div ref={scrollRef} onScroll={handleScroll} className="swipe-track">
        {children.map((child, i) => (
          <div key={i} className="swipe-item">
            {child}
          </div>
        ))}
      </div>
      {count > 1 && (
        <div className="swipe-dots">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`swipe-dot ${i === activeIndex ? "active" : ""}`}
              style={{ width: i === activeIndex ? "20px" : "6px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
