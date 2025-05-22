"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface DateTimeRangePickerProps {
  title: string
  description?: string
  startDate?: Date
  endDate?: Date
  submitLabel?: string
  cancelLabel?: string
  className?: string
}

/**
 * DateTimeRangePicker - Pick start and end date-times
 *
 * Actionable component that triggers a date range selection
 */
export function DateTimeRangePicker({
  title,
  description,
  startDate: initialStartDate,
  endDate: initialEndDate,
  submitLabel = "Apply",
  cancelLabel = "Cancel",
  className,
}: DateTimeRangePickerProps) {
  const { callTool } = useAgentActions()
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate)
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")

  const handleSubmit = () => {
    // Combine date and time
    let start: Date | undefined
    let end: Date | undefined

    if (startDate) {
      start = new Date(startDate)
      const [hours, minutes] = startTime.split(":").map(Number)
      start.setHours(hours, minutes)
    }

    if (endDate) {
      end = new Date(endDate)
      const [hours, minutes] = endTime.split(":").map(Number)
      end.setHours(hours, minutes)
    }

    callTool("submitDateTimeRange", {
      startDateTime: start?.toISOString(),
      endDateTime: end?.toISOString(),
    })
  }

  // Generate time options (every 30 minutes)
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <div className="font-medium">Start Date & Time</div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal flex-1", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger className="w-[120px]">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`start-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <div className="font-medium">End Date & Time</div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal flex-1", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger className="w-[120px]">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`end-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">{cancelLabel}</Button>
        <Button onClick={handleSubmit} disabled={!startDate || !endDate}>
          {submitLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
