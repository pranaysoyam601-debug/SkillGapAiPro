"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Target, BookOpen, TrendingUp } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getUserProfile, getLatestResumeAnalysis, ResumeAnalysis } from '@/lib/user-data';
import { SkillsOverview } from './skills-overview';
import { CourseRecommendations } from './course-recommendations';
import { MetricsCards } from './metrics-cards';
import { MarketTrends } from './market-trends';
import { RecentActivity } from './recent-activity';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Link from 'next/link';

interface ConditionalContentProps {
  hasUploadedResume?: boolean;
}

function EmptyState() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Skills Analysis Empty State */}
        <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
          <CardContent className="py-16">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-600/20 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upload Your Resume to Get Started
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Get AI-powered skill analysis, identify gaps, and receive personalized course recommendations
                </p>
              </div>
              <Link href="/analyze">
                <Button size="lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume Now
                </Button>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-600/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Skill Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AI extracts and evaluates your skills</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-600/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Gap Identification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Identify high-priority skill gaps</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-600/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Course Matching</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get personalized recommendations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Trends - Always Show */}
        <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>Market Trends</span>
            </CardTitle>
            <CardDescription>
              Current skill demand and salary insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                Market trends will be personalized after resume analysis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {/* Course Recommendations Empty State */}
        <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span>Course Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized course suggestions
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-600/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  No Recommendations Yet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Upload your resume to get personalized course recommendations
                </p>
              </div>
              <Link href="/analyze">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Analyze Skills
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity - Always Show */}
        <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest progress and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                No activity yet. Start by uploading your resume!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContentWithData({ analysis }: { analysis: ResumeAnalysis }) {
  return (
    <div className="space-y-8">
      <MetricsCards hasResumeData={true} analysis={analysis} />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SkillsOverview analysis={analysis} />
          <MarketTrends />
        </div>
        <div className="space-y-8">
          <CourseRecommendations analysis={analysis} />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export function ConditionalContent({ hasUploadedResume }: ConditionalContentProps) {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [userHasResume, setUserHasResume] = useState(hasUploadedResume || false);

  useEffect(() => {
    async function checkUserData() {
      if (user) {
        try {
          // Check if user has uploaded resume
          const profile = await getUserProfile(user.uid);
          const hasResume = profile?.hasUploadedResume || false;
          setUserHasResume(hasResume);

          if (hasResume) {
            // Get latest analysis
            const latestAnalysis = await getLatestResumeAnalysis(user.uid);
            setAnalysis(latestAnalysis);
          }
        } catch (error) {
          console.error('Error checking user data:', error);
        }
      }
      setLoading(false);
    }

    checkUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" className="mx-auto" />
        <p className="text-gray-600 dark:text-gray-300 mt-4">Loading your data...</p>
      </div>
    );
  }

  if (!userHasResume || !analysis) {
    return (
      <div className="space-y-8">
        <MetricsCards hasResumeData={false} />
        <EmptyState />
      </div>
    );
  }

  return <ContentWithData analysis={analysis} />;
}