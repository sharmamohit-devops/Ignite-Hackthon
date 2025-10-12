import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, Users, MessageSquare, FileText, BookOpen, 
  BarChart3, Menu, X, Bell, Search, AlertCircle,
  LogOut, Settings, Shield, ArrowLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SOSModal } from "./SOSModal";

interface LayoutProps {
  children: ReactNode;
  userRole?: "resident" | "secretary" | "area-head";
}

export const Layout = ({ children, userRole = "resident" }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sosModalOpen, setSOSModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  const residentLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/community-hub", icon: Users, label: "Community Hub" },
    { to: "/complaints", icon: MessageSquare, label: "Complaint Box" },
    { to: "/directory", icon: BookOpen, label: "Directory" },
    { to: "/polls", icon: BarChart3, label: "Polls & Surveys" },
  ];

  const secretaryLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/secretary/dashboard", icon: Home, label: "Dashboard" },
    { to: "/secretary/members", icon: Users, label: "Member Requests" },
    { to: "/secretary/complaints", icon: MessageSquare, label: "All Complaints" },
    { to: "/secretary/heatmap", icon: BarChart3, label: "Complaint Heatmap" },
  ];

  const areaHeadLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/area-head/dashboard", icon: Home, label: "Dashboard" },
    { to: "/area-head/communities", icon: Users, label: "Community Requests" },
  ];

  const links = 
    userRole === "secretary" ? secretaryLinks :
    userRole === "area-head" ? areaHeadLinks :
    residentLinks;

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };


  const dashboardPaths = [
    "/dashboard",
    "/secretary/dashboard",
    "/area-head/dashboard",
  ];
  const showBackButton = !dashboardPaths.includes(location.pathname);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-stone-50" style={gridStyle}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-900 text-white shadow-lg border-b border-blue-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-heading font-bold text-white tracking-tight">Sampark</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-1.5">
            <Search className="h-4 w-4 text-white/60 mr-2" />
            <Input 
              placeholder="Search..." 
              className="bg-transparent border-0 text-white placeholder:text-white/50 h-7 w-64 focus-visible:ring-0"
            />
          </div>

          {/* SOS Button */}
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setSOSModalOpen(true)}
            className="font-semibold gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <AlertCircle className="h-4 w-4" />
            SOS
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback className="bg-white/20 text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-blue-900 text-white border-r border-blue-800 transition-all duration-300 z-40 md:w-64 ${
          sidebarOpen ? "w-64 md:w-64" : "w-0"
        } overflow-hidden`}
      >
        <nav className="p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-800/50 ${
                  isActive(link.to)
                    ? "bg-blue-800 text-white font-medium"
                    : "text-blue-200 hover:bg-blue-800/30"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* SOS Modal */}
      <SOSModal open={sosModalOpen} onOpenChange={setSOSModalOpen} />
    </div>
  );
};