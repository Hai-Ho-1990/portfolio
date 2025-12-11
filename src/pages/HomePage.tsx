// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { ReactLenis, useLenis } from 'lenis/react';
// import HeaderComponent from '../components/header/headerComponent';
// import About from '../components/About';
// import Works from '../components/works/WorksComponent';
// import FooterComponent from '../components/footer/footerComponent';

// export default function HorizontalScroll(): JSX.Element {
//   const ulRef = useRef<HTMLUListElement>(null);
//   const lenis = useLenis();

//   useEffect(() => {
//     const ul = ulRef.current;
//     if (!ul || !lenis) return;

//     const slides = ul.querySelectorAll('li');
//     const maxScroll = lenis.limit; // Total scrollable distance

//     // 🔄 Drive horizontal scroll animation directly from Lenis scroll events
//     const unsubscribe = lenis.on('scroll', ({ scroll: scrollPos }) => {
//       const progress = scrollPos / maxScroll; // 0–1

//       // Stagger animation: About first 50% of scroll, then Works slides in
//       let animationProgress = 0;
//       if (progress < 0.5) {
//         // First 50% of scroll: keep About visible (no movement)
//         animationProgress = 0;
//       } else {
//         // Second 50% of scroll: animate Works in (map 0.5-1.0 to 0-1)
//         animationProgress = (progress - 0.5) * 2;
//       }

//       const translateX = -animationProgress * (slides.length - 1) * 100; // vw
//       ul.style.transform = `translateX(${translateX}vw)`;
//     });

//     // 🧹 Cleanup
//     return () => {
//       unsubscribe?.();
//     };
//   }, [lenis]);

//   return (
//     <ReactLenis root>
//       {/* HEADER */}
//       <HeaderComponent />
//       <About />
//       {/* HORIZONTAL SCROLL */}
//       <section data-scroll className="relative h-[600vh]">
//         <ul ref={ulRef} className="flex sticky top-0 left-0 h-screen will-change-transform">
//           {/* SLIDES: WORKS */}
//           <Works />
//         </ul>
//       </section>

//       {/* FOOTER */}
//       <FooterComponent />
//     </ReactLenis>
//   );
// }

'use client';
import React, { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import HeaderComponent from '../components/header/headerComponent';
import About from '../components/About';
import Works from '../components/works/WorksComponent';
import BlogComponent from '../components/BlogComponent';
import FooterComponent from '../components/footer/footerComponent';

export default function HorizontalScroll(): JSX.Element {
  const ulRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const ul = ulRef.current;
    const section = sectionRef.current;
    if (!ul || !lenis || !section) return;

    const slides = ul.querySelectorAll('li');
    const slideCount = slides.length;

    // Lägg till 1 extra viewport så sista sliden hinner scrollas ut helt
    section.style.height = `${slideCount * 100 + 100}vh`;

    const update = ({ scroll }: { scroll: number }) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + scroll; // KORREKT med Lenis
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const start = sectionTop;
      const end = sectionTop + sectionHeight - viewportHeight;

      const clamped = Math.min(Math.max(scroll, start), end);
      const progress = (clamped - start) / (end - start);

      const translateX = -progress * (slideCount - 1) * 100;
      ul.style.transform = `translateX(${translateX}vw)`;
    };

    lenis.on('scroll', update);

    return () => {
      lenis.off('scroll', update);
    };
  }, [lenis]);

  return (
    <ReactLenis root>
      <main>
        {/* HEADER */}
        <HeaderComponent />

        {/* ABOUT */}
        <About />

        {/* HORIZONTAL SCROLL */}
        <section ref={sectionRef} data-scroll className="relative min-h-screen">
          <ul ref={ulRef} className="flex sticky top-0 left-0 h-screen will-change-transform">
            <Works />
          </ul>
        </section>

        {/* BLOG */}
        <BlogComponent />

        {/* FOOTER */}
        <FooterComponent />
      </main>
    </ReactLenis>
  );
}
