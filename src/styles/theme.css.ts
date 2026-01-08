import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
	color: {
		background: '#000000',
		foreground: '#ededed',
		surface: '#111111',
		surfaceHover: '#1f1f1f',
		border: '#333333',
		primary: '#ffffff',
		primaryForeground: '#000000',
		secondary: '#888888',
		accent: '#0070f3', // Vercel Blue
		accentGlow: '0 0 20px rgba(0, 112, 243, 0.5)',
		success: '#00cc66',
		danger: '#ff3333',
		warning: '#f5a623',
		muted: '#444444',
	},
	font: {
		sans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
		mono: 'var(--font-geist-mono), monospace',
	},
	spacing: {
		0: '0',
		1: '4px',
		2: '8px',
		3: '12px',
		4: '16px',
		5: '20px',
		6: '24px',
		8: '32px',
		10: '40px',
		12: '48px',
		16: '64px',
	},
	radius: {
		sm: '4px',
		md: '8px',
		lg: '12px',
		full: '9999px',
	},
	shadow: {
		sm: '0 1px 2px rgba(0,0,0,0.1)',
		md: '0 4px 6px rgba(0,0,0,0.1)',
		lg: '0 10px 15px rgba(0,0,0,0.1)',
		glow: '0 0 20px rgba(255,255,255,0.15)',
	},
	transition: {
		fast: '0.15s ease',
		normal: '0.3s ease',
	},
});
