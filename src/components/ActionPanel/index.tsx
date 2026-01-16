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
		setCustomSupportDelta,
		setCustomPowerDelta,
		toggleAffectedGroup,
		resetToDefaults,
	} = usePowerMapStore();

	const targetGroups = ['Government', 'Business', 'Media', 'Academia', 'NGO'] as const;

	return (
		<div className={styles.panel}>
			<AddTargetDialog />
			<h2 className={styles.title}>Strategies</h2>

			{/* Settings Area (sliders & groups) */}
			<div className={styles.controlGroup}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
					<div>
						<label className={styles.controlLabel}>
							Support Impact: {simulation.customSupportDelta > 0 ? '+' : ''}
							{simulation.customSupportDelta}
						</label>
						<div className={styles.sliderContainer}>
							<span style={{ fontSize: '0.8rem' }}>-50</span>
							<input
								type="range"
								min="-50"
								max="50"
								step="1"
								value={simulation.customSupportDelta}
								onChange={(e) => setCustomSupportDelta(parseInt(e.target.value))}
								className={styles.slider}
								disabled={!simulation.isActive}
							/>
							<span style={{ fontSize: '0.8rem' }}>+50</span>
						</div>
					</div>

					<div>
						<label className={styles.controlLabel}>
							Power Impact: {simulation.customPowerDelta > 0 ? '+' : ''}
							{simulation.customPowerDelta}
						</label>
						<div className={styles.sliderContainer}>
							<span style={{ fontSize: '0.8rem' }}>-50</span>
							<input
								type="range"
								min="-50"
								max="50"
								step="1"
								value={simulation.customPowerDelta}
								onChange={(e) => setCustomPowerDelta(parseInt(e.target.value))}
								className={styles.slider}
								disabled={!simulation.isActive}
							/>
							<span style={{ fontSize: '0.8rem' }}>+50</span>
						</div>
					</div>
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
