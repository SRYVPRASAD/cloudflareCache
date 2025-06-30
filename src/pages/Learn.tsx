import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Zap, Shield, Globe } from 'lucide-react';

const Learn: React.FC = () => {
  const location = useLocation();
  
  const topics = [
    {
      id: 'cache-purging',
      title: 'Cache Purging Basics',
      description: 'Learn the fundamentals of CloudFlare cache purging',
      icon: Zap,
      path: '/learn/cache-purging'
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      description: 'Industry best practices for cache management',
      icon: Shield,
      path: '/learn/best-practices'
    },
    {
      id: 'cache-types',
      title: 'Cache Types & Strategies',
      description: 'Different caching strategies and when to use them',
      icon: Globe,
      path: '/learn/cache-types'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn Cache Management</h1>
          <p className="text-gray-600">Comprehensive guides to master CloudFlare caching</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                Topics
              </h3>
              <nav className="space-y-2">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <Link
                      key={topic.id}
                      to={topic.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive(topic.path)
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{topic.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{topic.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[600px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;