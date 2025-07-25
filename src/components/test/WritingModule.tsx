import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Save, 
  FileText, 
  BarChart3,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface WritingModuleProps {
  onProgressUpdate: (completed: number) => void;
}

const WritingModule = ({ onProgressUpdate }: WritingModuleProps) => {
  const [activeTask, setActiveTask] = useState("task1");
  const [task1Content, setTask1Content] = useState("");
  const [task2Content, setTask2Content] = useState("");
  const [task1WordCount, setTask1WordCount] = useState(0);
  const [task2WordCount, setTask2WordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  
  const task1Ref = useRef<HTMLTextAreaElement>(null);
  const task2Ref = useRef<HTMLTextAreaElement>(null);

  // Auto-save every 30 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      // Simulate auto-save
      setLastSaved(new Date());
    }, 30000);

    return () => clearInterval(saveInterval);
  }, []);

  // Timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Word count calculation
  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  // Update word counts and progress
  useEffect(() => {
    const newTask1Count = countWords(task1Content);
    const newTask2Count = countWords(task2Content);
    setTask1WordCount(newTask1Count);
    setTask2WordCount(newTask2Count);

    // Update progress based on word count milestones
    let completed = 0;
    if (newTask1Count >= 150) completed += 1; // Task 1 minimum words
    if (newTask2Count >= 250) completed += 1; // Task 2 minimum words
    
    onProgressUpdate(completed);
  }, [task1Content, task2Content, onProgressUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getWordCountStatus = (count: number, minimum: number, ideal: number) => {
    if (count < minimum) return { status: 'low', color: 'text-destructive' };
    if (count < ideal) return { status: 'medium', color: 'text-warning' };
    return { status: 'good', color: 'text-success' };
  };

  const task1Status = getWordCountStatus(task1WordCount, 150, 200);
  const task2Status = getWordCountStatus(task2WordCount, 250, 300);

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Writing Test</h2>
            <p className="text-sm text-muted-foreground">
              Complete both tasks within 60 minutes
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Auto-saved: {lastSaved.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2 text-warning">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Now
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Main Writing Area */}
        <div className="flex-1">
          <Tabs value={activeTask} onValueChange={setActiveTask} className="h-full">
            <TabsList className="w-full justify-start p-1 bg-muted">
              <TabsTrigger value="task1" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Task 1
                {task1WordCount >= 150 ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning" />
                )}
              </TabsTrigger>
              <TabsTrigger value="task2" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Task 2
                {task2WordCount >= 250 ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning" />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="task1" className="h-[calc(100%-50px)] mt-0">
              <div className="h-full flex">
                {/* Task 1 Instructions */}
                <div className="w-1/3 border-r bg-muted/30 p-6">
                  <h3 className="font-semibold mb-4">Writing Task 1</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">Time: 20 minutes</p>
                      <p className="font-medium mb-2">Words: minimum 150</p>
                    </div>
                    
                    <div className="bg-card p-4 rounded-lg">
                      <p className="font-medium mb-2">Instructions:</p>
                      <p>
                        The chart below shows the percentage of households in owned and rented 
                        accommodation in England and Wales between 1918 and 2011.
                      </p>
                      <p className="mt-2">
                        Summarise the information by selecting and reporting the main features, 
                        and make comparisons where relevant.
                      </p>
                    </div>

                    {/* Mock Chart Image */}
                    <div className="bg-card p-4 rounded-lg">
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded border-2 border-dashed border-primary/30 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">Bar Chart: Housing Data 1918-2011</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-3 rounded">
                      <p className="text-xs">
                        <strong>Tip:</strong> Describe the overall trend, highlight key features, 
                        and make relevant comparisons between different time periods.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Task 1 Writing Area */}
                <div className="flex-1 p-6">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Your Response</h4>
                      <div className="flex items-center gap-4">
                        <div className={`text-sm ${task1Status.color}`}>
                          Words: {task1WordCount}
                          {task1WordCount < 150 && ` (${150 - task1WordCount} more needed)`}
                        </div>
                        <Progress 
                          value={Math.min((task1WordCount / 200) * 100, 100)} 
                          className="w-32" 
                        />
                      </div>
                    </div>
                    
                    <Textarea
                      ref={task1Ref}
                      placeholder="Begin your Task 1 response here..."
                      value={task1Content}
                      onChange={(e) => setTask1Content(e.target.value)}
                      className="flex-1 resize-none text-base leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="task2" className="h-[calc(100%-50px)] mt-0">
              <div className="h-full flex">
                {/* Task 2 Instructions */}
                <div className="w-1/3 border-r bg-muted/30 p-6">
                  <h3 className="font-semibold mb-4">Writing Task 2</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">Time: 40 minutes</p>
                      <p className="font-medium mb-2">Words: minimum 250</p>
                    </div>
                    
                    <div className="bg-card p-4 rounded-lg">
                      <p className="font-medium mb-2">Question:</p>
                      <p>
                        Some people think that all university students should study whatever they like. 
                        Others believe that they should only be allowed to study subjects that will be 
                        useful in the future, such as those related to science and technology.
                      </p>
                      <p className="mt-2 font-medium">
                        Discuss both these views and give your own opinion.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Essay Structure:</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Introduction with thesis statement</li>
                        <li>• Body paragraph 1: First viewpoint</li>
                        <li>• Body paragraph 2: Second viewpoint</li>
                        <li>• Body paragraph 3: Your opinion</li>
                        <li>• Conclusion summarizing main points</li>
                      </ul>
                    </div>

                    <div className="bg-primary/5 p-3 rounded">
                      <p className="text-xs">
                        <strong>Tip:</strong> Present both sides fairly, use specific examples, 
                        and clearly state your position with supporting arguments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Task 2 Writing Area */}
                <div className="flex-1 p-6">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Your Essay</h4>
                      <div className="flex items-center gap-4">
                        <div className={`text-sm ${task2Status.color}`}>
                          Words: {task2WordCount}
                          {task2WordCount < 250 && ` (${250 - task2WordCount} more needed)`}
                        </div>
                        <Progress 
                          value={Math.min((task2WordCount / 350) * 100, 100)} 
                          className="w-32" 
                        />
                      </div>
                    </div>
                    
                    <Textarea
                      ref={task2Ref}
                      placeholder="Begin your Task 2 essay here..."
                      value={task2Content}
                      onChange={(e) => setTask2Content(e.target.value)}
                      className="flex-1 resize-none text-base leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Writing Tools */}
        <div className="w-80 border-l bg-card p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Writing Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Task 1</span>
                  <span className={`text-sm font-medium ${task1Status.color}`}>
                    {task1WordCount}/150+ words
                  </span>
                </div>
                <Progress value={Math.min((task1WordCount / 200) * 100, 100)} />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Task 2</span>
                  <span className={`text-sm font-medium ${task2Status.color}`}>
                    {task2WordCount}/250+ words
                  </span>
                </div>
                <Progress value={Math.min((task2WordCount / 350) * 100, 100)} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Time Allocation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Task 1 (suggested):</span>
                  <span>20 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Task 2 (suggested):</span>
                  <span>40 minutes</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total time:</span>
                  <span>60 minutes</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Writing Tips</h3>
              <div className="text-xs space-y-2 text-muted-foreground">
                <p>• Plan your essays before writing</p>
                <p>• Use a variety of sentence structures</p>
                <p>• Check grammar and spelling</p>
                <p>• Stay within word limits</p>
                <p>• Answer all parts of the question</p>
                <p>• Use formal academic language</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Assessment Criteria</h3>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>• Task Achievement/Response</p>
                <p>• Coherence and Cohesion</p>
                <p>• Lexical Resource</p>
                <p>• Grammatical Range and Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingModule;