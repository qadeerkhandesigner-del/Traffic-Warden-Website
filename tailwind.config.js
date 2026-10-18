/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#256DD2',
            50: '#F0F5FD',
            100: '#DCE8FA',
            200: '#BAD3F5',
            300: '#8FB9EF',
            400: '#5A9AE7',
            500: '#256DD2',
            600: '#1D56AD',
            700: '#174389',
            800: '#13356D',
            900: '#0F2B57',
            950: '#091A36',
          },
          lime: {
            DEFAULT: '#B3FA16',
            hover: '#9FE00E',
            light: '#E2FDB2',
            50: '#F7FEE7',
            100: '#EEFCC4',
            200: '#E2FDB2',
            300: '#CFFB62',
            400: '#B3FA16',
            500: '#9FE00E',
            600: '#7EBA07',
            700: '#5F8F09',
            800: '#4A6F0D',
            900: '#3E5C10',
          },
          dark: {
            DEFAULT: '#0B1220',
            surface: '#111B2E',
            elevated: '#17243C',
            border: '#233352',
            muted: '#64748B',
          },
          light: {
            bg: '#F5F7FA',
            surface: '#FFFFFF',
            subtle: '#EDF1F7',
            border: '#E2E8F0',
            text: '#1E293B',
            muted: '#64748B',
          }
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans Arabic', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
        nastaliq: ['Noto Nastaliq Urdu', 'serif'],
        // Used for the Urdu advisory text on the Galiyat advisory page.
        // Registered from the visitor's system font, with Noto Nastaliq as fallback.
        jameel: ['Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      boxShadow: {
        'gov': '0 1px 3px 0 rgba(11, 18, 32, 0.05), 0 1px 2px -1px rgba(11, 18, 32, 0.05)',
        'gov-md': '0 4px 6px -1px rgba(11, 18, 32, 0.08), 0 2px 4px -2px rgba(11, 18, 32, 0.05)',
        'gov-lg': '0 10px 15px -3px rgba(11, 18, 32, 0.08), 0 4px 6px -4px rgba(11, 18, 32, 0.04)',
      },
    },
  },
  plugins: [],
}
