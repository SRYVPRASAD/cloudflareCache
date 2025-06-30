import React, { useState, useEffect } from 'react';
import { Activity, Clock, Zap, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface MetricData {
  timestamp: string;
  hitRate: number;
  responseTime: number;
  requests: number;
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const generateMetric = (): MetricData => ({
    timestamp: new Date().toISOString(),
    hitRate: Math.round(70 + Math.random() * 25), // 70-95%
    responseTime: Math.round(30 + Math.random() * 100), // 30-130ms
    requests: Math.round(50 + Math.random() * 200) // 50-250 requests
  });

  const checkForAlerts = (newMetric: MetricData) => {
    const newAlerts: Alert[] = [];

    if (newMetric.hitRate < 75) {
      newAlerts.push({
        id: `alert-${Date.now()}-1`,
        type: 'warning',
        message: `Cache hit rate dropped to ${newMetric.hitRate}%`,
        timestamp: newMetric.timestamp
      });
    }

    if (newMetric.responseTime > 100) {
      newAlerts.push({
        id: `alert-${Date.now()}-2`,
        type: 'error',
        message: `Response time increased to ${newMetric.responseTime}ms`,
        timestamp: newMetric.timestamp
      });
    }

    if (newMetric.hitRate > 90) {
      newAlerts.push({
        id: `alert-${Date.now()}-3`,
        type: 'success',
        message: `Excellent cache performance: ${newMetric.hitRate}% hit rate`,
        timestamp: newMetric.timestamp
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMonitoring) {
      interval = setInterval(() => {
        const newMetric = generateMetric();
        setMetrics(prev => [newMetric, ...prev].slice(0, 20));
        checkForAlerts(newMetric);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    if (!isMonitoring) {
      // Start with initial data
      const initialMetric = generateMetric();
      setMetrics([initialMetric]);
      checkForAlerts(initialMetric);
    }
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const currentMetrics = metrics[0] || { hitRate: 0, responseTime: 0, requests: 0 };
  const avgHitRate = metrics.length > 0 
    ? Math.round(metrics.reduce((sum, m) => sum + m.hitRate, 0) / metrics.length)
    : 0;
  const avgResponseTime = metrics.length > 0
    ? Math.round(metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length)
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-purple-600" />
              Real-time Performance Monitor
            </h2>
            <p className="text-gray-600">
              Monitor your cache performance metrics in real-time and receive alerts for anomalies.
            </p>
          </div>
          <button
            onClick={toggleMonitoring}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isMonitoring
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <Activity className={`h-5 w-5 mr-2 ${isMonitoring ? 'animate-pulse' : ''}`} />
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          isMonitoring 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}></div>
          {isMonitoring ? 'Monitoring Active' : 'Monitoring Stopped'}
        </div>
      </div>

      {/* Current Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Hit Rate</h3>
            <Zap className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-green-600">
            {currentMetrics.hitRate}%
          </div>
          <p className="text-sm text-gray-600">
            Live cache hit rate
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-blue-600">
            {currentMetrics.responseTime}ms
          </div>
          <p className="text-sm text-gray-600">
            Current response time
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Hit Rate</h3>
            <Activity className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-purple-600">
            {avgHitRate}%
          </div>
          <p className="text-sm text-gray-600">
            Session average
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Response</h3>
            <Clock className="h-6 w-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold mb-2 text-orange-600">
            {avgResponseTime}ms
          </div>
          <p className="text-sm text-gray-600">
            Session average
          </p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
              Recent Alerts
            </h3>
            <button
              onClick={clearAlerts}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start space-x-3 p-3 rounded-lg ${
                  alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-green-50 border border-green-200'
                }`}
              >
                {alert.type === 'error' ? (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                ) : alert.type === 'warning' ? (
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    alert.type === 'error' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-yellow-800' :
                    'text-green-800'
                  }`}>
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics History */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance History</h3>
        {metrics.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {new Date(metric.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      metric.hitRate >= 85 ? 'bg-green-500' :
                      metric.hitRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900">
                      {metric.hitRate}% hit rate
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{metric.responseTime}ms</span>
                  <span>{metric.requests} req/min</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No monitoring data available</p>
            <p className="text-sm text-gray-500">Start monitoring to see real-time performance metrics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitor;