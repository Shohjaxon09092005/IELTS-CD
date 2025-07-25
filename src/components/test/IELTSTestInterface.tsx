import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Flag, 
  Home, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import ListeningModule from "@/components/test/ListeningModule";
import ReadingModule from "@/components/test/ReadingModule";
import WritingModule from "@/components/test/WritingModule";
import SpeakingModule from "@/components/test/SpeakingModule";

interface TestProgress {
  listening: { completed: number; total: number; status: 'not-started' | 'in-progress' | 'completed' };
  reading: { completed: number; total: number; status: 'not-started' | 'in-progress' | 'completed' };
  writing: { completed: number; total: number; status: 'not-started' | 'in-progress' | 'completed' };
  speaking: { completed: number; total: number; status: 'not-started' | 'in-progress' | 'completed' };
}

const IELTSTestInterface = () => {
  const [activeModule, setActiveModule] = useState("listening");
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 3 hours in seconds
  const [testProgress, setTestProgress] = useState<TestProgress>({
    listening: { completed: 0, total: 40, status: 'in-progress' },
    reading: { completed: 0, total: 40, status: 'not-started' },
    writing: { completed: 0, total: 2, status: 'not-started' },
    speaking: { completed: 0, total: 3, status: 'not-started' },
  });

  // Global timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getOverallProgress = () => {
    const totalQuestions = Object.values(testProgress).reduce((sum, module) => sum + module.total, 0);
    const completedQuestions = Object.values(testProgress).reduce((sum, module) => sum + module.completed, 0);
    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  const getModuleIcon = (module: string, status: string) => {
    const iconClass = "w-5 h-5";
    let IconComponent;
    
    switch (module) {
      case 'listening': IconComponent = Headphones; break;
      case 'reading': IconComponent = BookOpen; break;
      case 'writing': IconComponent = PenTool; break;
      case 'speaking': IconComponent = Mic; break;
      default: IconComponent = Home;
    }

    let statusIcon;
    if (status === 'completed') statusIcon = <CheckCircle2 className="w-4 h-4 text-success" />;
    else if (status === 'in-progress') statusIcon = <AlertCircle className="w-4 h-4 text-warning" />;

    return (
      <div className="flex items-center gap-2">
        <IconComponent className={iconClass} />
        {statusIcon}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Test Header */}
      <div className="border-b bg-card shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-lg font-semibold">IELTS Computer Delivered Test</h1>
                <p className="text-sm text-muted-foreground">Academic Module</p>
              </div>
              
              {/* Global Progress */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Progress:</span>
                <Progress value={getOverallProgress()} className="w-32" />
                <span className="text-sm text-muted-foreground">{getOverallProgress()}%</span>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg font-semibold">{formatTime(timeRemaining)}</span>
              </div>
              
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Help
              </Button>
            </div>
          </div>

          {/* Module Navigation */}
          <div className="flex items-center gap-1 mt-3">
            {Object.entries(testProgress).map(([module, progress]) => (
              <Button
                key={module}
                variant={activeModule === module ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveModule(module)}
                className="flex items-center gap-2 min-w-[120px] justify-start"
              >
                {getModuleIcon(module, progress.status)}
                <span className="capitalize">{module}</span>
                <span className="text-xs opacity-70">
                  {progress.completed}/{progress.total}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Test Content */}
      <div className="flex h-[calc(100vh-120px)]">
        <main className="flex-1">
          <Tabs value={activeModule} onValueChange={setActiveModule} className="h-full">
            <TabsContent value="listening" className="h-full mt-0">
              <ListeningModule 
                onProgressUpdate={(completed) => 
                  setTestProgress(prev => ({
                    ...prev,
                    listening: { ...prev.listening, completed, status: completed === 40 ? 'completed' : 'in-progress' }
                  }))
                }
              />
            </TabsContent>
            
            <TabsContent value="reading" className="h-full mt-0">
              <ReadingModule 
                onProgressUpdate={(completed) => 
                  setTestProgress(prev => ({
                    ...prev,
                    reading: { ...prev.reading, completed, status: completed === 40 ? 'completed' : 'in-progress' }
                  }))
                }
              />
            </TabsContent>
            
            <TabsContent value="writing" className="h-full mt-0">
              <WritingModule 
                onProgressUpdate={(completed) => 
                  setTestProgress(prev => ({
                    ...prev,
                    writing: { ...prev.writing, completed, status: completed === 2 ? 'completed' : 'in-progress' }
                  }))
                }
              />
            </TabsContent>
            
            <TabsContent value="speaking" className="h-full mt-0">
              <SpeakingModule 
                onProgressUpdate={(completed) => 
                  setTestProgress(prev => ({
                    ...prev,
                    speaking: { ...prev.speaking, completed, status: completed === 3 ? 'completed' : 'in-progress' }
                  }))
                }
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default IELTSTestInterface;