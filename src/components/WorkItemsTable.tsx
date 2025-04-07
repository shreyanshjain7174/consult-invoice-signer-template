
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkItem } from "@/lib/invoiceUtils";
import { Trash, PlusCircle } from "lucide-react";

interface WorkItemsTableProps {
  workItems: WorkItem[];
  addWorkItem: () => void;
  updateWorkItem: (id: string, field: keyof WorkItem, value: any) => void;
  deleteWorkItem: (id: string) => void;
}

const WorkItemsTable = ({
  workItems,
  addWorkItem,
  updateWorkItem,
  deleteWorkItem,
}: WorkItemsTableProps) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Work Items</h3>
        <Button 
          onClick={addWorkItem}
          variant="outline"
          className="flex items-center"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Description</TableHead>
              <TableHead className="text-right">Hours</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input 
                    value={item.description}
                    onChange={(e) => updateWorkItem(item.id, "description", e.target.value)}
                    placeholder="Enter work description"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input 
                    type="number"
                    value={item.hours}
                    min="0"
                    step="0.5"
                    onChange={(e) => updateWorkItem(item.id, "hours", Number(e.target.value))}
                    className="w-20 ml-auto"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input 
                    type="number"
                    value={item.rate}
                    min="0"
                    onChange={(e) => updateWorkItem(item.id, "rate", Number(e.target.value))}
                    className="w-24 ml-auto"
                  />
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${(item.hours * item.rate).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteWorkItem(item.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkItemsTable;
