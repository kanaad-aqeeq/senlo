# Refactoring Plan for @senlo/db

This document outlines the planned improvements for the database package.

---

### 4. Inefficient `getContactCount()`

Current implementation loads all rows into memory:

```typescript
// Current (inefficient)
async getContactCount(listId: number): Promise<number> {
  const rows = await db.select().from(recipientListContacts)...;
  return rows.length;  // Fetches ALL rows!
}

// Should use SQL COUNT
const [{ count }] = await db
  .select({ count: sql<number>`count(*)` })
  .from(recipientListContacts)
  .where(eq(recipientListContacts.listId, listId));
return count;
```

**Action:** Use SQL `COUNT(*)` aggregate.

---

### 5. Deprecated `findActive()` Method

`EmailProviderRepository.findActive()` is no longer needed since providers are now selected at the project level via `project.providerId`.

**Action:** Remove or mark as `@deprecated`.

---

## 🟢 Minor Improvements (P2)

### 6. Export Schema

`schema.ts` is not exported from the package. This may be needed for:

- Migrations
- Type inference in other packages

**Action:** Add `export * from "./schema"` to `index.ts`.

---

### 7. Add JSDoc Comments

As an open-source project, methods should be documented:

```typescript
/**
 * Find a project by its ID
 * @param id - The project ID
 * @returns The project or null if not found
 */
async findById(id: number): Promise<Project | null>
```

**Action:** Add JSDoc to all public repository methods.

---

## 🔵 Future Considerations (P3)

### 8. Base Repository Pattern ✅

Created abstract `BaseRepository` and `BaseRepositoryWithTimestamps` classes in `baseRepository.ts`:

```typescript
// BaseRepository provides:
// - findById(id: number): Promise<TEntity | null>
// - delete(id: number): Promise<void>

// BaseRepositoryWithTimestamps extends BaseRepository with:
// - findAll(): Promise<TEntity[]> (ordered by createdAt desc)

// Usage example:
export class ProjectRepository extends BaseRepositoryWithTimestamps<
  typeof projects,
  typeof projects.$inferSelect,
  Project
> {
  protected table = projects;

  protected mapToEntity(row: typeof projects.$inferSelect): Project {
    return { id: row.id, name: row.name, ... };
  }
}
```

All repositories now extend the appropriate base class:
- `ProjectRepository` → `BaseRepositoryWithTimestamps`
- `EmailProviderRepository` → `BaseRepositoryWithTimestamps`
- `ContactRepository` → `BaseRepository`
- `CampaignRepository` → `BaseRepository`
- `RecipientListRepository` → `BaseRepository`
- `EmailTemplateRepository` → `BaseRepository`
- `ApiKeyRepository` → `BaseRepository`
- `TriggeredSendLogRepository` → `BaseRepository`

**Status:** ✅ Completed

---

### 9. Input Validation with Zod

Repositories accept data without validation. Consider using Zod schemas for runtime validation.

**Status:** Low priority, application layer already validates.

---

## 📊 Priority Matrix

| Priority | Task                                         | Complexity | Time Estimate |
| -------- | -------------------------------------------- | ---------- | ------------- |
| 🔴 P0    | Fix `mapRow` typing (remove `any`)           | Easy       | 15 min        |
| 🔴 P0    | Remove `as any` in create/update             | Easy       | 10 min        |
| 🟡 P1    | Extract `mapList` in RecipientListRepository | Easy       | 5 min         |
| 🟡 P1    | Optimize `getContactCount` with COUNT(\*)    | Easy       | 5 min         |
| 🟡 P1    | Remove/deprecate `findActive()`              | Easy       | 2 min         |
| 🟢 P2    | Export schema from index.ts                  | Trivial    | 1 min         |
| 🟢 P2    | Add JSDoc comments                           | Medium     | 30 min        |
| ✅ P3    | BaseRepository pattern                       | Medium     | 1 hour        |
| 🔵 P3    | Zod validation                               | Medium     | 1 hour        |

---

## Progress Tracker

- [x] P0: Fix mapRow typing
- [x] P0: Remove `as any` assertions
- [x] P1: Extract mapList method
- [x] P1: Optimize getContactCount
- [x] P1: Deprecate findActive
- [x] P2: Export schema
- [x] P2: Add JSDoc comments
- [x] P3: BaseRepository pattern
- [ ] P3: Zod validation (optional)
