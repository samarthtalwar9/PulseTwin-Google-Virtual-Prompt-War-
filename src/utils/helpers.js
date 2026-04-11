/**
 * helpers.js
 * Common reusable foundational functions allowing deep reusability across logical streams.
 */

/**
 * Halts execution safely triggering timeout workflows natively.
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Creates defensive cloning to prevent strict-mode state mutations across agents.
 */
export const deepClone = (obj) => {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch {
        return null;
    }
};
