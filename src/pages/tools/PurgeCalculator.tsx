import React, { useState } from 'react';
import { Calculator, Zap, Clock, AlertCircle } from 'lucide-react';

const PurgeCalculator: React.FC = () => {
  const [contentType, setContentType] = useState('static');
  const [updateFrequency, setUpdateFrequency] = useState('daily');
  const [trafficLevel, setTrafficLevel] = useState('medium');
  const [criticalLevel, setCriticalLevel] = useState('normal');

  const calculateStrategy = () => {
    let strategy = 'selective';
    let method = 'url';
    let timing = 'immediate';
    let risk = 'low';

    // Determine strategy based on inputs
    if (contentType === 'dynamic' && updateFrequency === 'hourly') {
      strategy = 'automated';
      timing = 'scheduled';
    } else if (criticalLevel === 'critical') {
      strategy = 'immediate';
      method = 'everything';
      timing = 'immediate';
      risk = 'medium';
    } else if (trafficLevel === 'high' && updateFrequency === 'frequent') {
      strategy = 'selective';
      method = 'tag';
      risk = 'medium';
    }

    return { strategy, method, timing, risk };
  };

  const result = calculateStrategy();

  const getStrategyDescription = (strategy: string) => {
    const descriptions = {
      selective: 'Target specific content for purging to minimize performance impact',
      automated: 'Set up automated purging based on content update schedules',
      immediate: 'Purge content immediately when critical updates are deployed'
    };
    return descriptions[strategy as keyof typeof descriptions] || '';
  };

  const getMethodDescription = (method: string) => {
    const descriptions = {
      url: 'Purge specific URLs or file paths',
      tag: 'Use cache tags to purge related content groups',
      everything: 'Purge all cached content (use sparingly)'
    };
    return descriptions[method as keyof typeof descriptions] || '';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Calculator className="h-6 w-6 mr-2 text-purple-600" />
          Cache Purge Strategy Calculator
        </h2>
        <p className="text-gray-600">
          Get personalized recommendations for your cache purging strategy based on your specific needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration</h3>
          
          <div className="space-y-6">
            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setContentType('static')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    contentType === 'static'
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Static Content
                </button>
                <button
                  onClick={() => setContentType('dynamic')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    contentType === 'dynamic'
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dynamic Content
                </button>
              </div>
            </div>

            {/* Update Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Update Frequency</label>
              <select
                value={updateFrequency}
                onChange={(e) => setUpdateFrequency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="rarely">Rarely (Monthly or less)</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
                <option value="frequent">Very Frequent (Multiple times per hour)</option>
              </select>
            </div>

            {/* Traffic Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Traffic Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setTrafficLevel(level)}
                    className={`p-3 rounded-lg border text-sm font-medium capitalize transition-all duration-200 ${
                      trafficLevel === level
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Critical Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Update Criticality</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCriticalLevel('normal')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    criticalLevel === 'normal'
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Normal Updates
                </button>
                <button
                  onClick={() => setCriticalLevel('critical')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    criticalLevel === 'critical'
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Critical Updates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommended Strategy</h3>
          
          <div className="space-y-6">
            {/* Strategy */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-purple-800 capitalize">{result.strategy} Purging</h4>
              </div>
              <p className="text-sm text-purple-700">{getStrategyDescription(result.strategy)}</p>
            </div>

            {/* Method */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calculator className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800 capitalize">Purge by {result.method}</h4>
              </div>
              <p className="text-sm text-blue-700">{getMethodDescription(result.method)}</p>
            </div>

            {/* Timing */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800 capitalize">{result.timing} Execution</h4>
              </div>
              <p className="text-sm text-green-700">
                {result.timing === 'immediate' 
                  ? 'Execute purge operations immediately after content updates'
                  : 'Schedule purge operations during low-traffic periods'
                }
              </p>
            </div>

            {/* Risk Assessment */}
            <div className={`rounded-lg p-4 ${
              result.risk === 'low' ? 'bg-green-50' : 
              result.risk === 'medium' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center mb-2">
                <AlertCircle className={`h-5 w-5 mr-2 ${
                  result.risk === 'low' ? 'text-green-600' : 
                  result.risk === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`} />
                <h4 className={`font-semibold capitalize ${
                  result.risk === 'low' ? 'text-green-800' : 
                  result.risk === 'medium' ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {result.risk} Risk
                </h4>
              </div>
              <p className={`text-sm ${
                result.risk === 'low' ? 'text-green-700' : 
                result.risk === 'medium' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {result.risk === 'low' 
                  ? 'Minimal impact on performance and user experience'
                  : result.risk === 'medium'
                  ? 'Moderate impact - monitor performance after purging'
                  : 'High impact - consider off-peak timing and gradual rollout'
                }
              </p>
            </div>
          </div>

          {/* Implementation Tips */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Implementation Tips</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Test your purging strategy in a staging environment first
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Monitor cache hit rates before and after implementing changes
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Set up alerts for unusual purging patterns or performance issues
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurgeCalculator;