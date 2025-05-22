"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { registerAllAgentComponents } from "@/agentic-ui/registry"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { subscribe } from "@/agentic-ui/ag-ui-client"
import { MessageSquare, Code, BookOpen, FileText } from "lucide-react"
import type { MessageType } from "@/types/message"
import { Sidebar } from "@/components/demo/sidebar"
import { ChatTab } from "@/components/demo/chat-tab"
import { ExplorerTab } from "@/components/demo/explorer-tab"
import { IntegrationTab } from "@/components/demo/integration-tab"
import { PromptTab } from "@/components/demo/prompt-tab"
import { callAI, type ModelKey } from "@/services/ai-service"

// Import scenarios directly to avoid any caching issues
import { metricCardScenario } from "@/data/scenarios/metric-card-scenario"
import { chartScenario } from "@/data/scenarios/chart-scenario"
import { dataTableScenario } from "@/data/scenarios/data-table-scenario"
import { dataGridScenario } from "@/data/scenarios/data-grid-scenario"
import { confirmationCardScenario } from "@/data/scenarios/confirmation-card-scenario"
import { userFormScenario } from "@/data/scenarios/user-form-scenario"
import { toggleSwitchScenario } from "@/data/scenarios/toggle-switch-scenario"
import { infoBannerScenario } from "@/data/scenarios/info-banner-scenario"
import { progressBarScenario } from "@/data/scenarios/progress-bar-scenario"
import { avatarCardScenario } from "@/data/scenarios/avatar-card-scenario"
import { timelineScenario } from "@/data/scenarios/timeline-scenario"
import { multiStepFormScenario } from "@/data/scenarios/multi-step-form-scenario"
import { searchWithFiltersScenario } from "@/data/scenarios/search-with-filters-scenario"
import { dateTimeRangePickerScenario } from "@/data/scenarios/date-time-range-picker-scenario"
import { ratingSelectorScenario } from "@/data/scenarios/rating-selector-scenario"
import { kanbanBoardScenario } from "@/data/scenarios/kanban-board-scenario"
import { checklistWithProgressScenario } from "@/data/scenarios/checklist-with-progress-scenario"
import { approvalWorkflowCardScenario } from "@/data/scenarios/approval-workflow-card-scenario"
import { teamMemberListScenario } from "@/data/scenarios/team-member-list-scenario"
import { productCatalogGridScenario } from "@/data/scenarios/product-catalog-grid-scenario"
import { cartSummaryPanelScenario } from "@/data/scenarios/cart-summary-panel-scenario"
import { paymentDetailsFormScenario } from "@/data/scenarios/payment-details-form-scenario"
import { messageFeedScenario } from "@/data/scenarios/message-feed-scenario"
import { orderStatusTrackerScenario } from "@/data/scenarios/order-status-tracker-scenario"
import { editableDataTableScenario } from "@/data/scenarios/editable-data-table-scenario"
import { crudDataTableScenario } from "@/data/scenarios/crud-data-table-scenario"
import { expandableRowTableScenario } from "@/data/scenarios/expandable-row-table-scenario"
import { columnToggleTableScenario } from "@/data/scenarios/column-toggle-table-scenario"
import { locationMapScenario } from "@/data/scenarios/location-map-scenario"
import { routePlannerMapScenario } from "@/data/scenarios/route-planner-map-scenario"
import { threadedCommentsScenario } from "@/data/scenarios/threaded-comments-scenario"
import { mentionInputScenario } from "@/data/scenarios/mention-input-scenario"
import { tabLayoutScenario } from "@/data/scenarios/tab-layout-scenario"
import { accordionContentScenario } from "@/data/scenarios/accordion-content-scenario"
import { markdownRendererScenario } from "@/data/scenarios/markdown-renderer-scenario"
import { codeSnippetViewerScenario } from "@/data/scenarios/code-snippet-viewer-scenario"
import { colorPickerPopoverScenario } from "@/data/scenarios/color-picker-popover-scenario"
import { imageGalleryScenario } from "@/data/scenarios/image-gallery-scenario"
import { environmentSwitcherScenario } from "@/data/scenarios/environment-switcher-scenario"
import { languageSelectorScenario } from "@/data/scenarios/language-selector-scenario"
import { themeToggleScenario } from "@/data/scenarios/theme-toggle-scenario"
import { toastStackScenario } from "@/data/scenarios/toast-stack-scenario"
import { modalPromptScenario } from "@/data/scenarios/modal-prompt-scenario"
import { orgChartViewerScenario } from "@/data/scenarios/org-chart-viewer-scenario"
import { aiPromptBuilderScenario } from "@/data/scenarios/ai-prompt-builder-scenario"

