import path from "path";
import fs from "fs/promises";
import type {
    CacheOptions,
    ICacheManager,
    IDatabaseCacheAdapter,
    UUID,
} from "./types";

/**
 * Interface for defining a cache adapter that can get, set, and delete key-value pairs.
 * @interface
 */
export interface ICacheAdapter {
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}

/**
 * Memory cache adapter class that implements the ICacheAdapter interface.
 */
         
export class MemoryCacheAdapter implements ICacheAdapter {
    data: Map<string, string>;

/**
 * Constructor for creating an instance of the class with optional initial data.
 * @param {Map<string, string>} [initalData] - The initial data to initialize the instance with.
 */
    constructor(initalData?: Map<string, string>) {
        this.data = initalData ?? new Map<string, string>();
    }

/**
 * Retrieves the value stored in the data structure with the specified key.
 * 
 * @param {string} key - The key to lookup in the data structure.
 * @returns {Promise<string | undefined>} The value associated with the specified key, or undefined if the key is not found.
 */
    async get(key: string): Promise<string | undefined> {
        return this.data.get(key);
    }

/**
 * Sets a key-value pair in the data store.
 * 
 * @param {string} key - The key for the data entry.
 * @param {string} value - The value to store.
 * @returns {Promise<void>}
 */
    async set(key: string, value: string): Promise<void> {
        this.data.set(key, value);
    }

/**
 * Asynchronously deletes the value associated with the given key from the data.
 * 
 * @param {string} key - The key of the value to be deleted.
 * @returns {Promise<void>} A promise that resolves once the value is deleted.
 */
    async delete(key: string): Promise<void> {
        this.data.delete(key);
    }
}

/**
 * Class representing a file system cache adapter.
 * Implements the ICacheAdapter interface.
 */

export class FsCacheAdapter implements ICacheAdapter {
/**
 * Constructor for creating an instance with a specified data directory.
 * @param {string} dataDir - The directory where data will be stored.
 */
    constructor(private dataDir: string) {}

/**
 * Asynchronously retrieves the value associated with the given key from the file system.
 * @param {string} key - The key used to fetch the value.
 * @returns {Promise<string | undefined>} The value associated with the key, or undefined if an error occurs.
 */
    async get(key: string): Promise<string | undefined> {
        try {
            return await fs.readFile(path.join(this.dataDir, key), "utf8");
        } catch {
            // console.error(error);
            return undefined;
        }
    }

/**
 * Asynchronously sets a key-value pair in the data directory.
 * 
 * @param {string} key - The key of the data to be set.
 * @param {string} value - The value of the data to be set.
 * @returns {Promise<void>} A Promise that resolves once the key-value pair is successfully set.
 */
    async set(key: string, value: string): Promise<void> {
        try {
            const filePath = path.join(this.dataDir, key);
            // Ensure the directory exists
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, value, "utf8");
        } catch (error) {
            console.error(error);
        }
    }

/**
 * Deletes a file from the data directory using the given key.
 * @param {string} key - The key to identify the file to be deleted.
 * @returns {Promise<void>} A Promise that resolves once the file is deleted.
 */
    async delete(key: string): Promise<void> {
        try {
            const filePath = path.join(this.dataDir, key);
            await fs.unlink(filePath);
        } catch {
            // console.error(error);
        }
    }
}

/**
 * A class representing a cache adapter that interacts with a database cache.
 * @implements {ICacheAdapter}
 */
       
export class DbCacheAdapter implements ICacheAdapter {
/**
 * Constructor for creating a new instance of a class.
 * @param {IDatabaseCacheAdapter} db - The database cache adapter used for data storage.
 * @param {UUID} agentId - The unique identifier for the agent.
 */
    constructor(
        private db: IDatabaseCacheAdapter,
        private agentId: UUID
    ) {}

/**
 * Retrieves a value from cache based on the provided key.
 * @param {string} key - The key to search for in the cache.
 * @returns {Promise<string | undefined>} The value associated with the key, or undefined if not found.
 */
    async get(key: string): Promise<string | undefined> {
        return this.db.getCache({ agentId: this.agentId, key });
    }

/**
 * Asynchronously sets a key-value pair in the cache for the current agent.
 * 
 * @param {string} key - The key to set in the cache.
 * @param {string} value - The value to associate with the key in the cache.
 * @returns {Promise<void>} A Promise that resolves when the key-value pair has been successfully set in the cache.
 */
    async set(key: string, value: string): Promise<void> {
        await this.db.setCache({ agentId: this.agentId, key, value });
    }

/**
 * Deletes a cache entry with the specified key.
 * @param {string} key - The key of the cache entry to be deleted.
 * @returns {Promise<void>} A Promise that resolves once the cache entry is deleted.
 */
    async delete(key: string): Promise<void> {
        await this.db.deleteCache({ agentId: this.agentId, key });
    }
}

/**
 * A class representing a Cache Manager.
 */
export class CacheManager<CacheAdapter extends ICacheAdapter = ICacheAdapter>
    implements ICacheManager
{
    adapter: CacheAdapter;

/**
 * Constructor for creating an instance of the class, with a specified cache adapter.
 * @param {CacheAdapter} adapter - The cache adapter to be used by the instance.
 */
    constructor(adapter: CacheAdapter) {
        this.adapter = adapter;
    }

/**
 * Asynchronously retrieves a value from the cache based on the provided key.
 * 
 * @template T - The type of value being retrieved from the cache.
 * @param {string} key - The key to look up in the cache.
 * @returns {Promise<T | undefined>} A promise that resolves to the value associated with the key, or undefined if the key is not found or the value has expired.
 */
    async get<T = unknown>(key: string): Promise<T | undefined> {
        const data = await this.adapter.get(key);

        if (data) {
            const { value, expires } = JSON.parse(data) as {
                value: T;
                expires: number;
            };

            if (!expires || expires > Date.now()) {
                return value;
            }

            this.adapter.delete(key).catch(() => {});
        }

        return undefined;
    }

/**
 * Set a key-value pair in the cache with optional expiration time.
 * @param {string} key - The key to set the value for.
 * @param {T} value - The value to store in the cache.
 * @param {CacheOptions} [opts] - Optional additional options for caching.
 * @returns {Promise<void>} - A Promise that resolves when the value is set in the cache.
 */
    async set<T>(key: string, value: T, opts?: CacheOptions): Promise<void> {
        return this.adapter.set(
            key,
            JSON.stringify({ value, expires: opts?.expires ?? 0 })
        );
    }

/**
 * Asynchronously deletes a key from the storage adapter.
 * 
 * @param {string} key - The key to be deleted.
 * @returns {Promise<void>} A Promise that resolves once the key is successfully deleted.
 */
    async delete(key: string): Promise<void> {
        return this.adapter.delete(key);
    }
}
