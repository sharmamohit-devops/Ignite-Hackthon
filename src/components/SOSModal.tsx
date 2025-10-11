import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Heart, Flame, Shield, AlertTriangle } from "lucide-react";

interface SOSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SOSModal = ({ open, onOpenChange }: SOSModalProps) => {
  const [step, setStep] = useState<"select" | "confirm" | "sending">("select");
  const [selectedType, setSelectedType] = useState<string>("");
  const [countdown, setCountdown] = useState(5);

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setStep("confirm");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "confirm" && open) {
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            handleConfirm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, open]);

  const handleConfirm = () => {
    setStep("sending");
    // Simulate sending alert
    setTimeout(() => {
      setStep("select");
      setSelectedType("");
      onOpenChange(false);
      // You could use a toast to show a success message here
    }, 1500);
  };

  const handleCancel = () => {
    setStep("select");
    setSelectedType("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "select" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-6 w-6" />
                Emergency SOS
              </DialogTitle>
              <DialogDescription>
                Select the type of emergency. Alert will be sent to nearby residents and local authorities.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-destructive/10 hover:border-destructive"
                onClick={() => handleSelect("medical")}
              >
                <Heart className="h-8 w-8 text-destructive" />
                <span className="font-semibold">Medical Emergency</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-orange-500/10 hover:border-orange-500"
                onClick={() => handleSelect("fire")}
              >
                <Flame className="h-8 w-8 text-orange-500" />
                <span className="font-semibold">Fire Emergency</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-blue-500/10 hover:border-blue-500"
                onClick={() => handleSelect("security")}
              >
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="font-semibold">Security Threat</span>
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {step === "sending" ? "Sending Alert..." : "Confirm Emergency Alert"}
              </DialogTitle>
              <DialogDescription>
                {step === "sending"
                  ? `Notifying nearby residents and authorities about the ${selectedType} emergency.`
                  : `Are you sure you want to send a ${selectedType} emergency alert? This will notify nearby residents and local emergency services.`}
              </DialogDescription>
            </DialogHeader>
            {step === "confirm" && (
              <div className="text-center py-4">
                <p className="text-6xl font-bold font-mono text-destructive">{countdown}</p>
                <p className="text-sm text-muted-foreground">Alert will be sent automatically.</p>
              </div>
            )}
            {step === "sending" && (
                <div className="flex justify-center items-center py-4">
                    <div className="h-12 w-12 border-4 border-destructive border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={handleCancel} disabled={step === "sending"}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
