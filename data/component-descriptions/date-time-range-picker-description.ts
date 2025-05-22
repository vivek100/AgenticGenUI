export const dateTimeRangePickerDescription = {
  description: "Pick start and end date-times",
  props: [
    { name: "title", type: "string", description: "Picker title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "startDate", type: "Date", description: "Initial start date" },
    { name: "endDate", type: "Date", description: "Initial end date" },
    { name: "submitLabel", type: "string", description: "Text for submit button" },
    { name: "cancelLabel", type: "string", description: "Text for cancel button" },
  ],
  events: [],
  toolCalls: [
    {
      name: "submitDateTimeRange",
      description: "Called when date range is submitted",
      args: "{ startDateTime: string, endDateTime: string }",
    },
  ],
}
