/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Para NumberGrid: 19 columnas que puedan encogerse
        19: 'repeat(19, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        // Para NumberGrid: 4 filas que puedan encogerse
        4: 'repeat(4, minmax(0, 1fr))',
      },
      keyframes: {
        // Animación realista de giro para la ruleta
        'spin-realistic': {
          '0%': {
            transform: 'rotate(0deg)',
            'animation-timing-function': 'ease-out',
          },
          '100%': {
            transform: 'rotate(1800deg)',
            'animation-timing-function': 'ease-out',
          },
        },
      },
      animation: {
        // Clave para usar en la clase animate-spin-realistic
        'spin-realistic': 'spin-realistic 3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
