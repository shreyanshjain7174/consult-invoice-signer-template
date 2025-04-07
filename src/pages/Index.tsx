
import { Button } from "@/components/ui/button";
import InvoiceTemplate from "@/components/InvoiceTemplate";
import { useState } from "react";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isPrinting, setIsPrinting] = useState(false);

  const handleExportPDF = () => {
    setIsPrinting(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      setIsPrinting(false);
      
      toast({
        title: "PDF Export Ready",
        description: "Your invoice has been prepared for download",
      });
      
      // In a real implementation, you would use a library like jsPDF or 
      // a server-side solution to generate the actual PDF
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Consultant Invoice</h1>
          <Button 
            onClick={handleExportPDF}
            disabled={isPrinting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="mr-2 h-4 w-4" />
            {isPrinting ? "Preparing..." : "Export PDF"}
          </Button>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <InvoiceTemplate />
        </div>
      </div>
    </div>
  );
};

export default Index;
