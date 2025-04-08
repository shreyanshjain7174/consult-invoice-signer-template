import { useState } from "react";
import ClientDetails from "./ClientDetails";
import InvoiceDetails from "./InvoiceDetails";
import WorkItemsTable from "./WorkItemsTable";
import InvoiceSummary from "./InvoiceSummary";
import DigitalSignature from "./DigitalSignature";
import { WorkItem } from "@/lib/invoiceUtils";

const InvoiceTemplate = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2023-001");
  const [issueDate, setIssueDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 15))
  );
  
  const [clientName, setClientName] = useState("ABC Corporation");
  const [clientAddress, setClientAddress] = useState("123 Business St, Suite 100\nNew York, NY 10001");
  const [clientEmail, setClientEmail] = useState("accounting@abccorp.com");
  
  const [workPeriodStart, setWorkPeriodStart] = useState<Date>(
    new Date(new Date().setDate(1)) // First day of current month
  );
  const [workPeriodEnd, setWorkPeriodEnd] = useState<Date>(new Date());
  
  const [hourlyRate, setHourlyRate] = useState(120);
  const [taxRate, setTaxRate] = useState(9.5);
  
  const [workItems, setWorkItems] = useState<WorkItem[]>([
    { id: "1", description: "Website Development", hours: 12, rate: hourlyRate },
    { id: "2", description: "Client Meetings", hours: 4, rate: hourlyRate },
    { id: "3", description: "Project Documentation", hours: 3, rate: hourlyRate },
  ]);

  // Update work item rates when hourly rate changes
  const updateWorkItemRates = (newRate: number) => {
    setHourlyRate(newRate);
    setWorkItems(workItems.map(item => ({
      ...item,
      rate: newRate
    })));
  };

  // Add new work item
  const addWorkItem = () => {
    const newId = (workItems.length + 1).toString();
    setWorkItems([
      ...workItems,
      { id: newId, description: "", hours: 0, rate: hourlyRate }
    ]);
  };

  // Update work item
  const updateWorkItem = (id: string, field: keyof WorkItem, value: any) => {
    setWorkItems(
      workItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Delete work item
  const deleteWorkItem = (id: string) => {
    setWorkItems(workItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-8 print:p-4 print:shadow-none">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
          <p className="text-gray-600 mt-1">Professional Consulting Services</p>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl text-blue-600">Shreyansh Sancheti</div>
          <p className="text-gray-600">Professional Consultant</p>
          <p className="text-gray-600">contact@shreyanshsancheti.com</p>
          <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ClientDetails 
          clientName={clientName}
          setClientName={setClientName}
          clientAddress={clientAddress}
          setClientAddress={setClientAddress}
          clientEmail={clientEmail}
          setClientEmail={setClientEmail}
        />
        
        <InvoiceDetails 
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          issueDate={issueDate}
          setIssueDate={setIssueDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          workPeriodStart={workPeriodStart}
          setWorkPeriodStart={setWorkPeriodStart}
          workPeriodEnd={workPeriodEnd}
          setWorkPeriodEnd={setWorkPeriodEnd}
          hourlyRate={hourlyRate}
          setHourlyRate={updateWorkItemRates}
          taxRate={taxRate}
          setTaxRate={setTaxRate}
        />
      </div>

      <WorkItemsTable 
        workItems={workItems}
        addWorkItem={addWorkItem}
        updateWorkItem={updateWorkItem}
        deleteWorkItem={deleteWorkItem}
      />

      <div className="flex flex-col md:flex-row justify-between mt-8 items-start">
        <DigitalSignature />
        
        <InvoiceSummary 
          workItems={workItems}
          taxRate={taxRate}
        />
      </div>
    </div>
  );
};

export default InvoiceTemplate;
