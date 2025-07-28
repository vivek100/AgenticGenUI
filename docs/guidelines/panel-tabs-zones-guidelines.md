# Guidelines: Panel with Tabs & Zones Feature

This document provides best practices and guidelines to follow during the development of the AI-controllable panel with tabs and zones in AgenticGenUI.

---

## 1. Code Quality & Maintainability

- **Type Safety:**  
  Use TypeScript for all new files and ensure strong typing across the data model (tabs, zones, components).

- **Component Decomposition:**  
  Break UI into small, reusable components:  
  - Panel container  
  - Tabs bar  
  - Tab content  
  - Zone row  
  - Component renderer

- **State Management:**  
  - Use React Context or a state management solution (Zustand, Redux, etc.) for global panel state.
  - Keep state updates as pure functions (reducers) for easy testing and undo/redo functionality.

- **Naming:**  
  - Use descriptive and consistent naming (e.g., `PanelTab`, `PanelZone`, `PanelComponent`).
  - Avoid ambiguous abbreviations.

- **Documentation:**  
  - Comment code where logic is non-obvious.
  - Document public APIs and props for all components.

---

## 2. Frontend Design & Responsiveness

- **Layout:**
  - Use Flexbox or CSS Grid for layout of tabs, zones, and components.
  - Panel should be resizable/collapsible, especially on desktop.
  - On mobile, panel should slide in/out or appear as a modal or drawer.

- **Responsiveness:**
  - Use media queries or utility CSS (e.g., Tailwind, if available) to adjust panel width, tab bar, and content for various screen sizes.
  - Ensure the main chat area and panel can stack vertically on smaller devices.
  - Tabs should become a dropdown or scrollable bar on mobile if there are too many to fit.

- **Accessibility:**
  - Use semantic HTML (e.g., `<nav>` for tab bar, `<button>` for tab selectors).
  - Ensure keyboard navigation for tabs and panel controls (Tab, Arrow keys, Enter, Escape).
  - Use ARIA attributes for tablists, tabpanels, and roles.

- **Visual Feedback:**
  - Highlight the active tab.
  - Indicate loading states or errors in panel components.
  - Animate transitions where possible (panel open/close, tab switch).

---

## 3. Extensibility

- **Component Registry:**  
  Make it easy to register new component types for AI to render.  
  Document the process for adding new components.

- **Action Protocol:**  
  Design action messages for future extensibility (e.g., new actions, metadata, localization).

- **Theming:**  
  Use CSS variables or a theming system to allow easy customization of panel and tab appearance.

---

## 4. Error Handling & Robustness

- **Graceful Degradation:**  
  If a component type is unknown, render a fallback with an error message but keep the UI functional.

- **Invalid Actions:**  
  Log and ignore invalid/unsupported action messages from the AI, never crash the UI.

- **Undo/Redo:**  
  Test undo/redo for all supported actions; ensure state integrity.

---

## 5. Testing

- **Unit Tests:**  
  Write tests for reducers, utility functions, and critical UI logic.

- **Component Tests:**  
  Use a testing library (e.g., React Testing Library) for rendering and interaction tests.

- **Manual QA:**  
  Check behavior on all target devices and browsers.
  Verify accessibility (screen reader, keyboard-only navigation).

---

## 6. Performance

- **Efficient Rendering:**  
  Only re-render changed tabs/zones/components where possible.
  Consider virtualization for long lists of components or zones.

- **Async Loads:**  
  Lazy-load heavy components if appropriate.

---

## 7. Collaboration & PRs

- **Branch Naming:**  
  Use descriptive branch names (e.g., `feature/panel-tabs-zones`).

- **PR Size:**  
  Keep pull requests focused and small; split into logical steps if needed.

- **Reviews:**  
  Request review from at least one other team member.
  Address review comments promptly.

---

## 8. Documentation & Demos

- **Update Docs:**  
  Document new APIs, components, and usage patterns.

- **Demo Scenarios:**  
  Add/extend demo scenarios to showcase new panel features.

---

## 9. Security

- **Input Validation:**  
  Sanitize and validate all inputs, especially those coming from the AI protocol.

---

## 10. Future Considerations

- Plan for collaborative/multi-user support if needed later.
- Consider internationalization/localization hooks in UI text.

---

*These guidelines should be reviewed by all contributors before starting and during development of the Panel Tabs & Zones feature.*