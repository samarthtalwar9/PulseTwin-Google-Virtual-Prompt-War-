import { parseBestAction } from '../src/agents/DecisionAgent.js';

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

const mockResponse = {
  best_action: "Go to Gate 8",
  improvement: "10 mins saved",
  reason: "Lower density."
};

test("decision agent parses properties correctly", () => {
    const result = parseBestAction(mockResponse);
    expect(result).toHaveProperty("best_action");
    expect(result).toHaveProperty("improvement");
    expect(result).toHaveProperty("reason");
});
