/**
 * Defines a type representing the state of a circuit breaker.
 * Possible values are "CLOSED", "OPEN", or "HALF_OPEN".
 */
export type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

/**
 * Represents a Circuit Breaker that can monitor the status of a system and prevent overload.
 * @class
 */
 */
export class CircuitBreaker {
    private state: CircuitBreakerState = "CLOSED";
    private failureCount: number = 0;
    private lastFailureTime?: number;
    private halfOpenSuccesses: number = 0;

    private readonly failureThreshold: number;
    private readonly resetTimeout: number;
    private readonly halfOpenMaxAttempts: number;

/**
 * Constructor for the Circuit Breaker class.
 * @param {Object} config - Configuration object with optional properties:
 * @param {number} [config.failureThreshold] - Number of failures allowed before opening the circuit.
 * @param {number} [config.resetTimeout] - Time in milliseconds before attempting to half-open the circuit.
 * @param {number} [config.halfOpenMaxAttempts] - Maximum number of attempts in half-open state.
 */
    constructor(
        private readonly config: {
            failureThreshold?: number;
            resetTimeout?: number;
            halfOpenMaxAttempts?: number;
        } = {}
    ) {
        this.failureThreshold = config.failureThreshold ?? 5;
        this.resetTimeout = config.resetTimeout ?? 60000;
        this.halfOpenMaxAttempts = config.halfOpenMaxAttempts ?? 3;
    }

/**
 * Executes the provided asynchronous operation while respecting the state of the circuit breaker.
 * If the circuit breaker is OPEN, it will transition to HALF_OPEN after a specified resetTimeout.
 * Counts successful operation calls in the HALF_OPEN state and resets the circuit breaker if a maximum number of attempts is reached.
 * @param {() => Promise<T>} operation - The asynchronous operation to execute.
 * @returns {Promise<T>} A Promise that resolves with the result of the operation.
 */
    async execute<T>(operation: () => Promise<T>): Promise<T> {
        if (this.state === "OPEN") {
            if (Date.now() - (this.lastFailureTime || 0) > this.resetTimeout) {
                this.state = "HALF_OPEN";
                this.halfOpenSuccesses = 0;
            } else {
                throw new Error("Circuit breaker is OPEN");
            }
        }

        try {
            const result = await operation();

            if (this.state === "HALF_OPEN") {
                this.halfOpenSuccesses++;
                if (this.halfOpenSuccesses >= this.halfOpenMaxAttempts) {
                    this.reset();
                }
            }

            return result;
        } catch (error) {
            this.handleFailure();
            throw error;
        }
    }

/**
 * Increments the failure count and updates the last failure time.
 * If the failure count exceeds the failure threshold, changes the state to "OPEN".
 */
 */
    private handleFailure(): void {
        this.failureCount++;
        this.lastFailureTime = Date.now();

        if (this.state !== "OPEN" && this.failureCount >= this.failureThreshold) {
            this.state = "OPEN";
        }
    }

/**
 * Resets the state to 'CLOSED', sets the failure count to 0, and clears the last failure time.
 */
    private reset(): void {
        this.state = "CLOSED";
        this.failureCount = 0;
        this.lastFailureTime = undefined;
    }

/**
 * Get the current state of the object.
 * @returns {"CLOSED" | "OPEN" | "HALF_OPEN"} The state of the object, which can be "CLOSED", "OPEN", or "HALF_OPEN".
 */
    getState(): "CLOSED" | "OPEN" | "HALF_OPEN" {
        return this.state;
    }
}
