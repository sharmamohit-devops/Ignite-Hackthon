import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { complaints } from "@/data/mockData";
import { toast } from "sonner";

const AllComplaints = () => {
  const [complaintsList, setComplaintsList] = useState(complaints);

  const handleStatusChange = (id: number, newStatus: string) => {
    setComplaintsList(prev => prev.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    toast.success(`Complaint status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "default";
      case "In Progress": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Layout userRole="secretary">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">All Complaints</h1>
          <p className="text-muted-foreground">Manage and track all community complaints</p>
        </div>

        <div className="space-y-4">
          {complaintsList.map(complaint => (
            <Card key={complaint.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {complaint.title}
                    </CardTitle>
                    <CardDescription>{complaint.location}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(complaint.priority)}>
                      {complaint.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{complaint.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 pt-2 border-t">
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Category:</span> {complaint.category}</p>
                    <p><span className="font-medium">Submitted by:</span> {complaint.submittedBy}</p>
                    <p><span className="font-medium">Date:</span> {complaint.submittedOn}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Update Status</label>
                    <Select
                      value={complaint.status}
                      onValueChange={(value) => handleStatusChange(complaint.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllComplaints;
