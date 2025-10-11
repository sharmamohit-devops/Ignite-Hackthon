import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Pin, Sparkles, Languages } from "lucide-react";
import { posts } from "@/data/mockData";
import { ChatBot } from "@/components/ChatBot";

const Dashboard = () => {
  const [postsData, setPostsData] = useState(posts.map(p => ({ ...p, showSummary: false, showTranslation: false })));

  const toggleSummary = (id: number) => {
    setPostsData(prev => prev.map(p => 
      p.id === id ? { ...p, showSummary: !p.showSummary } : p
    ));
  };

  const toggleTranslation = (id: number) => {
    setPostsData(prev => prev.map(p => 
      p.id === id ? { ...p, showTranslation: !p.showTranslation } : p
    ));
  };

  const handleLike = (id: number) => {
    setPostsData(prev => prev.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  return (
    <Layout userRole="resident">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Community Feed</h1>
          <p className="text-muted-foreground">Stay updated with what's happening in your community</p>
        </div>

        {postsData.map(post => (
          <Card key={post.id} className="card-shadow hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{post.author}</p>
                      {post.role === "Admin" && <Badge variant="default">Admin</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                {post.isPinned && (
                  <Badge variant="secondary" className="gap-1">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {post.showTranslation ? post.translatedContent : post.content}
              </p>

              {post.showSummary && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-sm">AI Summary</span>
                  </div>
                  <p className="text-sm text-foreground/90">{post.aiSummary}</p>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSummary(post.id)}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {post.showSummary ? "Hide" : "View"} AI Summary
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleTranslation(post.id)}
                  className="gap-2"
                >
                  <Languages className="h-4 w-4" />
                  {post.showTranslation ? "Original" : "Translate"}
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className="gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {post.comments}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ChatBot />
    </Layout>
  );
};

export default Dashboard;
