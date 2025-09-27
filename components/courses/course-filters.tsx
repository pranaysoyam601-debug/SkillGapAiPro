"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Filter,
  Star,
  Clock,
  DollarSign,
  Users,
  Award
} from 'lucide-react';

const filterOptions = {
  providers: ['Coursera', 'Udemy', 'edX', 'Pluralsight', 'LinkedIn Learning', 'Udacity'],
  levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  durations: ['< 1 week', '1-4 weeks', '1-3 months', '3+ months'],
  prices: ['Free', '$1-$50', '$51-$100', '$101-$200', '$200+'],
  categories: ['Programming', 'Data Science', 'DevOps', 'AI/ML', 'Web Development', 'Cloud Computing'],
};

export function CourseFilters() {
  const [selectedFilters, setSelectedFilters] = useState({
    providers: [] as string[],
    levels: [] as string[],
    durations: [] as string[],
    prices: [] as string[],
    categories: [] as string[],
  });
  
  const [rating, setRating] = useState([4]);
  const [maxPrice, setMaxPrice] = useState([200]);

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      providers: [],
      levels: [],
      durations: [],
      prices: [],
      categories: [],
    });
    setRating([4]);
    setMaxPrice([200]);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length;
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600 sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary">{getActiveFilterCount()}</Badge>
            )}
          </CardTitle>
          {getActiveFilterCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Minimum Rating</span>
          </div>
          <div className="space-y-2">
            <Slider
              value={rating}
              onValueChange={setRating}
              max={5}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating[0] ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                {rating[0]}+ stars
              </span>
            </div>
          </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Max Price</span>
          </div>
          <div className="space-y-2">
            <Slider
              value={maxPrice}
              onValueChange={setMaxPrice}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Free</span>
              <span>${maxPrice[0]}</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Category</h3>
          <div className="space-y-2">
            {filterOptions.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedFilters.categories.includes(category)}
                  onCheckedChange={() => handleFilterChange('categories', category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Level Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">Difficulty Level</span>
          </div>
          <div className="space-y-2">
            {filterOptions.levels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level}`}
                  checked={selectedFilters.levels.includes(level)}
                  onCheckedChange={() => handleFilterChange('levels', level)}
                />
                <label
                  htmlFor={`level-${level}`}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Duration Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Duration</span>
          </div>
          <div className="space-y-2">
            {filterOptions.durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={selectedFilters.durations.includes(duration)}
                  onCheckedChange={() => handleFilterChange('durations', duration)}
                />
                <label
                  htmlFor={`duration-${duration}`}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  {duration}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Provider Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">Provider</span>
          </div>
          <div className="space-y-2">
            {filterOptions.providers.map((provider) => (
              <div key={provider} className="flex items-center space-x-2">
                <Checkbox
                  id={`provider-${provider}`}
                  checked={selectedFilters.providers.includes(provider)}
                  onCheckedChange={() => handleFilterChange('providers', provider)}
                />
                <label
                  htmlFor={`provider-${provider}`}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  {provider}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}