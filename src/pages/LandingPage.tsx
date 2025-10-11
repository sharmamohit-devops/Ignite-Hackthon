import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Users, MessageSquare, TrendingUp, 
  AlertCircle, Bell, MapPin, BarChart3, CheckCircle,
  Star, Building2, Clock, Phone, Mail, Globe,
  ArrowRight, Menu, X, Facebook, Twitter, Instagram, Linkedin, ChevronDown
} from "lucide-react";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { number: "12,000+", label: "Housing Societies", sublabel: "Across India" },
    { number: "2.5 Lakh+", label: "Active Residents", sublabel: "Using Sampark" },
    { number: "95%", label: "Issue Resolution", sublabel: "Within 48 hours" },
    { number: "24/7", label: "Emergency Support", sublabel: "Always Available" }
  ];

  const features = [
    {
      icon: AlertCircle,
      title: "Emergency SOS Alert",
      description: "Instant alerts to residents within 500m radius and local police/medical services",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: MessageSquare,
      title: "Smart Complaint Management",
      description: "AI-powered categorization and automated routing to maintenance teams",
      color: "text-blue-900",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: "Community Marketplace",
      description: "Buy, sell, rent items. Share resources like tools, books within society",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track maintenance costs, complaint trends, vendor performance metrics",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Bell,
      title: "Multi-language Notifications",
      description: "Announcements in Hindi, English, and 10+ regional languages",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: MapPin,
      title: "Visual Heatmap",
      description: "Identify problem zones - parking, water leakage, security blind spots",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Secretary, Green Valley Apartments",
      location: "Gurugram, Haryana",
      content: "Sampark reduced our complaint resolution time from 7 days to 2 days. The heatmap feature helped us identify recurring drainage issues.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Resident, Sunshine Heights",
      location: "Mumbai, Maharashtra",
      content: "The SOS feature gave our elderly parents peace of mind. Community marketplace helped us find a tutor within our society.",
      rating: 5
    },
    {
      name: "Amit Verma",
      role: "Area Officer, Municipal Corporation",
      location: "Noida, Uttar Pradesh",
      content: "Managing 50+ societies became easier. Real-time data helps us prioritize resource allocation and emergency response.",
      rating: 5
    }
  ];

  const useCases = [
    {
      title: "For Residents",
      points: [
        "File complaints with photo evidence",
        "Track maintenance payment history",
        "Connect with verified vendors",
        "Participate in society polls"
      ]
    },
    {
      title: "For Society Management",
      points: [
        "Approve new member registrations",
        "Broadcast important announcements",
        "Generate expense & income reports",
        "Manage visitor & vendor access"
      ]
    },
    {
      title: "For Government Officials",
      points: [
        "Monitor multiple societies at once",
        "Verify society registrations",
        "Access emergency alert logs",
        "Review compliance reports"
      ]
    }
  ];

  const gridPattern = `data:image/svg+xml,%3Csvg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.05"%3E%3Cline x1="0" y1="0" x2="32" y2="0"/%3E%3Cline x1="0" y1="8" x2="32" y2="8"/%3E%3Cline x1="0" y1="16" x2="32" y2="16"/%3E%3Cline x1="0" y1="24" x2="32" y2="24"/%3E%3Cline x1="0" y1="32" x2="32" y2="32"/%3E%3Cline x1="0" y1="0" x2="0" y2="32"/%3E%3Cline x1="8" y1="0" x2="8" y2="32"/%3E%3Cline x1="16" y1="0" x2="16" y2="32"/%3E%3Cline x1="24" y1="0" x2="24" y2="32"/%3E%3Cline x1="32" y1="0" x2="32" y2="32"/%3E%3C/g%3E%3C/svg%3E`;

  const gridStyle = {
    backgroundImage: `url(${gridPattern})`,
    backgroundRepeat: 'repeat'
  };

  return (
    <div className="min-h-screen">
      {/* Simplified Header with only Logo and Login - Enhanced mobile spacing */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-blue-900 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xl sm:text-2xl font-heading font-bold text-blue-900">Sampark</span>
            </div>
            <div className="group cursor-pointer">
              <Button 
                onClick={() => navigate("/login")} 
                className="font-semibold transition-all duration-200 hover:shadow-md bg-blue-900 text-white hover:bg-blue-800 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                Login / Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with off-white background - Improved mobile typography and spacing */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <div className="group">
              <Badge className="bg-blue-900/10 text-blue-900 border-blue-900/20 hover:bg-blue-900/20 transition-colors duration-200 inline-flex items-center gap-1 text-xs sm:text-sm px-3 py-1">
                <Shield className="h-3 w-3" />
                Trusted by 12,000+ Housing Societies Across India
              </Badge>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-blue-900 leading-tight">
              India's Leading Community Management Platform
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              From Mumbai high-rises to Delhi gated communities - Sampark empowers residents, 
              secretaries, and local authorities to build safer neighborhoods
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
              <div className="group w-auto sm:w-auto">
                <Button 
                  size="lg"
                  className="bg-yellow-100 text-blue-900 hover:bg-yellow-200 font-semibold text-base sm:text-lg px-4 sm:px-10 py-6 sm:py-7 h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)] w-auto"
                  onClick={() => navigate("/login")}
                >
                  Start Free Trial
                </Button>
              </div>
              <div className="group inline-flex items-center w-auto sm:w-auto justify-center">
                <Button 
                  size="lg"
                  variant="ghost"
                  className="text-blue-900 hover:text-blue-900 hover:bg-transparent font-semibold text-sm sm:text-base py-4 sm:py-6 h-auto transition-all duration-200 pr-0 w-auto justify-start sm:justify-center px-4 sm:px-6"
                  onClick={() => navigate("/login")}
                >
                  Watch Demo
                </Button>
                <ArrowRight className="h-4 w-4 text-blue-900 transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with refined typography and hover effects - Better mobile grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center space-y-2 group cursor-default p-2 sm:p-0"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 font-heading group-hover:text-blue-900/80 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-800 text-sm sm:text-base">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with enhanced card shadows and animations - Improved mobile spacing */}
      <section className="py-12 sm:py-16 md:py-20 bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-blue-900">
              Everything Your Community Needs
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Comprehensive tools designed specifically for Indian residential complexes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group"
                >
                  <Card 
                    className="border-2 hover:border-blue-900/60 transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-sm hover:-translate-y-1 h-full rounded-xl p-4 sm:p-0"
                  >
                    <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                      <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl ${feature.bgColor} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-heading text-gray-800">{feature.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base leading-relaxed text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section with gradient enhancements - Enhanced mobile list spacing */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-blue-900">
              Built for Every Stakeholder
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Tailored features for residents, management committees, and government officials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="group"
              >
                <Card className="border-2 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full rounded-xl p-4 sm:p-0">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl font-heading mb-4 sm:mb-6 text-blue-900">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ul className="space-y-2 sm:space-y-3">
                      {useCase.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 group/item">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 text-sm sm:text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with star animations - Better mobile card padding */}
      <section className="py-12 sm:py-16 md:py-20 bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-blue-900">
              Trusted Across India
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Hear from community leaders who transformed their societies with Sampark
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full rounded-xl p-4 sm:p-0">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <div
                          key={i}
                          className="group/star"
                        >
                          <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 group-hover/star:scale-110 transition-transform duration-200" />
                        </div>
                      ))}
                    </div>
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-gray-700 italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1 pt-0 p-4 sm:p-6">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 pt-1">
                      <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      {testimonial.location}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced backdrop and shadows - Mobile-optimized button widths */}
      <section className="py-12 sm:py-16 md:py-20 bg-stone-50" style={gridStyle}>
        <div className="container mx-auto px-4 sm:px-6">
          <div>
            <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-xl">
              <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 text-center space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-blue-900">
                    Ready to Transform Your Society?
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                    Join 2.5 lakh+ residents across India who are building safer, 
                    more connected communities with Sampark
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <div className="group w-full sm:w-auto">
                    <Button 
                      size="lg"
                      className="font-semibold text-base sm:text-lg px-4 sm:px-10 py-6 sm:py-7 h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)] bg-yellow-100 text-blue-900 hover:bg-yellow-200 w-full sm:w-auto"
                      onClick={() => navigate("/login")}
                    >
                      Get Started - It's Free
                    </Button>
                  </div>
                  <div className="group inline-flex items-center w-auto sm:w-auto justify-center">
                    <Button 
                      size="lg"
                      variant="ghost"
                      className="text-blue-900 hover:text-blue-900 hover:bg-transparent font-semibold text-sm sm:text-base py-4 sm:py-6 h-auto transition-all duration-200 pr-0 w-auto justify-start sm:justify-center px-4 sm:px-6"
                      onClick={() => navigate("/login")}
                    >
                      Schedule a Demo
                    </Button>
                    <ArrowRight className="h-4 w-4 text-blue-900 transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-3 sm:pt-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-900" />
                    <span>Setup in 5 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with multi-column layout, social links, and better styling - Improved mobile grid and spacing */}
      <footer className="bg-gradient-to-b from-slate-900 via-blue-950 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Logo and Description */}
            <div className="space-y-3 sm:space-y-4 col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-400" />
                <span className="text-xl sm:text-2xl font-heading font-bold">Sampark</span>
              </div>
              <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
                Building stronger, safer communities across India. Empowering residents, 
                management, and authorities with seamless communication and management tools.
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="group cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="group cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="group cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="group cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                Quick Links
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Contact</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                Company
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 block py-1">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Get in Touch</h4>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>hello@sampark.in</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Better mobile alignment */}
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-blue-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center text-center text-xs sm:text-sm text-blue-200">
              <p className="mb-3 sm:mb-0">&copy; 2025 Sampark. All rights reserved.</p>
              <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-0">
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;