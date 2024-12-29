import path from "node:path";
import { models } from "./models.ts";
import { IAgentRuntime, ModelProviderName } from "./types.ts";
import settings from "./settings.ts";
import elizaLogger from "./logger.ts";

/**
 * Interface for embedding options.
 * 
 * @typedef {Object} EmbeddingOptions
 * @property {string} model - The name of the model to use for embedding.
 * @property {string} endpoint - The API endpoint to use for embedding.
 * @property {string} [apiKey] - Optional API key for authentication.
 * @property {number} [length] - Optional length parameter for embedding.
 * @property {boolean} [isOllama] - Optional flag for indicating if Ollama should be used.
 * @property {number} [dimensions] - Optional number of dimensions for embedding.
 * @property {string} [provider] - Optional provider for embedding.
 */
interface EmbeddingOptions {
    model: string;
    endpoint: string;
    apiKey?: string;
    length?: number;
    isOllama?: boolean;
    dimensions?: number;
    provider?: string;
}

export const EmbeddingProvider = {
    OpenAI: "OpenAI",
    Ollama: "Ollama",
    GaiaNet: "GaiaNet",
    BGE: "BGE",
} as const;

/**
 * Type definition for embedding provider type.
 */
export type EmbeddingProviderType =
    (typeof EmbeddingProvider)[keyof typeof EmbeddingProvider];

/**
 * Represents the configuration for an embedding, specifying the dimensions, model, and provider.
 * @typedef {Object} EmbeddingConfig
 * @property {number} dimensions - The number of dimensions in the embedding.
 * @property {string} model - The specific model being used for the embedding.
 * @property {EmbeddingProviderType} provider - The type of provider supplying the embedding.
 */
export type EmbeddingConfig = {
    readonly dimensions: number;
    readonly model: string;
    readonly provider: EmbeddingProviderType;
};

export const getEmbeddingConfig = (): EmbeddingConfig => ({
    dimensions:
        settings.USE_OPENAI_EMBEDDING?.toLowerCase() === "true"
            ? 1536 // OpenAI
            : settings.USE_OLLAMA_EMBEDDING?.toLowerCase() === "true"
              ? 1024 // Ollama mxbai-embed-large
              : settings.USE_GAIANET_EMBEDDING?.toLowerCase() === "true"
                ? 768 // GaiaNet
                : 384, // BGE
    model:
        settings.USE_OPENAI_EMBEDDING?.toLowerCase() === "true"
            ? "text-embedding-3-small"
            : settings.USE_OLLAMA_EMBEDDING?.toLowerCase() === "true"
              ? settings.OLLAMA_EMBEDDING_MODEL || "mxbai-embed-large"
              : settings.USE_GAIANET_EMBEDDING?.toLowerCase() === "true"
                ? settings.GAIANET_EMBEDDING_MODEL || "nomic-embed"
                : "BGE-small-en-v1.5",
    provider:
        settings.USE_OPENAI_EMBEDDING?.toLowerCase() === "true"
            ? "OpenAI"
            : settings.USE_OLLAMA_EMBEDDING?.toLowerCase() === "true"
              ? "Ollama"
              : settings.USE_GAIANET_EMBEDDING?.toLowerCase() === "true"
                ? "GaiaNet"
                : "BGE",
});

/**
 * Fetches remote embeddings for the given input using the specified options.
 * @param {string} input - The input text to generate embeddings for.
 * @param {EmbeddingOptions} options - The options object containing endpoint, apiKey, model, dimensions, length, and isOllama.
 * @returns {Promise<number[]>} - A promise that resolves to an array of numbers representing the embeddings.
 */
async function getRemoteEmbedding(
    input: string,
    options: EmbeddingOptions
): Promise<number[]> {
    // Ensure endpoint ends with /v1 for OpenAI
    const baseEndpoint = options.endpoint.endsWith("/v1")
        ? options.endpoint
        : `${options.endpoint}${options.isOllama ? "/v1" : ""}`;

    // Construct full URL
    const fullUrl = `${baseEndpoint}/embeddings`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(options.apiKey
                ? {
                      Authorization: `Bearer ${options.apiKey}`,
                  }
                : {}),
        },
        body: JSON.stringify({
            input,
            model: options.model,
            dimensions:
                options.dimensions ||
                options.length ||
                getEmbeddingConfig().dimensions, // Prefer dimensions, fallback to length
        }),
    };

    try {
        const response = await fetch(fullUrl, requestOptions);

        if (!response.ok) {
            elizaLogger.error("API Response:", await response.text()); // Debug log
            throw new Error(
                `Embedding API Error: ${response.status} ${response.statusText}`
            );
        }

        interface EmbeddingResponse {
            data: Array<{ embedding: number[] }>;
        }

        const data: EmbeddingResponse = await response.json();
        return data?.data?.[0].embedding;
    } catch (e) {
        elizaLogger.error("Full error details:", e);
        throw e;
    }
}

