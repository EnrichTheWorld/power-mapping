import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const node = style({
	position: 'absolute',
	transform: 'translate(-50%, -50%)', // Center the node on the coordinate
	width: '32px',
	height: '32px',
	borderRadius: vars.radius.full,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	boxShadow: vars.shadow.md,
	border: `2px solid ${vars.color.background}`,
	transition: `background 0.2s, transform 0.2s, opacity 0.2s`,
	selectors: {
		'&:hover': {
			transform: 'translate(-50%, -50%) scale(1.2)',
			zIndex: 10,
		},
	},
});

export const ghostNode = style([
	node,
	{
		opacity: 0.4,
		borderStyle: 'dashed',
		borderColor: vars.color.primary,
		pointerEvents: 'none', // Ghost shouldn't be interactive usually, logic dependent
	},
]);

export const groupColors = styleVariants({
	Government: { background: '#ff4d4d' }, // Red
	Business: { background: '#4d79ff' }, // Blue
	Media: { background: '#ffd93d', color: '#000' }, // Yellow
	Academia: { background: '#66ccff' }, // Cyan/Sky
	NGO: { background: '#66ff66', color: '#000' }, // Green
});

// Alternatively, mapping standard theme vars
export const variant = styleVariants({
	default: {},
	ghost: {
		opacity: 0.5,
		filter: 'grayscale(100%)',
	},
});
