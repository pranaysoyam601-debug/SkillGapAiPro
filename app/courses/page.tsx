import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { CourseSearch } from '@/components/courses/course-search';
import { CourseGrid } from '@/components/courses/course-grid';
import { CourseFilters } from '@/components/courses/course-filters';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-black dark:via-black dark:to-black">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Course Recommendations
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover personalized courses matched to your skill gaps and career goals
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CourseFilters />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <CourseSearch />
            <CourseGrid />
          </div>
        </div>
      </div>
    </div>
  );
}