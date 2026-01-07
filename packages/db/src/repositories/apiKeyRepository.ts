import { eq } from "drizzle-orm";
import { db } from "../client";
import { apiKeys } from "../schema";
import { ApiKey } from "@senlo/core";
import { BaseRepository } from "./baseRepository";

/**
 * Repository for managing API keys used for triggered email sends.
 * Extends BaseRepository for common operations (findById, delete).
 */
export class ApiKeyRepository extends BaseRepository<
  typeof apiKeys,
  typeof apiKeys.$inferSelect,
  ApiKey
> {
  protected table = apiKeys;

  /**
   * Map a database row to an ApiKey entity.
   * @param row - The raw database row
   * @returns The mapped ApiKey
   */
  protected mapToEntity(row: typeof apiKeys.$inferSelect): ApiKey {
    return {
      id: row.id,
      projectId: row.projectId,
      name: row.name,
      key: row.key,
      lastUsedAt: row.lastUsedAt,
      createdAt: row.createdAt,
    };
  }

  /**
   * Find an API key by its value.
   * @param key - The API key string
   * @returns The API key record or null if not found
   */
  async findByKey(key: string): Promise<ApiKey | null> {
    const [row] = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.key, key));

    return row ? this.mapToEntity(row) : null;
  }

  /**
   * Get all API keys for a project.
   * @param projectId - The project ID
   * @returns Array of API keys
   */
  async findByProject(projectId: number): Promise<ApiKey[]> {
    const rows = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.projectId, projectId));

    return rows.map((r) => this.mapToEntity(r));
  }

  /**
   * Create a new API key.
   * @param data - API key data including projectId, name, and key value
   * @returns The created API key
   */
  async create(
    data: Omit<ApiKey, "id" | "createdAt" | "lastUsedAt">
  ): Promise<ApiKey> {
    const [row] = await db
      .insert(apiKeys)
      .values({
        projectId: data.projectId,
        name: data.name,
        key: data.key,
        createdAt: new Date(),
      })
      .returning();

    return this.mapToEntity(row);
  }

  /**
   * Update the lastUsedAt timestamp for an API key.
   * @param id - The API key ID
   */
  async updateLastUsed(id: number): Promise<void> {
    await db
      .update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.id, id));
  }
}
