import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css'; // Assuming theme vars exist, if not I'll fall back to hardcoded but nicer values

// Animations
const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const contentShow = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const overlay = style({
	backgroundColor: 'rgba(0, 0, 0, 0.7)',
	backdropFilter: 'blur(4px)',
	position: 'fixed',
	inset: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	zIndex: 999,
});

export const content = style({
	backgroundColor: '#1E1E1E', // Slightly lighter than pure black
	borderRadius: '16px',
	boxShadow:
		'0 10px 38px -10px rgba(0, 0, 0, 0.5), 0 10px 20px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.1)',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '420px',
	maxHeight: '85vh',
	padding: '32px',
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	zIndex: 1000,
	color: 'white',
	overflowY: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
});

export const title = style({
	margin: 0,
	fontWeight: 700,
	fontSize: '20px',
	color: 'white',
	textAlign: 'center',
});

export const form = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
});

export const fieldSet = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	border: 'none',
	padding: 0,
	margin: 0,
});

export const label = style({
	fontSize: '13px',
	fontWeight: 500,
	color: '#A1A1AA', // Zinc 400
	marginLeft: '4px',
});

export const input = style({
	all: 'unset',
	width: '100%',
	boxSizing: 'border-box',
	display: 'inline-flex',
	alignItems: 'center',
	borderRadius: '10px',
	padding: '0 16px',
	height: '44px',
	fontSize: '15px',
	color: 'white',
	backgroundColor: '#27272A', // Zinc 800
	border: '1px solid transparent',
	transition: 'all 0.2s ease',
	':focus': {
		borderColor: '#666',
		backgroundColor: '#3F3F46', // Zinc 700
	},
	'::placeholder': {
		color: '#71717A', // Zinc 500
	},
});

export const select = style({
	all: 'unset',
	width: '100%',
	boxSizing: 'border-box',
	display: 'inline-flex',
	alignItems: 'center',
	borderRadius: '10px',
	padding: '0 16px',
	height: '44px',
	fontSize: '15px',
	color: 'white',
	backgroundColor: '#27272A',
	border: '1px solid transparent',
	cursor: 'pointer',
	appearance: 'none', // Remove default arrow
	backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A1A1AA%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'right 16px top 50%',
	backgroundSize: '12px auto',
	transition: 'all 0.2s ease',
	':focus': {
		borderColor: '#666',
		backgroundColor: '#3F3F46',
	},
});

// Custom Slider Styling
export const rangeContainer = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	height: '44px',
	backgroundColor: '#27272A',
	borderRadius: '10px',
	padding: '0 12px',
});

// We need a global style or complex selector for the slider track/thumb across browsers
// Vanilla extract simple selectors is cleaner.
export const rangeInput = style({
	width: '100%',
	cursor: 'pointer',
	accentColor: 'white', // Simple modern fix for some browsers
	height: '6px',
	borderRadius: '3px',
});

export const rangeValue = style({
	minWidth: '32px',
	textAlign: 'center',
	fontSize: '13px',
	fontWeight: 600,
	color: '#E4E4E7',
	fontVariantNumeric: 'tabular-nums',
});

export const rangeLabel = style({
	fontSize: '11px',
	color: '#71717A',
	minWidth: '24px',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '12px',
	marginTop: '12px',
});

export const buttonBase = style({
	all: 'unset',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '8px',
	padding: '0 20px',
	fontSize: '14px',
	fontWeight: 600,
	height: '40px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
});

export const secondaryButton = style([
	buttonBase,
	{
		backgroundColor: 'transparent',
		color: '#A1A1AA',
		border: '1px solid #3F3F46',
		':hover': {
			backgroundColor: '#27272A',
			color: 'white',
			borderColor: '#52525B',
		},
	},
]);

export const primaryButton = style([
	buttonBase,
	{
		backgroundColor: 'white',
		color: 'black',
		':hover': {
			backgroundColor: '#E4E4E7', // Zinc 200
			transform: 'translateY(-1px)',
		},
		':active': {
			transform: 'translateY(0)',
		},
	},
]);

export const triggerButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	padding: '12px',
	marginBottom: '16px',
	backgroundColor: '#27272A', // Zinc 800
	color: '#E4E4E7',
	border: '1px solid #3F3F46',
	borderRadius: '8px',
	cursor: 'pointer',
	fontWeight: 600,
	fontSize: '14px',
	transition: 'all 0.2s ease',
	':hover': {
		backgroundColor: '#3F3F46',
		borderColor: '#52525B',
		color: 'white',
	},
});
