import { IAgentRuntime, type Relationship, type UUID } from "./types.ts";

/**
 * Asynchronously creates a relationship between two users in the database.
 *
 * @param {Object} params - The parameters for creating the relationship.
 * @param {IAgentRuntime} params.runtime - The runtime environment for the operation.
 * @param {UUID} params.userA - The ID of the first user in the relationship.
 * @param {UUID} params.userB - The ID of the second user in the relationship.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating the success of creating the relationship.
 */
export async function createRelationship({
    runtime,
    userA,
    userB,
}: {
    runtime: IAgentRuntime;
    userA: UUID;
    userB: UUID;
}): Promise<boolean> {
    return runtime.databaseAdapter.createRelationship({
        userA,
        userB,
    });
}

/**
 * Retrieves the relationship between two users from the database.
 *
 * @param {Object} options - The options for retrieving the relationship.
 * @param {IAgentRuntime} options.runtime - The agent runtime.
 * @param {UUID} options.userA - The ID of the first user.
 * @param {UUID} options.userB - The ID of the second user.
 * @returns {Promise} A promise that resolves with the relationship between the two users.
 */
export async function getRelationship({
    runtime,
    userA,
    userB,
}: {
    runtime: IAgentRuntime;
    userA: UUID;
    userB: UUID;
}) {
    return runtime.databaseAdapter.getRelationship({
        userA,
        userB,
    });
}

/**
 * Fetches relationships for a user from the database.
 * @param {Object} params - The parameters for fetching relationships.
 * @param {IAgentRuntime} params.runtime - The agent runtime instance.
 * @param {UUID} params.userId - The ID of the user to fetch relationships for.
 * @returns {Promise} A promise that resolves with the user's relationships from the database.
 */
export async function getRelationships({
    runtime,
    userId,
}: {
    runtime: IAgentRuntime;
    userId: UUID;
}) {
    return runtime.databaseAdapter.getRelationships({ userId });
}

/**
 * Formats relationships for a specific user.
 * @async
 * @param {Object} options - The options object.
 * @param {IAgentRuntime} options.runtime - The runtime interface.
 * @param {UUID} options.userId - The ID of the user.
 * @returns {Promise<Array<UUID>>} The formatted relationships.
 */
export async function formatRelationships({
    runtime,
    userId,
}: {
    runtime: IAgentRuntime;
    userId: UUID;
}) {
    const relationships = await getRelationships({ runtime, userId });

    const formattedRelationships = relationships.map(
        (relationship: Relationship) => {
            const { userA, userB } = relationship;

            if (userA === userId) {
                return userB;
            }

            return userA;
        }
    );

    return formattedRelationships;
}
