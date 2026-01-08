import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
});

globalStyle('html, body', {
	height: '100%',
	fontFamily: vars.font.sans,
	backgroundColor: vars.color.background,
	color: vars.color.foreground,
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
	overflowX: 'hidden', // Prevent horizontal scroll
});

globalStyle('a', {
	color: 'inherit',
	textDecoration: 'none',
});

globalStyle('button', {
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	fontFamily: 'inherit',
});

// Scrollbar styling for a premium feel
globalStyle('::-webkit-scrollbar', {
	width: '8px',
	height: '8px',
});

globalStyle('::-webkit-scrollbar-track', {
	background: vars.color.background,
});

globalStyle('::-webkit-scrollbar-thumb', {
	background: vars.color.surfaceHover,
	borderRadius: vars.radius.full,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
	background: vars.color.secondary,
});
