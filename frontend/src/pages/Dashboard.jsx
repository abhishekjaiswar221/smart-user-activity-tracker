import { Activity, AlertTriangle, ShieldAlert, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchStats, getSuspiciousActivity } from "../api/activityApi";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [suspiciousActivity, setSuspiciousActivity] = useState([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await fetchStats();

        setStats(response);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStatsData();
  }, []);

  useEffect(() => {
    const fetchSuspiciousActivityData = async () => {
      try {
        const response = await getSuspiciousActivity();
        console.log(response);
        setSuspiciousActivity(response?.suspiciousUsers || []);
      } catch (error) {
        console.error("Error fetching suspicious activity", error);
      }
    };

    fetchSuspiciousActivityData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-400">
            Activity Analytics
          </h1>

          <p className="text-sm text-gray-400">
            Monitor user activity and security insights
          </p>
        </div>

        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition">
          Logout
        </button>
      </nav>

      <div className="p-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Actions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Actions</p>

                <h2 className="text-3xl font-bold mt-2">
                  {stats?.data?.totalActions}
                </h2>
              </div>

              <div className="bg-indigo-500/20 p-3 rounded-xl">
                <Activity className="text-indigo-400 w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Most Common Action */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Most Common Action</p>

                <h2 className="text-3xl font-bold mt-2">
                  {stats?.data?.mostCommonAction?._id}
                </h2>
              </div>

              <div className="bg-green-500/20 p-3 rounded-xl">
                <ShieldAlert className="text-green-400 w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Most Active User */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Most Active User</p>

                <h2 className="text-2xl font-bold mt-2 truncate">
                  {stats?.data?.mostActiveUser?._id}
                </h2>
              </div>

              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Users className="text-blue-400 w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Suspicious Users */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Suspicious Users</p>

                <h2 className="text-3xl font-bold mt-2">
                  {suspiciousActivity.length}
                </h2>
              </div>

              <div className="bg-red-500/20 p-3 rounded-xl">
                <AlertTriangle className="text-red-400 w-7 h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Suspicious Activity Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg overflow-x-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Suspicious Activity Detection
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Users with unusually high activity rates
            </p>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm">
                <th className="pb-4">User ID</th>
                <th className="pb-4">Reason</th>
                <th className="pb-4">Count</th>
              </tr>
            </thead>

            <tbody>
              {suspiciousActivity.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  {/* User ID */}
                  <td className="py-4 break-all">{item.userId}</td>

                  {/* Reason */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          item.reason === "High frequency"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {item.reason}
                    </span>
                  </td>

                  {/* Count */}
                  <td className="py-4 font-semibold">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
