import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ConditionalContent } from '@/components/dashboard/conditional-content';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-black dark:via-black dark:to-black">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Welcome Message - Moved down to avoid header collision */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, Alex!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to advance your career today?
          </p>
        </div>
        
        <ConditionalContent />
      </div>
    </div>
  );
}