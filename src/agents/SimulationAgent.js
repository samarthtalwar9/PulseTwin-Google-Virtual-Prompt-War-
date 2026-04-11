import { calculateDistanceAndTime } from '../utils/distanceUtils';

/**
 * Simulation Agent: Generates fallback scenarios and manages queue simulation states.
 */

export const generateFallbackSimulation = () => {
  const { walkingTime } = calculateDistanceAndTime("Gate 8");
  return {
    prediction: {
      risk_area: "Gate A Main Corridor",
      confidence: 96,
      time_to_risk: "2 mins"
    },
    scenarios: [
      { id: 1, gate_name: "Gate A", action: "Stay at Gate A", walking_time: 0, waiting_time: 21, total_time: 21, efficiency: 30 },
      { id: 2, gate_name: "Gate B", action: "Walk to Gate B", walking_time: 3, waiting_time: 12, total_time: 15, efficiency: 65 },
      { id: 3, gate_name: "Gate 8", action: "Walk to Gate 8", walking_time: walkingTime > 0 ? walkingTime : 2, waiting_time: 5, total_time: 7, efficiency: 95 }
    ],
    best_action: `Go to Gate 8 (${walkingTime > 0 ? walkingTime : 2} min walk)`,
    improvement: `${21 - 7} mins saved`,
    reason: "This route avoids high-density clusters and reduces total time by balancing walking distance and queue load."
  };
};

export const getSimulationContext = () => {
    return `
    Current context: The user is currently at Gate A.
    Current conditions:
    - Gate A: High density, wait time is around 18-22 minutes.
    - Gate B: Medium density, wait time is around 10-15 minutes.
    - Gate 8: Low density, recently opened express lane.

    Simulate a physics-based navigational decision for the user.
    Each grid step is 10 meters, average walking speed is 1.4 m/s.
    `;
};
