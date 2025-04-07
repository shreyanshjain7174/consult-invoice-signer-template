
export interface WorkItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export const calculateSubtotal = (workItems: WorkItem[]): number => {
  return workItems.reduce((sum, item) => sum + (item.hours * item.rate), 0);
};

export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (subtotal: number, tax: number): number => {
  return subtotal + tax;
};
