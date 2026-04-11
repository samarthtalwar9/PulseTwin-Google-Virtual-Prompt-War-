import { parseBestAction } from '../src/agents/DecisionAgent.js';

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

test("decision agent parses properties correctly", () => {
    const mockResponse = {
        best_action: "Go to Gate 8",
        improvement: "10 mins saved",
        reason: "Lower density."
    };
    const result = parseBestAction(mockResponse);
    expect(result).toHaveProperty("best_action");
    expect(result).toHaveProperty("improvement");
});

test("handles undefined payloads safely", () => {
    const result = parseBestAction(undefined);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("best_action"); // fallback string
});
