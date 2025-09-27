"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Star,
  Zap,
  Target
} from 'lucide-react';

const skills = [
  {
    name: 'JavaScript',
    category: 'Programming',
    proficiency: 90,
    marketDemand: 'High',
    trend: 'growing',
    experience: '5+ years',
    isStrength: true,
  },
  {
    name: 'React',
    category: 'Frontend',
    proficiency: 85,
    marketDemand: 'High',
    trend: 'growing',
    experience: '3+ years',
    isStrength: true,
  },
  {
    name: 'Python',
    category: 'Programming',
    proficiency: 75,
    marketDemand: 'High',
    trend: 'growing',
    experience: '2+ years',
    isStrength: false,
  },
  {
    name: 'Machine Learning',
    category: 'AI/ML',
    proficiency: 45,
    marketDemand: 'Very High',
    trend: 'growing',
    experience: 'Beginner',
    isStrength: false,
    isGap: true,
  },
  {
    name: 'Docker',
    category: 'DevOps',
    proficiency: 60,
    marketDemand: 'High',
    trend: 'stable',
    experience: '1+ years',
    isStrength: false,
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    proficiency: 30,
    marketDemand: 'Very High',
    trend: 'growing',
    experience: 'Beginner',
    isStrength: false,
    isGap: true,
  },
];

function getTrendIcon(trend: string) {
  switch (trend) {
    case 'growing': return TrendingUp;
    case 'declining': return TrendingDown;
    default: return Minus;
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case 'growing': return 'text-emerald-500';
    case 'declining': return 'text-red-500';
    default: return 'text-gray-500';
  }
}

function getDemandColor(demand: string) {
  switch (demand) {
    case 'Very High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }
}

function getProficiencyColor(proficiency: number) {
  if (proficiency >= 80) return 'bg-emerald-500';
  if (proficiency >= 60) return 'bg-blue-500';
  if (proficiency >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function SkillsOverview() {
  const strengths = skills.filter(skill => skill.isStrength);
  const gaps = skills.filter(skill => skill.isGap);

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Skills Overview</span>
              </CardTitle>
              <CardDescription>
                Your current skill profile and market positioning
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All Skills
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Top Strengths */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Top Strengths</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strengths.map((skill, index) => {
                const TrendIcon = getTrendIcon(skill.trend);
                return (
                  <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border border-emerald-200/50 dark:border-emerald-600/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{skill.category}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {skill.proficiency}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={skill.proficiency} className="h-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">{skill.experience}</span>
                        <div className="flex items-center space-x-1">
                          <TrendIcon className={`h-3 w-3 ${getTrendColor(skill.trend)}`} />
                          <Badge className={getDemandColor(skill.marketDemand)} variant="secondary">
                            {skill.marketDemand}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Priority Skill Gaps</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gaps.map((skill, index) => {
                const TrendIcon = getTrendIcon(skill.trend);
                return (
                  <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg border border-orange-200/50 dark:border-orange-600/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{skill.category}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        Gap
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={skill.proficiency} className="h-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">{skill.experience}</span>
                        <div className="flex items-center space-x-1">
                          <TrendIcon className={`h-3 w-3 ${getTrendColor(skill.trend)}`} />
                          <Badge className={getDemandColor(skill.marketDemand)} variant="secondary">
                            {skill.marketDemand}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}