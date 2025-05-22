// Message types
export type MessageType =
  | { type: "user"; content: string; timestamp: Date }
  | { type: "assistant"; content: string; timestamp: Date }
  | { type: "component"; content: any; timestamp: Date }
  | { type: "event"; content: any; timestamp: Date }
