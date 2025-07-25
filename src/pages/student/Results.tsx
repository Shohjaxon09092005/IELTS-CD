import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trophy, Target, TrendingUp } from "lucide-react";

const Results = () => {
  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Test Completed!</h1>
          <p className="text-muted-foreground">Here are your detailed results</p>
        </div>

        {/* Overall Score */}
        <Card className="shadow-large mb-8">
          <CardHeader className="text-center">
            <CardTitle>Overall Band Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">7.5</div>
            <p className="text-muted-foreground mb-6">Good User Level</p>
            <Button variant="gradient" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Section Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { name: "Listening", score: 8.0, icon: "🎧", color: "text-success" },
            { name: "Reading", score: 7.5, icon: "📖", color: "text-success" },
            { name: "Writing", score: 7.0, icon: "✍️", color: "text-warning" },
            { name: "Speaking", score: 7.5, icon: "🎤", color: "text-success" },
          ].map((section) => (
            <Card key={section.name} className="shadow-medium text-center">
              <CardHeader>
                <div className="text-3xl mb-2">{section.icon}</div>
                <CardTitle className="text-lg">{section.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${section.color} mb-2`}>
                  {section.score}
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(section.score / 9) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Strengths & Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-success mb-2">Strengths</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Excellent listening comprehension</li>
                    <li>• Strong vocabulary range</li>
                    <li>• Good pronunciation and fluency</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-warning mb-2">Areas for Improvement</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Writing task organization</li>
                    <li>• Complex grammatical structures</li>
                    <li>• Academic vocabulary in writing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Previous Best</span>
                  <span className="font-semibold">7.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Score</span>
                  <span className="font-semibold text-success">7.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Improvement</span>
                  <span className="font-semibold text-success">+0.5</span>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Recommended Next Steps</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Practice writing task 2 essays</li>
                    <li>• Focus on complex sentence structures</li>
                    <li>• Take another practice test in 2 weeks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="gradient" size="lg">
            Take Another Test
          </Button>
          <Button variant="outline" size="lg">
            Review Answers
          </Button>
          <Button variant="outline" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;