/**
 * Determines the embedding type based on the runtime environment and configuration settings.
 * @param {IAgentRuntime} runtime - The runtime information for the agent.
 * @returns {"local" | "remote"} - The type of embedding to use: "local" for Node.js or custom embeddings, "remote" for OpenAI embeddings.
 */
export function getEmbeddingType(runtime: IAgentRuntime): "local" | "remote" {
    const isNode =
        typeof process !== "undefined" &&
        process.versions != null &&
        process.versions.node != null;

    // Use local embedding if:
    // - Running in Node.js
    // - Not using OpenAI provider
    // - Not forcing OpenAI embeddings
    const isLocal =
        isNode &&
        runtime.character.modelProvider !== ModelProviderName.OPENAI &&
        runtime.character.modelProvider !== ModelProviderName.GAIANET &&
        !settings.USE_OPENAI_EMBEDDING;

    return isLocal ? "local" : "remote";
}

/**
 * Retrieves a zero vector for embeddings based on the configured embedding dimension.
 * @returns {number[]} A zero vector with the specified embedding dimension filled with zeros.
 */
export function getEmbeddingZeroVector(): number[] {
    let embeddingDimension = 384; // Default BGE dimension

    if (settings.USE_OPENAI_EMBEDDING?.toLowerCase() === "true") {
        embeddingDimension = 1536; // OpenAI dimension
    } else if (settings.USE_OLLAMA_EMBEDDING?.toLowerCase() === "true") {
        embeddingDimension = 1024; // Ollama mxbai-embed-large dimension
    }

    return Array(embeddingDimension).fill(0);
}

/**
 * Gets embeddings from a remote API endpoint.  Falls back to local BGE/384
 *
 * @param {string} input - The text to generate embeddings for
 * @param {EmbeddingOptions} options - Configuration options including:
 *   - model: The model name to use
 *   - endpoint: Base API endpoint URL
 *   - apiKey: Optional API key for authentication
 *   - isOllama: Whether this is an Ollama endpoint
 *   - dimensions: Desired embedding dimensions
 * @param {IAgentRuntime} runtime - The agent runtime context
 * @returns {Promise<number[]>} Array of embedding values
 * @throws {Error} If the API request fails
 */

/**
 * Embeds the provided input string using the specified provider and model.
 * 
 * @async
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} input - The input string to embed.
 * @returns {Promise<number[]>} The embedding array for the input string.
 */
