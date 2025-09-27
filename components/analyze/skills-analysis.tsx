"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, TrendingUp, TrendingDown, Minus, Star, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Filter } from 'lucide-react';

const extractedSkills = [
  {
    name: 'JavaScript',
    category: 'Programming Languages',
    confidence: 95,
    proficiency: 'Expert',
    experience: '5+ years',
    marketDemand: 'High',
    trend: 'stable',
    salary_impact: '+$15K',
    isStrength: true,
  },
  {
    name: 'React',
    category: 'Frontend Frameworks',
    confidence: 92,
    proficiency: 'Advanced',
    experience: '3+ years',
    marketDemand: 'High',
    trend: 'growing',
    salary_impact: '+$12K',
    isStrength: true,
  },
  {
    name: 'Node.js',
    category: 'Backend Technologies',
    confidence: 88,
    proficiency: 'Intermediate',
    experience: '2+ years',
    marketDemand: 'High',
    trend: 'growing',
    salary_impact: '+$10K',
    isStrength: false,
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    confidence: 85,
    proficiency: 'Intermediate',
    experience: '2+ years',
    marketDemand: 'Very High',
    trend: 'growing',
    salary_impact: '+$18K',
    isStrength: false,
  },
  {
    name: 'Machine Learning',
    category: 'AI/ML',
    confidence: 65,
    proficiency: 'Beginner',
    experience: 'Basic',
    marketDemand: 'Very High',
    trend: 'growing',
    salary_impact: '+$25K',
    isGap: true,
  },
  {
    name: 'Docker',
    category: 'DevOps',
    confidence: 70,
    proficiency: 'Beginner',
    experience: '1 year',
    marketDemand: 'High',
    trend: 'growing',
    salary_impact: '+$8K',
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

function getProficiencyColor(proficiency: string) {
  switch (proficiency) {
    case 'Expert': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
    case 'Advanced': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }
}

export function SkillsAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', ...new Set(extractedSkills.map(skill => skill.category))];
  const filteredSkills = selectedCategory === 'all' 
    ? extractedSkills 
    : extractedSkills.filter(skill => skill.category === selectedCategory);

  const strengths = extractedSkills.filter(skill => skill.isStrength);
  const gaps = extractedSkills.filter(skill => skill.isGap);
  const developing = extractedSkills.filter(skill => !skill.isStrength && !skill.isGap);

  return (
    <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Skills Analysis Results</span>
            </CardTitle>
            <CardDescription>
              AI-powered skill extraction and proficiency assessment
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              {extractedSkills.length} skills identified
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="developing">Developing</TabsTrigger>
            <TabsTrigger value="gaps">Gaps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category === 'all' ? 'All Skills' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid gap-4">
              {filteredSkills.map((skill, index) => {
                const TrendIcon = getTrendIcon(skill.trend);
                return (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50/50 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/30 rounded-lg border border-gray-200/50 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          skill.isStrength ? 'bg-emerald-100 dark:bg-emerald-600/20' :
                          skill.isGap ? 'bg-red-100 dark:bg-red-600/20' :
                          'bg-blue-100 dark:bg-blue-600/20'
                        }`}>
                          {skill.isStrength ? (
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                          ) : skill.isGap ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Target className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{skill.category}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {skill.confidence}% confidence
                          </Badge>
                          <TrendIcon className={`h-4 w-4 ${getTrendColor(skill.trend)}`} />
                        </div>
                        <p className="text-xs text-emerald-600 font-medium">{skill.salary_impact}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Market Demand</span>
                        <Badge className={getDemandColor(skill.marketDemand)} variant="secondary">
                          {skill.marketDemand}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Proficiency</span>
                          <Badge className={getProficiencyColor(skill.proficiency)} variant="secondary">
                            {skill.proficiency}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Experience</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {skill.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold dark:text-white">Your Top Strengths</h3>
              <Badge variant="secondary">{strengths.length} skills</Badge>
            </div>
            {strengths.map((skill, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border border-emerald-200/50 dark:border-emerald-600/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                  <Badge className={getProficiencyColor(skill.proficiency)} variant="secondary">
                    {skill.proficiency}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{skill.experience} experience</p>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-medium">Market advantage: {skill.salary_impact}</span>
                  <Badge className={getDemandColor(skill.marketDemand)} variant="secondary">
                    {skill.marketDemand} demand
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="developing" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold dark:text-white">Developing Skills</h3>
              <Badge variant="secondary">{developing.length} skills</Badge>
            </div>
            {developing.map((skill, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200/50 dark:border-blue-600/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                  <Badge className={getProficiencyColor(skill.proficiency)} variant="secondary">
                    {skill.proficiency}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{skill.experience} experience</p>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">Growth potential: {skill.salary_impact}</span>
                  <Badge className={getDemandColor(skill.marketDemand)} variant="secondary">
                    {skill.marketDemand} demand
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="gaps" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold dark:text-white">Priority Skill Gaps</h3>
              <Badge variant="secondary">{gaps.length} gaps</Badge>
            </div>
            {gaps.map((skill, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg border border-red-200/50 dark:border-red-600/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Current: {skill.proficiency} level</p>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">Salary impact: {skill.salary_impact}</span>
                  <Badge className={getDemandColor(skill.marketDemand)} variant="secondary">
                    {skill.marketDemand} demand
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}