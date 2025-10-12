import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X, Calendar, Trash2, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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

const SecretaryPolls = () => {
  const navigate = useNavigate();
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollEndDate, setPollEndDate] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [existingPolls, setExistingPolls] = useState<any[]>([]);

  // Load existing polls
  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = () => {
    const polls = JSON.parse(localStorage.getItem('sampark_polls') || '[]');
    setExistingPolls(polls);
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    } else {
      toast.error("Maximum 6 options allowed");
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      toast.error("Minimum 2 options required");
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!pollTitle.trim()) {
      toast.error("Please enter poll title");
      return;
    }
    if (!pollDescription.trim()) {
      toast.error("Please enter poll description");
      return;
    }
    if (!pollEndDate) {
      toast.error("Please select end date");
      return;
    }
    
    const validOptions = options.filter(opt => opt.trim() !== "");
    if (validOptions.length < 2) {
      toast.error("Please enter at least 2 options");
      return;
    }

    // Get existing polls from localStorage
    const existingPolls = JSON.parse(localStorage.getItem('sampark_polls') || '[]');
    
    // Create new poll
    const newPoll = {
      id: Date.now(),
      question: pollTitle,
      description: pollDescription,
      endDate: pollEndDate,
      totalVotes: 0,
      options: validOptions.map((opt, idx) => ({
        id: idx + 1,
        text: opt,
        votes: 0
      })),
      createdBy: "Secretary",
      createdAt: new Date().toISOString()
    };

    // Add to localStorage
    localStorage.setItem('sampark_polls', JSON.stringify([newPoll, ...existingPolls]));

    toast.success("Poll created successfully!");
    
    // Reset form
    setPollTitle("");
    setPollDescription("");
    setPollEndDate("");
    setOptions(["", ""]);
    
    // Reload polls
    loadPolls();
  };

  const handleDeletePoll = (pollId: number) => {
    const updatedPolls = existingPolls.filter(poll => poll.id !== pollId);
    localStorage.setItem('sampark_polls', JSON.stringify(updatedPolls));
    setExistingPolls(updatedPolls);
    toast.success("Poll deleted successfully!");
  };

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  return (
    <Layout userRole="secretary">
      <div className="min-h-screen bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-blue-900 mb-4">Create Poll</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Create polls and surveys to gather community feedback
            </p>
          </div>

          <Card className="rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl font-heading text-gray-800 flex items-center gap-2">
                <PlusCircle className="h-6 w-6 text-blue-900" />
                New Poll
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill in the details below to create a new poll for your community
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Poll Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">
                    Poll Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Should we organize a community cricket tournament?"
                    value={pollTitle}
                    onChange={(e) => setPollTitle(e.target.value)}
                    className="text-base"
                  />
                </div>

                {/* Poll Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about this poll..."
                    value={pollDescription}
                    onChange={(e) => setPollDescription(e.target.value)}
                    rows={3}
                    className="text-base"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-base font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Poll End Date *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={pollEndDate}
                    onChange={(e) => setPollEndDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-base"
                  />
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">
                      Poll Options * (Min: 2, Max: 6)
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      disabled={options.length >= 6}
                      className="gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Option
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="flex-1 text-base"
                        />
                        {options.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/secretary/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-900 hover:bg-blue-800"
                  >
                    Create Poll
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Polls */}
          {existingPolls.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-gray-800">
                  Existing Polls ({existingPolls.length})
                </h2>
              </div>

              <div className="space-y-4">
                {existingPolls.map((poll) => (
                  <Card key={poll.id} className="rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                    <CardHeader className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-heading text-gray-800 mb-2">
                            {poll.question}
                          </CardTitle>
                          <CardDescription className="text-gray-600 mb-3">
                            {poll.description}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Ends: {new Date(poll.endDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4" />
                              <span>{poll.totalVotes} votes</span>
                            </div>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-2">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Poll?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this poll? This action cannot be undone and all votes will be lost.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeletePoll(poll.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Options:</p>
                        <div className="grid gap-2">
                          {poll.options.map((option: any) => (
                            <div key={option.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-700">{option.text}</span>
                              <Badge variant="secondary" className="ml-2">
                                {option.votes} votes
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SecretaryPolls;
