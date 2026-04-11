/**
 * Prediction Agent: Responsible for generating the prediction context and schemas.
 * Modular approach to separate data prediction from core app logic.
 */

export const generatePredictionContext = () => {
    return `
      1. Predict current immediate risk.
      2. Suggest 3 navigational scenarios to different gates.
      3. Choose the optimal gate and provide actionable instructions, wait time, and time saved.
    `;
};

export const parsePredictionResponse = (response) => {
    // Validates that prediction structure exists, returning default fallback if not
    if (!response || !response.prediction) {
       return {
          risk_area: "Unknown",
          confidence: 0,
          time_to_risk: "N/A"
       }
    }
    return response.prediction;
};
