import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';

interface AnalysisData {
  hitRate: number;
  avgResponseTime: number;
  totalRequests: number;
  cacheEfficiency: number;
  bandwidthSaved: number;
}

const CacheAnalyzer: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    hitRate: 0,
    avgResponseTime: 0,
    totalRequests: 0,
    cacheEfficiency: 0,
    bandwidthSaved: 0
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis with realistic data
    setTimeout(() => {
      const mockData: AnalysisData = {
        hitRate: Math.round(75 + Math.random() * 20), // 75-95%
        avgResponseTime: Math.round(50 + Math.random() * 100), // 50-150ms
        totalRequests: Math.round(1000 + Math.random() * 9000), // 1k-10k
        cacheEfficiency: Math.round(80 + Math.random() * 15), // 80-95%
        bandwidthSaved: Math.round(40 + Math.random() * 50) // 40-90%
      };
      
      setAnalysisData(mockData);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const getPerformanceGrade = (hitRate: number) => {
    if (hitRate >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (hitRate >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (hitRate >= 70) return { grade: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (hitRate >= 60) return { grade: 'C', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const performance = getPerformanceGrade(analysisData.hitRate);

  const recommendations = [
    {
      title: 'Optimize Cache Headers',
      description: 'Set appropriate Cache-Control headers for better cache efficiency',
      impact: 'High',
      effort: 'Medium'
    },
    {
      title: 'Implement Cache Tags',
      description: 'Use cache tags for more granular purging control',
      impact: 'Medium',
      effort: 'High'
    },
    {
      title: 'Review TTL Settings',
      description: 'Adjust Time-To-Live values based on content update frequency',
      impact: 'Medium',
      effort: 'Low'
    },
    {
      title: 'Enable Compression',
      description: 'Use Gzip/Brotli compression to reduce bandwidth usage',
      impact: 'High',
      effort: 'Low'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
              Cache Performance Analyzer
            </h2>
            <p className="text-gray-600">
              Analyze your cache performance and get actionable insights for optimization.
            </p>
          </div>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cache Hit Rate</h3>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-green-600">
            {analysisData.hitRate}%
          </div>
          <p className="text-sm text-gray-600">
            Requests served from cache
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Response Time</h3>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-blue-600">
            {analysisData.avgResponseTime}ms
          </div>
          <p className="text-sm text-gray-600">
            Average response time
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Requests</h3>
            <BarChart3 className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-purple-600">
            {analysisData.totalRequests.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">
            Requests analyzed
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Bandwidth Saved</h3>
            <TrendingDown className="h-6 w-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-orange-600">
            {analysisData.bandwidthSaved}%
          </div>
          <p className="text-sm text-gray-600">
            Bandwidth reduction
          </p>
        </div>
      </div>

      {/* Performance Grade */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Grade</h3>
        <div className="flex items-center space-x-4">
          <div className={`${performance.bg} ${performance.color} text-4xl font-bold px-6 py-4 rounded-2xl`}>
            {performance.grade}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {analysisData.hitRate >= 90 ? 'Excellent' : 
               analysisData.hitRate >= 80 ? 'Good' : 
               analysisData.hitRate >= 70 ? 'Fair' : 
               analysisData.hitRate >= 60 ? 'Poor' : 'Critical'}
            </p>
            <p className="text-gray-600">
              Your cache is performing {analysisData.hitRate >= 80 ? 'well' : 'below optimal levels'}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cache Efficiency Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cache Hits</span>
              <span className="font-semibold text-green-600">{analysisData.hitRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${analysisData.hitRate}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cache Misses</span>
              <span className="font-semibold text-red-600">{100 - analysisData.hitRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${100 - analysisData.hitRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Impact</h3>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-1">Bandwidth Savings</h4>
              <p className="text-2xl font-bold text-green-600">{analysisData.bandwidthSaved}%</p>
              <p className="text-sm text-green-700">Reduced origin server load</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-1">Response Time</h4>
              <p className="text-2xl font-bold text-blue-600">{analysisData.avgResponseTime}ms</p>
              <p className="text-sm text-blue-700">Average page load time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Optimization Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.impact === 'High' ? 'bg-red-100 text-red-800' :
                    rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.impact} Impact
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.effort === 'High' ? 'bg-red-100 text-red-800' :
                    rec.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.effort} Effort
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CacheAnalyzer;