/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{pug,js}'],
  theme: {
    extend: {
      spacing: {
        14.5: '3.625rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '4xl': '2.5rem',
      },
    },
    fontFamily: {
      intro: 'Intro',
      avenit: 'Avenir',
    },
    colors: {
      sec_500: '#7B93A7',
      sec_400: '#859BAD',
      sec_300: '#A3B4C2',
      sec_200: '#C2CDD6',
      sec_100: '#E0E6EB',
      prim_700: '#1B6C7E',
      prim_600: '#2490A8',
      prim_500: '#35A2BA',
      prim_400: '#57C3DB',
      prim_300: '#81D2E4',
      prim_200: '#ABE1ED',
      prim_100: '#D5F0F6',

      error: '#FF6058',
      white: '#FFFFFF',
      dark: '#3D4E5C',
      500: '#F5FBFF',
      50: '#EAF7FA',
      75: '#F0F9FF',
      100: '#E4F5FF',
      transparent: 'transparent',
    },

    screens: {
      lg: '769px',
      lg2: '1024px',
      xl: '1660px',
      xl2: '1920px',
    },
    container: {
      center: true,
    },
    fontSize: {
      h1: ['4rem', '110%'], //64px 110%
      h2: ['3rem', '120%'], //48px 120%
      h3: ['1.75rem', '130%'], //28px 130%
      h4: ['1.5rem', '130%'], //24px 130%
      h3: ['1.25rem', '130%'], //20px 130%
      body_m: ['1rem', '140%'], //16px 140%
      body_s: ['0.875rem', '140%'], //14px 140%
    },
    lineHeight: {
      120: '120%',
      130: '130%',
      140: '140%',
      160: '160%',
      180: '180%',
    },
    letterSpacing: {
      1.75: '0.0175rem',
      3: '0.03rem',
      3.5: '0.035rem',
      4: '0.04rem',
      6: '0.06rem',
      8: '0.08rem',
    },
    boxShadow: {
      input: '0px 0px 6px 0px rgba(87, 195, 219, 0.32)',
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1440px',
          padding: '0 ',
          marginRight: 'auto',
          marginLeft: 'auto',
        },
        '.container2': {
          maxWidth: '1530px',
          padding: '0 20px',
          marginRight: 'auto',
          marginLeft: 'auto',
          '@screen xl': {
            maxWidth: '1920px',
            padding: '0 195px',
          },
        },
        '.trans-300': {
          transition: 'all 0.3s ease',
        },
      });
    },
  ],
};
