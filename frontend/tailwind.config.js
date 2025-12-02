/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Portfolio Palette - Dynamic
        jetBlack: 'var(--color-bg-primary)',
        charcoal: 'var(--color-bg-secondary)',
        neonAqua: 'var(--color-primary)',
        softPurple: 'var(--color-secondary)',
        pureWhite: 'var(--color-text-primary)',

        // Aliases for consistency
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        deepSpace: 'var(--color-bg-primary)',
        voidBlack: 'var(--color-bg-primary)',
        softGrey: 'var(--color-text-secondary)',
        grey: 'var(--color-text-secondary)',

        // Admin Panel Colors (keep original for visibility)
        darkNavy: '#0F1D40',  // dark blue for text on white
        lightBlue: '#F0F4F8',  // light grey-blue for admin backgrounds

        // Legacy support
        black: 'var(--color-bg-primary)',
        matteBlack: 'var(--color-bg-secondary)',
        deepBlack: 'var(--color-bg-primary)',
        neonPurple: 'var(--color-secondary)',
        gold: 'var(--color-primary)',
        lightGold: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        'dark-gradient': 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
        'glow-gradient': 'radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px var(--color-primary)' },
          '100%': { boxShadow: '0 0 40px var(--color-primary), 0 0 60px var(--color-secondary)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px var(--color-primary), 0 0 40px var(--color-primary)',
        'neon-lg': '0 0 30px var(--color-primary), 0 0 60px var(--color-primary)',
        'purple': '0 0 20px var(--color-secondary), 0 0 40px var(--color-secondary)',
        'glow': '0 0 40px var(--color-primary), 0 0 80px var(--color-secondary)',
      }
    },
  },
  plugins: [],
}
