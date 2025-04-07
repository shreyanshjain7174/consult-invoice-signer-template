
import { WorkItem, calculateSubtotal, calculateTax, calculateTotal } from "@/lib/invoiceUtils";

interface InvoiceSummaryProps {
  workItems: WorkItem[];
  taxRate: number;
}

const InvoiceSummary = ({ workItems, taxRate }: InvoiceSummaryProps) => {
  const subtotal = calculateSubtotal(workItems);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateTotal(subtotal, tax);

  const totalHours = workItems.reduce((sum, item) => sum + item.hours, 0);
  
  return (
    <div className="bg-gray-50 p-4 rounded-md w-full md:w-72 mt-4 md:mt-0">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Hours:</span>
          <span className="font-medium">{totalHours.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax ({taxRate}%):</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-300 my-2"></div>
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Payment due within 15 days from the date of invoice. Please make payment to the account specified in the separate payment instructions.
        </p>
      </div>
    </div>
  );
};

export default InvoiceSummary;
