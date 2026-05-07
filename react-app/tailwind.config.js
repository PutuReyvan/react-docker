/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F5F4F0',
        surface: '#FFFFFF',
        'surface-alt': '#EFEBE5',
        primary: '#1A201C',
        secondary: '#5C665F',
        muted: '#8A948D',
        border: '#DEDBD4',
        accent: '#3E5745',
        'accent-hover': '#2B3D30',
        'success-bg': '#E5EBE6',
        'success-text': '#2C4533',
        'warning-bg': '#F5EADC',
        'warning-text': '#6B5024',
        'danger-bg': '#F5DADA',
        'danger-text': '#732A2A',
      },
      fontFamily: {
        heading: ['Cabinet Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

