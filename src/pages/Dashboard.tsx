import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Pin, Languages, Trash2, Send, X } from "lucide-react";
import { getPosts, addPost, updatePost, deletePost, getCommentsByPost, addComment, deleteComment } from "@/lib/localStorage";
import { useAuth } from "@/contexts/AuthContext";
import { ChatBot } from "@/components/ChatBot";
import { toast } from "sonner";
import { autoTranslate } from "@/lib/translate";
import { Input } from "@/components/ui/input";
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

const Dashboard = () => {
  const { user } = useAuth();
  const [postsData, setPostsData] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

  // Load posts from localStorage
  useEffect(() => {
    const loadedPosts = getPosts();
    console.log('📥 Loading posts from localStorage:', loadedPosts.length);
    // Reverse to show newest first (latest on top)
    const postsWithState = loadedPosts.reverse().map((p: any) => ({ 
      ...p, 
      showTranslation: false 
    }));
    setPostsData(postsWithState);
  }, []);


  const toggleTranslation = async (id: number) => {
    const post = postsData.find(p => p.id === id);
    if (!post) return;

    // If already translated, just toggle
    if (post.translatedContent) {
      setPostsData(prev => prev.map(p => 
        p.id === id ? { ...p, showTranslation: !p.showTranslation } : p
      ));
      return;
    }

    // First time translation - call API
    toast.loading("Translating...", { id: `translate-${id}` });
    
    try {
      const translated = await autoTranslate(post.content);
      
      setPostsData(prev => prev.map(p => 
        p.id === id ? { 
          ...p, 
          translatedContent: translated,
          showTranslation: true 
        } : p
      ));
      
      // Update in localStorage
      updatePost(id, { translatedContent: translated });
      
      toast.success("Translated!", { id: `translate-${id}` });
    } catch (error) {
      toast.error("Translation failed", { id: `translate-${id}` });
    }
  };

  const handleLike = (id: number) => {
    const updatedPosts = postsData.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setPostsData(updatedPosts);
    
    // Update in localStorage
    const post = updatedPosts.find(p => p.id === id);
    if (post) {
      updatePost(id, { likes: post.likes });
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      toast.error("Please write something!");
      return;
    }

    const newPostData = {
      author: user?.name || "Current User",
      avatar: user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=new-user",
      role: user?.role === 'secretary' ? 'Admin' : 'Resident',
      timestamp: "Just now",
      isPinned: false,
      content: newPostContent,
      likes: 0,
      comments: 0,
      translatedContent: "",
      aiSummary: "This is a new post.",
      userId: user?.id, // Add user ID to track ownership
    };

    const savedPost = addPost(newPostData);
    console.log('💾 Post saved with ID:', savedPost.id);
    setPostsData([{ ...savedPost, showSummary: false, showTranslation: false }, ...postsData]);
    setNewPostContent("");
    toast.success("Post created successfully!");
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId);
    setPostsData(postsData.filter(p => p.id !== postId));
    toast.success("Post deleted successfully!");
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) {
      toast.error("Please write a comment!");
      return;
    }

    const newComment = {
      postId,
      userId: user?.id,
      author: user?.name || "User",
      avatar: user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      content: commentText,
      timestamp: "Just now",
    };

    addComment(newComment);
    
    // Update post comments count
    const post = postsData.find(p => p.id === postId);
    if (post) {
      const updatedComments = (post.comments || 0) + 1;
      updatePost(postId, { comments: updatedComments });
      setPostsData(prev => prev.map(p => 
        p.id === postId ? { ...p, comments: updatedComments } : p
      ));
    }

    // Clear input
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
    toast.success("Comment added!");
  };

  const handleDeleteComment = (commentId: number, postId: number) => {
    deleteComment(commentId);
    
    // Update post comments count
    const post = postsData.find(p => p.id === postId);
    if (post && post.comments > 0) {
      const updatedComments = post.comments - 1;
      updatePost(postId, { comments: updatedComments });
      setPostsData(prev => prev.map(p => 
        p.id === postId ? { ...p, comments: updatedComments } : p
      ));
    }
    
    toast.success("Comment deleted!");
  };

  return (
    <Layout userRole="resident">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Community Feed</h1>
            <p className="text-muted-foreground">Stay updated with what's happening in your community</p>
          </div>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Create a Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
                <div className="flex justify-end">
                  <Button type="submit">Post</Button>
                </div>
              </form>
            </CardContent>
          </Card>
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
                <div className="flex items-center gap-2">
                  {post.isPinned && (
                    <Badge variant="secondary" className="gap-1">
                      <Pin className="h-3 w-3" />
                      Pinned
                    </Badge>
                  )}
                  {/* Show delete button only for post owner */}
                  {post.userId === user?.id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this post? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeletePost(post.id)} className="bg-destructive hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {post.showTranslation ? post.translatedContent : post.content}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                  {post.comments || 0}
                </Button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  {/* Comment Input */}
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        className="flex-1"
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3">
                    {getCommentsByPost(post.id).reverse().map((comment: any) => (
                      <div key={comment.id} className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted rounded-lg p-3 relative group">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            {comment.userId === user?.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDeleteComment(comment.id, post.id)}
                              >
                                <X className="h-3 w-3 text-destructive" />
                              </Button>
                            )}
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <ChatBot />
    </Layout>
  );
};

export default Dashboard;
