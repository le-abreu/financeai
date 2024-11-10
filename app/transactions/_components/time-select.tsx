"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const currentYear = new Date().getFullYear();

  const YEARS_OPTIONS = [];

  for (let year = currentYear - 3; year <= currentYear + 1; year++) {
    YEARS_OPTIONS.push({ value: `${year}`, label: `${year}` });
  }

  const handleMonthChange = (month: string) => {
    push(`/transactions?month=${month}&year=${year}`);
  };

  const handleYearChange = (year: string) => {
    push(`/transactions?month=${month}&year=${year}`);
  };

  return (
    <>
      <div className="flex justify-between space-x-4">
        <Select
          onValueChange={(value) => handleYearChange(value)}
          defaultValue={year ?? ""}
        >
          <SelectTrigger className="w-[80px] rounded-full">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {YEARS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleMonthChange(value)}
          defaultValue={month ?? ""}
        >
          <SelectTrigger className="w-[150px] rounded-full">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            {MONTH_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default TimeSelect;
