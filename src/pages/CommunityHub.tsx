import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Share2, Repeat, Users, Building, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatBot } from "@/components/ChatBot";

const CommunityHub = () => {
  const navigate = useNavigate();

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  // Indian-themed Buy & Sell data
  const buyAndSell = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      title: "Handwoven Banarasi Saree",
      price: "₹2,500",
      description: "Authentic silk Banarasi saree in red with gold zari work. Worn once for a wedding.",
      seller: "Priya Sharma",
      postedOn: "2 days ago"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1573897537163-7359e8972c72?w=400&h=300&fit=crop",
      title: "Spices Gift Box - Garam Masala Set",
      price: "₹450",
      description: "Premium organic spice mix from Kerala. Includes 5 varieties, fresh and aromatic.",
      seller: "Rajesh Kumar",
      postedOn: "1 day ago"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      title: "Used Royal Enfield Bullet 350",
      price: "₹1,20,000",
      description: "Well-maintained 2018 model, low mileage, single owner. Perfect for city rides.",
      seller: "Amit Patel",
      postedOn: "5 days ago"
    }
  ];

  // Indian-themed Resource Sharing data
  const resourceSharing = [
    {
      id: 1,
      title: "Lending Pressure Cooker",
      description: "Need a pressure cooker for cooking biryani this weekend? Happy to lend mine.",
      status: "Available",
      provider: "Neha Gupta",
      responses: "3"
    },
    {
      id: 2,
      title: "Borrowing Gardening Tools",
      description: "Looking to borrow a trowel and pruning shears for balcony plants. Will return soon.",
      status: "Requested",
      requester: "Vikram Singh",
      responses: "2"
    },
    {
      id: 3,
      title: "Sharing Children's Books",
      description: "Have Amar Chitra Katha comics to share with kids in the society.",
      status: "Available",
      provider: "Sunita Reddy",
      responses: "1"
    }
  ];

  // Indian-themed Skill Exchange data
  const skillExchange = [
    {
      id: 1,
      title: "Yoga & Pranayama Classes",
      description: "Experienced instructor offering morning yoga sessions. In exchange for Hindi tuition.",
      offerer: "Anita Joshi",
      seeking: "Basic English conversation practice",
      responses: "4"
    },
    {
      id: 2,
      title: "South Indian Cooking Lessons",
      description: "Teach authentic dosa and idli making. Looking to learn North Indian paneer dishes.",
      offerer: "Karthik Nair",
      seeking: "Guitar basics for beginners",
      responses: "2"
    },
    {
      id: 3,
      title: "Bharatanatyam Dance Workshop",
      description: "Classical dance lessons for kids and adults. Trade for computer repair skills.",
      offerer: "Lakshmi Menon",
      seeking: "Mobile app troubleshooting",
      responses: "3"
    }
  ];

  return (
    <Layout userRole="resident">
      <div className="min-h-screen bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-blue-900 mb-4">Community Hub</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Buy, sell, share resources, and exchange skills with your neighbors across India
            </p>
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
              <div className="grid md:grid-cols-3 gap-6">
                {buyAndSell.map(item => (
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
                      <Button size="lg" className="w-full font-semibold bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 rounded-lg shadow-md transition-all duration-200 gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Contact Seller
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              {resourceSharing.map(item => (
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
                      <Button size="lg" variant="outline" className="font-semibold border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-lg transition-all duration-200">
                        Respond
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              {skillExchange.map(item => (
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
                    <Button size="sm" className="font-semibold bg-gradient-to-r from-purple-900 to-purple-800 text-white hover:from-purple-800 hover:to-purple-700 rounded-lg shadow-md transition-all duration-200">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <ChatBot />
      </div>
    </Layout>
  );
};

export default CommunityHub;