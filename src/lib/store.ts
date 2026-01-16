import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Target, ActionStrategy, SimulationState, Position, TargetGroup } from './types';

interface PowerMapState {
	targets: Target[];
	actions: ActionStrategy[];
	simulation: SimulationState;

	// Actions
	addTarget: (target: Target) => void;
	updateTarget: (id: string, updates: Partial<Target>) => void;
	removeTarget: (id: string) => void;

	startSimulation: (actionId: string) => void;
	cancelSimulation: () => void;
	commitSimulation: () => void;

	// Helpers
	// Helpers
	getProjectedPosition: (target: Target, action: ActionStrategy, intensity: number) => Position;
	resetToDefaults: () => void;
	setSimulationIntensity: (intensity: number) => void;
	toggleAffectedGroup: (group: TargetGroup) => void;
}

const INITIAL_TARGETS: Target[] = [
	// Power: Y-axis (-100 to 100), Support: X-axis (-100 to 100)
	// Industry / Business
	{
		id: '1',
		name: '남부발전 사장 김준동',
		group: 'Business',
		position: { power: 45, support: -85 },
		sensitivity: { economicRisk: 1.5, publicPressure: 1.0 },
		description: 'Industry',
	},
	{
		id: '2',
		name: '두산에너빌리티 회장 박지원',
		group: 'Business',
		position: { power: 25, support: -78 },
		sensitivity: { economicRisk: 1.5, publicPressure: 0.8 },
		description: 'Industry',
	},
	{
		id: '3',
		name: '두산에너빌리티 COO 정연인',
		group: 'Business',
		position: { power: 10, support: -78 },
		sensitivity: { economicRisk: 1.5, publicPressure: 0.8 },
		description: 'Industry',
	},
	{
		id: '4',
		name: '삼척 그린파워 (노조)',
		group: 'Business',
		position: { power: 10, support: -50 },
		sensitivity: { economicRisk: 1.2, publicPressure: 1.2 },
		description: 'Industry',
	},
	// Government / Policy
	{
		id: '5',
		name: '산업통상부 김정관 장관',
		group: 'Government',
		position: { power: 75, support: -10 },
		sensitivity: { publicPressure: 1.5, legalRisk: 1.0 },
		description: 'Government',
	},
	{
		id: '6',
		name: '기후환경 에너지부 김성환 장관',
		group: 'Government',
		position: { power: 80, support: 35 },
		sensitivity: { publicPressure: 1.5 },
		description: 'Government',
	},
	{
		id: '7',
		name: '삼척시 시의원',
		group: 'Government',
		position: { power: 20, support: 0 },
		sensitivity: { publicPressure: 2.0 },
		description: 'Government',
	},
	{
		id: '8',
		name: '강원도 지사',
		group: 'Government',
		position: { power: 25, support: 5 },
		sensitivity: { publicPressure: 1.5 },
		description: 'Government',
	},
	{
		id: '9',
		name: '감사원',
		group: 'Government',
		position: { power: 55, support: 2 },
		sensitivity: { legalRisk: 2.0, publicPressure: 1.0 },
		description: 'Government',
	},
	{
		id: '10',
		name: '국정과제 비서관 한상언',
		group: 'Government',
		position: { power: 55, support: 30 },
		sensitivity: { publicPressure: 1.2 },
		description: 'Government',
	},
	// Financier -> Business
	{
		id: '11',
		name: '주주 채권 관련 금융기관',
		group: 'Business',
		position: { power: -5, support: -5 },
		sensitivity: { economicRisk: 2.0, legalRisk: 1.0 },
		description: 'Financier',
	},
	// Media
	{
		id: '12',
		name: '조중동 보수언론사',
		group: 'Media',
		position: { power: 0, support: -25 },
		sensitivity: { publicPressure: 0.5 },
		description: 'Media',
	},
	{
		id: '13',
		name: '국내 언론 (강원 지방)',
		group: 'Media',
		position: { power: 10, support: 40 },
		sensitivity: { publicPressure: 0.8 },
		description: 'Media',
	},
	{
		id: '14',
		name: '외신 (Bloomberg 등)',
		group: 'Media',
		position: { power: 35, support: -5 },
		sensitivity: { publicPressure: 1.0 },
		description: 'Media',
	},
	// National Assembly -> Government
	{
		id: '15',
		name: '박지혜 의원',
		group: 'Government',
		position: { power: 15, support: 30 },
		sensitivity: { publicPressure: 1.8 },
		description: 'NationalAssembly',
	},
	{
		id: '16',
		name: '이소영 의원 (민주당)',
		group: 'Government',
		position: { power: 20, support: 45 },
		sensitivity: { publicPressure: 1.8 },
		description: 'NationalAssembly',
	},
	{
		id: '17',
		name: '정의당 의원',
		group: 'Government',
		position: { power: 25, support: 25 },
		sensitivity: { publicPressure: 1.5 },
		description: 'NationalAssembly',
	},
	{
		id: '18',
		name: '이용호 의원',
		group: 'Government',
		position: { power: 28, support: 38 },
		sensitivity: { publicPressure: 1.5 },
		description: 'NationalAssembly',
	},
	{
		id: '19',
		name: '서양진 의원',
		group: 'Government',
		position: { power: -10, support: 35 },
		sensitivity: { publicPressure: 1.5 },
		description: 'NationalAssembly',
	},
	// NGO
	{
		id: '20',
		name: '녹색소비자연대',
		group: 'NGO',
		position: { power: 0, support: 25 },
		sensitivity: { publicPressure: 1.0 },
		description: 'CSO/NGO/ThinkTank',
	},
	{
		id: '21',
		name: 'KBF 삼척 지부 CSO',
		group: 'NGO',
		position: { power: -5, support: 75 },
		sensitivity: { publicPressure: 1.0 },
		description: 'CSO/NGO/ThinkTank',
	},
	// DiploFigure -> Government (or Academia if experts?) -> Using Government for power influence
	{
		id: '22',
		name: 'PPCA',
		group: 'Government',
		position: { power: 10, support: 60 },
		sensitivity: { publicPressure: 1.2 },
		description: 'DiploFigure',
	},
	{
		id: '23',
		name: '탄소중립위원회 위원',
		group: 'Government',
		position: { power: -20, support: -5 },
		sensitivity: { publicPressure: 1.2 },
		description: 'DiploFigure',
	},
	{
		id: '24',
		name: '탄소중립위원회 위원 안영환 교수',
		group: 'Academia', // Expert
		position: { power: -25, support: 5 },
		sensitivity: { publicPressure: 1.0 },
		description: 'DiploFigure',
	},
];

