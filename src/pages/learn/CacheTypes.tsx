import React from 'react';
import { Globe, Server, Zap, Clock } from 'lucide-react';

const CacheTypes: React.FC = () => {
  const cacheTypes = [
    {
      icon: Globe,
      title: 'Edge Cache',
      description: 'Content cached at CloudFlare\'s edge servers worldwide',
      ttl: '2 hours - 30 days',
      useCase: 'Static assets, images, CSS, JavaScript files',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Server,
      title: 'Origin Cache',
      description: 'Content cached at your origin server',
      ttl: '1 minute - 24 hours',
      useCase: 'Dynamic content, API responses, personalized data',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Browser Cache',
      description: 'Content cached in user\'s browser',
      ttl: '1 hour - 1 year',
      useCase: 'Frequently accessed resources, offline functionality',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Tiered Cache',
      description: 'Multi-level caching strategy',
      ttl: 'Variable',
      useCase: 'Complex applications with mixed content types',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const strategies = [
    {
      name: 'Cache Everything',
      description: 'Cache all content including HTML pages',
      pros: ['Maximum performance', 'Reduced origin load', 'Global content delivery'],
      cons: ['Complex invalidation', 'Dynamic content challenges', 'Personalization issues'],
      bestFor: 'Static websites, blogs, documentation sites'
    },
    {
      name: 'Cache Static Assets Only',
      description: 'Cache only static resources like images, CSS, JS',
      pros: ['Simple to implement', 'Predictable behavior', 'Easy invalidation'],
      cons: ['Limited performance gains', 'HTML still hits origin', 'Higher server load'],
      bestFor: 'Dynamic web applications, e-commerce sites'
    },
    {
      name: 'Selective Caching',
      description: 'Cache specific content based on rules and headers',
      pros: ['Flexible control', 'Optimized performance', 'Balanced approach'],
      cons: ['Complex configuration', 'Requires planning', 'Monitoring needed'],
      bestFor: 'Mixed content applications, APIs with varying data freshness'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cache Types & Strategies</h2>
        <p className="text-gray-600">
          Understanding different caching layers and strategies to optimize your CloudFlare configuration.
        </p>
      </div>

      {/* Cache Types */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Types of Caching</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {cacheTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200">
                <div className={`bg-gradient-to-r ${type.color} p-3 rounded-xl w-fit mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">TTL Range:</span>
                    <span className="text-xs text-gray-700">{type.ttl}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Best for:</span>
                    <p className="text-xs text-gray-700 mt-1">{type.useCase}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Caching Strategies */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Caching Strategies</h3>
        <div className="space-y-6">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{strategy.name}</h4>
                <p className="text-gray-600 text-sm">{strategy.description}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Pros</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    {strategy.pros.map((pro, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-800 mb-2">Cons</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    {strategy.cons.map((con, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Best For</h5>
                  <p className="text-sm text-blue-700">{strategy.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cache Headers Guide */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Cache Headers</h3>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cache-Control</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Controls caching behavior and TTL</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">max-age=3600, public</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ETag</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Enables conditional requests</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">"abc123def456"</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Last-Modified</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Indicates when content was last changed</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">Wed, 21 Oct 2024 07:28:00 GMT</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vary</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Specifies which headers affect caching</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">Accept-Encoding, User-Agent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategy Selection Guide</h3>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Static Sites</h4>
              <p className="text-sm text-gray-600">Use "Cache Everything" with long TTL values</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Server className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dynamic Apps</h4>
              <p className="text-sm text-gray-600">Use "Selective Caching" with smart invalidation</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">APIs</h4>
              <p className="text-sm text-gray-600">Use "Cache Static Assets" with API-specific rules</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CacheTypes;