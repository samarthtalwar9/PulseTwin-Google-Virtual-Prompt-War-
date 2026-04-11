/**
 * constants.js
 * Store static configuration values enabling single-source-of-truth across environments.
 */

export const UI_THRESHOLDS = {
  CRITICAL_WAIT_MIN: 20,
  SAFE_WAIT_MAX: 10,
};

export const API_CONFIG = {
  MAX_RETRIES: 1,
  TIMEOUT_MS: 10000,
  MODEL_VERSION: 'gemini-1.5-flash',
};
