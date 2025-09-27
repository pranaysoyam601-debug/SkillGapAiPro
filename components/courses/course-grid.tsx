"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Clock, 
  Users, 
  ExternalLink,
  BookmarkPlus,
  Play,
  Award,
  TrendingUp
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Complete Machine Learning Bootcamp 2024',
    provider: 'Coursera',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 15420,
    students: '125K+',
    duration: '12 weeks',
    level: 'Beginner',
    price: '$49',
    originalPrice: '$199',
    category: 'Machine Learning',
    skillsAddressed: ['Python', 'Scikit-learn', 'TensorFlow', 'Data Analysis'],
    matchScore: 95,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Master machine learning fundamentals with hands-on projects and real-world applications.',
    bestseller: true,
    updated: '2024',
  },
  {
    id: 2,
    title: 'Kubernetes for Developers and DevOps',
    provider: 'Udemy',
    instructor: 'Alex Rodriguez',
    instructorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 8932,
    students: '89K+',
    duration: '8 weeks',
    level: 'Intermediate',
    price: '$79',
    originalPrice: '$149',
    category: 'DevOps',
    skillsAddressed: ['Kubernetes', 'Docker', 'Container Orchestration', 'CI/CD'],
    matchScore: 88,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Deploy and manage containerized applications with Kubernetes in production environments.',
    trending: true,
    updated: '2024',
  },
  {
    id: 3,
    title: 'Advanced React Patterns and Performance',
    provider: 'egghead.io',
    instructor: 'Kent Dodds',
    instructorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 5643,
    students: '45K+',
    duration: '6 weeks',
    level: 'Advanced',
    price: '$29',
    originalPrice: '$89',
    category: 'Frontend Development',
    skillsAddressed: ['React', 'JavaScript', 'Performance Optimization', 'Testing'],
    matchScore: 82,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Master advanced React patterns, hooks, and performance optimization techniques.',
    topRated: true,
    updated: '2024',
  },
  {
    id: 4,
    title: 'AWS Cloud Architect Certification Path',
    provider: 'A Cloud Guru',
    instructor: 'Jane Smith',
    instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 12080,
    students: '78K+',
    duration: '16 weeks',
    level: 'Intermediate',
    price: '$199',
    originalPrice: '$299',
    category: 'Cloud Computing',
    skillsAddressed: ['AWS', 'Cloud Architecture', 'Security', 'Scalability'],
    matchScore: 75,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Comprehensive AWS certification preparation with hands-on labs and practice exams.',
    certification: true,
    updated: '2024',
  },
  {
    id: 5,
    title: 'Data Science with Python Complete Course',
    provider: 'DataCamp',
    instructor: 'Dr. Michael Johnson',
    instructorAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 9876,
    students: '156K+',
    duration: '14 weeks',
    level: 'Beginner',
    price: '$39',
    originalPrice: '$179',
    category: 'Data Science',
    skillsAddressed: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Statistics'],
    matchScore: 72,
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Learn data science from scratch with Python, covering statistics, visualization, and analysis.',
    popular: true,
    updated: '2024',
  },
  {
    id: 6,
    title: 'Full-Stack Web Development Bootcamp',
    provider: 'The Odin Project',
    instructor: 'Community Driven',
    instructorAvatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    reviews: 6543,
    students: '234K+',
    duration: '20 weeks',
    level: 'Beginner',
    price: 'Free',
    originalPrice: '',
    category: 'Web Development',
    skillsAddressed: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Database Design'],
    matchScore: 68,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Complete web development curriculum with projects and community support.',
    free: true,
    updated: '2024',
  },
];

function getLevelColor(level: string) {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'Expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }
}

export function CourseGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recommended for You
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <span>{courses.length} courses</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600 overflow-hidden">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {course.matchScore >= 90 && (
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    {course.matchScore}% Match
                  </Badge>
                )}
                {course.bestseller && (
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                    Bestseller
                  </Badge>
                )}
                {course.trending && (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {course.topRated && (
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    <Star className="h-3 w-3 mr-1" />
                    Top Rated
                  </Badge>
                )}
                {course.free && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Free
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-500 dark:text-gray-300">({course.reviews.toLocaleString()})</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {course.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Instructor */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={course.instructorAvatar} />
                  <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {course.instructor}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {course.provider}
                  </p>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <Badge className={getLevelColor(course.level)} variant="secondary">
                    {course.level}
                  </Badge>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <p className="text-xs text-gray-600 dark:text-gray-300">Skills you'll learn:</p>
                <div className="flex flex-wrap gap-1">
                  {course.skillsAddressed.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pricing and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-500 dark:text-gray-300 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Preview
                    <Play className="h-3 w-3 ml-1" />
                  </Button>
                  <Button size="sm" onClick={() => window.open(`https://coursera.org/course/${course.id}`, '_blank')}>
                    Enroll Now
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Courses
        </Button>
      </div>
    </div>
  );
}