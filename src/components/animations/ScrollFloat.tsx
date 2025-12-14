'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  containerClassName?: string;
}

export default function ScrollFloat({
  children,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=40%',
  scrollEnd = 'bottom bottom-=20%',
  stagger = 0.05,
  containerClassName = '',
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  // --- Recursively wrap text nodes in span ---
  const wrapTextNodes = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      return node.split('').map((char, i) => (
        <span key={i} className="float-char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (Array.isArray(node)) {
      return node.map((child, i) => (
        <React.Fragment key={i}>{wrapTextNodes(child)}</React.Fragment>
      ));
    }

    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        ...node.props,
        children: wrapTextNodes(node.props.children),
      });
    }

    return node;
  };

  const processed = wrapTextNodes(children);

  // --- GSAP animation ---
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll('.float-char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          yPercent: 100,
          scaleY: 2,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          ease,
          duration: animationDuration,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div ref={ref} className={`my-5 ${containerClassName}`}>
      {processed}
    </div>
  );
}
