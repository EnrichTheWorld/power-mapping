import React from 'react';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Target } from '@/lib/types';
import * as styles from './styles.css';
import { clsx } from 'clsx';

interface TargetNodeProps {
	target: Target;
	x: number; // Percentage 0-100 or pixel
	y: number; // Percentage 0-100
	size?: number; // visual weighting?
	isGhost?: boolean;
}

export const TargetNode = ({ target, x, y, isGhost = false }: TargetNodeProps) => {
	return (
		<Tooltip.Root delayDuration={0}>
			<Tooltip.Trigger asChild>
				<motion.div
					className={clsx(styles.node, styles.groupColors[target.group], isGhost && styles.ghostNode)}
					initial={false}
					animate={{ left: `${x}%`, top: `${y}%` }}
					transition={{ type: 'spring', stiffness: 120, damping: 20 }}
					style={{ position: 'absolute' }}
				>
					{/* Use first letter or icon */}
					<span style={{ fontSize: '10px', fontWeight: 'bold' }}>{target.name.substring(0, 2).toUpperCase()}</span>
				</motion.div>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="TooltipContent"
					sideOffset={5}
					style={{
						background: 'rgba(0,0,0,0.8)',
						color: 'white',
						padding: '8px',
						borderRadius: '4px',
						fontSize: '12px',
						zIndex: 100,
					}}
				>
					<div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{target.name}</div>
					<div>{target.group}</div>
					<div>Support: {target.position.support.toFixed(0)}</div>
					<div>Power: {target.position.power.toFixed(0)}</div>
					<Tooltip.Arrow className="TooltipArrow" fill="rgba(0,0,0,0.8)" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};
