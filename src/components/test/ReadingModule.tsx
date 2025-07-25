import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  Clock,
  BookOpen,
  CheckCircle2
} from "lucide-react";

interface ReadingQuestion {
  id: number;
  passage: number;
  type: 'multiple-choice' | 'true-false-not-given' | 'matching-headings' | 'sentence-completion' | 'matching-information';
  question: string;
  options?: string[];
  headings?: string[];
  statements?: string[];
}

interface ReadingModuleProps {
  onProgressUpdate: (completed: number) => void;
}

const ReadingModule = ({ onProgressUpdate }: ReadingModuleProps) => {
  const [activePassage, setActivePassage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes

  // Mock passages and questions
  const passages = {
    1: {
      title: "The History of Chocolate",
      content: `Chocolate has a rich and fascinating history that spans over 4,000 years. The story begins with the ancient civilizations of Central America, where the cacao tree (Theobroma cacao) was first cultivated.

The Olmecs, who lived in what is now southern Mexico around 1500 BCE, were among the first to discover the potential of cacao beans. They ground the beans into a paste and mixed it with water, spices, and sometimes honey to create a bitter drink. This early chocolate beverage was quite different from the sweet treats we know today.

The Maya civilization further developed chocolate cultivation and preparation techniques between 300 and 900 CE. They considered chocolate to be a gift from the gods and used it in religious ceremonies. The Maya also developed sophisticated methods for processing cacao beans, including fermentation and roasting.

When the Spanish conquistadors arrived in the Americas in the 16th century, they encountered chocolate for the first time. Initially, they found the bitter taste unpalatable, but they soon learned to add sugar and other sweeteners to make it more appealing to European tastes.

The Spanish kept chocolate a closely guarded secret for nearly a century, enjoying it exclusively in their royal courts. However, by the 17th century, chocolate had spread throughout Europe, becoming a luxury item enjoyed by the wealthy elite.

The Industrial Revolution of the 19th century revolutionized chocolate production. In 1828, Dutch chemist Coenraad van Houten invented a hydraulic press that could extract cocoa butter from roasted cacao beans, creating cocoa powder. This innovation made chocolate more affordable and accessible to the general population.

The modern chocolate industry was born in the late 19th and early 20th centuries with the establishment of major chocolate companies. These companies developed new techniques for mass production and created many of the chocolate products we enjoy today.`
    },
    2: {
      title: "Climate Change and Arctic Wildlife",
      content: `The Arctic region is experiencing some of the most dramatic effects of climate change on Earth. As global temperatures rise, the Arctic is warming at twice the global average, a phenomenon known as Arctic amplification. This rapid warming is having profound impacts on the region's wildlife and ecosystems.

One of the most visible effects of Arctic warming is the decline in sea ice extent and thickness. Sea ice serves as a critical habitat for many Arctic species, including polar bears, seals, and walruses. As the ice melts earlier in spring and forms later in autumn, these animals face increasing challenges in finding food and suitable breeding grounds.

Polar bears, in particular, have become symbols of climate change impacts. These apex predators depend on sea ice platforms to hunt seals, their primary food source. With less stable ice and shorter hunting seasons, polar bears are struggling to maintain their body weight and successfully raise cubs. Some populations have already shown declining birth rates and increased mortality.

The changes extend beyond marine mammals to affect the entire Arctic food web. Seabirds that nest on Arctic islands are experiencing shifts in prey availability as fish populations move northward with warming waters. The timing of migration patterns is also being disrupted, as species arrive at breeding grounds to find conditions different from what they've evolved to expect.

Terrestrial Arctic ecosystems are equally affected. The warming climate is causing permafrost to thaw, releasing stored carbon and altering soil composition. This change affects plant communities and, consequently, the herbivores that depend on them, such as caribou and musk oxen.

However, some species may benefit from the changing conditions. Certain fish species are expanding their ranges northward, and some vegetation is becoming more abundant in previously frozen areas. These changes create new opportunities for some wildlife while presenting challenges for others.

Scientists emphasize that understanding these complex interactions is crucial for developing effective conservation strategies. Research stations throughout the Arctic are monitoring wildlife populations and ecosystem changes to better predict future impacts and develop adaptive management approaches.`
    },
    3: {
      title: "The Future of Urban Transportation",
      content: `Cities around the world are grappling with increasing traffic congestion, air pollution, and the need for sustainable transportation solutions. As urban populations continue to grow, innovative approaches to transportation are becoming essential for maintaining quality of life and environmental health.

Electric vehicles (EVs) represent one of the most promising developments in urban transportation. With improvements in battery technology and expanding charging infrastructure, EVs are becoming more practical for city dwellers. Many cities are implementing policies to encourage EV adoption, including tax incentives, dedicated parking spaces, and access to bus lanes.

Public transportation systems are also evolving rapidly. Cities are investing in modern, efficient transit networks that include electric buses, light rail systems, and subway expansions. These investments not only reduce traffic congestion but also provide affordable transportation options for residents of all economic levels.

The concept of shared mobility is revolutionizing how people think about transportation. Car-sharing services, bike-sharing programs, and ride-sharing platforms are reducing the need for individual vehicle ownership. This shift is particularly significant in dense urban areas where parking is limited and expensive.

Emerging technologies are opening new possibilities for urban transportation. Autonomous vehicles, while still in development, promise to improve traffic flow and reduce accidents. Similarly, urban air mobility concepts, including delivery drones and passenger-carrying aircraft, may become reality in the coming decades.

Active transportation, including walking and cycling, is being prioritized in many urban planning initiatives. Cities are creating pedestrian-friendly environments with dedicated bike lanes, car-free zones, and improved sidewalk infrastructure. These changes not only reduce emissions but also promote public health and community interaction.

The integration of smart technology is making transportation systems more efficient and user-friendly. Real-time traffic monitoring, mobile apps for transit information, and adaptive traffic signal systems are helping optimize the flow of people and goods through urban areas.

However, implementing these solutions requires significant investment and careful planning. Cities must balance the needs of different transportation modes, ensure equitable access to new technologies, and manage the transition from traditional transportation systems to more sustainable alternatives.`
    }
  };

  const questions: ReadingQuestion[] = [
    // Passage 1 Questions
    {
      id: 1,
      passage: 1,
      type: 'multiple-choice',
      question: 'According to the passage, the Olmecs were the first civilization to:',
      options: [
        'Add sugar to chocolate drinks',
        'Discover the potential of cacao beans',
        'Export chocolate to Europe',
        'Use chocolate in religious ceremonies'
      ]
    },
    {
      id: 2,
      passage: 1,
      type: 'true-false-not-given',
      question: 'The Maya considered chocolate to be a gift from the gods.',
      options: ['True', 'False', 'Not Given']
    },
    {
      id: 3,
      passage: 1,
      type: 'sentence-completion',
      question: 'The Spanish kept chocolate a closely guarded secret for nearly _______ century.',
    },
    // Add more questions for all passages...
  ];

  // Timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Update progress
  useEffect(() => {
    onProgressUpdate(Object.keys(answers).length);
  }, [answers, onProgressUpdate]);

  const getPassageQuestions = (passage: number) => {
    return questions.filter(q => q.passage === passage);
  };

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: ReadingQuestion) => {
    const isAnswered = answers[question.id] !== undefined;
    const isFlagged = flaggedQuestions.has(question.id);

    return (
      <Card key={question.id} className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Question {question.id}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={isFlagged ? "warning" : "outline"}
                size="sm"
                onClick={() => toggleFlag(question.id)}
              >
                <Flag className="w-4 h-4" />
              </Button>
              {isAnswered && <CheckCircle2 className="w-4 h-4 text-success" />}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 font-medium">{question.question}</p>

          {question.type === 'multiple-choice' && question.options && (
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswer(question.id, value)}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded hover:bg-accent">
                  <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
                  <Label htmlFor={`q${question.id}-${index}`} className="flex-1 cursor-pointer">
                    {String.fromCharCode(65 + index)}. {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'true-false-not-given' && (
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswer(question.id, value)}
            >
              {['True', 'False', 'Not Given'].map((option) => (
                <div key={option} className="flex items-center space-x-2 p-2 border rounded hover:bg-accent">
                  <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                  <Label htmlFor={`q${question.id}-${option}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'sentence-completion' && (
            <Input
              placeholder="Type your answer here..."
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Reading Passages */}
      <div className="w-1/2 border-r">
        <div className="p-4 border-b bg-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Reading Passages</h2>
            <div className="flex items-center gap-2 text-warning">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <Tabs value={activePassage.toString()} onValueChange={(value) => setActivePassage(parseInt(value))}>
          <TabsList className="w-full justify-start p-1 bg-muted">
            {Object.keys(passages).map((passageNum) => (
              <TabsTrigger 
                key={passageNum} 
                value={passageNum}
                className="flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Passage {passageNum}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(passages).map(([passageNum, passage]) => (
            <TabsContent key={passageNum} value={passageNum} className="h-[calc(100vh-180px)]">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{passage.title}</h3>
                  <div className="prose max-w-none text-sm leading-relaxed">
                    {passage.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Right Panel - Questions */}
      <div className="w-1/2">
        <div className="p-4 border-b bg-card">
          <h3 className="text-lg font-semibold">
            Questions for Passage {activePassage}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getPassageQuestions(activePassage).length} questions
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-6">
            {getPassageQuestions(activePassage).map(renderQuestion)}
          </div>
        </ScrollArea>

        {/* Navigation */}
        <div className="p-4 border-t bg-card">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setActivePassage(Math.max(1, activePassage - 1))}
              disabled={activePassage === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Passage
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Passage {activePassage} of 3
            </div>

            <Button
              onClick={() => setActivePassage(Math.min(3, activePassage + 1))}
              disabled={activePassage === 3}
            >
              Next Passage
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingModule;