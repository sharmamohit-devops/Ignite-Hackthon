import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, XCircle, Clock, Mail, Phone, MapPin, FileText } from "lucide-react";
import { getPendingCommunities, approveCommunity, rejectCommunity } from "@/lib/localStorage";
import { toast } from "sonner";

const CommunityRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);

  // Load secretary registration requests from localStorage
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const allRequests = JSON.parse(localStorage.getItem('sampark_registration_requests') || '[]');
    // Filter only secretary requests (area head verifies secretaries)
    const secretaryRequests = allRequests.filter((req: any) => req.type === 'secretary' && req.status === 'pending');
    setRequests(secretaryRequests);
  };

  const handleApprove = (id: number) => {
    const allRequests = JSON.parse(localStorage.getItem('sampark_registration_requests') || '[]');
    const updatedRequests = allRequests.map((req: any) => 
      req.id === id ? { ...req, status: 'approved', approvedAt: new Date().toISOString() } : req
    );
    localStorage.setItem('sampark_registration_requests', JSON.stringify(updatedRequests));
    loadRequests();
    toast.success("Secretary registration approved!");
  };

  const handleReject = (id: number) => {
    const allRequests = JSON.parse(localStorage.getItem('sampark_registration_requests') || '[]');
    const updatedRequests = allRequests.map((req: any) => 
      req.id === id ? { ...req, status: 'rejected', rejectedAt: new Date().toISOString() } : req
    );
    localStorage.setItem('sampark_registration_requests', JSON.stringify(updatedRequests));
    loadRequests();
    toast.error("Secretary registration rejected");
  };

  return (
    <Layout userRole="area-head">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Community Requests</h1>
          <p className="text-muted-foreground">Review and approve new community registrations</p>
        </div>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-lg font-medium">No pending requests</p>
              <p className="text-sm text-muted-foreground">All community applications have been processed</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map(request => (
              <Card key={request.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Building className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{request.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          {new Date(request.submittedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Email:</span>
                      <span className="text-gray-600">{request.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Phone:</span>
                      <span className="text-gray-600">{request.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:col-span-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Society:</span>
                      <span className="text-gray-600">{request.societyName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:col-span-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Document:</span>
                      <span className="text-gray-600">{request.document}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <span className="font-medium">Address:</span>
                      <p className="text-gray-600 mt-1">{request.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t">
                    <Button
                      variant="default"
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve Secretary
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 gap-2"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CommunityRequests;
