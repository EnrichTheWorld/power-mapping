import { create } from 'zustand';
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
	getProjectedPosition: (target: Target, action: ActionStrategy) => Position;
}

const INITIAL_TARGETS: Target[] = [
	{
		id: '1',
		name: 'Ministry of Environment',
		group: 'Government',
		position: { power: 80, support: -20 },
		sensitivity: { publicPressure: 1.5, legalRisk: 0.5 },
	},
	{
		id: '2',
		name: 'Major Energy Corp',
		group: 'Business',
		position: { power: 90, support: -80 },
		sensitivity: { publicPressure: 0.8, economicRisk: 2.0 },
	},
	{
		id: '3',
		name: 'Local Daily News',
		group: 'Media',
		position: { power: 60, support: 10 },
		sensitivity: { publicPressure: 2.0 },
	},
	{
		id: '4',
		name: 'Climate Science Association',
		group: 'Academia',
		position: { power: 40, support: 90 },
		sensitivity: { publicPressure: 0.5 },
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

export const usePowerMapStore = create<PowerMapState>((set, get) => ({
	targets: INITIAL_TARGETS,
	actions: AVAILABLE_ACTIONS,
	simulation: {
		isActive: false,
		selectedActionId: null,
		projectedPositions: {},
	},

	addTarget: (target) => set((state) => ({ targets: [...state.targets, target] })),

	updateTarget: (id, updates) =>
		set((state) => ({
			targets: state.targets.map((t) => (t.id === id ? { ...t, ...updates } : t)),
		})),

	removeTarget: (id) =>
		set((state) => ({
			targets: state.targets.filter((t) => t.id !== id),
		})),

	getProjectedPosition: (target, action) => {
		const sensitivityValue = target.sensitivity?.[action.sensitivityFactor] || 1; // Default multiplier 1

		// Calculate raw deltas
		let dSupport = (action.baseEffect.supportDelta || 0) * sensitivityValue;
		let dPower = (action.baseEffect.powerDelta || 0) * sensitivityValue;

		// Apply changes
		let newSupport = target.position.support + dSupport;
		let newPower = target.position.power + dPower;

		// Clamp to -100 ~ 100
		newSupport = Math.max(-100, Math.min(100, newSupport));
		newPower = Math.max(-100, Math.min(100, newPower));

		return { support: newSupport, power: newPower };
	},

	startSimulation: (actionId) => {
		const { actions, targets, getProjectedPosition } = get();
		const action = actions.find((a) => a.id === actionId);
		if (!action) return;

		const projectedPositions: Record<string, Position> = {};
		targets.forEach((t) => {
			projectedPositions[t.id] = getProjectedPosition(t, action);
		});

		set({
			simulation: {
				isActive: true,
				selectedActionId: actionId,
				projectedPositions,
			},
		});
	},

	cancelSimulation: () =>
		set({
			simulation: {
				isActive: false,
				selectedActionId: null,
				projectedPositions: {},
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
			},
		});
	},
}));
