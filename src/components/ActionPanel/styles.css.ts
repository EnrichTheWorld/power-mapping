import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const panel = style({
	width: '320px',
	background: vars.color.surface,
	borderRight: `1px solid ${vars.color.border}`,
	display: 'flex',
	flexDirection: 'column',
	padding: vars.spacing[5],
	height: '100%',
	overflowY: 'auto',
});

export const title = style({
	fontSize: '1.25rem',
	fontWeight: 'bold',
	marginBottom: vars.spacing[6],
	color: vars.color.primary,
});

export const list = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[3],
});

export const actionCard = style({
	padding: vars.spacing[4],
	borderRadius: vars.radius.md,
	background: vars.color.surfaceHover, // or solid somewhat
	border: `1px solid ${vars.color.border}`,
	textAlign: 'left',
	transition: vars.transition.fast,
	selectors: {
		'&:hover': {
			borderColor: vars.color.secondary,
			background: vars.color.surface,
		},
	},
});

export const selectedCard = style([
	actionCard,
	{
		borderColor: vars.color.accent,
		boxShadow: `0 0 0 1px ${vars.color.accent}`,
	},
]);

export const buttonGroup = style({
	marginTop: 'auto',
	paddingTop: vars.spacing[5],
	display: 'flex',
	gap: vars.spacing[3],
});

export const button = style({
	flex: 1,
	padding: '10px',
	borderRadius: vars.radius.md,
	fontWeight: 600,
	fontSize: '0.9rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: vars.transition.fast,
});

export const primaryButton = style([
	button,
	{
		background: vars.color.foreground,
		color: vars.color.background,
		selectors: {
			'&:hover': { opacity: 0.9 },
		},
	},
]);

export const secondaryButton = style([
	button,
	{
		background: 'transparent',
		border: `1px solid ${vars.color.border}`,
		color: vars.color.foreground,
		selectors: {
			'&:hover': { background: vars.color.surfaceHover },
		},
	},
]);

export const description = style({
	fontSize: '0.875rem',
	color: vars.color.secondary,
	marginTop: vars.spacing[2],
	lineHeight: 1.4,
});
