import React from 'react';

interface CollegeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showCampus?: boolean;
  lightText?: boolean;
  variant?: 'image' | 'vector';
}

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showCampus = true,
  lightText = false,
  variant = 'image',
}) => {
  const sizeMap = {
    sm: { img: 'h-8', text: 'text-xs', sub: 'text-[9px]' },
    md: { img: 'h-10', text: 'text-sm', sub: 'text-[10px]' },
    lg: { img: 'h-14', text: 'text-base', sub: 'text-xs' },
    xl: { img: 'h-20', text: 'text-xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Image Logo */}
      <img
        src="/punjab-colleges-logo.png"
        alt="Punjab Colleges Logo"
        className={`${sizeMap.img} w-auto object-contain shrink-0 drop-shadow-xs`}
      />

      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-black tracking-wider uppercase font-sans ${sizeMap.text} ${
                lightText ? 'text-white' : 'text-[#232766] dark:text-blue-300'
              }`}
            >
              Smart Campus
            </span>
          </div>
          {showCampus && (
            <span
              className={`font-bold tracking-tight font-sans mt-0.5 ${sizeMap.sub} ${
                lightText ? 'text-red-300' : 'text-[#ea432a] dark:text-red-400'
              }`}
            >
              Minar-e-Pakistan Campus, Lahore
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Standalone Vector Icon component for places where pure SVG is needed
export const CollegeLogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Flame/Minar in Red-Orange (#ea432a) */}
      <path
        d="M50 12 L50 48 M44 22 L44 48 M56 22 L56 48 M38 28 L38 48 M62 28 L62 48"
        stroke="#ea432a"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Open Book Nested Geometric Lines in Deep Navy (#232766) */}
      <path
        d="M26 44 L50 58 L74 44"
        stroke="#232766"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 52 L50 67 L78 52"
        stroke="#232766"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 60 L50 76 L82 60"
        stroke="#232766"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 68 L50 85 L86 68"
        stroke="#232766"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

