import assert from 'assert';
import { parsePredictionResponse } from '../src/agents/PredictionAgent.js';

// Basic structure test for Test Readiness
export function testPredictionAgent() {
  const mockResponse = {
    prediction: {
      risk_area: "Test Area",
      confidence: 90,
      time_to_risk: "10 mins"
    }
  };

  const parsed = parsePredictionResponse(mockResponse);
  
  // Test that prediction is successfully separated
  assert.strictEqual(parsed.risk_area, "Test Area");
  assert.strictEqual(parsed.confidence, 90);
  console.log("PredictionAgent Tests Passed!");
}
