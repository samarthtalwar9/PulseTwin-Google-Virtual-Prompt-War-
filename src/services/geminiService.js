import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSimulationContext } from '../agents/SimulationAgent';
import { generatePredictionContext } from '../agents/PredictionAgent';
import { validateGeminiResponse } from '../utils/responseValidator';
import { logAIStart, logAIComplete, logAIError, logEvent, LogLevels } from './logService';
import { API_CONFIG } from '../utils/constants';
import { delay } from '../utils/helpers';

// Use environment variables securely without exposing hardcoded keys
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Initializes and validates the Gemini generation model.
 * Enforces structured JSON output to guarantee a consistent interface for the application.
 */
// Google Gemini API used for real-time AI decision intelligence
// Structured output ensures compatibility with multi-agent system
// Includes fallback and retry for production reliability
export async function analyzeCrowdData(input = null) {
  logAIStart();
  
  if (!genAI) {
    logEvent("Valid API Key missing in environment variables. Tripping to fallback state.", LogLevels.WARN);
    throw new Error("Missing API_KEY");
  }

  const model = genAI.getGenerativeModel({
    model: API_CONFIG.MODEL_VERSION,
    // Ensure strict response schemas with modern generation configs
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7
    }
  });

  const prompt = `
    You are the central AI navigation and optimization engine for PulseTwin.
    
    ${getSimulationContext()}
    ${generatePredictionContext()}
    
    Return EXACTLY this JSON structure:
    {
      "prediction": {
        "risk_area": "string - specific area name",
        "confidence": "number",
        "time_to_risk": "string - e.g., '5 mins'"
      },
      "scenarios": [
        {
          "id": "number",
          "gate_name": "string",
          "action": "string",
          "walking_time": "number",
          "waiting_time": "number",
          "total_time": "number",
          "efficiency": "number"
        }
      ],
      "best_action": "string - e.g., 'Go to Gate 8 (2 min walk)'",
      "improvement": "string - e.g., '14 mins saved'",
      "reason": "string - detailed AI explanation about balancing queue load and walking distance"
    }
  `;

  let attempt = 0;
  
  while (attempt <= API_CONFIG.MAX_RETRIES) {
    try {
       // Timeout simulated encapsulation
       const fetchPromise = model.generateContent(prompt);
       const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), API_CONFIG.TIMEOUT_MS));
       
       const result = await Promise.race([fetchPromise, timeoutPromise]);
       const response = await result.response;
       const text = await response.text();
       
       const parsedJson = JSON.parse(text);
       
       if (!validateGeminiResponse(parsedJson)) {
           throw new Error("Invalid response schema from AI node.");
       }
       
       logAIComplete();
       return parsedJson;

    } catch (error) {
       attempt++;
       logAIError(error);
       
       if (attempt > API_CONFIG.MAX_RETRIES) {
           logEvent("Maximum retry boundary established. Fallback injected immediately.", LogLevels.ERROR);
           throw error; // Let upper agent boundary catch and execute simulation.test fallback mock
       }
       
       logEvent(`Retrying Gemini Pipeline... Attempt ${attempt}`, LogLevels.WARN);
       await delay(1000 * attempt); // exponential backoff mock
    }
  }
}
