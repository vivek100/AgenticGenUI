/**
 * Types for the AI-controlled panel with tabs and zones
 */

/**
 * Represents a component within a zone
 */
export interface PanelComponent {
  id: string;
  type: string;
  props: Record<string, any>;
}

/**
 * Represents a zone (row) within a tab
 */
export interface PanelZone {
  id: string;
  components: PanelComponent[];
}

/**
 * Represents a tab within the panel
 */
export interface PanelTab {
  id: string;
  title: string;
  zones: PanelZone[];
}

/**
 * Represents the entire panel state
 */
export interface PanelState {
  tabs: PanelTab[];
  activeTabId: string | null;
  undoStack: PanelState[];
  redoStack: PanelState[];
}

/**
 * Base interface for all panel actions
 */
export interface PanelAction {
  action: string;
}

/**
 * Tab Actions
 */
export interface AddTabAction extends PanelAction {
  action: 'addTab';
  tab: PanelTab;
}

export interface RemoveTabAction extends PanelAction {
  action: 'removeTab';
  tabId: string;
}

export interface RenameTabAction extends PanelAction {
  action: 'renameTab';
  tabId: string;
  title: string;
}

export interface ReorderTabsAction extends PanelAction {
  action: 'reorderTabs';
  tabIds: string[];
}

export interface SwitchTabAction extends PanelAction {
  action: 'switchTab';
  tabId: string;
}

/**
 * Zone Actions
 */
export interface AddZoneAction extends PanelAction {
  action: 'addZone';
  tabId: string;
  zone: PanelZone;
}

export interface RemoveZoneAction extends PanelAction {
  action: 'removeZone';
  tabId: string;
  zoneId: string;
}

export interface ReorderZonesAction extends PanelAction {
  action: 'reorderZones';
  tabId: string;
  zoneIds: string[];
}

/**
 * Component Actions
 */
export interface AddComponentAction extends PanelAction {
  action: 'addComponent';
  tabId: string;
  zoneId: string;
  component: PanelComponent;
}

export interface RemoveComponentAction extends PanelAction {
  action: 'removeComponent';
  tabId: string;
  zoneId: string;
  componentId: string;
}

export interface UpdateComponentAction extends PanelAction {
  action: 'updateComponent';
  tabId: string;
  zoneId: string;
  componentId: string;
  type?: string;
  props?: Record<string, any>;
}

export interface ReorderComponentsAction extends PanelAction {
  action: 'reorderComponents';
  tabId: string;
  zoneId: string;
  componentIds: string[];
}

/**
 * Bulk/Advanced Actions
 */
export interface SetPanelStateAction extends PanelAction {
  action: 'setPanelState';
  state: Omit<PanelState, 'undoStack' | 'redoStack'>;
}

export interface UndoAction extends PanelAction {
  action: 'undo';
}

export interface RedoAction extends PanelAction {
  action: 'redo';
}

/**
 * Union type of all possible panel actions
 */
export type PanelActionType =
  | AddTabAction
  | RemoveTabAction
  | RenameTabAction
  | ReorderTabsAction
  | SwitchTabAction
  | AddZoneAction
  | RemoveZoneAction
  | ReorderZonesAction
  | AddComponentAction
  | RemoveComponentAction
  | UpdateComponentAction
  | ReorderComponentsAction
  | SetPanelStateAction
  | UndoAction
  | RedoAction;