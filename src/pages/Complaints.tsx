import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Trash2 } from "lucide-react";
import { getComplaints, addComplaint, deleteComplaint } from "@/lib/localStorage";
import { useAuth } from "@/contexts/AuthContext";
import { ChatBot } from "@/components/ChatBot";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Complaints = () => {
  const { user } = useAuth();
  const [complaintsList, setComplaintsList] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "",
    priority: "",
    location: "",
    description: "",
  });

  // Load complaints from localStorage
  useEffect(() => {
    const loadedComplaints = getComplaints();
    console.log('📥 Loading complaints from localStorage:', loadedComplaints.length);
    // Reverse to show newest first (latest on top)
    setComplaintsList(loadedComplaints.reverse());
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setNewComplaint((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComplaintData = {
      ...newComplaint,
      status: "Pending",
      submittedBy: user?.name || "Current User",
      submittedOn: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      imageUrl: null,
      userId: user?.id, // Add user ID to track ownership
    };
    
    const savedComplaint = addComplaint(newComplaintData);
    console.log('💾 Complaint saved with ID:', savedComplaint.id);
    setComplaintsList([savedComplaint, ...complaintsList]);
    setNewComplaint({
      title: "",
      category: "",
      priority: "",
      location: "",
      description: "",
    });
    setDialogOpen(false);
    toast.success("Complaint filed successfully!");
  };

  const handleDeleteComplaint = (complaintId: number) => {
    deleteComplaint(complaintId);
    setComplaintsList(complaintsList.filter(c => c.id !== complaintId));
    toast.success("Complaint deleted successfully!");
  };

  return (
    <Layout userRole="resident">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Complaint Box</h1>
            <p className="text-muted-foreground">Track and manage your community complaints</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                File New Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>File New Complaint</DialogTitle>
                <DialogDescription>
                  Describe your issue and we'll work on resolving it as soon as possible.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input id="title" placeholder="Brief description of the issue" required value={newComplaint.title} onChange={(e) => handleInputChange("title", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select required onValueChange={(value) => handleInputChange("category", value)} value={newComplaint.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select required onValueChange={(value) => handleInputChange("priority", value)} value={newComplaint.priority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where is the issue located?" required value={newComplaint.location} onChange={(e) => handleInputChange("location", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide detailed information about the issue"
                    className="min-h-[100px]"
                    required
                    value={newComplaint.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Upload Photo (Optional)</Label>
                  <Input id="photo" type="file" accept="image/*" />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Submit Complaint
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                  <div className="flex gap-2 items-center">
                    <Badge variant={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                    <Badge variant={getPriorityColor(complaint.priority)}>
                      {complaint.priority}
                    </Badge>
                    {/* Show delete button only for complaint owner */}
                    {complaint.userId === user?.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Complaint?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this complaint? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteComplaint(complaint.id)} className="bg-destructive hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{complaint.description}</p>
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <div className="space-y-1">
                    <p><span className="font-medium">Category:</span> {complaint.category}</p>
                    <p><span className="font-medium">Submitted:</span> {complaint.submittedOn}</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ChatBot />
    </Layout>
  );
};

export default Complaints;
