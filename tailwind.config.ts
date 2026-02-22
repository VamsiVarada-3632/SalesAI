import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0d59f2',
                'primary-dark': '#330df2',
                'primary-hover': '#0b4ecf',
                'background-light': '#f5f6f8',
                'background-dark': '#131022',
                'background-darker': '#0a0a14',
                'surface-light': '#ffffff',
                'surface-dark': '#1e1b2e',
                'surface-card': '#1a2233',
                'border-dark': '#2a273f',
                'accent-orange': '#FF6B00',
                'text-primary': '#111827',
                'text-secondary': '#6b7280',
            },
            fontFamily: {
                display: ['var(--font-manrope)', 'sans-serif'],
                body: ['var(--font-manrope)', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.375rem',
                md: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                full: '9999px',
            },
        },
    },
    plugins: [],
};

export default config;
