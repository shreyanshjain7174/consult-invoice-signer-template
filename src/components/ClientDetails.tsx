
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientDetailsProps {
  clientName: string;
  setClientName: (name: string) => void;
  clientAddress: string;
  setClientAddress: (address: string) => void;
  clientEmail: string;
  setClientEmail: (email: string) => void;
}

const ClientDetails = ({
  clientName,
  setClientName,
  clientAddress,
  setClientAddress,
  clientEmail,
  setClientEmail
}: ClientDetailsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To:</h3>
      <div className="space-y-3">
        <div>
          <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
            Organization Name
          </Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-1"
            placeholder="Client or Organization Name"
          />
        </div>

        <div>
          <Label htmlFor="clientAddress" className="text-sm font-medium text-gray-700">
            Address
          </Label>
          <Textarea
            id="clientAddress"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="mt-1 h-24"
            placeholder="Street Address, City, State, ZIP"
          />
        </div>

        <div>
          <Label htmlFor="clientEmail" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="mt-1"
            placeholder="client@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
