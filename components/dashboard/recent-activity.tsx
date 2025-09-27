"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Activity, CircleCheck as CheckCircle, Upload, BookOpen, Target, TrendingUp } from 'lucide-react';

const activities = [
  {
    type: 'skill_analysis',
    title: 'Resume analyzed',
    description: 'Identified 24 skills with 85% confidence',
    timestamp: '2 hours ago',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    type: 'course_completed',
    title: 'Course completed',
    description: 'React Fundamentals - Final assessment passed',
    timestamp: '1 day ago',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    type: 'skill_gap',
    title: 'New skill gap identified',
    description: 'Machine Learning marked as high priority',
    timestamp: '2 days ago',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    type: 'course_enrolled',
    title: 'Enrolled in course',
    description: 'Kubernetes for Developers started',
    timestamp: '3 days ago',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    type: 'resume_upload',
    title: 'Resume updated',
    description: 'New version uploaded and processed',
    timestamp: '1 week ago',
    icon: Upload,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
  },
];

export function RecentActivity() {
  return (
    <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-emerald-600" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Your latest progress and achievements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/80 transition-colors">
              <div className={`p-2 rounded-full ${activity.bgColor} flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-200 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}