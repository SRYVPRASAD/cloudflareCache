import React from 'react';
import { Info, ArrowRight, CheckCircle } from 'lucide-react';

const CachePurging: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cache Purging Fundamentals</h2>
        <p className="text-gray-600">
          Learn the essential concepts of CloudFlare cache purging and when to use it effectively.
        </p>
      </div>

      {/* What is Cache Purging */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <Info className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">What is Cache Purging?</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Cache purging is the process of removing cached content from CloudFlare's edge servers, 
            forcing them to fetch fresh content from your origin server on the next request.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
              Removes outdated content from edge servers
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
              Ensures users see the latest version of your content
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
              Maintains content freshness across global CDN
            </li>
          </ul>
        </div>
      </section>

      {/* When to Purge */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">When Should You Purge Cache?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Content Updates
            </h4>
            <p className="text-sm text-green-700">
              After deploying new website content, blog posts, or product information
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Bug Fixes
            </h4>
            <p className="text-sm text-green-700">
              When fixing critical bugs or security issues that affect cached content
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Asset Changes
            </h4>
            <p className="text-sm text-green-700">
              After updating CSS, JavaScript, images, or other static assets
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              API Updates
            </h4>
            <p className="text-sm text-green-700">
              When API responses change and cached data becomes stale
            </p>
          </div>
        </div>
      </section>

      {/* Purge Methods */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Cache Purging Methods</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Purge Everything</h4>
            <p className="text-gray-600 text-sm mb-2">
              Clears all cached content for your entire domain. Use sparingly as it affects all visitors.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
              <p className="text-yellow-800 text-xs">
                ⚠️ This method should be used carefully as it removes all cached content
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Purge by URL</h4>
            <p className="text-gray-600 text-sm mb-2">
              Removes specific files or pages from cache. More targeted and efficient.
            </p>
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <p className="text-green-800 text-xs">
                ✅ Recommended for most use cases - precise and efficient
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Purge by Cache Tag</h4>
            <p className="text-gray-600 text-sm mb-2">
              Clears content associated with specific cache tags. Requires Enterprise plan.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-2">
              <p className="text-blue-800 text-xs">
                💡 Most flexible option for complex caching strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact on Performance */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Impact</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Understanding the performance implications of cache purging is crucial for maintaining optimal site speed:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium mr-2 mt-0.5">IMPACT</span>
              <span>First request after purge will be slower as content is fetched from origin</span>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2 mt-0.5">TIMING</span>
              <span>Purge operations typically complete within 30 seconds globally</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2 mt-0.5">RECOVERY</span>
              <span>Cache rebuilds automatically as users request content</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CachePurging;