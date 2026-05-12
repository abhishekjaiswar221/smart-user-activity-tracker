import { Activity, Clock3, Globe, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { getSuspiciousActivity } from "../api/activityApi";

const SuspiciousUsers = () => {
  const [suspiciousUser, setSuspiciousUser] = useState({});
  console.log(suspiciousUser);

  useEffect(() => {
    const fetchSuspiciousUsers = async () => {
      try {
        const response = await getSuspiciousActivity();
        setSuspiciousUser(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuspiciousUsers();
  }, []);

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

        {/* <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl transition w-fit">
          <RefreshCcw className="w-5 h-5" />
          Refresh Data
        </button> */}
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

          <h2 className="text-4xl font-bold mt-2">12</h2>
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

          <h2 className="text-4xl font-bold mt-2">7</h2>
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

          <h2 className="text-4xl font-bold mt-2">5</h2>
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

          <h2 className="text-2xl font-bold mt-2">2 sec ago</h2>
        </div>
      </div>
    </div>
  );
};

export default SuspiciousUsers;
