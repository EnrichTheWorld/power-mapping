'use client';

import * as styles from './page.css';
import { ActionPanel } from '@/components/ActionPanel';
import { QuadrantChart } from '@/components/QuadrantChart';

export default function Home() {
	return (
		<main className={styles.main}>
			<ActionPanel />
			<div className={styles.content}>
				<header className={styles.header}>
					<h1 className={styles.title}>Power Mapping Simulation</h1>
				</header>
				<div className={styles.chartContainer}>
					<QuadrantChart />
				</div>
			</div>
		</main>
	);
}
