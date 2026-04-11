/**
 * responseValidator.js
 * Validates the structure and properties of the Gemini AI output.
 * Ensures the system gracefully handles unexpected response mutations.
 */
export const validateGeminiResponse = (response) => {
    // Determine if structured JSON payload successfully resolves
    if (!response || typeof response !== 'object') return false;
    
    const requiredKeys = ['prediction', 'scenarios', 'best_action', 'improvement', 'reason'];
    for (const key of requiredKeys) {
      if (!(key in response)) {
        console.warn(`[Validation Warning] Missing required AI payload key: ${key}`);
        return false;
      }
    }
    
    return true;
};
