import { Activity, Clock3, TrendingUp, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchStats } from "../api/activityApi";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        setLoading(true);
        const response = await fetchStats();
        setStats(response?.data || null);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load activity stats");
      } finally {
        setLoading(false);
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

  const mostCommonActionLabel = stats?.mostCommonAction?._id
    ? stats.mostCommonAction._id.charAt(0).toUpperCase() +
      stats.mostCommonAction._id.slice(1)
    : "No data yet";

  const mostActiveUserLabel = stats?.mostActiveUser?._id
    ? `${stats.mostActiveUser._id.slice(0, 20)}...`
    : "No data yet";

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
      {loading ? (
        <p className="text-gray-400">Loading activity stats...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
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

            <h2 className="text-4xl font-bold mt-2">
              {stats?.totalActions ?? 0}
            </h2>
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
              {mostCommonActionLabel}
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

            <h2 className="text-3xl font-bold mt-2">{mostActiveUserLabel}</h2>
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
      )}
    </div>
  );
};

export default Stats;
