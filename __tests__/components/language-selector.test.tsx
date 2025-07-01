import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSelector } from '../../agentic-ui/components/language-selector'

// Mock the useAgentActions hook
jest.mock('../../agentic-ui/hooks/use-agent-actions', () => ({
  useAgentActions: () => ({
    callTool: jest.fn(),
  }),
}))

describe('LanguageSelector', () => {
  const mockLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
  ]

  it('renders with initial language selected', () => {
    render(
      <LanguageSelector
        title="Language Settings"
        description="Choose your preferred languages"
        languages={mockLanguages}
        current="en"
      />
    )

    expect(screen.getByText('Language Settings')).toBeInTheDocument()
    expect(screen.getByText('Choose your preferred languages')).toBeInTheDocument()
    expect(screen.getByText('1 language selected')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('allows selecting multiple languages', () => {
    render(
      <LanguageSelector
        title="Language Settings"
        description="Choose your preferred languages"
        languages={mockLanguages}
        current="en"
      />
    )

    // Open the dropdown
    fireEvent.click(screen.getByRole('combobox'))
    
    // Select Spanish
    fireEvent.click(screen.getAllByText('Spanish')[0])
    
    // Check that both English and Spanish are selected
    expect(screen.getByText('2 languages selected')).toBeInTheDocument()
    expect(screen.getByText('English, Spanish')).toBeInTheDocument()
  })

  it('allows deselecting a language without affecting others', () => {
    render(
      <LanguageSelector
        title="Language Settings"
        description="Choose your preferred languages"
        languages={mockLanguages}
        current="en"
      />
    )

    // Open the dropdown and select Spanish
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByText('Spanish')[0])
    
    // Now deselect English using the X button
    const removeButtons = screen.getAllByRole('button').filter(button => 
      button.innerHTML.includes('English') && button.innerHTML.includes('<svg')
    )
    fireEvent.click(removeButtons[0].querySelector('svg'))
    
    // Check that only Spanish remains selected
    expect(screen.getByText('1 language selected')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.queryByText('English, Spanish')).not.toBeInTheDocument()
  })

  it('allows selecting a language after deselecting all', () => {
    render(
      <LanguageSelector
        title="Language Settings"
        description="Choose your preferred languages"
        languages={mockLanguages}
        current="en"
      />
    )

    // Deselect English
    const removeButtons = screen.getAllByRole('button').filter(button => 
      button.innerHTML.includes('English') && button.innerHTML.includes('<svg')
    )
    fireEvent.click(removeButtons[0].querySelector('svg'))
    
    // Open the dropdown and select French
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByText('French')[0])
    
    // Check that French is selected
    expect(screen.getByText('1 language selected')).toBeInTheDocument()
    expect(screen.getByText('French')).toBeInTheDocument()
  })
})