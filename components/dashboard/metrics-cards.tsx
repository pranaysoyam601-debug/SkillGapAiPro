"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const metrics = [
  {
    title: 'Skills Identified',
    value: '24',
    description: 'From your latest resume',
    progress: 85,
    trend: { direction: 'up', value: 12, label: '+12% from last analysis' },
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    title: 'Skill Gap',
    value: '7',
    description: 'High-priority gaps identified',
    progress: 65,
    trend: { direction: 'down', value: 3, label: '-3 gaps closed' },
    icon: Brain,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    title: 'Learning Progress',
    value: '73%',
    description: 'Current learning path completion',
    progress: 73,
    trend: { direction: 'up', value: 8, label: '+8% this week' },
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    title: 'Course Recommendations',
    value: '12',
    description: 'Personalized matches found',
    progress: 90,
    trend: { direction: 'neutral', value: 0, label: 'Updated daily' },
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

function getTrendIcon(direction: string) {
  switch (direction) {
    case 'up': return ArrowUp;
    case 'down': return ArrowDown;
    default: return Minus;
  }
}

function getTrendColor(direction: string) {
  switch (direction) {
    case 'up': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
    case 'down': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
  }
}

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = getTrendIcon(metric.trend.direction);
        
        return (
          <Card key={index} className="relative overflow-hidden bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <Badge variant="secondary" className={`${getTrendColor(metric.trend.direction)} border-0 text-xs font-medium`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {metric.trend.direction !== 'neutral' && metric.trend.value}
                </Badge>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">{metric.value}</CardTitle>
                <CardDescription className="text-sm font-medium">{metric.title}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">{metric.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.trend.label}</p>
            </CardContent>
            
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-black/30 pointer-events-none" />
          </Card>
        );
      })}
    </div>
  );
}