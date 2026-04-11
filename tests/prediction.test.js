import { parsePredictionResponse } from '../src/agents/PredictionAgent.js';

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

test("prediction returns valid structure", () => {
    const mockData = {
        prediction: { risk_area: "Gate A", confidence: 95, time_to_risk: "3 min" }
    };
    const result = parsePredictionResponse(mockData);
    expect(result).toHaveProperty("risk_area");
    expect(result).toHaveProperty("confidence");
});

test("handles empty input gracefully", () => {
    const result = parsePredictionResponse({});
    expect(result).toBeDefined();
    expect(result).toHaveProperty("risk_area"); // should return fallback unknown
});

test("handles null input gracefully", () => {
    const result = parsePredictionResponse(null);
    expect(result).toBeDefined();
});
