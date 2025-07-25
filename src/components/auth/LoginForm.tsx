import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm = ({ onToggleForm }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login - redirect based on user type
    switch (userType) {
      case "student":
        navigate("/student/dashboard");
        break;
      case "admin":
        navigate("/admin");
        break;
    }
  };

  return (
    <Card className="w-full max-w-md shadow-large animate-scale-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your IELTS Pro Hub account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userType">User Type</Label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" variant="gradient" size="lg">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <button
              type="button"
              onClick={onToggleForm}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Forgot your password?
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
