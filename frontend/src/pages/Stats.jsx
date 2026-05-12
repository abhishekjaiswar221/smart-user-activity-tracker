import { Activity, Clock3, TrendingUp, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchStats } from "../api/activityApi";

const Stats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await fetchStats();
        setStats(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatsData();
  }, []);

  const actionsPerMinute = stats?.actionsPerMinute || [];

  const totalActions = actionsPerMinute.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const avgActionsPerMinute =
    actionsPerMinute.length > 0
      ? (totalActions / actionsPerMinute.length).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Activity Analytics</h1>

          <p className="text-gray-400">
            Monitor user activity and real-time statistics
          </p>
        </div>

        {/* <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl transition">
          <RefreshCcw className="w-5 h-5" />
          Refresh Stats
        </button> */}
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-10">
        {/* Total Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-indigo-600/20 p-3 rounded-2xl">
              <Activity className="w-7 h-7 text-indigo-400" />
            </div>

            <span className="text-xs text-green-400">+12%</span>
          </div>

          <p className="text-gray-400 text-sm">Total Actions</p>

          <h2 className="text-4xl font-bold mt-2">{stats?.totalActions}</h2>
        </div>

        {/* Most Common Action */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-blue-600/20 p-3 rounded-2xl">
              <TrendingUp className="w-7 h-7 text-blue-400" />
            </div>

            <span className="text-xs text-gray-400">Popular</span>
          </div>

          <p className="text-gray-400 text-sm">Most Common Action</p>

          <h2 className="text-4xl font-bold mt-2">
            {stats?.mostCommonAction?._id.charAt(0).toUpperCase() +
              stats?.mostCommonAction?._id.slice(1)}
          </h2>
        </div>

        {/* Most Active User */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-green-600/20 p-3 rounded-2xl">
              <UserCircle2 className="w-7 h-7 text-green-400" />
            </div>

            <span className="text-xs text-gray-400">Active</span>
          </div>

          <p className="text-gray-400 text-sm">Most Active User</p>

          <h2 className="text-3xl font-bold mt-2">
            {stats?.mostActiveUser?._id.slice(0, 20) + "..."}
          </h2>
        </div>

        {/* Avg Requests */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-yellow-600/20 p-3 rounded-2xl">
              <Clock3 className="w-7 h-7 text-yellow-400" />
            </div>

            <span className="text-xs text-gray-400">Last 10 Min</span>
          </div>

          <p className="text-gray-400 text-sm">Avg Actions / Min</p>

          <h2 className="text-4xl font-bold mt-2">{avgActionsPerMinute}</h2>
        </div>
      </div>

      {/* Main Analytics */}
      {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        Chart
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Actions Per Minute
              </h2>

              <p className="text-gray-400">
                Activity trend for the last 10 minutes
              </p>
            </div>

            <div className="bg-indigo-600/20 px-4 py-2 rounded-xl text-indigo-400 text-sm">
              Auto Refresh: 5s
            </div>
          </div>
          Fake Chart
          <div className="h-80 bg-gray-800 border border-gray-700 rounded-2xl flex items-end justify-between px-6 py-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-24 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">1m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-36 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">2m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-52 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">3m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-28 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">4m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-40 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">5m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-60 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">6m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-48 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">7m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-72 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">8m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-44 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">9m</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-56 bg-indigo-500 rounded-t-lg"></div>

              <span className="text-xs text-gray-400">10m</span>
            </div>
          </div>
        </div>
         Right Side
        <div className="space-y-6">
          Live Summary
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-indigo-400" />

              <h2 className="text-2xl font-semibold">Live Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between">
                <span className="text-gray-400">Login Actions</span>

                <span className="font-semibold">240</span>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between">
                <span className="text-gray-400">Click Actions</span>

                <span className="font-semibold">5,430</span>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between">
                <span className="text-gray-400">View Actions</span>

                <span className="font-semibold">3,820</span>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between">
                <span className="text-gray-400">Custom Actions</span>

                <span className="font-semibold">740</span>
              </div>
            </div>
          </div>
          System Status
          <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-5">System Status</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Replay Protection</span>

                <span className="text-green-400">Active</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Rate Limiting</span>

                <span className="text-green-400">Running</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Refresh</span>

                <span className="text-indigo-400">5 Seconds</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Status</span>

                <span className="text-green-400">Healthy</span>
              </div>
            </div>
          </div>
        </div> 
      </div> */}

      {/* Recent Insights */}
      {/* <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
        <h2 className="text-2xl font-semibold mb-8">Recent Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-3">Peak Activity Time</p>

            <h3 className="text-3xl font-bold">08:45 PM</h3>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-3">Highest Requests</p>

            <h3 className="text-3xl font-bold">1,204/min</h3>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-3">Active Sessions</p>

            <h3 className="text-3xl font-bold">42</h3>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Stats;
