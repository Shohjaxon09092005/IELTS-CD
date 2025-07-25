import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  Volume2, 
  Flag, 
  ArrowLeft, 
  ArrowRight,
  SkipForward,
  Clock
} from "lucide-react";

interface Question {
  id: number;
  type: 'multiple-choice' | 'checkbox' | 'fill-blank' | 'short-answer';
  question: string;
  options?: string[];
  answer?: string | string[];
  audioTimestamp?: number;
  section: number;
}

interface ListeningModuleProps {
  onProgressUpdate: (completed: number) => void;
}

const ListeningModule = ({ onProgressUpdate }: ListeningModuleProps) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [sectionTime, setSectionTime] = useState(600); // 10 minutes per section
  const [hasPlayedSection, setHasPlayedSection] = useState<Set<number>>(new Set());
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock questions data
  const questions: Question[] = [
    {
      id: 1,
      section: 1,
      type: 'multiple-choice',
      question: 'What time does the library close on weekdays?',
      options: ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
      audioTimestamp: 15
    },
    {
      id: 2,
      section: 1,
      type: 'fill-blank',
      question: 'The library is located on _______ Street.',
      audioTimestamp: 45
    },
    {
      id: 3,
      section: 1,
      type: 'checkbox',
      question: 'Which services are available at the library? (Select all that apply)',
      options: ['Computer access', 'Printing', 'Study rooms', 'Café', 'Parking'],
      audioTimestamp: 78
    },
    // Add more questions for all sections...
  ];

  const getSectionQuestions = (section: number) => {
    return questions.filter(q => q.section === section);
  };

  const getCurrentQuestion = () => {
    const sectionQuestions = getSectionQuestions(currentSection);
    return sectionQuestions.find(q => q.id === currentQuestion);
  };

  // Timer for section
  useEffect(() => {
    if (sectionTime > 0) {
      const timer = setInterval(() => {
        setSectionTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sectionTime]);

  // Update progress
  useEffect(() => {
    const completedAnswers = Object.keys(answers).length;
    onProgressUpdate(completedAnswers);
  }, [answers, onProgressUpdate]);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const playAudio = () => {
    if (!hasPlayedSection.has(currentSection)) {
      setHasPlayedSection(prev => new Set([...prev, currentSection]));
    }
    setIsPlaying(true);
    // Mock audio playback
    setTimeout(() => setIsPlaying(false), 30000); // 30 second mock
  };

  const nextQuestion = () => {
    const sectionQuestions = getSectionQuestions(currentSection);
    if (currentQuestion < sectionQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const nextSection = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(1);
      setSectionTime(600);
    }
  };

  const renderQuestion = () => {
    const question = getCurrentQuestion();
    if (!question) return null;

    const questionId = question.id;
    const isAnswered = answers[questionId] !== undefined;
    const isFlagged = flaggedQuestions.has(questionId);

    return (
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Question {currentQuestion} of {getSectionQuestions(currentSection).length}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={isFlagged ? "warning" : "outline"}
                size="sm"
                onClick={() => toggleFlag(questionId)}
              >
                <Flag className="w-4 h-4" />
              </Button>
              {isAnswered && <div className="w-2 h-2 bg-success rounded-full" />}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg font-medium">{question.question}</p>

            {question.type === 'multiple-choice' && question.options && (
              <RadioGroup
                value={answers[questionId] || ""}
                onValueChange={(value) => handleAnswer(questionId, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {String.fromCharCode(65 + index)}. {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === 'checkbox' && question.options && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                    <Checkbox
                      id={`checkbox-${index}`}
                      checked={(answers[questionId] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const currentAnswers = answers[questionId] || [];
                        if (checked) {
                          handleAnswer(questionId, [...currentAnswers, option]);
                        } else {
                          handleAnswer(questionId, currentAnswers.filter((a: string) => a !== option));
                        }
                      }}
                    />
                    <Label htmlFor={`checkbox-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {(question.type === 'fill-blank' || question.type === 'short-answer') && (
              <Input
                placeholder="Type your answer here..."
                value={answers[questionId] || ""}
                onChange={(e) => handleAnswer(questionId, e.target.value)}
                className="text-lg"
              />
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={currentQuestion === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Section {currentSection} • Question {currentQuestion}
              </span>
            </div>

            <Button onClick={nextQuestion}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Listening Test - Section {currentSection}</h2>
              <p className="text-muted-foreground">
                {currentSection === 1 && "Social/Survival Context - Conversation between two speakers"}
                {currentSection === 2 && "Social/Survival Context - Monologue"}
                {currentSection === 3 && "Educational Context - Conversation"}
                {currentSection === 4 && "Educational Context - Academic lecture"}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-warning">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{Math.floor(sectionTime / 60)}:{(sectionTime % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Audio Player */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Section {currentSection} Audio</h3>
                <div className="text-sm text-muted-foreground">
                  {hasPlayedSection.has(currentSection) ? "Audio played" : "Click play to start"}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant={isPlaying ? "secondary" : "default"}
                  size="lg"
                  onClick={playAudio}
                  disabled={hasPlayedSection.has(currentSection)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {hasPlayedSection.has(currentSection) ? "Audio Complete" : "Play Audio"}
                </Button>
                
                <div className="flex-1">
                  <Progress value={audioProgress} className="h-2" />
                </div>
                
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-mono">2:30 / 8:45</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                Note: You can only play the audio once per section. Listen carefully.
              </p>
            </CardContent>
          </Card>

          {/* Question */}
          {renderQuestion()}

          {/* Section Navigation */}
          {currentQuestion === getSectionQuestions(currentSection).length && (
            <Card className="border-primary">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Section {currentSection} Complete</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to move to the next section?
                </p>
                <Button variant="gradient" size="lg" onClick={nextSection}>
                  <SkipForward className="w-4 h-4 mr-2" />
                  Go to Section {currentSection + 1}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Sidebar - Question Navigator */}
      <div className="w-80 border-l bg-card p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {getSectionQuestions(currentSection).map((q, index) => {
                const questionNum = index + 1;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flaggedQuestions.has(q.id);
                const isCurrent = questionNum === currentQuestion;
                
                return (
                  <Button
                    key={q.id}
                    variant={isCurrent ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentQuestion(questionNum)}
                    className={`w-10 h-10 p-0 relative ${
                      isAnswered ? 'border-success border-2' : ''
                    } ${isFlagged ? 'bg-warning/10' : ''}`}
                  >
                    {questionNum}
                    {isFlagged && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 text-warning" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-success rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-warning/20 rounded"></div>
              <span>Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Current</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Instructions</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Listen to the audio once</li>
              <li>• Answer all questions</li>
              <li>• Flag questions for review</li>
              <li>• Move between questions freely</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningModule;