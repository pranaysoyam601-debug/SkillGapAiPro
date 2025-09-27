"use client";

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target,
  ExternalLink,
  Play,
  CheckCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getUserEnrollments, CourseEnrollment } from '@/lib/user-data';

// Mock data for enrolled courses - in production, this would come from Firebase
const enrolledCourses = [
  {
    id: '1',
    title: 'Complete Machine Learning Bootcamp 2024',
    provider: 'Coursera',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    timeSpent: 42, // hours
    estimatedTime: 65, // hours
    lastAccessed: '2 days ago',
    status: 'in-progress' as const,
    nextLesson: 'Neural Networks Fundamentals',
    skillsLearning: ['Machine Learning', 'Python', 'TensorFlow'],
    url: 'https://coursera.org/course/ml-bootcamp',
  },
  {
    id: '2',
    title: 'Kubernetes for Developers',
    provider: 'Udemy',
    instructor: 'Alex Rodriguez',
    instructorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    progress: 100,
    totalLessons: 32,
    completedLessons: 32,
    timeSpent: 28,
    estimatedTime: 28,
    lastAccessed: '1 week ago',
    status: 'completed' as const,
    completedAt: '2024-01-15',
    skillsLearning: ['Kubernetes', 'Docker', 'DevOps'],
    url: 'https://udemy.com/course/kubernetes-developers',
    certificate: true,
  },
  {
    id: '3',
    title: 'Advanced React Patterns',
    provider: 'egghead.io',
    instructor: 'Kent Dodds',
    instructorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    progress: 25,
    totalLessons: 24,
    completedLessons: 6,
    timeSpent: 8,
    estimatedTime: 32,
    lastAccessed: '5 days ago',
    status: 'in-progress' as const,
    nextLesson: 'Custom Hooks Patterns',
    skillsLearning: ['React', 'JavaScript', 'Frontend'],
    url: 'https://egghead.io/courses/react-patterns',
  },
];

const achievements = [
  {
    title: 'First Course Completed',
    description: 'Completed your first course',
    icon: Trophy,
    earned: true,
    earnedDate: '2024-01-15',
  },
  {
    title: 'Consistent Learner',
    description: 'Studied for 7 consecutive days',
    icon: Calendar,
    earned: true,
    earnedDate: '2024-01-20',
  },
  {
    title: 'Skill Master',
    description: 'Mastered 3 skills',
    icon: Target,
    earned: false,
    progress: 2,
    target: 3,
  },
  {
    title: 'Speed Learner',
    description: 'Completed a course in under 2 weeks',
    icon: TrendingUp,
    earned: false,
    progress: 0,
    target: 1,
  },
];

export default function LearningPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrollments() {
      if (user) {
        try {
          const userEnrollments = await getUserEnrollments(user.uid);
          setEnrollments(userEnrollments);
        } catch (error) {
          console.error('Error fetching enrollments:', error);
        }
      }
      setLoading(false);
    }

    fetchEnrollments();
  }, [user]);

  const totalProgress = enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length;
  const totalTimeSpent = enrolledCourses.reduce((acc, course) => acc + course.timeSpent, 0);
  const completedCourses = enrolledCourses.filter(course => course.status === 'completed').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-black dark:via-black dark:to-black">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-black dark:via-black dark:to-black">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Learning Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track your learning journey and skill development progress
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{enrolledCourses.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Enrolled Courses</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600">{completedCourses}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{Math.round(totalProgress)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">{totalTimeSpent}h</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Time Spent</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span>My Courses</span>
                </CardTitle>
                <CardDescription>
                  Your enrolled courses and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Enrolled Courses
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Start learning by enrolling in recommended courses
                    </p>
                    <Button>
                      Browse Courses
                    </Button>
                  </div>
                ) : (
                  enrolledCourses.map((course) => (
                    <div key={course.id} className="p-6 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-800/80 dark:to-blue-900/30 rounded-lg border border-gray-200/50 dark:border-gray-600">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={course.instructorAvatar} />
                            <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              by {course.instructor} • {course.provider}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {course.skillsLearning.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {course.status === 'completed' && course.certificate && (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                              <Trophy className="h-3 w-3 mr-1" />
                              Certified
                            </Badge>
                          )}
                          <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                            {course.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-300">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-3" />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            <span>{course.timeSpent}h / {course.estimatedTime}h</span>
                          </div>
                        </div>

                        {course.status === 'in-progress' && course.nextLesson && (
                          <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  Next: {course.nextLesson}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  Last accessed {course.lastAccessed}
                                </p>
                              </div>
                              <Button size="sm" onClick={() => window.open(course.url, '_blank')}>
                                <Play className="h-3 w-3 mr-1" />
                                Continue
                              </Button>
                            </div>
                          </div>
                        )}

                        {course.status === 'completed' && (
                          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                                  Completed on {course.completedAt}
                                </span>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => window.open(course.url, '_blank')}>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Course
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Achievements</span>
                </CardTitle>
                <CardDescription>
                  Your learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className={`p-4 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/30 dark:to-orange-900/30 border-yellow-200/50 dark:border-yellow-600/50'
                        : 'bg-gray-50/50 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned 
                            ? 'bg-yellow-100 dark:bg-yellow-600/20' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            achievement.earned 
                              ? 'text-yellow-600' 
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            achievement.earned 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-xs text-yellow-600 mt-1">
                              Earned on {achievement.earnedDate}
                            </p>
                          )}
                          {!achievement.earned && achievement.progress !== undefined && (
                            <div className="mt-2">
                              <Progress 
                                value={(achievement.progress / achievement.target!) * 100} 
                                className="h-2" 
                              />
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {achievement.progress}/{achievement.target}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>Weekly Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Study Time</span>
                      <span className="font-medium">8h / 10h</span>
                    </div>
                    <Progress value={80} className="h-3" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      2 hours left to reach your weekly goal!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}