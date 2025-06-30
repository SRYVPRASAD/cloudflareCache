import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Zap, 
  Server, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';

interface CacheHit {
  timestamp: string;
  status: string;
  loadTime: number;
}

const Dashboard: React.FC = () => {
  const [cacheStatus, setCacheStatus] = useState<string>('Checking...');
  const [pageLoadTime, setPageLoadTime] = useState<number>(0);
  const [cacheHits, setCacheHits] = useState<CacheHit[]>([]);

  useEffect(() => {
    const startTime = performance.now();
    
    // Load existing cache hits from localStorage
    const existingHits = JSON.parse(localStorage.getItem('cacheHits') || '[]');
    setCacheHits(existingHits);

    // Simulate cache status detection
    const detectCacheStatus = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      setPageLoadTime(loadTime);

      // Simulate cache detection logic
      const isCached = loadTime < 100 || Math.random() > 0.5;
      const status = isCached ? 'HIT' : 'MISS';
      setCacheStatus(status);

      // Create new cache hit record
      const newHit: CacheHit = {
        timestamp: new Date().toISOString(),
        status: status,
        loadTime: loadTime
      };

      // Update cache hits
      const updatedHits = [newHit, ...existingHits].slice(0, 10);
      setCacheHits(updatedHits);
      localStorage.setItem('cacheHits', JSON.stringify(updatedHits));
    };

    setTimeout(detectCacheStatus, 500);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const clearCacheHistory = () => {
    setCacheHits([]);
    localStorage.removeItem('cacheHits');
  };

  const hitRate = cacheHits.length > 0 
    ? Math.round((cacheHits.filter(hit => hit.status === 'HIT').length / cacheHits.length) * 100)
    : 0;

  const avgLoadTime = cacheHits.length > 0
    ? Math.round(cacheHits.reduce((sum, hit) => sum + hit.loadTime, 0) / cacheHits.length)
    : 0;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cache Dashboard</h1>
          <p className="text-gray-600">Monitor your CloudFlare cache performance in real-time</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Test Cache Status
          </button>
          <button
            onClick={clearCacheHistory}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-md"
          >
            Clear History
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Cache Status */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cache Status</h3>
              {cacheStatus === 'HIT' ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : cacheStatus === 'MISS' ? (
                <XCircle className="h-6 w-6 text-red-500" />
              ) : (
                <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
              )}
            </div>
            <div className="text-3xl font-bold mb-2">
              <span className={`${
                cacheStatus === 'HIT' ? 'text-green-600' : 
                cacheStatus === 'MISS' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {cacheStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {cacheStatus === 'HIT' ? 'Page served from cache' : 
               cacheStatus === 'MISS' ? 'Page served from origin' : 'Detecting...'}
            </p>
          </div>

          {/* Load Time */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Load Time</h3>
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-2 text-yellow-600">
              {pageLoadTime.toFixed(0)}ms
            </div>
            <p className="text-sm text-gray-600">
              Current page load time
            </p>
          </div>

          {/* Cache Hit Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Hit Rate</h3>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-2 text-green-600">
              {hitRate}%
            </div>
            <p className="text-sm text-gray-600">
              Cache hit percentage
            </p>
          </div>

          {/* Average Load Time */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Avg Load Time</h3>
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-3xl font-bold mb-2 text-purple-600">
              {avgLoadTime}ms
            </div>
            <p className="text-sm text-gray-600">
              Average across all requests
            </p>
          </div>
        </div>

        {/* Recent Cache Hits */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Recent Cache Activity
              </h3>
              <span className="text-sm text-gray-500">
                Last {cacheHits.length} requests
              </span>
            </div>
          </div>
          <div className="p-6">
            {cacheHits.length > 0 ? (
              <div className="space-y-3">
                {cacheHits.map((hit, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        hit.status === 'HIT' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <span className="font-medium text-gray-900">{hit.status}</span>
                        <div className="text-sm text-gray-600">
                          {new Date(hit.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-700">
                        {hit.loadTime.toFixed(0)}ms
                      </span>
                      <div className="text-xs text-gray-500">
                        Load time
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No cache activity recorded yet</p>
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start Monitoring
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;