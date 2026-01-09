import { style } from '@vanilla-extract/css';

export const triggerButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	padding: '12px',
	marginBottom: '16px',
	backgroundColor: '#333',
	color: 'white',
	border: '1px solid #444',
	borderRadius: '6px',
	cursor: 'pointer',
	fontWeight: 600,
	fontSize: '14px',
	transition: 'background-color 0.2s',
	':hover': {
		backgroundColor: '#444',
	},
});

export const content = style({
	backgroundColor: '#1a1a1a',
	borderRadius: '8px',
	boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '450px',
	maxHeight: '85vh',
	padding: '25px',
	animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
	zIndex: 1000,
	border: '1px solid #333',
	color: 'white',
});

export const overlay = style({
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	position: 'fixed',
	inset: 0,
	animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
	zIndex: 999,
});

export const title = style({
	margin: 0,
	fontWeight: 500,
	fontSize: '17px',
	color: 'white',
	marginBottom: '20px',
});

export const fieldSet = style({
	display: 'flex',
	gap: '10px',
	alignItems: 'center',
	marginBottom: '15px',
	flexDirection: 'column',
	alignItems: 'flex-start',
});

export const label = style({
	fontSize: '13px',
	color: '#aaa',
	width: '100%',
});

export const input = style({
	width: '100%',
	flex: '1',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '4px',
	padding: '0 10px',
	height: '35px',
	fontSize: '14px',
	lineHeight: 1,
	color: 'white',
	backgroundColor: '#333',
	border: '1px solid #444',
	':focus': {
		boxShadow: '0 0 0 2px #666',
		borderColor: '#666',
	},
});

export const select = style({
	width: '100%',
	flex: '1',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '4px',
	padding: '0 10px',
	height: '35px',
	fontSize: '14px',
	color: 'white',
	backgroundColor: '#333',
	border: '1px solid #444',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: '25px',
	gap: '10px',
});

export const saveButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '4px',
	padding: '0 15px',
	fontSize: '14px',
	lineHeight: 1,
	fontWeight: 500,
	height: '35px',
	backgroundColor: 'white',
	color: 'black',
	border: 'none',
	cursor: 'pointer',
	':hover': {
		backgroundColor: '#eee',
	},
});

export const rangeContainer = style({
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	gap: '10px',
});

export const rangeValue = style({
	minWidth: '40px',
	textAlign: 'right',
	fontSize: '12px',
	fontVariantNumeric: 'tabular-nums',
});
