import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as styles from './styles.css';
import { Plus } from 'lucide-react';
import { usePowerMapStore } from '@/lib/store';
import { TargetGroup } from '@/lib/types';

export const AddTargetDialog = () => {
	const { addTarget } = usePowerMapStore();
	const [open, setOpen] = useState(false);

	// Form State
	const [name, setName] = useState('');
	const [group, setGroup] = useState<TargetGroup>('Government');
	const [power, setPower] = useState(0);
	const [support, setSupport] = useState(0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		addTarget({
			id: crypto.randomUUID(),
			name,
			group,
			position: {
				power,
				support,
			},
			// Default sensitivity for new targets
			sensitivity: {
				publicPressure: 1,
				economicRisk: 1,
				legalRisk: 1,
			},
		});

		// Reset and close
		setName('');
		setGroup('Government');
		setPower(0);
		setSupport(0);
		setOpen(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className={styles.triggerButton}>
					<Plus size={16} style={{ marginRight: 8 }} />
					Add Target
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title className={styles.title}>Add New Target</Dialog.Title>

					<form onSubmit={handleSubmit} className={styles.form}>
						<fieldset className={styles.fieldSet}>
							<label className={styles.label} htmlFor="name">
								Name
							</label>
							<input
								className={styles.input}
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								placeholder="Enter target name..."
							/>
						</fieldset>

						<fieldset className={styles.fieldSet}>
							<label className={styles.label} htmlFor="group">
								Group
							</label>
							<select
								className={styles.select}
								id="group"
								value={group}
								onChange={(e) => setGroup(e.target.value as TargetGroup)}
							>
								<option value="Government">Government</option>
								<option value="Business">Business</option>
								<option value="Media">Media</option>
								<option value="Academia">Academia</option>
								<option value="NGO">NGO</option>
							</select>
						</fieldset>

						<fieldset className={styles.fieldSet}>
							<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
								<label className={styles.label} htmlFor="support">
									Support
								</label>
								<span className={styles.rangeValue}>{support}</span>
							</div>
							<div className={styles.rangeContainer}>
								<span className={styles.rangeLabel}>-100</span>
								<input
									className={styles.rangeInput}
									type="range"
									id="support"
									min="-100"
									max="100"
									step="1"
									value={support}
									onChange={(e) => setSupport(Number(e.target.value))}
								/>
								<span className={styles.rangeLabel}>100</span>
							</div>
						</fieldset>

						<fieldset className={styles.fieldSet}>
							<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
								<label className={styles.label} htmlFor="power">
									Power
								</label>
								<span className={styles.rangeValue}>{power}</span>
							</div>
							<div className={styles.rangeContainer}>
								<span className={styles.rangeLabel}>-100</span>
								<input
									className={styles.rangeInput}
									type="range"
									id="power"
									min="-100"
									max="100"
									step="1"
									value={power}
									onChange={(e) => setPower(Number(e.target.value))}
								/>
								<span className={styles.rangeLabel}>100</span>
							</div>
						</fieldset>

						<div className={styles.footer}>
							<Dialog.Close asChild>
								<button className={styles.secondaryButton} type="button">
									Cancel
								</button>
							</Dialog.Close>
							<button className={styles.primaryButton} type="submit">
								Add Target
							</button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
