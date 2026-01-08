import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const main = style({
	display: 'flex',
	height: '100vh',
	width: '100vw',
	background: vars.color.background,
	overflow: 'hidden',
});

export const content = style({
	flex: 1,
	padding: vars.spacing[6],
	display: 'flex',
	flexDirection: 'column',
});

export const chartContainer = style({
	flex: 1,
	position: 'relative',
	background: vars.color.surface,
	borderRadius: vars.radius.lg,
	border: `1px solid ${vars.color.border}`,
	overflow: 'hidden',
});

export const header = style({
	marginBottom: vars.spacing[4],
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const title = style({
	fontSize: '1.5rem',
	fontWeight: 'bold',
});
