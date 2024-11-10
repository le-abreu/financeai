"use client";

import * as React from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/app/_lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerRangeProps {
  className?: string;
  dateFrom: Date;
  dateTo: Date;
  onDateRangeChange: (newRange: DateRange) => void;
}

export function DatePickerRange({
  className,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: DatePickerRangeProps) {
  const [date, setDate] = React.useState<DateRange>({
    from: dateFrom ?? startOfMonth(new Date()),
    to: dateTo ?? endOfMonth(new Date()),
  });

  // Handle the date selection
  const handleSelect = (newDateRange: DateRange) => {
    setDate(newDateRange);
    onDateRangeChange(newDateRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn("w-[300px] justify-start text-left font-normal")}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              "Selecione uma data"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
