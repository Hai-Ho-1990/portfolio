import React, { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit items-center justify-center rounded-[1.25rem] font-medium overflow-hidden ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 animate-gradient pointer-events-none"
          style={gradientStyle}
        >
          {/* inner background */}
          <div className="absolute inset-[1px] rounded-[1.25rem] bg-black" />
        </div>
      )}

      <span
        className="relative z-10 text-transparent bg-clip-text animate-gradient"
        style={gradientStyle}
      >
        {children}
      </span>
    </div>
  );
}
