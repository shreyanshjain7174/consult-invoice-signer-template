
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
      // Apply print-friendly styles
      document.body.classList.add('printing');
      invoiceRef.current.classList.add("pdf-generating");
      
      // Force all text elements to be visible and properly wrapped
      const textElements = invoiceRef.current.querySelectorAll('textarea, input, .break-words, [class*="overflow-wrap"]');
      const originalStyles = new Map<HTMLElement, {[key: string]: string}>();
      
      textElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          // Save original styles
          originalStyles.set(el, {
            whiteSpace: el.style.whiteSpace,
            wordBreak: el.style.wordBreak,
            overflowWrap: el.style.overflowWrap,
            overflow: el.style.overflow,
            textOverflow: el.style.textOverflow,
            height: el.style.height
          });
          
          // Apply print-friendly styles
          el.style.whiteSpace = 'pre-wrap';
          el.style.wordBreak = 'break-word';
          el.style.overflowWrap = 'anywhere';
          el.style.overflow = 'visible';
          el.style.textOverflow = 'clip';
          
          // For textareas, ensure proper height
          if (el.tagName === 'TEXTAREA') {
            el.style.height = 'auto';
          }
        }
      });
      
      // Wait a bit for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: invoiceRef.current.scrollWidth,
        windowHeight: invoiceRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });
      
      // A4 size: 210 x 297 mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // First page
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
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
      // Restore original styles
      document.body.classList.remove('printing');
      
      if (invoiceRef.current) {
        invoiceRef.current.classList.remove("pdf-generating");
        
        // Find all elements that had their styles changed
        const textElements = invoiceRef.current.querySelectorAll('textarea, input, .break-words, [class*="overflow-wrap"]');
        textElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            const origStyles = originalStyles.get(el);
            if (origStyles) {
              // Restore original styles
              Object.entries(origStyles).forEach(([prop, value]) => {
                el.style[prop as any] = value;
              });
            }
          }
        });
      }
      
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