// Create a direct scenarios object to avoid any import issues
const directScenarios = {
  metricCard: metricCardScenario,
  chart: chartScenario,
  dataTable: dataTableScenario,
  dataGrid: dataGridScenario,
  confirmationCard: confirmationCardScenario,
  userForm: userFormScenario,
  toggleSwitch: toggleSwitchScenario,
  infoBanner: infoBannerScenario,
  progressBar: progressBarScenario,
  avatarCard: avatarCardScenario,
  timeline: timelineScenario,
  multiStepForm: multiStepFormScenario,
  searchWithFilters: searchWithFiltersScenario,
  dateTimeRangePicker: dateTimeRangePickerScenario,
  ratingSelector: ratingSelectorScenario,
  kanbanBoard: kanbanBoardScenario,
  checklistWithProgress: checklistWithProgressScenario,
  approvalWorkflowCard: approvalWorkflowCardScenario,
  teamMemberList: teamMemberListScenario,
  productCatalogGrid: productCatalogGridScenario,
  cartSummaryPanel: cartSummaryPanelScenario,
  paymentDetailsForm: paymentDetailsFormScenario,
  messageFeed: messageFeedScenario,
  orderStatusTracker: orderStatusTrackerScenario,
  editableDataTable: editableDataTableScenario,
  crudDataTable: crudDataTableScenario,
  expandableRowTable: expandableRowTableScenario,
  columnToggleTable: columnToggleTableScenario,
  locationMap: locationMapScenario,
  routePlannerMap: routePlannerMapScenario,
  threadedComments: threadedCommentsScenario,
  mentionInput: mentionInputScenario,
  tabLayout: tabLayoutScenario,
  accordionContent: accordionContentScenario,
  markdownRenderer: markdownRendererScenario,
  codeSnippetViewer: codeSnippetViewerScenario,
  colorPickerPopover: colorPickerPopoverScenario,
  imageGallery: imageGalleryScenario,
  environmentSwitcher: environmentSwitcherScenario,
  languageSelector: languageSelectorScenario,
  themeToggle: themeToggleScenario,
  toastStack: toastStackScenario,
  modalPrompt: modalPromptScenario,
  orgChartViewer: orgChartViewerScenario,
  aiPromptBuilder: aiPromptBuilderScenario,
}

