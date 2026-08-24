import { useEffect, useRef, useState } from "react";

/* Fades content up when it enters the viewport.
   Usage: <Reveal delay={0.1}>...</Reveal> */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
