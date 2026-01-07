# @senlo/editor Refactoring Plan

## Обзор

Этот документ содержит план рефакторинга для пакета `@senlo/editor`. Задачи организованы по приоритету:
- **P0** — Критические проблемы (блокирующие)
- **P1** — Важные улучшения качества
- **P2** — Минорные улучшения
- **P3** — Будущие рассмотрения

---

## P0: Critical Issues

### 1. Удалить неиспользуемый `use-history.ts` хук
- [ ] **Проблема**: Существует полноценный хук `src/hooks/use-history.ts`, который НЕ используется в проекте
- [ ] **Причина**: История полностью реализована в `editor.store.ts` через `historyPast/historyFuture`
- [ ] **Действие**: Удалить `use-history.ts` и связанный тип `src/types/history.ts`
- **Файлы**: 
  - `src/hooks/use-history.ts`
  - `src/types/history.ts`

### 2. Типизация `block: any` в секциях Props Manager
- [ ] **Проблема**: Все секции используют `block: any` вместо строгой типизации
  ```typescript
  // ❌ Текущее состояние
  interface HeadingSectionProps {
    block: any;
  }
  ```
- [ ] **Решение**: Использовать дискриминированные типы из `@senlo/core`
  ```typescript
  // ✅ Правильный подход
  import { HeadingBlock } from "@senlo/core";
  interface HeadingSectionProps {
    block: HeadingBlock;
  }
  ```
- **Файлы**:
  - `src/components/props-manager/components/sections/heading-section.tsx`
  - `src/components/props-manager/components/sections/paragraph-section.tsx`
  - `src/components/props-manager/components/sections/button-section.tsx`
  - `src/components/props-manager/components/sections/image-section.tsx`
  - `src/components/props-manager/components/sections/spacer-section.tsx`
  - `src/components/props-manager/components/sections/list-section.tsx`
  - `src/components/props-manager/components/sections/divider-section.tsx`
  - `src/components/props-manager/components/sections/row-section.tsx`

### 3. Удалить дублирующийся `cn` утилиту
- [ ] **Проблема**: В `src/lib/cn.ts` есть копия функции `cn`, хотя она уже экспортируется из `@senlo/ui`
- [ ] **Действие**: 
  1. Заменить все импорты `import { cn } from "../../lib/cn"` на `import { cn } from "@senlo/ui"`
  2. Удалить `src/lib/cn.ts`
- **Затронутые файлы**: ~5 компонентов

---

## P1: Quality Improvements

### 4. Разбить `editor.store.ts` на модули (Zustand slices)
- [ ] **Проблема**: Файл содержит 1000+ строк кода, что усложняет поддержку
- [ ] **Решение**: Разделить store на логические слайсы:
  ```
  src/state/
  ├── editor.store.ts        # Основной store с combine()
  ├── slices/
  │   ├── design.slice.ts    # setDesign, resetDesign, design state
  │   ├── selection.slice.ts # select, clearSelection, selectNext/Prev
  │   ├── history.slice.ts   # undo, redo, pushToHistory
  │   ├── rows.slice.ts      # addRow, removeRow, duplicateRow, moveRow
  │   ├── blocks.slice.ts    # addBlock, updateBlock, duplicateBlock, moveBlock
  │   └── ui.slice.ts        # isDragActive, activeSidebarTab, previewMode
  ```
- **Сложность**: Высокая (требует рефакторинга всех импортов)

### 5. Мемоизация компонентов списков
- [ ] **Проблема**: Компоненты в циклах не используют `React.memo`, что приводит к лишним ре-рендерам
- [ ] **Решение**: Обернуть в `React.memo`:
  - `RowView`
  - `ColumnView`
  - `BlockView`
  - `ContentItem`
  - `PaletteItem`
- **Пример**:
  ```typescript
  export const BlockView = React.memo(({ block, columnId, rowId }: BlockViewProps) => {
    // ...
  });
  BlockView.displayName = "BlockView";
  ```

### 6. Вынести повторяющуюся логику поиска блока в хелпер
- [ ] **Проблема**: Код поиска блока/колонки дублируется в нескольких методах store
  ```typescript
  // Этот паттерн повторяется ~10 раз
  for (const row of s.design.rows) {
    for (const column of row.columns) {
      const block = column.blocks.find((b) => b.id === blockId);
      if (block) { /* ... */ }
    }
  }
  ```
- [ ] **Решение**: Создать хелперы в `src/state/helpers/`:
  ```typescript
  // findBlock.ts
  export function findBlock(design: EmailDesignDocument, blockId: ContentBlockId) {
    for (const row of design.rows) {
      for (const column of row.columns) {
        const block = column.blocks.find((b) => b.id === blockId);
        if (block) return { block, column, row };
      }
    }
    return null;
  }
  ```

### 7. Заменить `JSON.parse(JSON.stringify())` на `structuredClone`
- [ ] **Проблема**: Неэффективное клонирование в `saveToHistory()`
  ```typescript
  // ❌ Текущее
  s.historyPast = [...s.historyPast, JSON.parse(JSON.stringify(s.design))];
  ```
- [ ] **Решение**: Использовать `structuredClone` или правильный Immer подход
  ```typescript
  // ✅ Улучшенное (с проверкой)
  import { current } from "immer";
  s.historyPast = [...s.historyPast, structuredClone(current(s.design))];
  ```
