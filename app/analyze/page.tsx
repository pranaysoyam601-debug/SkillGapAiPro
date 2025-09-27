import { ResumeUpload } from '@/components/analyze/resume-upload';
import { SkillsAnalysis } from '@/components/analyze/skills-analysis';
import { GapAnalysis } from '@/components/analyze/gap-analysis';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-black dark:via-black dark:to-black">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skill Analysis Center
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume to get AI-powered skill analysis, gap identification, and personalized course recommendations
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ResumeUpload />
            <SkillsAnalysis />
          </div>
          <div>
            <GapAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
}