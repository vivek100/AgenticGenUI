# Technical Requirements: AI-Controlled Panel with Tabs and Zones

This document outlines the technical requirements and integration details for implementing an AI-controllable side panel with tabbed and zoned UI in the AgenticGenUI codebase.

---

## 1. **Existing Architecture Overview**

- **Chat Interface:** Implemented in `components/demo/chat-tab.tsx` and `components/custom-copilot-ui.tsx`.
  - Chat messages are managed as an array of objects with `type` (user, assistant, event, component).
  - Components in chat are rendered using `<AgentRenderer message={...} />`.

- **Component Rendering:** 
  - `components/agent-renderer.tsx` dynamically renders UI components based on instructions received from the AI, using a registry in `agentic-ui/registry.ts`.
  - Components are referenced by `componentType` and `props`.

- **Sidebar/Panel:**
  - Core sidebar logic is in `components/ui/sidebar.tsx` (collapsible, responsive, context-driven).
  - Some demo logic in `components/demo/sidebar.tsx`.
  - No existing support for AI-controlled multi-tab, multi-zone dynamic layouts.

- **Tabs:** 
  - UI primitives for tabs exist in `components/ui/tabs.tsx` and as higher-level layout in `agentic-ui/components/tab-layout.tsx`.

---

## 2. **Required Data Model Extensions**

**Panel State:**
```typescript
type PanelComponent = {
  id: string;
  type: string;
  props: Record<string, any>;
};

type PanelZone = {
  id: string;
  components: PanelComponent[];
};

type PanelTab = {
  id: string;
  title: string;
  zones: PanelZone[];
};

type PanelState = {
  tabs: PanelTab[];
  activeTabId: string;
  undoStack?: PanelState[];
  redoStack?: PanelState[];
};
```

---

## 3. **Required Actions and Protocols**

Implement action message types and handler logic to support:

- **Tab Actions:** addTab, removeTab, renameTab, reorderTabs, switchTab
- **Zone Actions:** addZone, removeZone, reorderZones within tab
- **Component Actions:** addComponent, removeComponent, updateComponent, reorderComponents within zone
- **Bulk/Advanced:** setPanelState (atomic replace), undo, redo

**Example Action:**
```json
{
  "action": "addComponent",
  "tabId": "tab1",
  "zoneId": "zoneA",
  "component": { "id": "c1", "type": "chart", "props": { "data": [1,2,3] } }
}
```

---

## 4. **Integration Points and UI Structure**

- **Panel Rendering:**
  - Implement a new Panel UI component (e.g., `PanelWithTabsZones`) in the side panel area.
  - Use the `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` primitives for tab structure.
  - Each `TabsContent` renders its list of `PanelZone` (rows), each rendering its list of `PanelComponent` via `AgentRenderer`.

- **State Management:**
  - Use React context or Redux to store and update `PanelState`.
  - Support undo/redo by maintaining history stacks in state.

- **AI Protocol Integration:**
  - Extend the AI message parsing (see `services/ai-service.ts`, e.g. `parseAIResponse`) to recognize and dispatch panel actions.
  - Support both chat-injected and direct AI panel control messages.

---

## 5. **Component Registration**

- Extend `agentic-ui/registry.ts` to ensure all possible AI target components are registered and can be rendered dynamically via their `type`.

---

## 6. **Undo/Redo Support**

- Implement undo/redo as mutations of the `PanelState`, triggered by explicit `undo`/`redo` action messages.

---

## 7. **Error Handling**

- If a referenced component type is not registered, `AgentRenderer` should render an error and log available types.
- Invalid action messages should not break the panel; invalid actions should be logged and ignored.

---

## 8. **Testing and Acceptance**

- All action types must be covered by unit tests.
- Panel must reflect all state changes in real time.
- Undo/redo must reliably restore previous states.
- AI must be able to update both chat and panel simultaneously via protocol messages.

---

## 9. **Non-Functional**

- Must remain compatible with existing chat and sidebar logic.
- Panel and chat must render independently.
- All new types must be strongly typed (TypeScript).
- Code must be documented inline and in a new `docs/` technical guide.

---

*This document serves as the technical blueprint for implementing the AI-controllable panel with tabs and zones in AgenticGenUI.*