- **Примечание**: Комментарий в коде упоминает проблемы с Immer Proxy — нужно проверить

### 8. Интегрировать CSS переменные из `@senlo/ui`
- [ ] **Проблема**: `styles.css` использует захардкоженные значения
  ```css
  /* ❌ Текущее */
  border: 1px solid var(--senlo-border-color, #e5e7eb);
  background: #ffffff;
  ```
- [ ] **Решение**: Использовать CSS переменные из `@senlo/ui`:
  ```css
  /* ✅ Улучшенное */
  border: 1px solid var(--sl-color-border);
  background: var(--sl-color-background);
  ```
- **Файлы**: `src/styles.css` и все `*.module.css`

---

## P2: Minor Improvements

### 9. Добавить JSDoc документацию
- [ ] **Проблема**: Нет документации для публичных API
- [ ] **Решение**: Добавить JSDoc к:
  - `EditorLayout` — основной экспортируемый компонент
  - `useEditorStore` — публичный store
  - Все экспортируемые типы
- **Пример**:
  ```typescript
  /**
   * Main editor component for visual email template editing.
   * 
   * @example
   * ```tsx
   * <EditorLayout
   *   initialDesign={template.designJson}
   *   templateId={template.id}
   *   projectId={project.id}
   *   templateName={template.name}
   *   templateSubject={template.subject}
   *   onSave={handleSave}
   * />
   * ```
   */
  export const EditorLayout: FC<EditorLayoutProps> = ({ ... }) => { ... }
  ```

### 10. Экспортировать типы из index.ts
- [ ] **Проблема**: Типы `Selection`, `EditorState` не экспортируются из пакета
- [ ] **Решение**: Обновить `src/index.ts`:
  ```typescript
  export * from "./EditorLayout";
  export * from "./components/email-canvas/email-canvas";
  export { useEditorStore, type EditorState, type Selection } from "./state/editor.store";
  ```

### 11. Удалить неиспользуемый `pushToHistory` из публичного API
- [ ] **Проблема**: Метод `pushToHistory` объявлен в интерфейсе `EditorState`, но используется только внутренний `saveToHistory` хелпер
- [ ] **Решение**: Либо удалить из публичного API, либо унифицировать с `saveToHistory`

### 12. Очистить форматирование файлов
- [ ] **Проблема**: Лишние пустые строки в конце файлов
- [ ] **Файлы**:
  - `src/hooks/use-block-form.ts` (10+ пустых строк в конце)
  - `src/hooks/use-keyboard-shortcuts.ts` (10+ пустых строк в конце)

### 13. Консистентность `"use client"` директив
- [ ] **Проблема**: Не все клиентские компоненты имеют директиву
- [ ] **Действие**: Проверить и добавить `"use client"` где необходимо

---

## P3: Future Considerations

### 14. Unit-тесты для store
- [ ] **Текущее состояние**: Нет тестов
- [ ] **Рекомендация**: Добавить тесты для критических операций:
  - `addRow`, `removeRow`
  - `addBlock`, `updateBlock`, `removeBlock`
  - `undo`, `redo`
  - `handleDragEnd`

### 15. Accessibility (a11y) для Drag & Drop
- [ ] **Проблема**: Отсутствуют ARIA атрибуты для drag-and-drop элементов
- [ ] **Рекомендации**:
  - `aria-grabbed` для draggable элементов
  - `aria-dropeffect` для drop zones
  - Screen reader announcements при drag событиях
- **Ссылка**: [dnd-kit Accessibility](https://docs.dndkit.com/api-documentation/accessibility)

### 16. Lazy Loading для секций Props Manager
- [ ] **Потенциальная оптимизация**: Загружать секции динамически
  ```typescript
  const HeadingSection = lazy(() => import("./sections/heading-section"));
  ```
- **Приоритет**: Низкий (текущий размер bundle приемлем)

### 17. Виртуализация для больших документов
- [ ] **Контекст**: При большом количестве rows/blocks могут быть проблемы с производительностью
- [ ] **Решение**: Использовать `react-window` или `@tanstack/virtual` для виртуализации
- **Триггер**: Когда документы начнут содержать 50+ rows

---

## Прогресс

| Приоритет | Всего | Выполнено | Оставшиеся |
|-----------|-------|-----------|------------|
| P0        | 3     | 0         | 3          |
| P1        | 5     | 0         | 5          |
| P2        | 5     | 0         | 5          |
| P3        | 4     | 0         | 4          |
| **Итого** | **17**| **0**     | **17**     |

---

## Порядок выполнения

**Рекомендуемый порядок:**

1. P0.1 — Удалить `use-history.ts` (быстрая победа)
2. P0.3 — Удалить дублирующийся `cn` (быстрая победа)
3. P0.2 — Типизировать секции Props Manager
4. P2.12 — Очистить форматирование
5. P1.6 — Вынести хелперы поиска
6. P1.5 — Мемоизация компонентов
7. P1.8 — CSS переменные
8. P2.9 — JSDoc документация
9. P2.10 — Экспорт типов
10. P1.4 — Разбить store на слайсы (большой рефакторинг)
11. P1.7 — Оптимизировать клонирование

---

## История изменений

| Дата | Изменение |
|------|-----------|
| 2025-12-27 | Создание документа |









