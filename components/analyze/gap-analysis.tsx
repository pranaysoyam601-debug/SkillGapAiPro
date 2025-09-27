"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TriangleAlert as AlertTriangle, TrendingUp, DollarSign, Clock, Target, BookOpen } from 'lucide-react';

const priorityGaps = [
  {
    skill: 'Machine Learning',
    currentLevel: 30,
    targetLevel: 80,
    priority: 'Critical',
    marketDemand: 95,
    salaryImpact: '+$25K',
    timeToTarget: '4-6 months',
    recommendedCourses: 3,
  },
  {
    skill: 'Kubernetes',
    currentLevel: 25,
    targetLevel: 70,
    priority: 'High',
    marketDemand: 82,
    salaryImpact: '+$15K',
    timeToTarget: '3-4 months',
    recommendedCourses: 2,
  },
  {
    skill: 'Cloud Architecture',
    currentLevel: 35,
    targetLevel: 75,
    priority: 'High',
    marketDemand: 88,
    salaryImpact: '+$20K',
    timeToTarget: '3-5 months',
    recommendedCourses: 4,
  },
];

const careerImpact = {
  totalSalaryIncrease: '+$60K',
  marketabilityBoost: '+45%',
  jobOpportunities: '+78%',
  estimatedROI: '340%',
};

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }
}

export function GapAnalysis() {
  return (
    <div className="space-y-6">
      {/* Gap Analysis */}
      <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Gap Analysis</span>
          </CardTitle>
          <CardDescription>
            Priority skills to focus on for maximum career impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {priorityGaps.map((gap, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg border border-orange-200/50 dark:border-orange-600/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{gap.skill}</h3>
                <Badge className={getPriorityColor(gap.priority)} variant="secondary">
                  {gap.priority}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Current → Target</span>
                    <span className="font-medium">{gap.currentLevel}% → {gap.targetLevel}%</span>
                  </div>
                  <Progress value={gap.currentLevel} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{gap.salaryImpact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-200">{gap.timeToTarget}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700 dark:text-gray-200">{gap.marketDemand}% demand</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-700 dark:text-gray-200">{gap.recommendedCourses} courses</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Career Impact Summary */}
      <Card className="bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/30 dark:to-blue-900/30 border border-emerald-200/50 dark:border-emerald-600/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-emerald-600" />
            <span>Career Impact Forecast</span>
          </CardTitle>
          <CardDescription>
            Projected outcomes from addressing these skill gaps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/80 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{careerImpact.totalSalaryIncrease}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Salary Increase</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/80 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{careerImpact.marketabilityBoost}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Marketability</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/80 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{careerImpact.jobOpportunities}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Job Opportunities</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/80 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{careerImpact.estimatedROI}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Estimated ROI</div>
            </div>
          </div>
          
          <Button className="w-full">
            Generate Learning Path
            <Target className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}