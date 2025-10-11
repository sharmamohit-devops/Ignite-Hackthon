import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, FileText, TrendingUp, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SecretaryDashboard = () => {
  const navigate = useNavigate();

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  const stats = [
    { title: "Total Members", value: "156", icon: Users, color: "text-blue-900" },
    { title: "Pending Complaints", value: "12", icon: MessageSquare, color: "text-red-600" },
    { title: "Resolved This Month", value: "45", icon: FileText, color: "text-green-600" },
    { title: "Member Requests", value: "3", icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <Layout userRole="secretary">
      <div className="min-h-screen bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-blue-900 mb-4">Secretary Dashboard</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Manage your community efficiently with real-time insights and tools
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-gray-600 font-medium">{stat.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl md:text-4xl font-bold text-blue-900">{stat.value}</span>
                      <div className={`h-12 w-12 rounded-xl ${stat.color === 'text-blue-900' ? 'bg-blue-50' : stat.color === 'text-red-600' ? 'bg-red-50' : stat.color === 'text-green-600' ? 'bg-green-50' : 'bg-orange-50'} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-heading text-gray-800">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">Latest updates from your community</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {[
                  "New member request from Rahul Sharma (D-502)",
                  "Complaint #124 resolved - Street light fixed",
                  "New poll created: Community cricket tournament",
                  "Maintenance payment received from 45 residents"
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="h-2 w-2 rounded-full bg-blue-900"></div>
                    <p className="text-sm text-gray-700 font-medium">{activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SecretaryDashboard;