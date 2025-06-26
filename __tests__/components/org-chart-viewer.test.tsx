import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrgChartViewer, type OrgNode } from '@/agentic-ui/components/org-chart-viewer'

// Mock data for testing
const mockNodes: OrgNode[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'CEO',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'CTO',
    parentId: '1',
  },
  {
    id: '3',
    name: 'Robert Brown',
    role: 'CFO',
    parentId: '1',
  },
  {
    id: '4',
    name: 'David Wilson',
    role: 'Engineering Director',
    parentId: '2',
  },
]

describe('OrgChartViewer', () => {
  const defaultProps = {
    title: 'Test Organization',
    description: 'Test organizational structure',
    nodes: mockNodes,
  }

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('renders the component with title and description', () => {
    render(<OrgChartViewer {...defaultProps} />)
    
    expect(screen.getByText('Test Organization')).toBeInTheDocument()
    expect(screen.getByText('Test organizational structure')).toBeInTheDocument()
  })

  it('renders zoom controls when nodes are provided', () => {
    render(<OrgChartViewer {...defaultProps} />)
    
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
    expect(screen.getByLabelText('Reset view')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('does not render zoom controls when no nodes are provided', () => {
    render(<OrgChartViewer title="Empty Chart" nodes={[]} />)
    
    expect(screen.queryByLabelText('Zoom in')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Zoom out')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Reset view')).not.toBeInTheDocument()
  })

  it('displays "No organization data available" when nodes array is empty', () => {
    render(<OrgChartViewer title="Empty Chart" nodes={[]} />)
    
    expect(screen.getByText('No organization data available')).toBeInTheDocument()
  })

  it('renders canvas when nodes are provided', () => {
    render(<OrgChartViewer {...defaultProps} />)
    
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('displays usage instructions', () => {
    render(<OrgChartViewer {...defaultProps} />)
    
    expect(screen.getByText('Use mouse wheel to zoom, drag to pan')).toBeInTheDocument()
  })

  describe('Zoom functionality', () => {
    it('increases zoom when zoom in button is clicked', async () => {
      const user = userEvent.setup()
      render(<OrgChartViewer {...defaultProps} />)
      
      const zoomInButton = screen.getByLabelText('Zoom in')
      const zoomDisplay = screen.getByText('100%')
      
      await user.click(zoomInButton)
      
      await waitFor(() => {
        expect(screen.getByText('110%')).toBeInTheDocument()
      })
    })

    it('decreases zoom when zoom out button is clicked', async () => {
      const user = userEvent.setup()
      render(<OrgChartViewer {...defaultProps} />)
      
      // First zoom in to have room to zoom out
      const zoomInButton = screen.getByLabelText('Zoom in')
      await user.click(zoomInButton)
      
      await waitFor(() => {
        expect(screen.getByText('110%')).toBeInTheDocument()
      })
      
      const zoomOutButton = screen.getByLabelText('Zoom out')
      await user.click(zoomOutButton)
      
      await waitFor(() => {
        expect(screen.getByText('100%')).toBeInTheDocument()
      })
    })

    it('resets zoom and pan when reset button is clicked', async () => {
      const user = userEvent.setup()
      render(<OrgChartViewer {...defaultProps} />)
      
      // Zoom in first
      const zoomInButton = screen.getByLabelText('Zoom in')
      await user.click(zoomInButton)
      await user.click(zoomInButton)
      
      await waitFor(() => {
        expect(screen.getByText('120%')).toBeInTheDocument()
      })
      
      // Reset
      const resetButton = screen.getByLabelText('Reset view')
      await user.click(resetButton)
      
      await waitFor(() => {
        expect(screen.getByText('100%')).toBeInTheDocument()
      })
    })

    it('disables zoom out button at minimum zoom', async () => {
      const user = userEvent.setup()
      render(<OrgChartViewer {...defaultProps} />)
      
      // Zoom out to minimum
      const zoomOutButton = screen.getByLabelText('Zoom out')
      
      // Click multiple times to reach minimum
      for (let i = 0; i < 10; i++) {
        await user.click(zoomOutButton)
      }
      
      await waitFor(() => {
        expect(zoomOutButton).toBeDisabled()
      })
    })

    it('disables zoom in button at maximum zoom', async () => {
      const user = userEvent.setup()
      render(<OrgChartViewer {...defaultProps} />)
      
      // Zoom in to maximum
      const zoomInButton = screen.getByLabelText('Zoom in')
      
      // Click multiple times to reach maximum
      for (let i = 0; i < 30; i++) {
        await user.click(zoomInButton)
      }
      
      await waitFor(() => {
        expect(zoomInButton).toBeDisabled()
      })
    })
  })

  describe('Mouse interactions', () => {
    it('handles mouse wheel events for zooming', () => {
      render(<OrgChartViewer {...defaultProps} />)
      
      const canvas = document.querySelector('canvas')!
      
      // Simulate wheel event (zoom in)
      fireEvent.wheel(canvas, { deltaY: -100 })
      
      expect(screen.getByText('110%')).toBeInTheDocument()
      
      // Simulate wheel event (zoom out)
      fireEvent.wheel(canvas, { deltaY: 100 })
      
      expect(screen.getByText('100%')).toBeInTheDocument()
    })

    it('handles mouse down, move, and up events for panning', () => {
      render(<OrgChartViewer {...defaultProps} />)
      
      const canvas = document.querySelector('canvas')!
      
      // Simulate drag operation
      fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 })
      fireEvent.mouseUp(canvas)
      
      // The component should handle these events without errors
      expect(canvas).toBeInTheDocument()
    })

    it('stops panning when mouse leaves canvas', () => {
      render(<OrgChartViewer {...defaultProps} />)
      
      const canvas = document.querySelector('canvas')!
      
      // Start dragging
      fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 })
      
      // Mouse leaves canvas
      fireEvent.mouseLeave(canvas)
      
      // Further mouse moves should not affect panning
      fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 })
      
      expect(canvas).toBeInTheDocument()
    })
  })

  describe('Canvas rendering', () => {
    it('calls canvas context methods when rendering', () => {
      const mockContext = {
        clearRect: jest.fn(),
        save: jest.fn(),
        restore: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        fill: jest.fn(),
        arc: jest.fn(),
        roundRect: jest.fn(),
        fillText: jest.fn(),
        measureText: jest.fn(() => ({ width: 100 })),
        set fillStyle(value) {},
        set strokeStyle(value) {},
        set lineWidth(value) {},
        set font(value) {},
        set textAlign(value) {},
        set textBaseline(value) {},
      }

      HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext)

      render(<OrgChartViewer {...defaultProps} />)

      // Verify that canvas context methods are called
      expect(mockContext.clearRect).toHaveBeenCalled()
      expect(mockContext.save).toHaveBeenCalled()
      expect(mockContext.restore).toHaveBeenCalled()
      expect(mockContext.translate).toHaveBeenCalled()
      expect(mockContext.scale).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for zoom controls', () => {
      render(<OrgChartViewer {...defaultProps} />)
      
      expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
      expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
      expect(screen.getByLabelText('Reset view')).toBeInTheDocument()
    })

    it('shows appropriate cursor styles', () => {
      render(<OrgChartViewer {...defaultProps} />)
      
      const canvas = document.querySelector('canvas')!
      
      // Default cursor should be grab
      expect(canvas).toHaveStyle('cursor: grab')
    })
  })

  describe('Edge cases', () => {
    it('handles undefined nodes gracefully', () => {
      render(<OrgChartViewer title="Test" nodes={undefined as any} />)
      
      expect(screen.getByText('No organization data available')).toBeInTheDocument()
    })

    it('handles nodes without parentId', () => {
      const rootOnlyNodes: OrgNode[] = [
        { id: '1', name: 'Root User', role: 'Admin' }
      ]
      
      render(<OrgChartViewer title="Root Only" nodes={rootOnlyNodes} />)
      
      expect(screen.getByText('Root Only')).toBeInTheDocument()
      expect(document.querySelector('canvas')).toBeInTheDocument()
    })

    it('handles deeply nested organizational structure', () => {
      const deepNodes: OrgNode[] = [
        { id: '1', name: 'Level 1', role: 'CEO' },
        { id: '2', name: 'Level 2', role: 'VP', parentId: '1' },
        { id: '3', name: 'Level 3', role: 'Director', parentId: '2' },
        { id: '4', name: 'Level 4', role: 'Manager', parentId: '3' },
        { id: '5', name: 'Level 5', role: 'Lead', parentId: '4' },
      ]
      
      render(<OrgChartViewer title="Deep Structure" nodes={deepNodes} />)
      
      expect(screen.getByText('Deep Structure')).toBeInTheDocument()
      expect(document.querySelector('canvas')).toBeInTheDocument()
    })
  })
})