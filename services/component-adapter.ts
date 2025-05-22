import type { ComponentInstruction } from "./ai-service"

/**
 * Adapts component props from AI response to match the expected component props
 */
export function adaptComponentProps(instruction: ComponentInstruction): ComponentInstruction {
  const { componentType, props } = instruction

  // Clone the instruction to avoid mutating the original
  const adaptedInstruction: ComponentInstruction = {
    componentType,
    props: { ...props },
  }

  // Handle specific component adaptations
  switch (componentType.toLowerCase()) {
    case "metriccard":
      // If the AI returns a metrics array, use the first item's properties
      if (props.metrics && Array.isArray(props.metrics) && props.metrics.length > 0) {
        const firstMetric = props.metrics[0]

        // Map label to title if title is not provided
        if (!props.title && firstMetric.label) {
          adaptedInstruction.props.title = firstMetric.label
        }

        // Map value directly
        if (!props.value && firstMetric.value) {
          adaptedInstruction.props.value = firstMetric.value
        }

        // Map description if available
        if (!props.description && firstMetric.description) {
          adaptedInstruction.props.description = firstMetric.description
        }

        // Remove the metrics array as it's not expected by the component
        delete adaptedInstruction.props.metrics
      }
      break

    // Add more component adaptations as needed

    default:
      // No adaptation needed
      break
  }

  return adaptedInstruction
}
