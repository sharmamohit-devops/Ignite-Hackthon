import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Share2, Repeat, Plus, User, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatBot } from "@/components/ChatBot";
import { useAuth } from "@/contexts/AuthContext";
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

const CommunityHub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMySubmissions, setShowMySubmissions] = useState(false);
  const [viewResponsesDialog, setViewResponsesDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [buySellItems, setBuySellItems] = useState([
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80",
      title: "Sofa Set - 3+2 Seater",
      price: "₹15,000",
      description: "Gently used fabric sofa set in excellent condition. Moving to new city, must sell.",
      seller: "Priya Sharma",
      postedOn: "2 days ago",
      userId: 1
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop&q=80",
      title: "Study Table with Chair",
      price: "₹3,500",
      description: "Wooden study table with comfortable chair. Perfect for kids or home office.",
      seller: "Rajesh Kumar",
      postedOn: "1 day ago",
      userId: 1
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop&q=80",
      title: "Refrigerator - Samsung 260L",
      price: "₹12,000",
      description: "5 years old, working perfectly. Double door, frost-free. Selling due to upgrade.",
      seller: "Amit Patel",
      postedOn: "3 days ago",
      userId: 2
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop&q=80",
      title: "Kids Bicycle - Age 5-8",
      price: "₹2,500",
      description: "Hero brand bicycle with training wheels. Good condition, rarely used.",
      seller: "Neha Gupta",
      postedOn: "4 days ago",
      userId: 1
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop&q=80",
      title: "Wireless Headphones",
      price: "₹1,800",
      description: "Sony WH-CH510, 1 year old. Excellent sound quality, with box and warranty.",
      seller: "Vikram Singh",
      postedOn: "1 week ago",
      userId: 2
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=300&fit=crop&q=80",
      title: "Microwave Oven - LG 20L",
      price: "₹4,500",
      description: "Solo microwave, 3 years old. All functions working. Includes user manual.",
      seller: "Anjali Reddy",
      postedOn: "5 days ago",
      userId: 1
    },
    {
      id: 7,
      imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=300&fit=crop&q=80",
      title: "Bookshelf - 5 Tier Wooden",
      price: "₹2,800",
      description: "Solid wood bookshelf, can hold 50+ books. Sturdy and in great condition.",
      seller: "Rahul Mehta",
      postedOn: "2 days ago",
      userId: 1
    },
    {
      id: 8,
      imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop&q=80",
      title: "Washing Machine - IFB 6kg",
      price: "₹8,500",
      description: "Front load, fully automatic. 4 years old, well maintained. Selling due to relocation.",
      seller: "Sunita Joshi",
      postedOn: "1 week ago",
      userId: 2
    }
  ]);

  const [resourceItems, setResourceItems] = useState([
    {
      id: 1,
      title: "Lending Pressure Cooker",
      description: "Need a pressure cooker for cooking biryani this weekend? Happy to lend mine.",
      status: "Available",
      provider: "Neha Gupta",
      responses: "3",
      userId: 1
    },
    {
      id: 2,
      title: "Borrowing Gardening Tools",
      description: "Looking to borrow a trowel and pruning shears for balcony plants. Will return soon.",
      status: "Requested",
      requester: "Vikram Singh",
      responses: "2",
      userId: 2
    },
    {
      id: 3,
      title: "Sharing Children's Books",
      description: "Have Amar Chitra Katha comics to share with kids in the society.",
      status: "Available",
      provider: "Sunita Reddy",
      responses: "1",
      userId: 1
    }
  ]);

  const [skillItems, setSkillItems] = useState([
    {
      id: 1,
      title: "Yoga & Pranayama Classes",
      description: "Experienced instructor offering morning yoga sessions. In exchange for Hindi tuition.",
      offerer: "Anita Joshi",
      seeking: "Basic English conversation practice",
      responses: "4",
      userId: 1
    },
    {
      id: 2,
      title: "South Indian Cooking Lessons",
      description: "Teach authentic dosa and idli making. Looking to learn North Indian paneer dishes.",
      offerer: "Karthik Nair",
      seeking: "Guitar basics for beginners",
      responses: "2",
      userId: 2
    },
    {
      id: 3,
      title: "Bharatanatyam Dance Workshop",
      description: "Classical dance lessons for kids and adults. Trade for computer repair skills.",
      offerer: "Lakshmi Menon",
      seeking: "Mobile app troubleshooting",
      responses: "5",
      userId: 1
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [postType, setPostType] = useState("buy-sell");
  const [newPost, setNewPost] = useState<any>({});

  const handleInputChange = (field: string, value: string) => {
    setNewPost((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPostData = {
      id: Date.now(),
      ...newPost,
      postedOn: "Just now",
      seller: user?.name || "Current User",
      provider: user?.name || "Current User",
      offerer: user?.name || "Current User",
      requester: user?.name || "Current User",
      responses: "0",
      userId: user?.id,
    };

    if (postType === "buy-sell") {
      setBuySellItems([newPostData, ...buySellItems]);
    } else if (postType === "resources") {
      setResourceItems([newPostData, ...resourceItems]);
    } else if (postType === "skills") {
      setSkillItems([newPostData, ...skillItems]);
    }

    setNewPost({});
    setDialogOpen(false);
    toast.success("Posted successfully!");
  };

  const handleDeleteBuySell = (id: number) => {
    setBuySellItems(buySellItems.filter(item => item.id !== id));
    toast.success("Item deleted!");
  };

  const handleDeleteResource = (id: number) => {
    setResourceItems(resourceItems.filter(item => item.id !== id));
    toast.success("Resource deleted!");
  };

  const handleDeleteSkill = (id: number) => {
    setSkillItems(skillItems.filter(item => item.id !== id));
    toast.success("Skill deleted!");
  };

  const myBuySellItems = buySellItems.filter(item => item.userId === user?.id);
  const myResourceItems = resourceItems.filter(item => item.userId === user?.id);
  const mySkillItems = skillItems.filter(item => item.userId === user?.id);

  console.log('Current User ID:', user?.id);
  console.log('My Buy/Sell Items:', myBuySellItems.length);
  console.log('My Resource Items:', myResourceItems.length);
  console.log('My Skill Items:', mySkillItems.length);

  // Mock responses data
  const mockResponses: any = {
    1: [
      { name: "Rajesh Kumar", phone: "9876543210", message: "I'm interested!" },
      { name: "Amit Patel", phone: "9123456789", message: "Can I borrow this weekend?" },
      { name: "Neha Gupta", phone: "9988776655", message: "Still available?" }
    ],
    2: [
      { name: "Priya Sharma", phone: "9876543211", message: "I have these tools" },
      { name: "Vikram Singh", phone: "9123456788", message: "You can borrow mine" }
    ],
    3: [
      { name: "Sunita Joshi", phone: "9988776656", message: "My kids would love this!" }
    ]
  };

  const handleViewResponses = (item: any) => {
    setSelectedItem(item);
    setViewResponsesDialog(true);
  };

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  return (
    <Layout userRole="resident">
      <div className="min-h-screen bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-blue-900 mb-2">Community Hub</h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Buy, sell, share resources, and exchange skills with your neighbors.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowMySubmissions(!showMySubmissions)}
              >
                <User className="h-4 w-4" />
                {showMySubmissions ? "View All" : "My Submissions"}
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </Button>
                </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                  <DialogDescription>
                    Share something with your community. Select the post type and fill in the details.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="post-type">Post Type</Label>
                    <Select onValueChange={setPostType} defaultValue={postType}>
                      <SelectTrigger id="post-type">
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy-sell">Buy & Sell</SelectItem>
                        <SelectItem value="resources">Resource Sharing</SelectItem>
                        <SelectItem value="skills">Skill Exchange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {postType === 'buy-sell' && (
                    <>
                      <div>
                        <Label htmlFor="title">Item Title</Label>
                        <Input id="title" placeholder="e.g., Handwoven Banarasi Saree" required onChange={(e) => handleInputChange("title", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" placeholder="e.g., ₹2,500" required onChange={(e) => handleInputChange("price", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the item" required onChange={(e) => handleInputChange("description", e.target.value)} />
                      </div>
                    </>
                  )}

                  {postType === 'resources' && (
                    <>
                      <div>
                        <Label htmlFor="title">Resource Title</Label>
                        <Input id="title" placeholder="e.g., Lending Pressure Cooker" required onChange={(e) => handleInputChange("title", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the resource you are offering or requesting" required onChange={(e) => handleInputChange("description", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select required onValueChange={(value) => handleInputChange("status", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="Requested">Requested</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {postType === 'skills' && (
                    <>
                      <div>
                        <Label htmlFor="title">Skill Title</Label>
                        <Input id="title" placeholder="e.g., Yoga & Pranayama Classes" required onChange={(e) => handleInputChange("title", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the skill you are offering" required onChange={(e) => handleInputChange("description", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="seeking">Seeking</Label>
                        <Input id="seeking" placeholder="What you are seeking in return" required onChange={(e) => handleInputChange("seeking", e.target.value)} />
                      </div>
                    </>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Post</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            </div>
          </div>

          <Tabs defaultValue="buy-sell" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 shadow-sm">
              <TabsTrigger 
                value="buy-sell" 
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white rounded-lg font-semibold transition-all duration-200"
              >
                Buy & Sell
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white rounded-lg font-semibold transition-all duration-200"
              >
                Resource Sharing
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white rounded-lg font-semibold transition-all duration-200"
              >
                Skill Exchange
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy-sell" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                {(showMySubmissions ? myBuySellItems : buySellItems).map(item => (
                  <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
                    <div className="aspect-video overflow-hidden rounded-t-xl">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="text-xl font-heading text-gray-800">{item.title}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-blue-900 mt-1">{item.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 pt-0">
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-800">{item.seller}</span>
                        <span className="text-gray-500">{item.postedOn}</span>
                      </div>
                      {showMySubmissions && item.userId === user?.id ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="lg" className="w-full gap-2">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this item? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteBuySell(item.id)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <Button size="lg" className="w-full font-semibold bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 rounded-lg shadow-md transition-all duration-200 gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Contact Seller
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              {showMySubmissions && myBuySellItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>You haven't posted any items yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              {(showMySubmissions ? myResourceItems : resourceItems).map(item => (
                <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-heading flex items-center gap-2 text-gray-800">
                          <Share2 className="h-5 w-5 text-yellow-600" />
                          {item.title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-gray-600">{item.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={item.status === "Available" ? "default" : "secondary"}
                        className={item.status === "Available" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold text-gray-800">
                          {item.requester ? `Requested by: ${item.requester}` : `Offered by: ${item.provider}`}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{item.responses} responses</p>
                      </div>
                      {showMySubmissions && item.userId === user?.id ? (
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="font-semibold border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-lg transition-all duration-200"
                          onClick={() => handleViewResponses(item)}
                        >
                          View Responses ({item.responses})
                        </Button>
                      ) : (
                        <Button size="lg" variant="outline" className="font-semibold border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-lg transition-all duration-200">
                          Respond
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              {(showMySubmissions ? mySkillItems : skillItems).map(item => (
                <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-heading flex items-center gap-2 text-gray-800 mb-2">
                      <Repeat className="h-5 w-5 text-purple-600" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-semibold text-gray-800">Offered by:</span> {item.offerer}</p>
                      <p className="text-sm"><span className="font-semibold text-gray-800">Seeking:</span> {item.seeking}</p>
                      <p className="text-xs text-gray-500">{item.responses} interested</p>
                    </div>
                    {showMySubmissions && item.userId === user?.id ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="font-semibold border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white rounded-lg transition-all duration-200"
                        onClick={() => handleViewResponses(item)}
                      >
                        View Responses ({item.responses})
                      </Button>
                    ) : (
                      <Button size="sm" className="font-semibold bg-gradient-to-r from-purple-900 to-purple-800 text-white hover:from-purple-800 hover:to-purple-700 rounded-lg shadow-md transition-all duration-200">
                        Connect
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <ChatBot />

        {/* View Responses Dialog */}
        <Dialog open={viewResponsesDialog} onOpenChange={setViewResponsesDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Responses & Requests</DialogTitle>
              <DialogDescription>
                People who have responded to your post
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {selectedItem && mockResponses[selectedItem.id]?.map((response: any, index: number) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-900" />
                          <span className="font-semibold text-gray-800">{response.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-mono">📞 {response.phone}</span>
                        </div>
                        <p className="text-sm text-gray-600 italic">"{response.message}"</p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {selectedItem && !mockResponses[selectedItem.id] && (
                <div className="text-center py-8 text-gray-500">
                  <p>No responses yet</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CommunityHub;