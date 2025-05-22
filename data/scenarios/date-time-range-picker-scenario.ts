export const dateTimeRangePickerScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "datetimerangepicker",
    props: {
      title: "Schedule Meeting",
      description: "Select start and end date/time for your meeting",
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  },
}
