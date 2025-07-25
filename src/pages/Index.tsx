import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import LanguageSwitcher from "@/components/ui/language-switcher";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { GraduationCap, Users, Award, Clock, BookOpen, Headphones } from "lucide-react";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gradient-accent">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">IELTS Pro Hub</span>
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
       
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                  Master Your
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> IELTS </span>
                  Journey
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Experience the most comprehensive IELTS Computer-Delivered testing platform. 
                  Practice with real exam conditions, get detailed feedback, and track your progress.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button variant="gradient" size="xl" className="min-w-[200px]">
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="xl" className="min-w-[200px]">
                    Watch Demo
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Practice Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Auth Forms */}
              <div className="flex justify-center lg:justify-end">
                {isLogin ? (
                  <LoginForm onToggleForm={toggleForm} />
                ) : (
                  <RegisterForm onToggleForm={toggleForm} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose IELTS Pro Hub?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform offers the most realistic IELTS testing experience with advanced features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Headphones className="w-8 h-8" />,
                  title: "Authentic Audio",
                  description: "High-quality audio recordings that mirror real IELTS listening tests"
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: "Comprehensive Reading",
                  description: "Academic and general training reading passages with various question types"
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Real-time Timer",
                  description: "Accurate timing system that matches actual test conditions"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Detailed Scoring",
                  description: "AI-powered scoring with comprehensive feedback and improvement suggestions"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Expert Review",
                  description: "Qualified instructors review your writing and speaking submissions"
                },
                {
                  icon: <GraduationCap className="w-8 h-8" />,
                  title: "Progress Tracking",
                  description: "Advanced analytics to monitor your improvement over time"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-card p-6 rounded-lg shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105"
                >
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Achieve Your Target Score?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful IELTS candidates who improved their scores with our platform
            </p>
            <Button variant="secondary" size="xl" className="min-w-[250px]">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">IELTS Pro Hub</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 IELTS Pro Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;