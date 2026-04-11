import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

// Simple physics and crowd logic for realistic randomization
function calculateDistanceAndTime(targetGate) {
  const stepsToMeters = 10;
  const speedMpS = 1.4;
  
  // Random grid steps between 15 and 60
  const steps = Math.floor(Math.random() * 45) + 15;
  const distance = steps * stepsToMeters;
  const walkingTimeSec = distance / speedMpS;
  const walkingTimeMin = Math.round(walkingTimeSec / 60);

  return { distance, walkingTime: walkingTimeMin };
}

export async function runPulseTwinPipeline() {
  if (!genAI) {
    console.warn("⚠️ API Key missing. Simulating Demo Mode...");
    throw new Error("Missing API_KEY");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7
    }
  });

  const prompt = `
    You are the central AI navigation and optimization engine for PulseTwin.
    Current context: The user is currently at Gate A.
    Current conditions:
    - Gate A: High density, wait time is around 18-22 minutes.
    - Gate B: Medium density, wait time is around 10-15 minutes.
    - Gate 8: Low density, recently opened express lane.

    Simulate a physics-based navigational decision for the user.
    Each grid step is 10 meters, average walking speed is 1.4 m/s.
    
    1. Predict current immediate risk.
    2. Suggest 3 navigational scenarios to different gates.
    3. Choose the optimal gate and provide actionable instructions, wait time, and time saved.
    
    Return EXACTLY this JSON structure:
    {
      "prediction": {
        "risk_area": "string - specific area name",
        "confidence": number,
        "time_to_risk": "string - e.g., '5 mins'"
      },
      "scenarios": [
        {
          "id": number,
          "gate_name": "string",
          "action": "string",
          "walking_time": number,
          "waiting_time": number,
          "total_time": number,
          "efficiency": number
        }
      ],
      "best_action": {
        "instruction": "string - e.g., 'Go to Gate 8 (2 min walk)'",
        "current_gate_wait": number,
        "target_gate_wait": number,
        "time_saved": number,
        "reason": "string - detailed AI explanation about balancing queue load and walking distance"
      }
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export function generateFallbackData() {
  const { walkingTime } = calculateDistanceAndTime("Gate 8");
  return {
    prediction: {
      risk_area: "Gate A Main Corridor",
      confidence: 96,
      time_to_risk: "2 mins"
    },
    scenarios: [
      { id: 1, gate_name: "Gate A", action: "Stay at Gate A", walking_time: 0, waiting_time: 21, total_time: 21, efficiency: 30 },
      { id: 2, gate_name: "Gate B", action: "Walk to Gate B", walking_time: 3, waiting_time: 12, total_time: 15, efficiency: 65 },
      { id: 3, gate_name: "Gate 8", action: "Walk to Gate 8", walking_time: walkingTime > 0 ? walkingTime : 2, waiting_time: 5, total_time: 7, efficiency: 95 }
    ],
    best_action: {
      instruction: `Go to Gate 8 (${walkingTime > 0 ? walkingTime : 2} min walk)`,
      current_gate_wait: 21,
      target_gate_wait: 5,
      time_saved: 21 - 7,
      reason: "This route avoids high-density clusters and reduces total time by balancing walking distance and queue load."
    }
  };
}
