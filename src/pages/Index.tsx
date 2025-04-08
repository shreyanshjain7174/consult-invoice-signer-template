
import { Button } from "@/components/ui/button";
import InvoiceTemplate from "@/components/InvoiceTemplate";
import { useState, useRef } from "react";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Index = () => {
  const { toast } = useToast();
  const [isPrinting, setIsPrinting] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!invoiceRef.current) return;
    
    setIsPrinting(true);
    
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 size: 210 x 297 mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
      
      toast({
        title: "PDF Export Ready",
        description: "Your invoice has been downloaded",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      toast({
        title: "PDF Export Failed",
        description: "There was a problem generating your PDF",
        variant: "destructive",
      });
    } finally {
      setIsPrinting(false);
    }
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
        
        <div className="bg-white shadow rounded-lg overflow-hidden" ref={invoiceRef}>
          <InvoiceTemplate />
        </div>
      </div>
    </div>
  );
};

export default Index;
