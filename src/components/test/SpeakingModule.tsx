import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square,
  Clock,
  User,
  MessageSquare,
  Users,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface SpeakingModuleProps {
  onProgressUpdate: (completed: number) => void;
}

const SpeakingModule = ({ onProgressUpdate }: SpeakingModuleProps) => {
  const [currentPart, setCurrentPart] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [preparationTime, setPreparationTime] = useState(60);
  const [speakingTime, setSpeakingTime] = useState(120);
  const [isPreparationPhase, setIsPreparationPhase] = useState(false);
  const [completedParts, setCompletedParts] = useState<Set<number>>(new Set());
  const [recordings, setRecordings] = useState<Record<number, Blob | null>>({});
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Request microphone permission on component mount
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  // Timer for preparation phase
  useEffect(() => {
    if (isPreparationPhase && preparationTime > 0) {
      const timer = setInterval(() => {
        setPreparationTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPreparationPhase, preparationTime]);

  // Timer for speaking phase
  useEffect(() => {
    if (isRecording && speakingTime > 0) {
      const timer = setInterval(() => {
        setSpeakingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRecording, speakingTime]);

  // Update progress
  useEffect(() => {
    onProgressUpdate(completedParts.size);
  }, [completedParts, onProgressUpdate]);

  const startRecording = async () => {
    if (!hasPermission) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordings(prev => ({ ...prev, [currentPart]: audioBlob }));
        setCompletedParts(prev => new Set([...prev, currentPart]));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = (part: number) => {
    const recording = recordings[part];
    if (recording) {
      const audio = new Audio(URL.createObjectURL(recording));
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const startPreparation = () => {
    setIsPreparationPhase(true);
    setPreparationTime(60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getPartContent = () => {
    switch (currentPart) {
      case 1:
        return {
          title: "Part 1: Introduction and Interview",
          description: "Personal questions about yourself, your family, your interests, etc.",
          duration: "4-5 minutes",
          icon: <User className="w-6 h-6" />,
          questions: [
            "What's your full name?",
            "Where are you from?",
            "Do you work or study?",
            "What do you enjoy doing in your free time?",
            "How important is family to you?",
            "What kind of music do you like?"
          ]
        };
      case 2:
        return {
          title: "Part 2: Long Turn (Cue Card)",
          description: "Speak for 1-2 minutes on a given topic after 1 minute preparation",
          duration: "3-4 minutes (including preparation)",
          icon: <MessageSquare className="w-6 h-6" />,
          cueCard: {
            topic: "Describe a memorable journey you have taken",
            points: [
              "Where you went",
              "Who you went with",
              "What you did during the journey",
              "Why it was memorable"
            ]
          }
        };
      case 3:
        return {
          title: "Part 3: Discussion",
          description: "More abstract questions related to the Part 2 topic",
          duration: "4-5 minutes",
          icon: <Users className="w-6 h-6" />,
          questions: [
            "How has travel changed over the past few decades?",
            "What are the benefits of traveling to different countries?",
            "Do you think tourism has a positive or negative impact on local communities?",
            "How might technology change the way we travel in the future?"
          ]
        };
      default:
        return null;
    }
  };

  const partContent = getPartContent();
  if (!partContent) return null;

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {partContent.icon}
            <div>
              <h2 className="text-lg font-semibold">{partContent.title}</h2>
              <p className="text-sm text-muted-foreground">
                {partContent.description} • {partContent.duration}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isPreparationPhase && (
              <div className="flex items-center gap-2 text-warning">
                <Clock className="w-4 h-4" />
                <span className="font-mono">Preparation: {formatTime(preparationTime)}</span>
              </div>
            )}
            {isRecording && (
              <div className="flex items-center gap-2 text-success">
                <Clock className="w-4 h-4" />
                <span className="font-mono">Speaking: {formatTime(speakingTime)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Microphone Permission Check */}
            {!hasPermission && (
              <Alert className="border-warning bg-warning/10">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  Microphone access is required for the Speaking test. Please allow microphone access and refresh the page.
                </AlertDescription>
              </Alert>
            )}

            {/* Part 1: Personal Questions */}
            {currentPart === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Interview Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        The examiner will ask you personal questions. Answer naturally and provide some detail.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {partContent.questions?.map((question, index) => (
                          <div key={index} className="p-3 border rounded-lg bg-muted/30">
                            <p className="text-sm">{question}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Part 2: Cue Card */}
            {currentPart === 2 && (
              <div className="space-y-6">
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle>Cue Card Topic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{partContent.cueCard?.topic}</h3>
                      <p>You should say:</p>
                      <ul className="space-y-2">
                        {partContent.cueCard?.points.map((point, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm">
                          <strong>Note:</strong> You will have 1 minute to prepare and can make notes. 
                          Then speak for 1-2 minutes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {!isPreparationPhase && !completedParts.has(2) && (
                  <div className="text-center">
                    <Button variant="gradient" size="lg" onClick={startPreparation}>
                      Start 1-Minute Preparation
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Part 3: Discussion Questions */}
            {currentPart === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        These questions are more abstract and require you to discuss ideas and give opinions.
                      </p>
                      <div className="space-y-3">
                        {partContent.questions?.map((question, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <p className="font-medium">{question}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recording Controls */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {isRecording ? (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                      )}
                      <span className="font-medium">
                        {isRecording ? "Recording..." : "Ready to record"}
                      </span>
                    </div>
                    
                    {recordings[currentPart] && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playRecording(currentPart)}
                        disabled={isPlaying}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Play Recording
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!isRecording && hasPermission && (
                      currentPart === 2 ? (
                        isPreparationPhase && preparationTime === 0 ? (
                          <Button variant="success" size="lg" onClick={startRecording}>
                            <Mic className="w-4 h-4 mr-2" />
                            Start Speaking (2 minutes)
                          </Button>
                        ) : null
                      ) : (
                        <Button variant="success" size="lg" onClick={startRecording}>
                          <Mic className="w-4 h-4 mr-2" />
                          Start Recording
                        </Button>
                      )
                    )}

                    {isRecording && (
                      <Button variant="destructive" size="lg" onClick={stopRecording}>
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                  </div>
                </div>

                {isRecording && (
                  <div className="mt-4">
                    <Progress value={(120 - speakingTime) / 120 * 100} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l bg-card p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Speaking Test Progress</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((part) => (
                  <Button
                    key={part}
                    variant={currentPart === part ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setCurrentPart(part)}
                  >
                    <div className="flex items-center gap-3">
                      {part === 1 && <User className="w-4 h-4" />}
                      {part === 2 && <MessageSquare className="w-4 h-4" />}
                      {part === 3 && <Users className="w-4 h-4" />}
                      <span>Part {part}</span>
                      {completedParts.has(part) && (
                        <CheckCircle2 className="w-4 h-4 text-success ml-auto" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Assessment Criteria</h3>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>• Fluency and Coherence</p>
                <p>• Lexical Resource</p>
                <p>• Grammatical Range and Accuracy</p>
                <p>• Pronunciation</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Speaking Tips</h3>
              <div className="text-xs space-y-2 text-muted-foreground">
                <p>• Speak clearly and at a natural pace</p>
                <p>• Don't worry about making small mistakes</p>
                <p>• Extend your answers with examples</p>
                <p>• Use a variety of vocabulary</p>
                <p>• Express opinions confidently</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Technical Info</h3>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>• Microphone: {hasPermission ? "✓ Connected" : "✗ No access"}</p>
                <p>• Recording quality: High</p>
                <p>• Auto-save: Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingModule;