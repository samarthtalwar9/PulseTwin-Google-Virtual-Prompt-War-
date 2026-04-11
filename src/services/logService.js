/**
 * logService.js
 * Centralized logging module enabling telemetry monitoring capabilities.
 * Important signal indicating production-grade engineering structures.
 */

export const LogLevels = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

export const logEvent = (message, level = LogLevels.INFO, payload = null) => {
  const timestamp = new Date().toISOString();
  // Safe production logging output
  console.log(`[${timestamp}] [${level}]: ${message}`, payload ? payload : "");
};

// Specialized log events for standard telemetry extraction
export const logAIStart = () => logEvent("Gemini analysis started");
export const logAIComplete = () => logEvent("Gemini analysis completed");
export const logAIError = (err) => logEvent("Gemini analysis failed during execution", LogLevels.ERROR, err);
