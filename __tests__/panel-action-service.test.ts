import { parsePanelActions } from '@/services/panel-action-service';

describe('Panel Action Service', () => {
  test('should parse direct panel actions', () => {
    const action = {
      action: 'addTab',
      tab: {
        id: 'tab1',
        title: 'Test Tab',
        zones: []
      }
    };
    
    const result = parsePanelActions(action);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual(action);
  });
  
  test('should parse panel actions in tool/payload structure', () => {
    const message = {
      tool: 'panelAction',
      payload: {
        action: 'switchTab',
        tabId: 'tab1'
      }
    };
    
    const result = parsePanelActions(message);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual(message.payload);
  });
  
  test('should parse multiple panel actions in payload array', () => {
    const message = {
      tool: 'panelAction',
      payload: [
        {
          action: 'addTab',
          tab: {
            id: 'tab1',
            title: 'Test Tab',
            zones: []
          }
        },
        {
          action: 'addZone',
          tabId: 'tab1',
          zone: {
            id: 'zone1',
            components: []
          }
        }
      ]
    };
    
    const result = parsePanelActions(message);
    expect(result).toHaveLength(2);
    expect(result?.[0]).toEqual(message.payload[0]);
    expect(result?.[1]).toEqual(message.payload[1]);
  });
  
  test('should parse panel actions in content structure', () => {
    const message = {
      content: {
        tool: 'panelAction',
        payload: {
          action: 'removeComponent',
          tabId: 'tab1',
          zoneId: 'zone1',
          componentId: 'comp1'
        }
      }
    };
    
    const result = parsePanelActions(message);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual(message.content.payload);
  });
  
  test('should parse panel actions from JSON string', () => {
    const jsonString = JSON.stringify({
      action: 'updateComponent',
      tabId: 'tab1',
      zoneId: 'zone1',
      componentId: 'comp1',
      props: { title: 'Updated Title' }
    });
    
    const result = parsePanelActions(jsonString);
    expect(result).toHaveLength(1);
    expect(result?.[0].action).toBe('updateComponent');
  });
  
  test('should return null for non-panel actions', () => {
    const message = {
      type: 'text',
      content: 'This is a regular message'
    };
    
    const result = parsePanelActions(message);
    expect(result).toBeNull();
  });
  
  test('should validate required fields for different action types', () => {
    // Valid action
    const validAction = {
      action: 'addComponent',
      tabId: 'tab1',
      zoneId: 'zone1',
      component: {
        id: 'comp1',
        type: 'chart',
        props: { data: [1, 2, 3] }
      }
    };
    
    // Missing required field
    const invalidAction = {
      action: 'addComponent',
      tabId: 'tab1',
      // Missing zoneId
      component: {
        id: 'comp1',
        type: 'chart',
        props: { data: [1, 2, 3] }
      }
    };
    
    const validResult = parsePanelActions(validAction);
    expect(validResult).toHaveLength(1);
    
    const invalidResult = parsePanelActions(invalidAction);
    expect(invalidResult).toBeNull();
  });
});