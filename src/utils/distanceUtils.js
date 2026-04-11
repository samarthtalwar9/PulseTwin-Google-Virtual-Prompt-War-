/**
 * Utility functions for distance and time calculations
 */

export const STEPS_TO_METERS = 10;
export const SPEED_MPS = 1.4;

export function calculateDistanceAndTime(targetGate) {
  // Random grid steps between 15 and 60
  const steps = Math.floor(Math.random() * 45) + 15;
  const distance = steps * STEPS_TO_METERS;
  const walkingTimeSec = distance / SPEED_MPS;
  const walkingTimeMin = Math.round(walkingTimeSec / 60);

  return { distance, walkingTime: walkingTimeMin, steps, targetGate };
}
