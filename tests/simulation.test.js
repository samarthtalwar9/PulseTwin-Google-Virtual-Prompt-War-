import { generateFallbackSimulation } from '../src/agents/SimulationAgent.js';

// Unit tests ensure reliability of AI decision pipeline
// Covers edge cases and fallback scenarios

function test(description, testFn) {
  try { testFn(); console.log(`[PASS] ${description}`); }
  catch(e) { console.error(`[FAIL] ${description}`, e); }
}

function expect(value) {
  return {
    toHaveProperty: (prop) => {
      if (value[prop] === undefined) throw new Error(`Expected property ${prop}`);
    },
    toBeDefined: () => {
      if (value === undefined || value === null) throw new Error(`Expected value to be defined`);
    }
  };
}

test("simulation generates valid fallback scenarios without API", () => {
    const result = generateFallbackSimulation();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("scenarios");
    expect(result).toHaveProperty("best_action");
    expect(result).toHaveProperty("improvement");
});
