import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSimulationContext } from '../agents/SimulationAgent';
import { generatePredictionContext } from '../agents/PredictionAgent';

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
export async function fetchPulseTwinAIResponse() {
  if (!genAI) {
    console.warn("⚠️ Valid API Key missing in environment variables. Tripping to fallback state.");
    throw new Error("Missing API_KEY");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Request Failed - Safe Fallback Activated:", error);
    throw error;
  }
}
