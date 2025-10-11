import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar } from "lucide-react";
import { polls } from "@/data/mockData";
import { ChatBot } from "@/components/ChatBot";

const Polls = () => {
  const [pollsData, setPollsData] = useState(polls);
  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());

  const handleVote = (pollId: number, optionId: number) => {
    if (votedPolls.has(pollId)) return;

    setPollsData(prev => prev.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(opt =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));

    setVotedPolls(prev => new Set(prev).add(pollId));
  };

  return (
    <Layout userRole="resident">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Polls & Surveys</h1>
          <p className="text-muted-foreground">Have your say in community decisions</p>
        </div>

        <div className="space-y-6">
          {pollsData.map(poll => {
            const hasVoted = votedPolls.has(poll.id);

            return (
              <Card key={poll.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-accent" />
                        {poll.question}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Ends: {poll.endDate}
                        </span>
                        <span>{poll.totalVotes} votes</span>
                      </CardDescription>
                    </div>
                    {poll.active && (
                      <Badge variant="default">Active</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {poll.options.map(option => {
                    const percentage = Math.round((option.votes / poll.totalVotes) * 100);

                    return (
                      <div key={option.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Button
                            variant={hasVoted ? "outline" : "default"}
                            size="sm"
                            onClick={() => handleVote(poll.id, option.id)}
                            disabled={hasVoted}
                            className="flex-1 justify-start"
                          >
                            {option.text}
                          </Button>
                          {hasVoted && (
                            <span className="ml-3 text-sm font-medium w-16 text-right">
                              {option.votes} ({percentage}%)
                            </span>
                          )}
                        </div>
                        {hasVoted && (
                          <Progress value={percentage} className="h-2" />
                        )}
                      </div>
                    );
                  })}

                  {hasVoted && (
                    <p className="text-sm text-muted-foreground pt-2">
                      Thanks for voting! Results are updated in real-time.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <ChatBot />
    </Layout>
  );
};

export default Polls;
