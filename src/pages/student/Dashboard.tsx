import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, BookOpen, BarChart3, Clock, Award } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to IELTS Pro Hub</h1>
          <p className="text-muted-foreground">Ready to practice your IELTS skills today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Start New Test Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-primary" />
                Start New Test
              </CardTitle>
              <CardDescription>
                Begin a complete IELTS practice test with all four modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full" variant="gradient">
                Start Practice Test
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-success" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tests Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <span className="font-semibold text-success">7.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Best Score</span>
                  <span className="font-semibold text-primary">8.0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-3">
                  <p className="text-sm font-medium">Practice Test #12</p>
                  <p className="text-xs text-muted-foreground">2 days ago • Score: 7.5</p>
                </div>
                <div className="border-l-2 border-muted pl-3">
                  <p className="text-sm font-medium">Listening Practice</p>
                  <p className="text-xs text-muted-foreground">5 days ago • Score: 8.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { name: "Listening", icon: "🎧", duration: "30 min", color: "border-l-blue-500" },
            { name: "Reading", icon: "📖", duration: "60 min", color: "border-l-green-500" },
            { name: "Writing", icon: "✍️", duration: "60 min", color: "border-l-orange-500" },
            { name: "Speaking", icon: "🎤", duration: "15 min", color: "border-l-purple-500" },
          ].map((module) => (
            <Card key={module.name} className={`shadow-soft hover:shadow-medium transition-shadow border-l-4 ${module.color}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{module.icon}</span>
                  <span className="text-xs text-muted-foreground">{module.duration}</span>
                </div>
                <h3 className="font-semibold">{module.name}</h3>
                <a href="/student/test"><Button variant="outline" size="sm" className="w-full mt-2">
                  Practice
                </Button></a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;