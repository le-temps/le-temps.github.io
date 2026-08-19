import typography from '@tailwindcss/typography';

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    textColor: {
      skin: {
        base: withOpacity('--color-text-base'),
        accent: withOpacity('--color-accent'),
        inverted: withOpacity('--color-fill'),
      },
    },
    backgroundColor: {
      skin: {
        fill: withOpacity('--color-fill'),
        accent: withOpacity('--color-accent'),
        inverted: withOpacity('--color-text-base'),
        card: withOpacity('--color-card'),
        'card-muted': withOpacity('--color-card-muted'),
      },
    },
    outlineColor: {
      skin: {
        fill: withOpacity('--color-accent'),
      },
    },
    borderColor: {
      skin: {
        line: withOpacity('--color-border'),
        fill: withOpacity('--color-text-base'),
        accent: withOpacity('--color-accent'),
      },
    },
    fill: {
      skin: {
        base: withOpacity('--color-text-base'),
        accent: withOpacity('--color-accent'),
      },
      transparent: 'transparent',
    },
    stroke: {
      skin: {
        accent: withOpacity('--color-accent'),
      },
    },
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [typography],
};
