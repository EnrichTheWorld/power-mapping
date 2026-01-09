import React from 'react';
import { usePowerMapStore } from '@/lib/store';
import * as styles from './styles.css';
import { clsx } from 'clsx';
import { Play, RotateCcw, Check } from 'lucide-react';
import { AddTargetDialog } from '../AddTargetDialog';

export const ActionPanel = () => {
	const { actions, simulation, startSimulation, commitSimulation, cancelSimulation } = usePowerMapStore();

	return (
		<div className={styles.panel}>
			<AddTargetDialog />
			<h2 className={styles.title}>Strategies</h2>

			<div className={styles.list}>
				{actions.map((action) => {
					const isSelected = simulation.selectedActionId === action.id;
					return (
						<button
							key={action.id}
							className={clsx(styles.actionCard, isSelected && styles.selectedCard)}
							onClick={() => startSimulation(action.id)}
						>
							<div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
								<Play size={14} fill={isSelected ? 'currentColor' : 'none'} />
								{action.name}
							</div>
							<p className={styles.description}>{action.description}</p>
						</button>
					);
				})}
			</div>

			<div className={styles.buttonGroup}>
				{simulation.isActive ? (
					<>
						<button className={styles.secondaryButton} onClick={cancelSimulation}>
							<RotateCcw size={16} style={{ marginRight: 8 }} />
							Reset
						</button>
						<button className={styles.primaryButton} onClick={commitSimulation}>
							<Check size={16} style={{ marginRight: 8 }} />
							Execute
						</button>
					</>
				) : (
					<div style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center', width: '100%' }}>
						Select an action to simulate
					</div>
				)}
			</div>
		</div>
	);
};
