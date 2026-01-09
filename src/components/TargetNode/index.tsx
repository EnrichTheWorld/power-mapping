import React from 'react';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Target } from '@/lib/types';
import * as styles from './styles.css';
import { clsx } from 'clsx';
import { usePowerMapStore } from '@/lib/store';
import { Trash2 } from 'lucide-react';

interface TargetNodeProps {
	target: Target;
	x: number; // Percentage 0-100
	y: number; // Percentage 0-100
	size?: number; // visual weighting?
	isGhost?: boolean;
}

export const TargetNode = ({ target, x, y, isGhost = false }: TargetNodeProps) => {
	const { updateTarget, removeTarget } = usePowerMapStore();

	const handleDragEnd = (event: any, info: any) => {
		if (isGhost) return;

		// We need the container dimensions to convert pixels back to percentage/value
		// event.target might be the span, so use event.currentTarget which is the motion.div
		// But onDragEnd event might be different. Let's rely on offsetParent of the element.

		// Actually event.target is reliable if we use PointerEvent from PanSession?
		// Framer Motion passes (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo)
		// CurrentTarget is null in native DOM events usually after bubble??
		// Best approach: Use a ref for the node, but we have multiple nodes.
		// We can access the element via the event logic.

		const node = event.target as HTMLElement;
		// If we dragged the text span, find the parent div
		const element = (node.closest(`.${styles.node}`) as HTMLElement) || node;
		const container = element.offsetParent as HTMLElement;

		if (!container) return;

		const rect = container.getBoundingClientRect();

		// info.point is page coordinates (clientX/Y)
		const pointX = info.point.x;
		const pointY = info.point.y;

		const relX = pointX - rect.left;
		const relY = pointY - rect.top;

		// Convert to percentage (0 - 100)
		let perX = (relX / rect.width) * 100;
		let perY = (relY / rect.height) * 100;

		// Clamp 0-100 just in case
		perX = Math.max(0, Math.min(100, perX));
		perY = Math.max(0, Math.min(100, perY));

		// Convert to Value (-100 to 100)
		// Support (X): 0% -> -100, 100% -> 100 => val = (per/100)*200 - 100
		// Power (Y): 0% -> 100, 100% -> -100 => val = (1 - per/100)*200 - 100

		let valX = (perX / 100) * 200 - 100;
		let valY = (1 - perY / 100) * 200 - 100;

		// Snap to 0.5
		valX = Math.round(valX * 2) / 2;
		valY = Math.round(valY * 2) / 2;

		updateTarget(target.id, { position: { support: valX, power: valY } });

		// Note: Framer Motion leaves the element with a transform.
		// When we update React state, the component re-renders with new left/top.
		// We need to ensure the transform is reset or ignored.
		// By default, layout animations might handle this, or we can force it.
		// Actually, if we don't use `layout` prop, Framer Motion doesn't automatically animate change in layout.
		// But the `drag` transform persists.
		// To clear it, we might need a key change or manually set style x/y to 0?
		// Adding `key` is the most robust way to reset internal state of motion component.
	};

	return (
		<Tooltip.Root delayDuration={0}>
			<Tooltip.Trigger asChild>
				<motion.div
					className={clsx(styles.node, styles.groupColors[target.group], isGhost && styles.ghostNode)}
					// Force re-mount on drag end to reset transform? Or maybe just rely on position update?
					// If we don't reset, the transform is added to the new left/top!
					// A simple unique key based on position ensures it resets.
					key={`${target.id}-${target.position.support}-${target.position.power}`}
					initial={false}
					animate={{ left: `${x}%`, top: `${y}%` }}
					transition={{ type: 'spring', stiffness: 120, damping: 20 }}
					style={{ position: 'absolute' }}
					drag={!isGhost} // Only real nodes are draggable
					dragMomentum={false}
					dragElastic={0}
					onDragEnd={handleDragEnd}
					whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
				>
					{/* Use first letter or icon */}
					<span style={{ fontSize: '10px', fontWeight: 'bold', pointerEvents: 'none' }}>
						{target.name.substring(0, 2).toUpperCase()}
					</span>
				</motion.div>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="TooltipContent"
					sideOffset={5}
					style={{
						background: 'rgba(0,0,0,0.9)',
						color: 'white',
						padding: '12px',
						borderRadius: '6px',
						fontSize: '12px',
						zIndex: 1000, // Higher than dialog usually
						boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						minWidth: '120px',
					}}
				>
					<div
						style={{
							fontWeight: 'bold',
							fontSize: '14px',
							marginBottom: '2px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{target.name}
					</div>
					<div style={{ color: '#aaa', marginBottom: '8px' }}>{target.group}</div>

					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>Support:</span>
						<span style={{ fontVariantNumeric: 'tabular-nums' }}>{target.position.support.toFixed(1)}</span>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>Power:</span>
						<span style={{ fontVariantNumeric: 'tabular-nums' }}>{target.position.power.toFixed(1)}</span>
					</div>

					{!isGhost && (
						<button
							onClick={() => removeTarget(target.id)}
							style={{
								marginTop: '8px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '6px',
								width: '100%',
								padding: '6px',
								background: '#330000',
								border: '1px solid #660000',
								color: '#ff6666',
								borderRadius: '4px',
								cursor: 'pointer',
								fontSize: '11px',
							}}
						>
							<Trash2 size={12} />
							Delete Target
						</button>
					)}

					<Tooltip.Arrow className="TooltipArrow" fill="rgba(0,0,0,0.9)" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};