export async function embed(runtime: IAgentRuntime, input: string) {
    elizaLogger.debug("Embedding request:", {
        modelProvider: runtime.character.modelProvider,
        useOpenAI: process.env.USE_OPENAI_EMBEDDING,
        input: input?.slice(0, 50) + "...",
        inputType: typeof input,
        inputLength: input?.length,
        isString: typeof input === "string",
        isEmpty: !input,
    });

    // Validate input
    if (!input || typeof input !== "string" || input.trim().length === 0) {
        elizaLogger.warn("Invalid embedding input:", {
            input,
            type: typeof input,
            length: input?.length,
        });
        return []; // Return empty embedding array
    }

    // Check cache first
    const cachedEmbedding = await retrieveCachedEmbedding(runtime, input);
    if (cachedEmbedding) return cachedEmbedding;

    const config = getEmbeddingConfig();
    const isNode = typeof process !== "undefined" && process.versions?.node;

    // Determine which embedding path to use
    if (config.provider === EmbeddingProvider.OpenAI) {
        return await getRemoteEmbedding(input, {
            model: config.model,
            endpoint: settings.OPENAI_API_URL || "https://api.openai.com/v1",
            apiKey: settings.OPENAI_API_KEY,
            dimensions: config.dimensions,
        });
    }

    if (config.provider === EmbeddingProvider.Ollama) {
        return await getRemoteEmbedding(input, {
            model: config.model,
            endpoint:
                runtime.character.modelEndpointOverride ||
                models[ModelProviderName.OLLAMA].endpoint,
            isOllama: true,
            dimensions: config.dimensions,
        });
    }

    if (config.provider == EmbeddingProvider.GaiaNet) {
        return await getRemoteEmbedding(input, {
            model: config.model,
            endpoint:
                runtime.character.modelEndpointOverride ||
                models[ModelProviderName.GAIANET].endpoint ||
                settings.SMALL_GAIANET_SERVER_URL ||
                settings.MEDIUM_GAIANET_SERVER_URL ||
                settings.LARGE_GAIANET_SERVER_URL,
            apiKey: settings.GAIANET_API_KEY || runtime.token,
            dimensions: config.dimensions,
        });
    }

    // BGE - try local first if in Node
    if (isNode) {
        try {
            return await getLocalEmbedding(input);
        } catch (error) {
            elizaLogger.warn(
                "Local embedding failed, falling back to remote",
                error
            );
        }
    }

    // Fallback to remote override
    return await getRemoteEmbedding(input, {
        model: config.model,
        endpoint:
            runtime.character.modelEndpointOverride ||
            models[runtime.character.modelProvider].endpoint,
        apiKey: runtime.token,
        dimensions: config.dimensions,
    });

    async function getLocalEmbedding(input: string): Promise<number[]> {
        elizaLogger.debug("DEBUG - Inside getLocalEmbedding function");

        // Check if we're in Node.js environment
        const isNode =
            typeof process !== "undefined" &&
            process.versions != null &&
            process.versions.node != null;

        if (!isNode) {
            elizaLogger.warn(
                "Local embedding not supported in browser, falling back to remote embedding"
            );
            throw new Error("Local embedding not supported in browser");
        }

        try {
            const moduleImports = await Promise.all([
                import("fs"),
                import("url"),
                (async () => {
                    try {
                        return await import("fastembed");
                    } catch {
                        elizaLogger.error("Failed to load fastembed.");
                        throw new Error(
                            "fastembed import failed, falling back to remote embedding"
                        );
                    }
                })(),
            ]);

            const [fs, { fileURLToPath }, fastEmbed] = moduleImports;
            const { FlagEmbedding, EmbeddingModel } = fastEmbed;

            function getRootPath() {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);

                const rootPath = path.resolve(__dirname, "..");
                if (rootPath.includes("/eliza/")) {
                    return rootPath.split("/eliza/")[0] + "/eliza/";
                }

                return path.resolve(__dirname, "..");
            }

            const cacheDir = getRootPath() + "/cache/";

            if (!fs.existsSync(cacheDir)) {
                fs.mkdirSync(cacheDir, { recursive: true });
            }

            elizaLogger.debug("Initializing BGE embedding model...");

            const embeddingModel = await FlagEmbedding.init({
                cacheDir: cacheDir,
                model: EmbeddingModel.BGESmallENV15,
                // BGE-small-en-v1.5 specific settings
                maxLength: 512, // BGE's context window
            });

            elizaLogger.debug("Generating embedding for input:", {
                inputLength: input.length,
                inputPreview: input.slice(0, 100) + "...",
            });

            // Let fastembed handle tokenization internally
            const embedding = await embeddingModel.queryEmbed(input);

            // Debug the raw embedding
            elizaLogger.debug("Raw embedding from BGE:", {
                type: typeof embedding,
                isArray: Array.isArray(embedding),
                dimensions: Array.isArray(embedding)
                    ? embedding.length
                    : "not an array",
                sample: Array.isArray(embedding)
                    ? embedding.slice(0, 5)
                    : embedding,
            });

            // Process the embedding into the correct format
            let finalEmbedding: number[];

            if (
                ArrayBuffer.isView(embedding) &&
                embedding.constructor === Float32Array
            ) {
                // Direct Float32Array result
                finalEmbedding = Array.from(embedding);
            } else if (
                Array.isArray(embedding) &&
                ArrayBuffer.isView(embedding[0]) &&
                embedding[0].constructor === Float32Array
            ) {
                // Nested Float32Array result
                finalEmbedding = Array.from(embedding[0]);
            } else if (Array.isArray(embedding)) {
                // Direct array result
                finalEmbedding = embedding;
            } else {
                throw new Error(
                    `Unexpected embedding format: ${typeof embedding}`
                );
            }

            elizaLogger.debug("Processed embedding:", {
                length: finalEmbedding.length,
                sample: finalEmbedding.slice(0, 5),
                allNumbers: finalEmbedding.every((n) => typeof n === "number"),
            });

            // Ensure all values are proper numbers
            finalEmbedding = finalEmbedding.map((n) => Number(n));

            // Validate the final embedding
            if (
                !Array.isArray(finalEmbedding) ||
                finalEmbedding[0] === undefined
            ) {
                throw new Error(
                    "Invalid embedding format: must be an array starting with a number"
                );
            }

            // Validate embedding dimensions (should be 384 for BGE-small)
            if (finalEmbedding.length !== 384) {
                elizaLogger.warn(
                    `Unexpected embedding dimension: ${finalEmbedding.length} (expected 384)`
                );
            }

            return finalEmbedding;
        } catch {
            // Browser implementation - fallback to remote embedding
            elizaLogger.warn(
                "Local embedding not supported in browser, falling back to remote embedding"
            );
            throw new Error("Local embedding not supported in browser");
        }
    }

    async function retrieveCachedEmbedding(
        runtime: IAgentRuntime,
        input: string
    ) {
        if (!input) {
            elizaLogger.log("No input to retrieve cached embedding for");
            return null;
        }

        const similaritySearchResult =
            await runtime.messageManager.getCachedEmbeddings(input);
        if (similaritySearchResult.length > 0) {
            return similaritySearchResult[0].embedding;
        }
        return null;
    }
}
