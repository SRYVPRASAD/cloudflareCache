import React from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const BestPractices: React.FC = () => {
  const dos = [
    'Use selective purging instead of "Purge Everything" when possible',
    'Implement cache tags for granular control over purging',
    'Monitor cache hit rates to ensure optimal performance',
    'Automate purging in your CI/CD pipeline for deployments',
    'Test purge operations in staging before production',
    'Set appropriate cache TTL values for different content types'
  ];

  const donts = [
    'Don\'t purge cache unnecessarily - it impacts performance',
    'Don\'t rely solely on manual purging for content updates',
    'Don\'t purge during high traffic periods unless critical',
    'Don\'t forget to purge related dependencies when updating content',
    'Don\'t use "Purge Everything" for minor content changes',
    'Don\'t ignore cache headers when implementing purging strategies'
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cache Management Best Practices</h2>
        <p className="text-gray-600">
          Industry-proven strategies for effective CloudFlare cache management and optimization.
        </p>
      </div>

      {/* Do's and Don'ts */}
      <section className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Best Practices
            </h3>
            <ul className="space-y-3">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start text-sm text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Common Mistakes
            </h3>
            <ul className="space-y-3">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start text-sm text-red-700">
                  <XCircle className="h-4 w-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Strategic Approaches */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Approaches</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Proactive Purging</h4>
            <p className="text-sm text-blue-700 mb-3">
              Automatically purge cache as part of your deployment process
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• CI/CD integration</li>
              <li>• Webhook automation</li>
              <li>• Scheduled purging</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Selective Targeting</h4>
            <p className="text-sm text-purple-700 mb-3">
              Use precise purging methods to minimize performance impact
            </p>
            <ul className="text-xs text-purple-600 space-y-1">
              <li>• URL-specific purging</li>
              <li>• Cache tag strategies</li>
              <li>• Pattern-based purging</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">Performance Monitoring</h4>
            <p className="text-sm text-orange-700 mb-3">
              Track cache performance to optimize your strategy
            </p>
            <ul className="text-xs text-orange-600 space-y-1">
              <li>• Hit rate monitoring</li>
              <li>• Response time tracking</li>
              <li>• Error rate analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Implementation Guidelines */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Guidelines</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Development Environment</h4>
            <p className="text-sm text-blue-700">
              Set up a staging environment that mirrors your production cache configuration. 
              Test all purging strategies before deploying to production.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h4 className="font-semibold text-green-800 mb-2">Automation Strategy</h4>
            <p className="text-sm text-green-700">
              Implement automated purging workflows that trigger based on content changes, 
              deployments, or scheduled intervals to maintain content freshness.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Monitoring & Alerts</h4>
            <p className="text-sm text-yellow-700">
              Set up monitoring for cache hit rates, purge frequency, and performance metrics. 
              Configure alerts for unusual patterns or performance degradation.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Tips */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Optimization Tips</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-gray-600" />
                Cache Headers Optimization
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Set appropriate Cache-Control headers</li>
                <li>• Use ETags for conditional requests</li>
                <li>• Implement Last-Modified headers</li>
                <li>• Configure Vary headers correctly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-gray-600" />
                Edge Case Handling
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Handle mobile vs desktop content</li>
                <li>• Manage user-specific content</li>
                <li>• Deal with dynamic API responses</li>
                <li>• Consider geographic variations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestPractices;