/* eslint-disable no-dupe-class-members */
import { DatabaseAdapter } from "../database.ts"; // Adjust the import based on your project structure
import {
    Memory,
    Actor,
    Account,
    Goal,
    GoalStatus,
    Participant,
    Relationship,
    UUID,
} from "../types"; // Adjust based on your types location

/**
 * Mock implementation of a DatabaseAdapter for testing purposes.
 * Extends the DatabaseAdapter class.
 * 
 * @class
 * @extends DatabaseAdapter
 */
class MockDatabaseAdapter extends DatabaseAdapter {
/**
 * Retrieve a Memory object by its unique identifier.
 *
 * @param {UUID} _id - The unique identifier of the Memory object.
 * @returns {Promise<Memory | null>} A Promise that resolves with the Memory object found, or null if no Memory is found.
 */
    getMemoryById(_id: UUID): Promise<Memory | null> {
        throw new Error("Method not implemented.");
    }
/**
 * Logs user activity based on the provided parameters.
 * 
 * @param {object} _params - The parameters for logging the activity.
 * @param {object} _params.body - The body of the activity, as a key-value pair object.
 * @param {string} _params.userId - The UUID of the user performing the activity.
 * @param {string} _params.roomId - The UUID of the room where the activity is occurring.
 * @param {string} _params.type - The type of activity being logged.
 * @returns {Promise<void>} - A promise that resolves when the logging is complete.
 */
    log(_params: {
        body: { [key: string]: unknown };
        userId: UUID;
        roomId: UUID;
        type: string;
    }): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves details of actors present in the specified room.
 * @param {Object} _params - The parameters for retrieving actor details.
 * @param {UUID} _params.roomId - The unique identifier of the room.
 * @returns {Promise<Actor[]>} - A promise that resolves to an array of Actor objects.
 * @throws {Error} - If the method is not implemented.
 */
    getActorDetails(_params: { roomId: UUID }): Promise<Actor[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Search memories by embedding.
 * 
 * @param {number[]} _embedding - The embedding to search for.
 * @param {Object} _params - The parameters for the search.
 * @param {number} [_params.match_threshold] - The threshold for matching.
 * @param {number} [_params.count] - The maximum number of memories to return.
 * @param {UUID} [_params.roomId] - The room ID to search within.
 * @param {UUID} [_params.agentId] - The agent ID to search within.
 * @param {boolean} [_params.unique] - Whether to return only unique memories.
 * @param {string} _params.tableName - The name of the table to search in.
 * @returns {Promise<Memory[]>} - A promise that resolves to an array of memories.
 */
    searchMemoriesByEmbedding(
        _embedding: number[],
        _params: {
            match_threshold?: number;
            count?: number;
            roomId?: UUID;
            agentId?: UUID;
            unique?: boolean;
            tableName: string;
        }
    ): Promise<Memory[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Create a new memory in the specified table.
 * 
 * @param _memory The memory object to be created.
 * @param _tableName The name of the table where the memory should be created.
 * @param _unique Optional. Specifies whether the memory being created should be unique or not. Default is false.
 * 
 * @returns A Promise that resolves when the memory has been successfully created.
 */
    createMemory(
        _memory: Memory,
        _tableName: string,
        _unique?: boolean
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Removes a memory with the specified ID from the given table.
 *
 * @param {_memoryId: UUID} _memoryId The ID of the memory to be removed.
 * @param {_tableName: string} _tableName The name of the table from which the memory should be removed.
 *
 * @returns {Promise<void>} A promise that resolves when the memory has been successfully removed.
 */
    removeMemory(_memoryId: UUID, _tableName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Removes all memories associated with a specific room and table.
 * 
 * @param {UUID} _roomId - The unique identifier of the room.
 * @param {string} _tableName - The name of the table where memories are stored.
 * @returns {Promise<void>} A Promise that resolves once all memories are successfully removed.
 * @throws {Error} If the method is not implemented.
 */
    removeAllMemories(_roomId: UUID, _tableName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Counts the memories associated with a given room ID.
 * 
 * @param {UUID} _roomId - The ID of the room to count memories for.
 * @param {boolean} [_unique] - Optional. If true, only count unique memories.
 * @param {string} [_tableName] - Optional. The name of the table to query for memories. 
 * 
 * @returns {Promise<number>} - A Promise that resolves to the number of memories associated with the room ID.
 */
    countMemories(
        _roomId: UUID,
        _unique?: boolean,
        _tableName?: string
    ): Promise<number> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieve goals based on specified parameters
 * @param {Object} _params - The parameters for filtering goals
 * @param {UUID} _params.roomId - The room ID to fetch goals from
 * @param {UUID|null} [_params.userId] - The user ID to filter goals by (optional)
 * @param {boolean} [_params.onlyInProgress] - Flag to indicate if only in-progress goals should be included (optional)
 * @param {number} [_params.count] - The maximum number of goals to return (optional)
 * @returns {Promise<Goal[]>} - A promise that resolves to an array of Goal objects
 */
    getGoals(_params: {
        roomId: UUID;
        userId?: UUID | null;
        onlyInProgress?: boolean;
        count?: number;
    }): Promise<Goal[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Update a goal.
 * 
 * @param _goal - The goal object to update.
 * @returns A promise that resolves when the update is complete.
 */
    updateGoal(_goal: Goal): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Creates a new goal.
 * 
 * @param {Goal} _goal - The goal to create.
 * @returns {Promise<void>} A Promise that resolves when the goal is created.
 */
    createGoal(_goal: Goal): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Removes a goal with the specified ID.
 * @param {_goalId: UUID} _goalId - The ID of the goal to be removed.
 * @returns {Promise<void>} A promise that resolves when the goal is successfully removed.
 */
    removeGoal(_goalId: UUID): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Removes all goals associated with a specific room.
 *
 * @param {_roomId} UUID - The unique identifier of the room to remove goals from.
 * @returns {Promise<void>} - A promise that resolves when all goals are successfully removed.
 */
    removeAllGoals(_roomId: UUID): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves the room with the specified ID.
 * 
 * @param {UUID} _roomId - The ID of the room to retrieve.
 * @returns {Promise<UUID | null>} - A promise that resolves with the ID of the room, or null if the room is not found.
 */
    getRoom(_roomId: UUID): Promise<UUID | null> {
        throw new Error("Method not implemented.");
    }
/**
 * Creates a room with the specified room ID.
 * 
 * @param _roomId The optional room ID to be assigned to the newly created room.
 * @returns A promise that resolves to the UUID of the created room.
 * @throws Error if the method is not implemented.
 */
    createRoom(_roomId?: UUID): Promise<UUID> {
        throw new Error("Method not implemented.");
    }
/**
 * Removes a room based on the provided room ID.
 * 
 * @param {UUID} _roomId - The ID of the room to be removed.
 * @returns {Promise<void>} - A promise that resolves once the room is successfully removed.
 */
    removeRoom(_roomId: UUID): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieve the list of rooms associated with a participant based on their user ID.
 * 
 * @param {UUID} _userId - The unique identifier of the participant
 * @returns {Promise<UUID[]>} A Promise that resolves to an array of unique identifiers for the rooms
 * @throws {Error} If the method is not implemented
 */
    getRoomsForParticipant(_userId: UUID): Promise<UUID[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves rooms for specified participants.
 * 
 * @param _userIds Array of user IDs to retrieve rooms for
 * @returns A Promise that resolves to an array of room IDs
 */
    getRoomsForParticipants(_userIds: UUID[]): Promise<UUID[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Add a participant to a specific room.
 * 
 * @param _userId The UUID of the user to add as a participant.
 * @param _roomId The UUID of the room to add the participant to.
 * @returns A Promise that resolves to a boolean indicating if the participant was successfully added.
 */
    addParticipant(_userId: UUID, _roomId: UUID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
/**
 * Remove a participant from a room.
 * 
 * @param {UUID} _userId - The unique identifier of the user to be removed.
 * @param {UUID} _roomId - The unique identifier of the room from which the user will be removed.
 * @returns {Promise<boolean>} - A boolean indicating whether the participant removal was successful.
 */
    removeParticipant(_userId: UUID, _roomId: UUID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves the list of participants associated with the provided user ID.
 * 
 * @param {UUID} userId - The unique identifier of the user account.
 * @returns {Promise<Participant[]>} A promise that resolves with an array of Participant objects.
 */
    getParticipantsForAccount(userId: UUID): Promise<Participant[]>;
/**
 * Retrieve participants for a specific account associated with the provided user ID
 * @param {UUID} userId - The unique identifier for the user account
 * @returns {Promise<Participant[]>} - A Promise that resolves with an array of Participant objects
 */
    getParticipantsForAccount(userId: UUID): Promise<Participant[]>;
/**
 * Retrieve participants for a specific account based on the user ID.
 *
 * @param {unknown} _userId - The user ID to retrieve participants for.
 * @returns {Promise<import("../types").Participant[]>} - A promise that resolves to an array of participants.
 */
    getParticipantsForAccount(
        _userId: unknown
    ): Promise<import("../types").Participant[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Get participants for a given room.
 * 
 * @param {_roomId} UUID - The ID of the room to get participants for.
 * @returns {Promise<UUID[]>} - A promise that resolves with an array of participant UUIDs.
 */
 

    getParticipantsForRoom(_roomId: UUID): Promise<UUID[]> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves the state of the specified user in the given room.
 * @param {UUID} _roomId - The unique identifier of the room.
 * @param {UUID} _userId - The unique identifier of the user.
 * @returns {Promise<"FOLLOWED" | "MUTED" | null>} - The state of the participant user (either "FOLLOWED", "MUTED", or null).
 */
    getParticipantUserState(
        _roomId: UUID,
        _userId: UUID
    ): Promise<"FOLLOWED" | "MUTED" | null> {
        throw new Error("Method not implemented.");
    }
/**
 * Set the state of a participant in a specific room.
 * @param {UUID} _roomId - The ID of the room where the participant is located.
 * @param {UUID} _userId - The ID of the participant whose state is being set.
 * @param {"FOLLOWED" | "MUTED" | null} _state - The state to set for the participant: "FOLLOWED", "MUTED", or null.
 * @returns {Promise<void>} A Promise that resolves when the state is successfully set.
 */
    setParticipantUserState(
        _roomId: UUID,
        _userId: UUID,
        _state: "FOLLOWED" | "MUTED" | null
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }
/**
 * Creates a relationship between two users.
 * 
 * @param {Object} _params - The parameters for creating the relationship.
 * @param {UUID} _params.userA - The UUID of the first user.
 * @param {UUID} _params.userB - The UUID of the second user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the relationship was created successfully.
 */
    createRelationship(_params: {
        userA: UUID;
        userB: UUID;
    }): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves the relationship between two users.
 * 
 * @param {Object} _params - The parameters object.
 * @param {string} _params.userA - The UUID of user A.
 * @param {string} _params.userB - The UUID of user B.
 * @returns {Promise<Relationship | null>} - The relationship between user A and user B, or null if none exists.
 */
    getRelationship(_params: {
        userA: UUID;
        userB: UUID;
    }): Promise<Relationship | null> {
        throw new Error("Method not implemented.");
    }
/**
 * Retrieves relationships for a given userId.
 * 
 * @param {Object} _params - The parameters for the request.
 * @param {UUID} _params.userId - The unique identifier of the user.
 * @returns {Promise<Relationship[]>} - A promise that resolves to an array of Relationship objects.
 */
    getRelationships(_params: { userId: UUID }): Promise<Relationship[]> {
        throw new Error("Method not implemented.");
    }
    db: any = {};

    // Mock method for getting memories by room IDs
/**
 * Retrieves memories based on room ids.
 * 
 * @param {Object} params - The parameters for retrieving memories.
 * @param {string[]} params.roomIds - The room ids to retrieve memories from.
 * @param {string} [params.agentId] - The agent id to filter memories by.
 * @param {string} params.tableName - The name of the table to query memories from.
 * @returns {Promise<Memory[]>} The memories retrieved based on the provided room ids.
 */
    async getMemoriesByRoomIds(params: {
        roomIds: `${string}-${string}-${string}-${string}-${string}`[];
        agentId?: `${string}-${string}-${string}-${string}-${string}`;
        tableName: string;
    }): Promise<Memory[]> {
        return [
            {
                id: "memory-id" as UUID,
                content: "Test Memory",
                roomId: params.roomIds[0],
                userId: "user-id" as UUID,
                agentId: params.agentId ?? ("agent-id" as UUID),
            },
        ] as unknown as Memory[];
    }

    // Mock method for getting cached embeddings
/**
 * Retrieves cached embeddings based on specified parameters.
 *
 * @param {Object} _params - The parameters for retrieving cached embeddings.
 * @param {string} _params.query_table_name - The name of the table to query.
 * @param {number} _params.query_threshold - The threshold for the query.
 * @param {string} _params.query_input - The input for the query.
 * @param {string} _params.query_field_name - The name of the field in the table.
 * @param {string} _params.query_field_sub_name - The sub name of the field in the table.
 * @param {number} _params.query_match_count - The number of matches to retrieve.
 * @returns {Promise<Object[]>} An array of objects containing the retrieved embeddings and Levenshtein distances.
 */
    async getCachedEmbeddings(_params: {
        query_table_name: string;
        query_threshold: number;
        query_input: string;
        query_field_name: string;
        query_field_sub_name: string;
        query_match_count: number;
    }): Promise<any[]> {
        return [
            {
                embedding: [0.1, 0.2, 0.3],
                levenshtein_distance: 0.4,
            },
        ];
    }

    // Mock method for searching memories
/**
 * Search for memories based on the provided parameters.
 * @param {Object} params - The search parameters.
 * @param {string} params.tableName - The name of the table to search in.
 * @param {string} params.roomId - The ID of the room to search memories for.
 * @param {number[]} params.embedding - The embedding to compare with memories.
 * @param {number} params.match_threshold - The threshold for similarity matching.
 * @param {number} params.match_count - The number of matches to retrieve.
 * @param {boolean} params.unique - Flag to indicate if only unique memories should be returned.
 * @returns {Promise<Memory[]>} The list of memories that match the search criteria.
 */
    async searchMemories(params: {
        tableName: string;
        roomId: `${string}-${string}-${string}-${string}-${string}`;
        embedding: number[];
        match_threshold: number;
        match_count: number;
        unique: boolean;
    }): Promise<Memory[]> {
        return [
            {
                id: "memory-id" as UUID,
                content: "Test Memory",
                roomId: params.roomId,
                userId: "user-id" as UUID,
                agentId: "agent-id" as UUID,
            },
        ] as unknown as Memory[];
    }

    // Mock method for getting account by ID
/**
 * Get an account by user ID.
 * @param {UUID} userId - The ID of the user.
 * @returns {Promise<Account | null>} The account object for the given user ID, or null if not found.
 */
    async getAccountById(userId: UUID): Promise<Account | null> {
        return {
            id: userId,
            username: "testuser",
            name: "Test Account",
        } as Account;
    }

    // Other methods stay the same...
/**
 * Asynchronously creates a new account.
 * 
 * @param {Account} _account - The account object to create.
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating success of account creation.
 */
    async createAccount(_account: Account): Promise<boolean> {
        return true;
    }

/**
     * Retrieves memories from a specified table based on the provided parameters.
     * @param {Object} params - The parameters for retrieving memories.
     * @param {UUID} params.roomId - The ID of the room for which memories are being retrieved.
     * @param {number} [params.count] - The number of memories to retrieve (optional).
     * @param {boolean} [params.unique] - Whether to retrieve unique memories (optional).
     * @param {string} params.tableName - The name of the table from which memories are retrieved.
     * @returns {Promise<Memory[]>} The memories retrieved based on the specified parameters.
     */
    async getMemories(params: {
        roomId: UUID;
        count?: number;
        unique?: boolean;
        tableName: string;
    }): Promise<Memory[]> {
        return [
            {
                id: "memory-id" as UUID,
                content: "Test Memory",
                roomId: params.roomId,
                userId: "user-id" as UUID,
                agentId: "agent-id" as UUID,
            },
        ] as unknown as Memory[];
    }

/**
 * Asynchronously retrieves actors based on the provided room ID.
 * @param {Object} _params - The parameters object.
 * @param {UUID} _params.roomId - The ID of the room for which to get actors.
 * @returns {Promise<Actor[]>} - A promise that resolves to an array of Actor objects.
 */
    async getActors(_params: { roomId: UUID }): Promise<Actor[]> {
        return [
            {
                id: "actor-id" as UUID,
                name: "Test Actor",
                username: "testactor",
                roomId: "room-id" as UUID, // Ensure roomId is provided
            },
        ] as unknown as Actor[];
    }

/**
 * Updates the status of a goal.
 * @param {object} _params - The parameters for updating the goal status.
 * @param {UUID} _params.goalId - The unique identifier of the goal to update.
 * @param {GoalStatus} _params.status - The new status of the goal.
 * @returns {Promise<void>} A Promise that resolves when the status of the goal is updated successfully.
 */
    async updateGoalStatus(_params: {
        goalId: UUID;
        status: GoalStatus;
    }): Promise<void> {
        return Promise.resolve();
    }

/**
 * Retrieves a goal by its unique identifier.
 *
 * @param {UUID} goalId - The identifier of the goal to retrieve.
 * @returns {Promise<Goal | null>} The goal object if found, otherwise null.
 */
    async getGoalById(goalId: UUID): Promise<Goal | null> {
        return {
            id: goalId,
            status: GoalStatus.IN_PROGRESS,
            roomId: "room-id" as UUID,
            userId: "user-id" as UUID,
            name: "Test Goal",
            objectives: [],
        } as Goal;
    }
}

// Now, let’s fix the test suite.

describe("DatabaseAdapter Tests", () => {
    let adapter: MockDatabaseAdapter;
    const roomId = "room-id" as UUID;

    beforeEach(() => {
        adapter = new MockDatabaseAdapter();
    });

    it("should return memories by room ID", async () => {
        const memories = await adapter.getMemoriesByRoomIds({
            roomIds: [
                "room-id" as `${string}-${string}-${string}-${string}-${string}`,
            ],
            tableName: "test_table",
        });
        expect(memories).toHaveLength(1);
        expect(memories[0].roomId).toBe("room-id");
    });

    it("should return cached embeddings", async () => {
        const embeddings = await adapter.getCachedEmbeddings({
            query_table_name: "test_table",
            query_threshold: 0.5,
            query_input: "test query",
            query_field_name: "field",
            query_field_sub_name: "subfield",
            query_match_count: 5,
        });
        expect(embeddings).toHaveLength(1);
        expect(embeddings[0].embedding).toEqual([0.1, 0.2, 0.3]);
    });

    it("should search memories based on embedding", async () => {
        const memories = await adapter.searchMemories({
            tableName: "test_table",
            roomId: "room-id" as `${string}-${string}-${string}-${string}-${string}`,
            embedding: [0.1, 0.2, 0.3],
            match_threshold: 0.5,
            match_count: 3,
            unique: true,
        });
        expect(memories).toHaveLength(1);
        expect(memories[0].roomId).toBe("room-id");
    });

    it("should get an account by user ID", async () => {
        const account = await adapter.getAccountById("test-user-id" as UUID);
        expect(account).not.toBeNull();
        expect(account.username).toBe("testuser");
    });

    it("should create a new account", async () => {
        const newAccount: Account = {
            id: "new-user-id" as UUID,
            username: "newuser",
            name: "New Account",
        };
        const result = await adapter.createAccount(newAccount);
        expect(result).toBe(true);
    });

    it("should update the goal status", async () => {
        const goalId = "goal-id" as UUID;
        await expect(
            adapter.updateGoalStatus({ goalId, status: GoalStatus.IN_PROGRESS })
        ).resolves.toBeUndefined();
    });

    it("should return actors by room ID", async () => {
        const actors = await adapter.getActors({ roomId });
        expect(actors).toHaveLength(1);
    });

    it("should get a goal by ID", async () => {
        const goalId = "goal-id" as UUID;
        const goal = await adapter.getGoalById(goalId);
        expect(goal).not.toBeNull();
        expect(goal?.status).toBe(GoalStatus.IN_PROGRESS);
    });
});
