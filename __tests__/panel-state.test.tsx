import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PanelStateProvider, usePanelState, usePanelActions } from '@/hooks/use-panel-state';
import { PanelTab, PanelZone, PanelComponent } from '@/types/panel';

// Test component to interact with panel state
function TestPanelComponent() {
  const { state } = usePanelState();
  const {
    addTab,
    removeTab,
    renameTab,
    switchTab,
    addZone,
    removeZone,
    addComponent,
    removeComponent,
    updateComponent,
    undo,
    redo
  } = usePanelActions();
  
  // Helper function to create a test tab
  const createTestTab = () => {
    const tab: PanelTab = {
      id: 'test-tab',
      title: 'Test Tab',
      zones: []
    };
    addTab(tab);
  };
  
  // Helper function to create a test zone
  const createTestZone = () => {
    if (state.tabs.length === 0) {
      createTestTab();
    }
    
    const zone: PanelZone = {
      id: 'test-zone',
      components: []
    };
    addZone('test-tab', zone);
  };
  
  // Helper function to create a test component
  const createTestComponent = () => {
    if (state.tabs.length === 0 || state.tabs[0].zones.length === 0) {
      createTestZone();
    }
    
    const component: PanelComponent = {
      id: 'test-component',
      type: 'test',
      props: { text: 'Test Component' }
    };
    addComponent('test-tab', 'test-zone', component);
  };
  
  return (
    <div>
      <div data-testid="panel-state">
        {JSON.stringify(state)}
      </div>
      
      <button onClick={createTestTab} data-testid="add-tab">
        Add Tab
      </button>
      
      <button onClick={() => removeTab('test-tab')} data-testid="remove-tab">
        Remove Tab
      </button>
      
      <button onClick={() => renameTab('test-tab', 'Renamed Tab')} data-testid="rename-tab">
        Rename Tab
      </button>
      
      <button onClick={() => switchTab('test-tab')} data-testid="switch-tab">
        Switch Tab
      </button>
      
      <button onClick={createTestZone} data-testid="add-zone">
        Add Zone
      </button>
      
      <button onClick={() => removeZone('test-tab', 'test-zone')} data-testid="remove-zone">
        Remove Zone
      </button>
      
      <button onClick={createTestComponent} data-testid="add-component">
        Add Component
      </button>
      
      <button onClick={() => removeComponent('test-tab', 'test-zone', 'test-component')} data-testid="remove-component">
        Remove Component
      </button>
      
      <button onClick={() => updateComponent('test-tab', 'test-zone', 'test-component', undefined, { text: 'Updated Component' })} data-testid="update-component">
        Update Component
      </button>
      
      <button onClick={undo} data-testid="undo">
        Undo
      </button>
      
      <button onClick={redo} data-testid="redo">
        Redo
      </button>
    </div>
  );
}

describe('Panel State Management', () => {
  test('should add and remove tabs', () => {
    render(
      <PanelStateProvider>
        <TestPanelComponent />
      </PanelStateProvider>
    );
    
    // Initial state should have no tabs
    expect(JSON.parse(screen.getByTestId('panel-state').textContent || '{}')).toHaveProperty('tabs', []);
    
    // Add a tab
    fireEvent.click(screen.getByTestId('add-tab'));
    const stateWithTab = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithTab.tabs).toHaveLength(1);
    expect(stateWithTab.tabs[0].id).toBe('test-tab');
    expect(stateWithTab.tabs[0].title).toBe('Test Tab');
    
    // Remove the tab
    fireEvent.click(screen.getByTestId('remove-tab'));
    expect(JSON.parse(screen.getByTestId('panel-state').textContent || '{}')).toHaveProperty('tabs', []);
  });
  
  test('should rename tabs', () => {
    render(
      <PanelStateProvider>
        <TestPanelComponent />
      </PanelStateProvider>
    );
    
    // Add a tab
    fireEvent.click(screen.getByTestId('add-tab'));
    
    // Rename the tab
    fireEvent.click(screen.getByTestId('rename-tab'));
    const stateWithRenamedTab = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithRenamedTab.tabs[0].title).toBe('Renamed Tab');
  });
  
  test('should add and remove zones', () => {
    render(
      <PanelStateProvider>
        <TestPanelComponent />
      </PanelStateProvider>
    );
    
    // Add a tab and zone
    fireEvent.click(screen.getByTestId('add-zone'));
    
    // Check that the zone was added
    const stateWithZone = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithZone.tabs[0].zones).toHaveLength(1);
    expect(stateWithZone.tabs[0].zones[0].id).toBe('test-zone');
    
    // Remove the zone
    fireEvent.click(screen.getByTestId('remove-zone'));
    const stateWithoutZone = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithoutZone.tabs[0].zones).toHaveLength(0);
  });
  
  test('should add, update, and remove components', () => {
    render(
      <PanelStateProvider>
        <TestPanelComponent />
      </PanelStateProvider>
    );
    
    // Add a tab, zone, and component
    fireEvent.click(screen.getByTestId('add-component'));
    
    // Check that the component was added
    const stateWithComponent = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithComponent.tabs[0].zones[0].components).toHaveLength(1);
    expect(stateWithComponent.tabs[0].zones[0].components[0].id).toBe('test-component');
    expect(stateWithComponent.tabs[0].zones[0].components[0].props.text).toBe('Test Component');
    
    // Update the component
    fireEvent.click(screen.getByTestId('update-component'));
    const stateWithUpdatedComponent = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithUpdatedComponent.tabs[0].zones[0].components[0].props.text).toBe('Updated Component');
    
    // Remove the component
    fireEvent.click(screen.getByTestId('remove-component'));
    const stateWithoutComponent = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithoutComponent.tabs[0].zones[0].components).toHaveLength(0);
  });
  
  test('should support undo and redo', () => {
    render(
      <PanelStateProvider>
        <TestPanelComponent />
      </PanelStateProvider>
    );
    
    // Add a tab
    fireEvent.click(screen.getByTestId('add-tab'));
    const stateWithTab = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    
    // Remove the tab
    fireEvent.click(screen.getByTestId('remove-tab'));
    const stateWithoutTab = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateWithoutTab.tabs).toHaveLength(0);
    
    // Undo the removal
    fireEvent.click(screen.getByTestId('undo'));
    const stateAfterUndo = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateAfterUndo.tabs).toHaveLength(1);
    
    // Redo the removal
    fireEvent.click(screen.getByTestId('redo'));
    const stateAfterRedo = JSON.parse(screen.getByTestId('panel-state').textContent || '{}');
    expect(stateAfterRedo.tabs).toHaveLength(0);
  });
});