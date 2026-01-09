export type TargetGroup = 'Government' | 'Business' | 'Media' | 'Academia' | 'NGO';

export interface Position {
	power: number; // -100 to 100 (Y-axis)
	support: number; // -100 to 100 (X-axis)
}

export interface TargetSensitivity {
	publicPressure?: number;
	economicRisk?: number;
	legalRisk?: number;
}

export interface Target {
	id: string;
	name: string;
	group: TargetGroup;
	position: Position;
	sensitivity?: TargetSensitivity;
	description?: string; // Additional context
	avatarUrl?: string; // For UI
}

export type ActionType = 'press_conference' | 'lawsuit' | 'public_letter' | 'lobbying' | 'campaign';

export interface ActionStrategy {
	id: string;
	type: ActionType;
	name: string;
	description: string;
	// The effect logic might need to be serialized or handled via a lookup,
	// but for types we can define the shape of the change or a function signature
	// (though functions aren't valid in all state stores if persisting).
	// We'll use a descriptive effect model for now.
	baseEffect: {
		powerDelta?: number; // General power shift
		supportDelta?: number; // General support shift
	};
	sensitivityFactor: keyof TargetSensitivity; // Which sensitivity trait amplifies this action
}

export interface SimulationState {
	isActive: boolean;
	selectedActionId: string | null;
	projectedPositions: Record<string, Position>; // targetId -> newPosition
	intensity: number; // 0.5 to 2.0
	affectedGroups: TargetGroup[]; // Filter which groups are affected
}
