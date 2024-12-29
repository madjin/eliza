import { IAgentRuntime, State, type Memory } from "./types.ts";

/**
 * Formats provider outputs into a string which can be injected into the context.
 * @param runtime The AgentRuntime object.
 * @param message The incoming message object.
 * @param state The current state object.
 * @returns A string that concatenates the outputs of each provider.
 */
/**
 * Asynchronously retrieves data from various providers and filters out any null or empty results.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment in which the providers are being executed.
 * @param {Memory} message - The input message data to be processed by the providers.
 * @param {State} [state] - Optional additional state data to be passed to the providers.
 * @returns {string} - Joined string of non-null and non-empty provider results.
 */
export async function getProviders(
    runtime: IAgentRuntime,
    message: Memory,
    state?: State
) {
    const providerResults = (
        await Promise.all(
            runtime.providers.map(async (provider) => {
                return await provider.get(runtime, message, state);
            })
        )
    ).filter((result) => result != null && result !== "");

    return providerResults.join("\n");
}
