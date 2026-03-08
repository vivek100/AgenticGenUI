# AI-Controlled Panel with Tabs and Zones

This document provides an overview of the AI-controlled panel with tabs and zones feature in AgenticGenUI.

## Overview

The panel with tabs and zones is a flexible UI component that allows AI agents to create and manage dynamic, interactive content in a side panel adjacent to the main chat interface. The panel supports multiple tabs, each containing vertically stacked "zones" (rows) that can hold various interactive components.

## Key Features

- **Multi-tab Interface**: Support for multiple tabs with dynamic creation, removal, and reordering.
- **Zoned Layout**: Each tab contains vertically stacked zones (rows) for organizing content.
- **Dynamic Components**: Zones can contain any component from the AgenticGenUI component registry.
- **AI Control**: The panel's layout and content can be fully controlled by AI actions.
- **Undo/Redo**: Support for undoing and redoing panel changes.

## Data Model

The panel state is structured as follows:

```typescript
interface PanelState {
  tabs: PanelTab[];
  activeTabId: string | null;
  undoStack: PanelState[];
  redoStack: PanelState[];
}

interface PanelTab {
  id: string;
  title: string;
  zones: PanelZone[];
}

interface PanelZone {
  id: string;
  components: PanelComponent[];
}

interface PanelComponent {
  id: string;
  type: string;
  props: Record<string, any>;
}
```

## Action Protocol

The panel can be controlled through a set of actions:

### Tab Actions

- `addTab`: Add a new tab
- `removeTab`: Remove an existing tab
- `renameTab`: Change the title of a tab
- `reorderTabs`: Change the order of tabs
- `switchTab`: Set the active (focused) tab

### Zone Actions

- `addZone`: Add a new zone to a tab
- `removeZone`: Remove a zone from a tab
- `reorderZones`: Change the order of zones within a tab

### Component Actions

- `addComponent`: Add a new component to a zone
- `removeComponent`: Remove a component from a zone
- `updateComponent`: Change the type or properties of a component
- `reorderComponents`: Change the order of components within a zone

### Bulk/Advanced Actions

- `setPanelState`: Replace the entire panel state
- `undo`: Undo the last action
- `redo`: Redo the last undone action

## Example Actions

Here are some example actions:

```json
// Add a new tab
{
  "action": "addTab",
  "tab": {
    "id": "dashboard",
    "title": "Dashboard",
    "zones": []
  }
}

// Add a zone to a tab
{
  "action": "addZone",
  "tabId": "dashboard",
  "zone": {
    "id": "metrics",
    "components": []
  }
}

// Add a component to a zone
{
  "action": "addComponent",
  "tabId": "dashboard",
  "zoneId": "metrics",
  "component": {
    "id": "revenue-metric",
    "type": "metricCard",
    "props": {
      "title": "Revenue",
      "value": "$12,345",
      "description": "Total revenue this month",
      "trend": {
        "value": 12.5,
        "isPositive": true
      },
      "icon": "dollar-sign"
    }
  }
}

// Switch to a different tab
{
  "action": "switchTab",
  "tabId": "dashboard"
}
```

## Integration with AI

AI agents can control the panel by sending action messages in their responses. The system will parse these actions and update the panel accordingly.

### AI Response Format

AI responses can include panel actions in several formats:

1. Direct action object:
```json
{
  "action": "addTab",
  "tab": { "id": "tab1", "title": "New Tab", "zones": [] }
}
```

2. Tool/payload structure:
```json
{
  "tool": "panelAction",
  "payload": {
    "action": "addTab",
    "tab": { "id": "tab1", "title": "New Tab", "zones": [] }
  }
}
```

3. Multiple actions in payload array:
```json
{
  "tool": "panelAction",
  "payload": [
    { "action": "addTab", "tab": { "id": "tab1", "title": "New Tab", "zones": [] } },
    { "action": "addZone", "tabId": "tab1", "zone": { "id": "zone1", "components": [] } }
  ]
}
```

## Using the Panel in Your Application

To add the panel to your application:

1. Wrap your application with the `PanelStateProvider`:
```tsx
import { PanelStateProvider } from '@/hooks/use-panel-state';

function MyApp() {
  return (
    <PanelStateProvider>
      <MyComponent />
    </PanelStateProvider>
  );
}
```

2. Use the `PanelWithTabsZones` component:
```tsx
import { PanelWithTabsZones } from '@/components/panel/panel-with-tabs-zones';

function MyComponent() {
  return (
    <div className="flex">
      <div className="flex-1">
        {/* Your main content */}
      </div>
      <div className="w-80">
        <PanelWithTabsZones />
      </div>
    </div>
  );
}
```

3. Use the `usePanelState` and `usePanelActions` hooks to interact with the panel:
```tsx
import { usePanelState, usePanelActions } from '@/hooks/use-panel-state';

function MyComponent() {
  const { state } = usePanelState();
  const { addTab, switchTab } = usePanelActions();
  
  // Use the state and actions...
}
```

## Demo

A demo of the panel is available at `/panel-demo`. This demo showcases the panel's capabilities and allows you to interact with it through simulated AI responses.

## Extending the Panel

### Adding New Component Types

To add new component types that can be used in the panel:

1. Create your component in the `agentic-ui/components` directory.
2. Register it in the `agentic-ui/registry.ts` file.
3. The component will automatically be available for use in the panel.

### Customizing the Panel

The panel's appearance and behavior can be customized by:

- Modifying the `PanelWithTabsZones` component
- Extending the panel state with additional fields
- Adding new action types to the panel reducer

## Best Practices

- Generate unique IDs for tabs, zones, and components to avoid conflicts.
- Keep component props simple and serializable.
- Use the undo/redo functionality to allow users to recover from unwanted changes.
- Consider mobile responsiveness when designing panel layouts.