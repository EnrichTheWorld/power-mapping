import React from 'react';
import { usePowerMapStore } from '@/lib/store';
import * as styles from './styles.css';
import { clsx } from 'clsx';
import { Play, RotateCcw, Check } from 'lucide-react';
import { AddTargetDialog } from '../AddTargetDialog';

export const ActionPanel = () => {
	const {
		actions,
		simulation,
		startSimulation,
		commitSimulation,
		cancelSimulation,
		setSimulationIntensity,
		toggleAffectedGroup,
		resetToDefaults,
	} = usePowerMapStore();

	const targetGroups = ['Government', 'Business', 'Media', 'Academia', 'NGO'] as const;

	return (
		<div className={styles.panel}>
			<AddTargetDialog />
			<h2 className={styles.title}>Strategies</h2>

			{/* Settings Area (slider & groups) */}
			<div className={styles.controlGroup}>
				<label className={styles.controlLabel}>Intensity: {simulation.intensity.toFixed(1)}x</label>
				<div className={styles.sliderContainer}>
					<span style={{ fontSize: '0.8rem' }}>0.5x</span>
					<input
						type="range"
						min="0.5"
						max="2.0"
						step="0.1"
						value={simulation.intensity}
						onChange={(e) => setSimulationIntensity(parseFloat(e.target.value))}
						className={styles.slider}
					/>
					<span style={{ fontSize: '0.8rem' }}>2.0x</span>
				</div>
			</div>

			<div className={styles.controlGroup}>
				<span className={styles.controlLabel}>Affected Groups:</span>
				<div className={styles.checkboxGroup}>
					{targetGroups.map((group) => (
						<label key={group} className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={simulation.affectedGroups.includes(group)}
								onChange={() => toggleAffectedGroup(group)}
							/>
							{group}
						</label>
					))}
				</div>
			</div>

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

			<button
				className={styles.resetDataButton}
				onClick={() => {
					if (confirm('Are you sure you want to reset all targets to default? This cannot be undone.')) {
						resetToDefaults();
					}
				}}
			>
				Reset All Data to Default
			</button>
		</div>
	);
};
