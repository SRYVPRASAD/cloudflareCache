import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wrench, Calculator, BarChart3, Activity } from 'lucide-react';

const Tools: React.FC = () => {
  const location = useLocation();
  
  const tools = [
    {
      id: 'purge-calculator',
      title: 'Purge Calculator',
      description: 'Calculate optimal purge strategies',
      icon: Calculator,
      path: '/tools/purge-calculator'
    },
    {
      id: 'cache-analyzer',
      title: 'Cache Analyzer',
      description: 'Analyze your cache performance',
      icon: BarChart3,
      path: '/tools/cache-analyzer'
    },
    {
      id: 'performance-monitor',
      title: 'Performance Monitor',
      description: 'Monitor cache performance metrics',
      icon: Activity,
      path: '/tools/performance-monitor'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cache Tools</h1>
          <p className="text-gray-600">Powerful tools to optimize your cache performance</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-purple-500" />
                Tools
              </h3>
              <nav className="space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive(tool.path)
                          ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{tool.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{tool.description}</div>
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

export default Tools;