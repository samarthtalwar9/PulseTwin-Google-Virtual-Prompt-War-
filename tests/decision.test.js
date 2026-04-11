import assert from 'assert';
import { parseBestAction } from '../src/agents/DecisionAgent.js';

// Basic structure test for Test Readiness
export function testDecisionAgent() {
  const mockResponse = {
    best_action: "Go to Gate 8",
    improvement: "10 mins saved",
    reason: "Lower density."
  };

  const decision = parseBestAction(mockResponse);
  
  assert.strictEqual(decision.best_action, "Go to Gate 8");
  assert.strictEqual(decision.improvement, "10 mins saved");
  console.log("DecisionAgent Tests Passed!");
}
