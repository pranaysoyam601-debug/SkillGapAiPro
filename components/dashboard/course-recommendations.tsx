"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const courses = [
  {
    title: 'Machine Learning Fundamentals',
    provider: 'Coursera',
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    students: '125K',
    duration: '6 weeks',
    level: 'Beginner',
    price: '$49',
    skillsAddressed: ['Machine Learning', 'Python', 'Data Science'],
    matchScore: 95,
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Kubernetes for Developers',
    provider: 'Udemy',
    instructor: 'Alex Rodriguez',
    rating: 4.6,
    students: '89K',
    duration: '4 weeks',
    level: 'Intermediate',
    price: '$79',
    skillsAddressed: ['Kubernetes', 'Docker', 'DevOps'],
    matchScore: 88,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Advanced React Patterns',
    provider: 'egghead.io',
    instructor: 'Kent Dodds',
    rating: 4.9,
    students: '45K',
    duration: '3 weeks',
    level: 'Advanced',
    price: '$29',
    skillsAddressed: ['React', 'JavaScript', 'Frontend'],
    matchScore: 82,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

function getLevelColor(level: string) {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }
}

export function CourseRecommendations() {
  return (
    <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span>Course Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized matches for your skill gaps
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="p-4 bg-gradient-to-r from-gray-50/50 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/30 rounded-lg border border-gray-200/50 dark:border-gray-600 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      by {course.instructor} • {course.provider}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs"
                  >
                    {course.matchScore}% match
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getLevelColor(course.level)} variant="secondary">
                      {course.level}
                    </Badge>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {course.price}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Course
                  </Button>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {course.skillsAddressed.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button className="w-full" variant="outline">
          Explore More Courses
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}