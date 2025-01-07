module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:'#E7F8FD',
        'custom-gray': '#243B5599',
        'secondary':'#243B55',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
};module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E7F8FD',
          50: 'rgba(231, 248, 253, 0.05)',
          100: 'rgba(231, 248, 253, 0.1)',
          200: 'rgba(231, 248, 253, 0.2)',
          300: 'rgba(231, 248, 253, 0.3)',
          400: 'rgba(231, 248, 253, 0.4)',
          500: 'rgba(231, 248, 253, 0.5)',
          600: 'rgba(231, 248, 253, 0.6)',
          700: 'rgba(231, 248, 253, 0.7)',
          800: 'rgba(231, 248, 253, 0.8)',
          900: 'rgba(231, 248, 253, 0.9)',
        },
        'custom-gray': {
          DEFAULT: '#243B55',
          50: 'rgba(36, 59, 85, 0.05)',
          100: 'rgba(36, 59, 85, 0.1)',
          200: 'rgba(36, 59, 85, 0.2)',
          300: 'rgba(36, 59, 85, 0.3)',
          400: 'rgba(36, 59, 85, 0.4)',
          500: 'rgba(36, 59, 85, 0.5)',
          600: 'rgba(36, 59, 85, 0.6)',
          700: 'rgba(36, 59, 85, 0.7)',
          800: 'rgba(36, 59, 85, 0.8)',
          900: 'rgba(36, 59, 85, 0.9)',
        },
        secondary: {
          DEFAULT: '#243B55',
          50: 'rgba(36, 59, 85, 0.05)',
          100: 'rgba(36, 59, 85, 0.1)',
          200: 'rgba(36, 59, 85, 0.2)',
          300: 'rgba(36, 59, 85, 0.3)',
          400: 'rgba(36, 59, 85, 0.4)',
          500: 'rgba(36, 59, 85, 0.5)',
          600: 'rgba(36, 59, 85, 0.6)',
          700: 'rgba(36, 59, 85, 0.7)',
          800: 'rgba(36, 59, 85, 0.8)',
          900: 'rgba(36, 59, 85, 0.9)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

