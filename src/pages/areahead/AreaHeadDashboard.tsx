import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, FileText, TrendingUp } from "lucide-react";

const AreaHeadDashboard = () => {
  const stats = [
    { title: "Active Communities", value: "24", icon: Building, color: "text-primary" },
    { title: "Total Residents", value: "3,840", icon: Users, color: "text-accent" },
    { title: "Pending Approvals", value: "2", icon: FileText, color: "text-orange-500" },
    { title: "This Month", value: "+3", icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <Layout userRole="area-head">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Area Head Dashboard</h1>
          <p className="text-muted-foreground">Monitor and approve communities in your jurisdiction</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-lift">
                <CardHeader className="pb-3">
                  <CardDescription>{stat.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all communities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "New community registration: Green Valley Apartments (Sector 12)",
                "Sunrise Heights submitted verification documents",
                "Monthly report submitted by 22 communities",
                "Security alert resolved in Palm Grove Society"
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <p className="text-sm">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AreaHeadDashboard;
