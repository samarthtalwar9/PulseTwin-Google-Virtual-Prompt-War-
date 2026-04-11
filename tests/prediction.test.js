import { parsePredictionResponse } from '../src/agents/PredictionAgent.js';

// Mocking test runner for structural indication
function test(description, testFn) {
  try { testFn(); console.log(`✓ ${description}`); }
  catch(e) { console.error(`✗ ${description}`, e); }
}

function expect(value) {
  return {
    toHaveProperty: (prop) => {
      if (value[prop] === undefined) throw new Error(`Expected property ${prop}`);
    }
  };
}

const mockData = {
  prediction: { risk_area: "Gate A", confidence: 95, time_to_risk: "3 min" }
};

test("prediction returns valid structure", () => {
    const result = parsePredictionResponse(mockData);
    expect(result).toHaveProperty("risk_area");
    expect(result).toHaveProperty("confidence");
    expect(result).toHaveProperty("time_to_risk");
});
