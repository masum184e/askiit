/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./src/app/**/*.{ts,tsx}',
		'./src/components/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				border: 'var(--border)',
				ring: 'var(--ring)',
				input: 'var(--input)',
				primary: 'var(--primary)',
				'primary-foreground': 'var(--primary-foreground)',
				secondary: 'var(--secondary)',
				'secondary-foreground': 'var(--secondary-foreground)',
				muted: 'var(--muted)',
				'muted-foreground': 'var(--muted-foreground)',
				accent: 'var(--accent)',
				'accent-foreground': 'var(--accent-foreground)',
				destructive: 'var(--destructive)',
				card: 'var(--card)',
				'card-foreground': 'var(--card-foreground)',
				popover: 'var(--popover)',
				'popover-foreground': 'var(--popover-foreground)',
				sidebar: 'var(--sidebar)',
				'sidebar-foreground': 'var(--sidebar-foreground)',
				'sidebar-primary': 'var(--sidebar-primary)',
				'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
				'sidebar-accent': 'var(--sidebar-accent)',
				'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
				'sidebar-border': 'var(--sidebar-border)',
				'sidebar-ring': 'var(--sidebar-ring)',
				'chart-1': 'var(--chart-1)',
				'chart-2': 'var(--chart-2)',
				'chart-3': 'var(--chart-3)',
				'chart-4': 'var(--chart-4)',
				'chart-5': 'var(--chart-5)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.8s ease-out',
				'fade-in-left': 'fadeInLeft 0.8s ease-out',
				'fade-in-right': 'fadeInRight 0.8s ease-out',
				'bounce-slow': 'bounce 2s infinite',
				'pulse-slow': 'pulse 3s infinite',
				'float': 'float 3s ease-in-out infinite',
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				fadeInRight: {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
		},
		plugins: [import("tailwindcss-animate")],
	}
};

