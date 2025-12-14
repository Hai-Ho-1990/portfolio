'use client';

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // 🔤 Split text only if children is a string
  const splitText = useMemo(() => {
    if (typeof children !== 'string') return children;
    return children.split(/(\s+)/).map((word, i) =>
      word.trim() ? (
        <span className="inline-block word" key={i}>
          {word}
        </span>
      ) : (
        word
      )
    );
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current && scrollContainerRef.current !== null
        ? scrollContainerRef.current
        : window;

    // 🌀 Rotation
    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    // ✨ Word opacity + blur
    const words = el.querySelectorAll<HTMLElement>('.word');
    const opacityTween = gsap.fromTo(
      words,
      { opacity: baseOpacity },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    let blurTween: GSAPTween | null = null;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        words,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=50%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    // 💥 Cleanup
    return () => {
      rotationTween.scrollTrigger?.kill();
      opacityTween.scrollTrigger?.kill();
      blurTween?.scrollTrigger?.kill();
      rotationTween.kill();
      opacityTween.kill();
      blurTween?.kill();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      <div className={textClassName}>{splitText}</div>
    </div>
  );
};

export default ScrollReveal;
