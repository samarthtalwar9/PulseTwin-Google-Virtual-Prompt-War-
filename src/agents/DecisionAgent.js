/**
 * Decision Agent: Parses final instructions from the simulation stream.
 */

export const parseBestAction = (response) => {
    if (!response) {
       return {
           best_action: "Error calculating best action.",
           improvement: "N/A",
           reason: "Response missing."
       };
    }
    
    // In scenarios where we are returning complex logic, we can distill it to the best_action string
    return {
        best_action: response.best_action || "Please wait for instructions.",
        improvement: response.improvement || "0 mins",
        reason: response.reason || "Unable to determine the optimal reasoning."
    };
};
