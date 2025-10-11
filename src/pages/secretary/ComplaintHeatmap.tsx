import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const ComplaintHeatmap = () => {
  const hotspots = [
    { area: "Block A - Parking Area", complaints: 15, severity: "high" },
    { area: "Block C - Gate Area", complaints: 8, severity: "medium" },
    { area: "Ground Floor Corridor", complaints: 5, severity: "low" },
    { area: "Community Hall", complaints: 3, severity: "low" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Layout userRole="secretary">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Complaint Heatmap</h1>
          <p className="text-muted-foreground">Identify problem areas with high complaint frequency</p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Society Layout - Complaint Zones</CardTitle>
            <CardDescription>Areas with red overlays have higher complaint frequency</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[500px] bg-muted/30">
              {/* Simulated map with colored zones */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 800 500" className="text-muted-foreground">
                  {/* Buildings */}
                  <rect x="50" y="50" width="150" height="180" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
                  <text x="125" y="140" textAnchor="middle" className="fill-foreground font-medium">Block A</text>
                  
                  <rect x="250" y="50" width="150" height="180" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
                  <text x="325" y="140" textAnchor="middle" className="fill-foreground font-medium">Block B</text>
                  
                  <rect x="450" y="50" width="150" height="180" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
                  <text x="525" y="140" textAnchor="middle" className="fill-foreground font-medium">Block C</text>
                  
                  {/* Heat overlays */}
                  <rect x="50" y="240" width="150" height="60" fill="#ef4444" opacity="0.5" />
                  <text x="125" y="275" textAnchor="middle" className="fill-white font-bold text-sm">15 Complaints</text>
                  
                  <rect x="450" y="50" width="150" height="50" fill="#f59e0b" opacity="0.4" />
                  <text x="525" y="80" textAnchor="middle" className="fill-white font-bold text-sm">8 Complaints</text>
                  
                  <rect x="150" y="350" width="120" height="80" fill="#10b981" opacity="0.3" />
                  <text x="210" y="395" textAnchor="middle" className="fill-white font-bold text-sm">5 Complaints</text>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High-Complaint Areas</CardTitle>
            <CardDescription>Locations requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hotspots.map((spot, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover-lift">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{spot.area}</p>
                      <p className="text-sm text-muted-foreground">{spot.complaints} complaints logged</p>
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(spot.severity)}>
                    {spot.severity.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ComplaintHeatmap;
