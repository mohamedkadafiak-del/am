import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, Shield, AlertTriangle, Clock, MapPin, TrendingUp, Info } from 'lucide-react';

const SafetyInsights = () => {
  const [stats, setStats] = useState({
    totalCrimes: 0,
    averageSafety: 85,
    riskLevel: 'Low',
    commonTypes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data: crimes } = await axios.get('http://localhost:5000/api/crime-data');

        // Simple analysis
        const types = crimes.reduce((acc, curr) => {
          acc[curr.type] = (acc[curr.type] || 0) + 1;
          return acc;
        }, {});

        const sortedTypes = Object.entries(types)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        setStats({
          totalCrimes: crimes.length,
          averageSafety: Math.max(0, 100 - (crimes.length * 0.5)),
          riskLevel: crimes.length > 50 ? 'High' : crimes.length > 20 ? 'Medium' : 'Low',
          commonTypes: sortedTypes
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) return <div className="pt-32 text-center text-slate-400">Analyzing security data...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <BarChart3 className="text-indigo-500" />
          Safety Insights
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Comprehensive analytics based on historical data, community reports, and real-time environmental factors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <InsightStat
          label="Overall Safety Score"
          value={`${Math.round(stats.averageSafety)}/100`}
          color="text-emerald-400"
          icon={<Shield size={20} />}
        />
        <InsightStat
          label="Reported Incidents"
          value={stats.totalCrimes}
          color="text-indigo-400"
          icon={<AlertTriangle size={20} />}
        />
        <InsightStat
          label="Current Risk Level"
          value={stats.riskLevel}
          color={stats.riskLevel === 'High' ? 'text-red-400' : stats.riskLevel === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}
          icon={<TrendingUp size={20} />}
        />
        <InsightStat
          label="Monitoring Status"
          value="Active"
          color="text-emerald-400"
          icon={<Clock size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Info className="text-slate-400" size={20} />
            Common Incident Types
          </h3>
          <div className="space-y-4">
            {stats.commonTypes.map(([type, count]) => (
              <div key={type} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{type}</span>
                  <span className="text-slate-500">{count} reports</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${(count / stats.totalCrimes) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {stats.commonTypes.length === 0 && (
              <p className="text-slate-500 italic">No incident data available yet.</p>
            )}
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Safety Tips</h3>
          <div className="space-y-6">
            <TipItem
              title="Avoid Low-Lit Areas"
              desc="80% of night-time incidents occur in areas with poor lighting. Stick to main roads."
            />
            <TipItem
              title="Use Live Sharing"
              desc="Share your live location with trusted contacts when traveling through 'Medium' risk zones."
            />
            <TipItem
              title="Community Awareness"
              desc="Keep your app notifications on for real-time alerts in your current vicinity."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightStat = ({ label, value, color, icon }) => (
  <div className="glass-card p-6 rounded-2xl border border-slate-800">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
        {icon}
      </div>
      <span className="text-slate-400 text-sm font-medium">{label}</span>
    </div>
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
  </div>
);

const TipItem = ({ title, desc }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
    </div>
    <div>
      <h4 className="text-slate-200 font-semibold mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default SafetyInsights;
