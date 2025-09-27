"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  Minus,
  DollarSign,
  Users,
  Briefcase
} from 'lucide-react';

const marketData = [
  {
    skill: 'Machine Learning',
    demand: 95,
    growth: 23,
    averageSalary: '$120K',
    openJobs: '45K+',
    trend: 'growing',
    category: 'AI/ML',
  },
  {
    skill: 'React',
    demand: 88,
    growth: 12,
    averageSalary: '$95K',
    openJobs: '38K+',
    trend: 'growing',
    category: 'Frontend',
  },
  {
    skill: 'Kubernetes',
    demand: 82,
    growth: 18,
    averageSalary: '$110K',
    openJobs: '28K+',
    trend: 'growing',
    category: 'DevOps',
  },
  {
    skill: 'Python',
    demand: 90,
    growth: 8,
    averageSalary: '$100K',
    openJobs: '52K+',
    trend: 'stable',
    category: 'Programming',
  },
  {
    skill: 'Docker',
    demand: 75,
    growth: 15,
    averageSalary: '$98K',
    openJobs: '32K+',
    trend: 'growing',
    category: 'DevOps',
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

function getDemandColor(demand: number) {
  if (demand >= 90) return 'bg-red-500';
  if (demand >= 75) return 'bg-orange-500';
  if (demand >= 60) return 'bg-yellow-500';
  return 'bg-gray-500';
}

export function MarketTrends() {
  return (
    <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <span>Market Trends</span>
        </CardTitle>
        <CardDescription>
          Real-time skill demand and salary insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {marketData.map((item, index) => {
            const TrendIcon = getTrendIcon(item.trend);
            return (
              <div key={index} className="p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-800/80 dark:to-blue-900/30 rounded-lg border border-gray-200/50 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.skill}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendIcon className={`h-4 w-4 ${getTrendColor(item.trend)}`} />
                    <Badge variant="secondary" className="text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300">
                      +{item.growth}%
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Market Demand</span>
                    <span className="font-medium">{item.demand}%</span>
                  </div>
                  <Progress value={item.demand} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Avg. Salary</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.averageSalary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Open Jobs</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.openJobs}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Growth</p>
                      <p className="font-semibold text-gray-900 dark:text-white">+{item.growth}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}