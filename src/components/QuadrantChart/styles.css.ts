import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	border: `1px solid ${vars.color.border}`,
	background: `rgba(255,255,255,0.02)`, // Subtle
	borderRadius: vars.radius.md,
	overflow: 'hidden',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const axisLine = style({
	position: 'absolute',
	background: vars.color.border,
});

export const xAxis = style([
	axisLine,
	{
		width: '100%',
		height: '1px',
		top: '50%',
	},
]);

export const yAxis = style([
	axisLine,
	{
		height: '100%',
		width: '1px',
		left: '50%',
	},
]);

export const label = style({
	position: 'absolute',
	color: vars.color.secondary,
	fontSize: '0.75rem',
	textTransform: 'uppercase',
	pointerEvents: 'none',
});
