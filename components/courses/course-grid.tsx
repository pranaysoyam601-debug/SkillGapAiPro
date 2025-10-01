'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Users, ExternalLink } from 'lucide-react';
import { enrollInCourse } from '@/lib/course-enrollment';
import { useAuth } from '@/lib/auth-context';

interface Course {
  id: string;
  title: string;
  provider: string;
  rating: number;
  duration: string;
  students: number;
  price: string;
  level: string;
  skills: string[];
  url: string;
  image?: string;
}

interface CourseGridProps {
  courses?: Course[];
  showEnrollButton?: boolean;
  maxCourses?: number;
}

export function CourseGrid({ 
  courses = [], 
  showEnrollButton = true, 
  maxCourses 
}: CourseGridProps) {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  const coursesToShow = maxCourses ? courses.slice(0, maxCourses) : courses;

  const handleEnroll = async (course: Course) => {
    if (!user) return;
    
    setLoading(course.id);
    try {
      await enrollInCourse(user.uid, course);
      setEnrolledCourses(prev => new Set([...prev, course.id]));
      
      // Redirect to external course URL
      window.open(course.url, '_blank');
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setLoading(null);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          No courses available at the moment
        </div>
        <p className="text-sm text-gray-400">
          Upload your resume to get personalized course recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coursesToShow.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.provider}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {course.level}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {course.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {course.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.skills.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-green-600">
                {course.price}
              </span>
              {showEnrollButton && (
                <Button
                  onClick={() => handleEnroll(course)}
                  disabled={loading === course.id || enrolledCourses.has(course.id)}
                  className="flex items-center space-x-1"
                >
                  {loading === course.id ? (
                    'Enrolling...'
                  ) : enrolledCourses.has(course.id) ? (
                    'Enrolled'
                  ) : (
                    <>
                      <span>Enroll</span>
                      <ExternalLink className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}