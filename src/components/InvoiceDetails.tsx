
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarRange } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface InvoiceDetailsProps {
  invoiceNumber: string;
  setInvoiceNumber: (num: string) => void;
  issueDate: Date;
  setIssueDate: (date: Date) => void;
  dueDate: Date;
  setDueDate: (date: Date) => void;
  workPeriodStart: Date;
  setWorkPeriodStart: (date: Date) => void;
  workPeriodEnd: Date;
  setWorkPeriodEnd: (date: Date) => void;
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
  taxRate: number;
  setTaxRate: (rate: number) => void;
}

const InvoiceDetails = ({
  invoiceNumber,
  setInvoiceNumber,
  issueDate,
  setIssueDate,
  dueDate,
  setDueDate,
  workPeriodStart,
  setWorkPeriodStart,
  workPeriodEnd,
  setWorkPeriodEnd,
  hourlyRate,
  setHourlyRate,
  taxRate,
  setTaxRate,
}: InvoiceDetailsProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="invoiceNumber" className="text-sm font-medium text-gray-700">
          Invoice Number
        </Label>
        <Input
          id="invoiceNumber"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium text-gray-700">Issue Date</Label>
          <DatePickerField 
            date={issueDate}
            onSelect={setIssueDate}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Due Date</Label>
          <DatePickerField 
            date={dueDate}
            onSelect={setDueDate}
          />
        </div>
      </div>

      <div className="pt-2">
        <Label className="text-sm font-medium text-gray-700">Work Period</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          <DatePickerField 
            date={workPeriodStart}
            onSelect={setWorkPeriodStart}
            placeholder="Start Date"
          />
          <DatePickerField 
            date={workPeriodEnd}
            onSelect={setWorkPeriodEnd}
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700">
            Hourly Rate ($)
          </Label>
          <Input
            id="hourlyRate"
            type="number"
            min="0"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="taxRate" className="text-sm font-medium text-gray-700">
            Tax Rate (%)
          </Label>
          <Input
            id="taxRate"
            type="number"
            min="0"
            step="0.01"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

interface DatePickerFieldProps {
  date: Date;
  onSelect: (date: Date) => void;
  placeholder?: string;
}

const DatePickerField = ({ date, onSelect, placeholder = "Select date" }: DatePickerFieldProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarRange className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && onSelect(date)}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};

export default InvoiceDetails;
