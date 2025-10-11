import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, XCircle } from "lucide-react";
import { pendingCommunities } from "@/data/mockData";
import { toast } from "sonner";

const CommunityRequests = () => {
  const [requests, setRequests] = useState(pendingCommunities);

  const handleApprove = (id: number) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    toast.success("Community approved successfully!");
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    toast.error("Community request rejected");
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
              <Card key={request.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.name}</CardTitle>
                      <CardDescription>
                        {request.location} | Applied on: {request.appliedOn}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Secretary:</span> {request.secretary}
                    </div>
                    <div>
                      <span className="font-medium">Total Members:</span> {request.members}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Email:</span> {request.email}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Documents:</span> {request.documents}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t">
                    <Button
                      variant="default"
                      className="flex-1 gap-2"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve Community
                    </Button>
                    <Button
                      variant="outline"
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
