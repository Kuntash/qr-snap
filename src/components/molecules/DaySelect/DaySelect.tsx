import React from "react"
import { DaySelectProps } from "./types"
import { Card, CardContent } from "@main/components/ui/card"
import { DAYS } from "@main/constants"

export const DaySelect = (props: DaySelectProps) => {
  const { onChange, selectedDays } = props

  return (
    <div className="flex gap-x-4">
      {Object.entries(DAYS).map(([day, dayName]) => (
        <Card
          key={day}
          className={`${
            selectedDays?.includes(Number(day)) && "border-primary"
          } cursor-pointer border-2 flex-1 text-center`}
          onClick={() => {
            if (selectedDays?.includes(Number(day))) {
              onChange(selectedDays.filter((d) => d !== Number(day)))
              return
            }
            onChange([...selectedDays, Number(day)])
          }}
        >
          <CardContent className="p-2">{dayName}</CardContent>
        </Card>
      ))}
    </div>
  )
}