export function AgentDemoApp() {
  const [activeTab, setActiveTab] = useState<string>("chat")
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [messages, setMessages] = useState<MessageType[]>([
    {
      type: "assistant",
      content:
        "Hi! I'm your Agentic UI assistant. Ask me to show you any component or try typing 'show me a chart' to get started.",
      timestamp: new Date(),
    },
  ])
  const [events, setEvents] = useState<any[]>([])
  const [input, setInput] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [componentsRegistered, setComponentsRegistered] = useState(false)

  // Use the direct scenarios object
  const availableScenarios = directScenarios

  // Get all component names from the scenarios
  const componentNames = Object.keys(availableScenarios)

  // Log all available scenarios for debugging
  useEffect(() => {
    console.log("Available scenarios:", componentNames)
    console.log("Total scenarios:", componentNames.length)
  }, [componentNames])

  // Register all agent components and subscribe to events
  useEffect(() => {
    // Only register components once
    if (!componentsRegistered) {
      console.log("Registering components...")
      registerAllAgentComponents()
      setComponentsRegistered(true)
    }

    const unsubscribe = subscribe((event) => {
      setEvents((prev) => [...prev, event])
      setMessages((prev) => [...prev, { type: "event", content: event, timestamp: new Date() }])

      if (event.type === "agentResponse") {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { type: "assistant", content: `I received your response: "${event.payload}"`, timestamp: new Date() },
          ])
        }, 500)
      } else if (event.type === "toolCall") {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: "assistant",
              content: `I processed your action on tool "${event.payload.tool}" with the provided data.`,
              timestamp: new Date(),
            },
          ])
        }, 500)
      }
    })

    return () => unsubscribe()
  }, [componentsRegistered])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent, modelKey: ModelKey) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { type: "user" as const, content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])

    // Show loading indicator
    const loadingMessageId = Date.now()
    setMessages((prev) => [
      ...prev,
      {
        id: loadingMessageId,
        type: "assistant",
        content: "Thinking...",
        timestamp: new Date(),
      },
    ])

    try {
      // Call the AI service with the selected model
      const aiResponse = await callAI(
        // Filter out the loading message from the history
        messages.filter((msg) => msg.type !== "loading"),
        input,
        modelKey,
      )

      // Remove the loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessageId))

      if (aiResponse.isComponent) {
        // If the AI returned a component instruction
        const componentData = aiResponse.content as { componentType: string; props: Record<string, any> }

        setMessages((prev) => [
          ...prev,
          {
            type: "assistant",
            content: `Here's the ${componentData.componentType} component you requested:`,
            timestamp: new Date(),
          },
        ])

        // Add a small delay for a more natural conversation flow
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: "component",
              content: {
                tool: "renderComponent",
                payload: componentData,
              },
              timestamp: new Date(),
            },
          ])
        }, 300)
      } else {
        // If the AI returned a text response
        setMessages((prev) => [
          ...prev,
          {
            type: "assistant",
            content: aiResponse.content as string,
            timestamp: new Date(),
          },
        ])
      }
    } catch (error) {
      console.error("Error in AI processing:", error)

      // Remove the loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessageId))

      // Show error message
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: `I encountered an error processing your request: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
          timestamp: new Date(),
        },
      ])
    }

    setInput("")
  }

  const handleComponentSelect = (component: string) => {
    setSelectedComponent(component)
    setActiveTab("explorer")
  }

  const clearMessages = () => {
    setMessages([
      {
        type: "assistant",
        content:
          "Hi! I'm your Agentic UI assistant. Ask me to show you any component or try typing 'show me a chart' to get started.",
        timestamp: new Date(),
      },
    ])
    setEvents([])
  }

  const addComponentToChat = (component: string) => {
    const scenarioData = availableScenarios[component]
    if (!scenarioData) {
      console.error(`Component scenario not found: ${component}`)
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: `Sorry, I couldn't find the ${component} component scenario.`,
          timestamp: new Date(),
        },
      ])
      return
    }

    setMessages((prev) => [
      ...prev,
      { type: "assistant", content: `Here's the ${component} component:`, timestamp: new Date() },
      { type: "component", content: scenarioData, timestamp: new Date() },
    ])
    setActiveTab("chat")
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleComponentSelect={handleComponentSelect}
          clearMessages={clearMessages}
          availableScenarios={availableScenarios}
          addComponentToChat={addComponentToChat}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden gap-2">
            <div className="border-b px-4 py-2 flex justify-start overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <TabsList className="flex gap-2 px-2 py-1 rounded-md bg-muted/50">
                <TabsTrigger
                  value="chat"
                  className="h-full px-4 py-2 flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="explorer"
                  className="h-full px-4 py-2 flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <Code className="h-4 w-4" />
                  Component Explorer
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="h-full px-4 py-2 flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <BookOpen className="h-4 w-4" />
                  Integration Guide
                </TabsTrigger>
                <TabsTrigger
                  value="prompt"
                  className="h-full px-4 py-2 flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <FileText className="h-4 w-4" />
                  System Prompt
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="flex-1 overflow-hidden">
              <ChatTab
                messages={messages}
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                messagesEndRef={messagesEndRef}
              />
            </TabsContent>

            <TabsContent value="explorer" className="flex-1 overflow-hidden">
              <ExplorerTab
                components={componentNames}
                addComponentToChat={addComponentToChat}
                availableScenarios={availableScenarios}
              />
            </TabsContent>

            <TabsContent value="integration" className="flex-1 overflow-hidden">
              <IntegrationTab />
            </TabsContent>

            <TabsContent value="prompt" className="flex-1 overflow-hidden">
              <PromptTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
