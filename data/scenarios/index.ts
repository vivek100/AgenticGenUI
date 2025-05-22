// Import all scenarios
import { metricCardScenario } from "./metric-card-scenario"
import { chartScenario } from "./chart-scenario"
import { dataTableScenario } from "./data-table-scenario"
import { dataGridScenario } from "./data-grid-scenario"
import { confirmationCardScenario } from "./confirmation-card-scenario"
import { userFormScenario } from "./user-form-scenario"
import { toggleSwitchScenario } from "./toggle-switch-scenario"
import { infoBannerScenario } from "./info-banner-scenario"
import { progressBarScenario } from "./progress-bar-scenario"
import { avatarCardScenario } from "./avatar-card-scenario"
import { timelineScenario } from "./timeline-scenario"
import { multiStepFormScenario } from "./multi-step-form-scenario"
import { searchWithFiltersScenario } from "./search-with-filters-scenario"
import { dateTimeRangePickerScenario } from "./date-time-range-picker-scenario"
import { ratingSelectorScenario } from "./rating-selector-scenario"
import { kanbanBoardScenario } from "./kanban-board-scenario"
import { checklistWithProgressScenario } from "./checklist-with-progress-scenario"
import { approvalWorkflowCardScenario } from "./approval-workflow-card-scenario"
import { teamMemberListScenario } from "./team-member-list-scenario"
import { productCatalogGridScenario } from "./product-catalog-grid-scenario"
import { cartSummaryPanelScenario } from "./cart-summary-panel-scenario"
import { paymentDetailsFormScenario } from "./payment-details-form-scenario"
import { messageFeedScenario } from "./message-feed-scenario"
import { orderStatusTrackerScenario } from "./order-status-tracker-scenario"
import { editableDataTableScenario } from "./editable-data-table-scenario"
import { crudDataTableScenario } from "./crud-data-table-scenario"
import { expandableRowTableScenario } from "./expandable-row-table-scenario"
import { columnToggleTableScenario } from "./column-toggle-table-scenario"
import { locationMapScenario } from "./location-map-scenario"
import { routePlannerMapScenario } from "./route-planner-map-scenario"
import { threadedCommentsScenario } from "./threaded-comments-scenario"
import { mentionInputScenario } from "./mention-input-scenario"
import { tabLayoutScenario } from "./tab-layout-scenario"
import { accordionContentScenario } from "./accordion-content-scenario"
import { markdownRendererScenario } from "./markdown-renderer-scenario"
import { codeSnippetViewerScenario } from "./code-snippet-viewer-scenario"
import { colorPickerPopoverScenario } from "./color-picker-popover-scenario"
import { imageGalleryScenario } from "./image-gallery-scenario"
import { environmentSwitcherScenario } from "./environment-switcher-scenario"
import { languageSelectorScenario } from "./language-selector-scenario"
import { themeToggleScenario } from "./theme-toggle-scenario"
import { toastStackScenario } from "./toast-stack-scenario"
import { modalPromptScenario } from "./modal-prompt-scenario"
import { orgChartViewerScenario } from "./org-chart-viewer-scenario"
import { aiPromptBuilderScenario } from "./ai-prompt-builder-scenario"

// Export all scenarios
export const scenarios = {
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

// Log all available scenarios for debugging
console.log("Available scenarios:", Object.keys(scenarios))
console.log("Total scenarios:", Object.keys(scenarios).length)
