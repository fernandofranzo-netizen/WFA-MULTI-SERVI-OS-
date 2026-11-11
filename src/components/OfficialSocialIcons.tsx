import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Official WhatsApp Logomark:
 * Iconic #25D366 circular green background with official white speech bubble & phone glyph.
 */
export const OfficialWhatsAppLogo: React.FC<IconProps> = ({
  className = "w-6 h-6",
  size
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-label="WhatsApp"
      role="img"
    >
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 8.5C15.44 8.5 8.5 15.44 8.5 24C8.5 26.74 9.22 29.4 10.57 31.75L8.5 39.5L16.42 37.42C18.7 38.69 21.31 39.5 24 39.5C32.56 39.5 39.5 32.56 39.5 24C39.5 15.44 32.56 8.5 24 8.5ZM24 36.88C21.68 36.88 19.41 36.25 17.42 35.07L16.95 34.79L12.25 36.02L13.5 31.43L13.19 30.93C11.9 28.89 11.22 26.5 11.22 24C11.22 16.95 16.95 11.22 24 11.22C27.42 11.22 30.63 12.55 33.05 14.97C35.47 17.39 36.8 20.6 36.8 24.02C36.78 31.11 31.05 36.88 24 36.88ZM31.02 27.81C30.63 27.62 28.73 26.68 28.38 26.55C28.02 26.43 27.76 26.37 27.5 26.76C27.24 27.15 26.51 28.01 26.29 28.27C26.06 28.52 25.84 28.55 25.45 28.36C25.06 28.16 23.8 27.75 22.33 26.44C21.18 25.41 20.41 24.14 20.17 23.75C19.95 23.36 20.15 23.16 20.34 22.95C20.51 22.78 20.73 22.51 20.93 22.28C21.12 22.05 21.18 21.89 21.31 21.62C21.44 21.36 21.38 21.14 21.28 20.95C21.18 20.75 20.41 18.87 20.08 18.09C19.76 17.34 19.45 17.43 19.21 17.42H18.47C18.21 17.42 17.8 17.51 17.44 17.9C17.08 18.29 16.09 19.22 16.09 21.1C16.09 22.98 17.46 24.8 17.66 25.05C17.85 25.31 20.36 29.18 24.21 30.84C25.12 31.23 25.84 31.48 26.39 31.65C27.31 31.95 28.16 31.9 28.82 31.8C29.57 31.69 31.12 30.86 31.44 29.97C31.77 29.07 31.77 28.32 31.67 28.16C31.57 28 31.38 27.93 31.02 27.81Z"
      />
    </svg>
  );
};

/**
 * Official Instagram Logomark:
 * Iconic radial/linear gradient with the official rounded square, lens, and flash dot.
 */
export const OfficialInstagramLogo: React.FC<IconProps> = ({
  className = "w-6 h-6",
  size
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-label="Instagram"
      role="img"
    >
      <defs>
        <radialGradient id="ig-rg" cx="15%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="10%" stopColor="#ff7a00" />
          <stop offset="50%" stopColor="#ff0169" />
          <stop offset="100%" stopColor="#d300c5" />
        </radialGradient>
        <linearGradient id="ig-lg" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#ig-lg)" />
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="8"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
      />
      <circle
        cx="24"
        cy="24"
        r="7.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
      />
      <circle cx="32" cy="16" r="2" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * Official Email Symbol:
 * Clean, standard email envelope logomark with envelope flap and base in an official badge.
 */
export const OfficialEmailLogo: React.FC<IconProps> = ({
  className = "w-6 h-6",
  size
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-label="E-mail"
      role="img"
    >
      <rect width="48" height="48" rx="12" fill="#EA4335" />
      <path
        fill="#FFFFFF"
        d="M12 16C10.9 16 10 16.9 10 18V30C10 31.1 10.9 32 12 32H36C37.1 32 38 31.1 38 30V18C38 16.9 37.1 16 36 16H12ZM12 18H36L24 25.5L12 18ZM12 20.35L23.47 27.52C23.79 27.72 24.21 27.72 24.53 27.52L36 20.35V30H12V20.35Z"
      />
    </svg>
  );
};
