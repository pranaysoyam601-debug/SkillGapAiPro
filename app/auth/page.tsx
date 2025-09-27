import { AuthForm } from '@/components/auth/auth-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, BookOpen, Target } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-black dark:to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                <Brain className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillGap AI
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Intelligent Career Development Platform
            </p>
            <p className="text-gray-500 dark:text-gray-300">
              Analyze your skills, identify gaps, and get personalized course recommendations powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <div className="p-2 bg-blue-100 dark:bg-blue-600/20 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Smart Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">AI-powered resume parsing</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-600/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Market Insights</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">Real-time skill trends</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <div className="p-2 bg-purple-100 dark:bg-purple-600/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Course Matching</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">Personalized recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <div className="p-2 bg-orange-100 dark:bg-orange-600/20 rounded-lg">
                <Brain className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Progress Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">Learning analytics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}