const AVAILABLE_ACTIONS: ActionStrategy[] = [
	{
		id: 'act_press',
		type: 'press_conference',
		name: 'Press Conference',
		description: 'Publicly expose the risks, rallying public opinion.',
		baseEffect: { supportDelta: 10, powerDelta: -5 },
		sensitivityFactor: 'publicPressure',
	},
	{
		id: 'act_lawsuit',
		type: 'lawsuit',
		name: 'Climate Litigation',
		description: 'File a lawsuit against the plan for violation of future rights.',
		baseEffect: { supportDelta: 5, powerDelta: -20 },
		sensitivityFactor: 'legalRisk',
	},
	{
		id: 'act_boycott',
		type: 'campaign',
		name: 'Consumer Boycott',
		description: 'Organize a boycott of products from involved companies.',
		baseEffect: { supportDelta: 0, powerDelta: -15 },
		sensitivityFactor: 'economicRisk',
	},
];

export const usePowerMapStore = create<PowerMapState>()(
	persist(
		(set, get) => ({
			targets: INITIAL_TARGETS,
			actions: AVAILABLE_ACTIONS,
			simulation: {
				isActive: false,
				selectedActionId: null,
				projectedPositions: {},
				intensity: 1,
				affectedGroups: ['Government', 'Business', 'Media', 'Academia', 'NGO'],
			},

			resetToDefaults: () =>
				set({
					targets: INITIAL_TARGETS,
					simulation: {
						isActive: false,
						selectedActionId: null,
						projectedPositions: {},
						intensity: 1,
						affectedGroups: ['Government', 'Business', 'Media', 'Academia', 'NGO'],
					},
				}),

			addTarget: (target) => set((state) => ({ targets: [...state.targets, target] })),

			updateTarget: (id, updates) =>
				set((state) => ({
					targets: state.targets.map((t) => (t.id === id ? { ...t, ...updates } : t)),
				})),

			removeTarget: (id) =>
				set((state) => ({
					targets: state.targets.filter((t) => t.id !== id),
				})),

			getProjectedPosition: (target, action, intensity) => {
				const sensitivityValue = target.sensitivity?.[action.sensitivityFactor] || 1; // Default multiplier 1

				// Calculate raw deltas
				const dSupport = (action.baseEffect.supportDelta || 0) * sensitivityValue * intensity;
				const dPower = (action.baseEffect.powerDelta || 0) * sensitivityValue * intensity;

				// Apply changes
				let newSupport = target.position.support + dSupport;
				let newPower = target.position.power + dPower;

				// Clamp to -100 ~ 100
				newSupport = Math.max(-100, Math.min(100, newSupport));
				newPower = Math.max(-100, Math.min(100, newPower));

				return { support: newSupport, power: newPower };
			},

			startSimulation: (actionId) => {
				const { actions, targets, getProjectedPosition, simulation } = get();
				const action = actions.find((a) => a.id === actionId);
				if (!action) return;

				const projectedPositions: Record<string, Position> = {};
				targets.forEach((t) => {
					if (simulation.affectedGroups.includes(t.group)) {
						projectedPositions[t.id] = getProjectedPosition(t, action, simulation.intensity);
					} else {
						projectedPositions[t.id] = t.position;
					}
				});

				set({
					simulation: {
						...simulation,
						isActive: true,
						selectedActionId: actionId,
						projectedPositions,
					},
				});
			},

			setSimulationIntensity: (intensity) => {
				set((state) => ({
					simulation: { ...state.simulation, intensity },
				}));
				// Re-calculate if active
				const { simulation, startSimulation } = get();
				if (simulation.isActive && simulation.selectedActionId) {
					startSimulation(simulation.selectedActionId);
				}
			},

			toggleAffectedGroup: (group) => {
				set((state) => {
					const groups = state.simulation.affectedGroups;
					const newGroups = groups.includes(group) ? groups.filter((g) => g !== group) : [...groups, group];
					return { simulation: { ...state.simulation, affectedGroups: newGroups } };
				});
				// Re-calculate if active
				const { simulation, startSimulation } = get();
				if (simulation.isActive && simulation.selectedActionId) {
					startSimulation(simulation.selectedActionId);
				}
			},

			cancelSimulation: () =>
				set({
					simulation: {
						isActive: false,
						selectedActionId: null,
						projectedPositions: {},
						intensity: 1,
						affectedGroups: ['Government', 'Business', 'Media', 'Academia', 'NGO'],
					},
				}),

			commitSimulation: () => {
				const { simulation, targets } = get();
				if (!simulation.isActive) return;

				const newTargets = targets.map((t) => {
					const projected = simulation.projectedPositions[t.id];
					if (projected) {
						return { ...t, position: projected };
					}
					return t;
				});

				set({
					targets: newTargets,
					simulation: {
						isActive: false,
						selectedActionId: null,
						projectedPositions: {},
						intensity: 1,
						affectedGroups: ['Government', 'Business', 'Media', 'Academia', 'NGO'],
					},
				});
			},
		}),
		{
			name: 'power-map-storage',
			partialize: (state) => ({ targets: state.targets }), // Only persist targets
		}
	)
);
