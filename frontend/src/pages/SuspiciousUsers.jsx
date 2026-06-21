import {
  Activity,
  Clock3,
  Globe,
  RefreshCcw,
  ShieldAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getSuspiciousActivity } from "../api/activityApi";

const SuspiciousUsers = () => {
  const [suspiciousUsers, setSuspiciousUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastScan, setLastScan] = useState(null);

  useEffect(() => {
    const fetchSuspiciousUsers = async () => {
      try {
        setLoading(true);
        const response = await getSuspiciousActivity();
        setSuspiciousUsers(response?.data?.suspiciousUsers || []);
        setLastScan(new Date());
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load suspicious activity");
      } finally {
        setLoading(false);
      }
    };
    fetchSuspiciousUsers();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await getSuspiciousActivity();
      setSuspiciousUsers(response?.data?.suspiciousUsers || []);
      setLastScan(new Date());
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load suspicious activity");
    } finally {
      setLoading(false);
    }
  };

  const highFrequencyCount = suspiciousUsers.filter(
    (user) => user.reason === "High frequency",
  ).length;
  const multipleIpCount = suspiciousUsers.filter(
    (user) => user.reason === "Multiple IPs",
  ).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Suspicious Users</h1>

          <p className="text-gray-400">
            Monitor abnormal activity and detect suspicious user behavior
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl transition w-fit"
        >
          <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-10">
        {/* Total Suspicious */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-red-600/20 p-3 rounded-2xl">
              <ShieldAlert className="w-7 h-7 text-red-400" />
            </div>

            <span className="text-red-400 text-xs">High Risk</span>
          </div>

          <p className="text-gray-400 text-sm">Suspicious Users</p>

          <h2 className="text-4xl font-bold mt-2">{suspiciousUsers.length}</h2>
        </div>

        {/* High Frequency */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-yellow-600/20 p-3 rounded-2xl">
              <Activity className="w-7 h-7 text-yellow-400" />
            </div>

            <span className="text-yellow-400 text-xs">Frequency</span>
          </div>

          <p className="text-gray-400 text-sm">High Request Users</p>

          <h2 className="text-4xl font-bold mt-2">{highFrequencyCount}</h2>
        </div>

        {/* Multiple IPs */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-blue-600/20 p-3 rounded-2xl">
              <Globe className="w-7 h-7 text-blue-400" />
            </div>

            <span className="text-blue-400 text-xs">Network</span>
          </div>

          <p className="text-gray-400 text-sm">Multiple IP Users</p>

          <h2 className="text-4xl font-bold mt-2">{multipleIpCount}</h2>
        </div>

        {/* Last Scan */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-green-600/20 p-3 rounded-2xl">
              <Clock3 className="w-7 h-7 text-green-400" />
            </div>

            <span className="text-green-400 text-xs">Live</span>
          </div>

          <p className="text-gray-400 text-sm">Last Detection Scan</p>

          <h2 className="text-2xl font-bold mt-2">
            {lastScan ? lastScan.toLocaleTimeString() : "—"}
          </h2>
        </div>
      </div>

      {/* Flagged Users */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
        <h3 className="text-xl font-semibold mb-4">Flagged Users</h3>

        {loading ? (
          <p className="text-gray-400">Scanning activity logs...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : suspiciousUsers.length === 0 ? (
          <p className="text-gray-400">No suspicious activity detected.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="py-3">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Reason</th>
                <th className="py-3">Count</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousUsers.map((user, index) => (
                <tr
                  key={`${user.userId}-${user.reason}-${index}`}
                  className="border-b border-gray-800/50"
                >
                  <td className="py-3">{user.name}</td>
                  <td className="py-3 text-gray-400 text-sm">{user.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.reason === "High frequency"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-blue-600/20 text-blue-400"
                      }`}
                    >
                      {user.reason}
                    </span>
                  </td>
                  <td className="py-3">{user.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SuspiciousUsers;
