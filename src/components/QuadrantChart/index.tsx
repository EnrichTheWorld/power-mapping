'use client';

import React, { useRef, useMemo } from 'react';
import { usePowerMapStore } from '@/lib/store';
import { TargetNode } from '../TargetNode';
import { scaleLinear } from 'd3-scale';
import * as styles from './styles.css';
import * as Tooltip from '@radix-ui/react-tooltip';

export const QuadrantChart = () => {
	const { targets, simulation } = usePowerMapStore();
	const containerRef = useRef<HTMLDivElement>(null);

	// Scales: Input -100~100 -> Output 0~100 (%)
	const xScale = useMemo(() => scaleLinear().domain([-100, 100]).range([0, 100]), []);
	const yScale = useMemo(() => scaleLinear().domain([-100, 100]).range([100, 0]), []);

	return (
		<Tooltip.Provider>
			<div className={styles.container} ref={containerRef}>
				{/* Axes */}
				<div className={styles.xAxis} />
				<div className={styles.yAxis} />

				{/* Quadrant Labels (Simplified) */}
				<span className={styles.label} style={{ top: '10px', right: '10px' }}>
					High Power / Support
				</span>
				<span className={styles.label} style={{ top: '10px', left: '10px' }}>
					High Power / Oppose
				</span>
				<span className={styles.label} style={{ bottom: '10px', right: '10px' }}>
					Low Power / Support
				</span>
				<span className={styles.label} style={{ bottom: '10px', left: '10px' }}>
					Low Power / Oppose
				</span>

				{/* Arrows Layer */}
				{simulation.isActive && (
					<svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
						<defs>
							<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
								<polygon points="0 0, 10 3.5, 0 7" fill="rgba(255, 255, 255, 0.4)" />
							</marker>
						</defs>
						{targets.map((target) => {
							const projected = simulation.projectedPositions[target.id];
							if (!projected) return null;

							const x1 = xScale(target.position.support);
							const y1 = yScale(target.position.power);
							const x2 = xScale(projected.support);
							const y2 = yScale(projected.power);

							// Only draw if moved
							if (Math.abs(x1 - x2) < 1 && Math.abs(y1 - y2) < 1) return null;

							return (
								<line
									key={`line-${target.id}`}
									x1={`${x1}%`}
									y1={`${y1}%`}
									x2={`${x2}%`}
									y2={`${y2}%`}
									stroke="rgba(255, 255, 255, 0.3)"
									strokeWidth="2"
									strokeDasharray="4 2"
									markerEnd="url(#arrowhead)"
								/>
							);
						})}
					</svg>
				)}

				{/* Real Nodes */}
				{targets.map((target) => (
					<TargetNode
						key={target.id}
						target={target}
						x={xScale(target.position.support)}
						y={yScale(target.position.power)}
					/>
				))}

				{/* Ghost Nodes for Simulation */}
				{simulation.isActive &&
					targets.map((target) => {
						const projected = simulation.projectedPositions[target.id];
						if (!projected) return null;
						return (
							<TargetNode
								key={`ghost-${target.id}`}
								target={target}
								x={xScale(projected.support)}
								y={yScale(projected.power)}
								isGhost
							/>
						);
					})}
			</div>
		</Tooltip.Provider>
	);
};
