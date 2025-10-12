import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Building, Shield, ArrowLeft, Shield as ShieldIcon, Upload, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getRedirectPath } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [residentEmail, setResidentEmail] = useState("");
  const [residentPassword, setResidentPassword] = useState("");
  const [secretaryEmail, setSecretaryEmail] = useState("");
  const [secretaryPassword, setSecretaryPassword] = useState("");
  const [areaHeadEmail, setAreaHeadEmail] = useState("");
  const [areaHeadPassword, setAreaHeadPassword] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  
  // Registration states
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<"resident" | "secretary">("resident");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regApartment, setRegApartment] = useState("");
  const [regSocietyName, setRegSocietyName] = useState("");
  const [regDocument, setRegDocument] = useState<File | null>(null);

  const handleLogin = async (role: string, email: string, password: string) => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(role);
    const response = await login({ email, password });
    
    if (response.success) {
      toast.success("Login successful!");
      const redirectPath = getRedirectPath(role);
      navigate(redirectPath);
    } else {
      toast.error(response.error || "Login failed");
    }
    setLoading(null);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!regName || !regEmail || !regPhone || !regAddress) {
      toast.error("Please fill all required fields");
      return;
    }

    if (registrationType === "resident" && !regApartment) {
      toast.error("Please enter apartment number");
      return;
    }

    if (registrationType === "secretary" && !regSocietyName) {
      toast.error("Please enter society name");
      return;
    }

    if (!regDocument) {
      toast.error("Please upload required document");
      return;
    }

    // Create registration request
    const registrationRequest = {
      id: Date.now(),
      type: registrationType,
      name: regName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      apartment: regApartment,
      societyName: regSocietyName,
      document: regDocument.name,
      status: "pending",
      submittedAt: new Date().toISOString(),
      approvedBy: registrationType === "resident" ? "secretary" : "area-head"
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('sampark_registration_requests') || '[]');
    localStorage.setItem('sampark_registration_requests', JSON.stringify([registrationRequest, ...existingRequests]));

    toast.success(`Registration request submitted! ${registrationType === "resident" ? "Secretary" : "Area Head"} will review your request.`);
    
    // Reset form
    setRegName("");
    setRegEmail("");
    setRegPhone("");
    setRegAddress("");
    setRegApartment("");
    setRegSocietyName("");
    setRegDocument(null);
    setRegistrationOpen(false);
  };

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  return (
    <div className="min-h-screen bg-stone-50" style={gridStyle}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 text-blue-900 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex items-center gap-2 group cursor-pointer">
                <ShieldIcon className="h-8 w-8 text-blue-900 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-2xl font-heading font-bold text-blue-900">Sampark</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-blue-900 mb-4">Welcome Back</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Choose your role to access the Sampark platform and manage your community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Resident Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-blue-200">
                <Users className="h-10 w-10 text-blue-900" />
              </div>
              <CardTitle className="text-2xl font-heading text-gray-800 mb-1">Resident</CardTitle>
              <CardDescription className="text-lg text-gray-600">Access community features, file complaints, and connect with neighbors</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin("resident", residentEmail, residentPassword); }} className="space-y-4">
                <div>
                  <Label htmlFor="resident-email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input 
                    id="resident-email" 
                    type="email" 
                    placeholder="resident@sampark.com" 
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 rounded-lg h-11"
                    value={residentEmail}
                    onChange={(e) => setResidentEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resident-password" className="text-sm font-semibold text-gray-700">Password</Label>
                  <Input 
                    id="resident-password" 
                    type="password" 
                    placeholder="password123" 
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 rounded-lg h-11"
                    value={residentPassword}
                    onChange={(e) => setResidentPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-semibold bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 h-11 rounded-lg shadow-md transition-all duration-200"
                  disabled={loading === "resident"}
                >
                  {loading === "resident" ? "Signing In..." : "Sign In as Resident"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Secretary Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-yellow-200">
                <Building className="h-10 w-10 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl font-heading text-gray-800 mb-1">Society Secretary</CardTitle>
              <CardDescription className="text-lg text-gray-600">Manage society operations, announcements, and maintenance requests</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin("secretary", secretaryEmail, secretaryPassword); }} className="space-y-4">
                <div>
                  <Label htmlFor="secretary-email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input 
                    id="secretary-email" 
                    type="email" 
                    placeholder="secretary@sampark.com" 
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 rounded-lg h-11"
                    value={secretaryEmail}
                    onChange={(e) => setSecretaryEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="secretary-password" className="text-sm font-semibold text-gray-700">Password</Label>
                  <Input 
                    id="secretary-password" 
                    type="password" 
                    placeholder="password123" 
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 rounded-lg h-11"
                    value={secretaryPassword}
                    onChange={(e) => setSecretaryPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-semibold bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 h-11 rounded-lg shadow-md transition-all duration-200"
                  disabled={loading === "secretary"}
                >
                  {loading === "secretary" ? "Signing In..." : "Sign In as Secretary"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Area Head Login */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-purple-200">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-heading text-gray-800 mb-1">Area Head</CardTitle>
              <CardDescription className="text-lg text-gray-600">Oversee multiple societies, monitor compliance, and handle emergencies</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin("area-head", areaHeadEmail, areaHeadPassword); }} className="space-y-4">
                <div>
                  <Label htmlFor="officer-email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input 
                    id="officer-email" 
                    type="email" 
                    placeholder="areahead@sampark.com" 
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 rounded-lg h-11"
                    value={areaHeadEmail}
                    onChange={(e) => setAreaHeadEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="officer-password" className="text-sm font-semibold text-gray-700">Password</Label>
                  <Input 
                    id="officer-password" 
                    type="password" 
                    placeholder="password123" 
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 rounded-lg h-11"
                    value={areaHeadPassword}
                    onChange={(e) => setAreaHeadPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-semibold bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 h-11 rounded-lg shadow-md transition-all duration-200"
                  disabled={loading === "area-head"}
                >
                  {loading === "area-head" ? "Signing In..." : "Sign In as Area Head"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center space-y-3">
          <p className="text-gray-600 text-sm bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <span className="font-medium">Demo Credentials:</span><br />
            <span className="text-xs mt-2 block">
              Resident: resident@sampark.com | Secretary: secretary@sampark.com | Area Head: areahead@sampark.com<br />
              Password for all: <strong>password123</strong>
            </span>
          </p>

          <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-blue-900 font-semibold">
                Want to get ID/Password? Register here →
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Registration Request</DialogTitle>
                <DialogDescription>
                  Submit your registration request for verification
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                {/* Registration Type */}
                <div className="space-y-2">
                  <Label htmlFor="reg-type" className="font-semibold">Registration Type *</Label>
                  <Select value={registrationType} onValueChange={(value: any) => setRegistrationType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resident">Resident (Verified by Secretary)</SelectItem>
                      <SelectItem value="secretary">Society Secretary (Verified by Area Head)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="font-semibold">Full Name *</Label>
                  <Input
                    id="reg-name"
                    placeholder="Enter your full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="font-semibold">Email Address *</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="reg-phone" className="font-semibold">Phone Number *</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    placeholder="9876543210"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="reg-address" className="font-semibold">Address *</Label>
                  <Textarea
                    id="reg-address"
                    placeholder="Enter your complete address"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                {/* Conditional Fields */}
                {registrationType === "resident" ? (
                  <div className="space-y-2">
                    <Label htmlFor="reg-apartment" className="font-semibold">Apartment Number *</Label>
                    <Input
                      id="reg-apartment"
                      placeholder="e.g., A-101"
                      value={regApartment}
                      onChange={(e) => setRegApartment(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="reg-society" className="font-semibold">Society Name *</Label>
                    <Input
                      id="reg-society"
                      placeholder="Enter society name"
                      value={regSocietyName}
                      onChange={(e) => setRegSocietyName(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label htmlFor="reg-document" className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {registrationType === "resident" 
                      ? "Apartment Allotment Letter *" 
                      : "Address Proof & Property Proof *"}
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-900 transition-colors">
                    <Input
                      id="reg-document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setRegDocument(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {registrationType === "resident" 
                        ? "Upload apartment allotment letter (PDF, JPG, PNG)" 
                        : "Upload address proof and property proof documents (PDF, JPG, PNG)"}
                    </p>
                  </div>
                  {regDocument && (
                    <p className="text-sm text-green-600 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {regDocument.name}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setRegistrationOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-900 hover:bg-blue-800"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Login;