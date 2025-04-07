
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Signature } from "lucide-react";
import { format } from "date-fns";

const DigitalSignature = () => {
  const [signed, setSigned] = useState(false);
  const [signedDate, setSignedDate] = useState<Date | null>(null);
  
  const handleSign = () => {
    if (!signed) {
      setSignedDate(new Date());
      setSigned(true);
    } else {
      setSignedDate(null);
      setSigned(false);
    }
  };

  return (
    <div className="border-t pt-6 w-full md:w-72">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Digitally signed by:</p>
        <div className="mt-2">
          {signed ? (
            <div className="signature-container">
              <div className="font-signature text-2xl text-blue-600">Shreyansh Sancheti</div>
              <div className="text-sm text-gray-600 mt-1">
                Signed: {signedDate ? format(signedDate, "MMM d, yyyy") : ""}
              </div>
            </div>
          ) : (
            <div className="h-14 border border-dashed border-gray-300 flex items-center justify-center rounded p-4">
              <span className="text-gray-400 text-sm">Signature will appear here</span>
            </div>
          )}
        </div>
      </div>
      
      <Button
        type="button"
        variant={signed ? "outline" : "default"}
        onClick={handleSign}
        className={`w-full ${signed ? "bg-gray-100 text-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        <Signature className="mr-2 h-4 w-4" />
        {signed ? "Remove Signature" : "Sign as Shreyansh Sancheti"}
      </Button>
    </div>
  );
};

export default DigitalSignature;
