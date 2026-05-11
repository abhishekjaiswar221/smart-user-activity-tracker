import {
  AlertTriangle,
  Clock3,
  Globe,
  ShieldAlert,
  UserCircle2,
  Search,
  RefreshCcw,
  Activity,
} from "lucide-react";

const SuspiciousUsers = () => {
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

        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl transition w-fit">
          <RefreshCcw className="w-5 h-5" />
          Refresh Data
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
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

      {/* Search + Filters */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute top-4 left-4 w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search user..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-500/20 border border-red-500/30 text-red-400 px-5 py-3 rounded-xl">
              All Threats
            </button>

            <button className="bg-gray-800 border border-gray-700 hover:border-yellow-500 text-gray-300 px-5 py-3 rounded-xl transition">
              High Frequency
            </button>

            <button className="bg-gray-800 border border-gray-700 hover:border-blue-500 text-gray-300 px-5 py-3 rounded-xl transition">
              Multiple IPs
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 overflow-x-auto">
        {/* Table Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Threat Detection Results
            </h2>

            <p className="text-gray-400">
              Users flagged for suspicious activity patterns
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-red-400 text-sm">
            12 Active Threats
          </div>
        </div>

        {/* Table */}
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-400">
              <th className="pb-5">User</th>
              <th className="pb-5">Reason</th>
              <th className="pb-5">Request Count</th>
              <th className="pb-5">IP Addresses</th>
              <th className="pb-5">Risk Level</th>
              <th className="pb-5">Last Activity</th>
              <th className="pb-5">Status</th>
            </tr>
          </thead>

          <tbody>
            {/* Row 1 */}
            <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition">
              <td className="py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 p-2 rounded-xl">
                    <UserCircle2 className="w-6 h-6 text-red-400" />
                  </div>

                  <div>
                    <p className="font-medium">john.doe@example.com</p>

                    <p className="text-gray-500 text-sm">ID: USER_1024</p>
                  </div>
                </div>
              </td>

              <td className="py-6">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Activity className="w-5 h-5" />
                  High Frequency Requests
                </div>
              </td>

              <td className="py-6 font-semibold">42 Requests</td>

              <td className="py-6">1 IP</td>

              <td className="py-6">
                <span className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm">
                  High
                </span>
              </td>

              <td className="py-6 text-gray-400">5 sec ago</td>

              <td className="py-6">
                <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm">
                  Threat
                </span>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition">
              <td className="py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-xl">
                    <UserCircle2 className="w-6 h-6 text-blue-400" />
                  </div>

                  <div>
                    <p className="font-medium">alex.smith@example.com</p>

                    <p className="text-gray-500 text-sm">ID: USER_3021</p>
                  </div>
                </div>
              </td>

              <td className="py-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Globe className="w-5 h-5" />
                  Multiple IP Addresses
                </div>
              </td>

              <td className="py-6 font-semibold">18 Requests</td>

              <td className="py-6">4 IPs</td>

              <td className="py-6">
                <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-xl text-sm">
                  Medium
                </span>
              </td>

              <td className="py-6 text-gray-400">12 sec ago</td>

              <td className="py-6">
                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl text-sm">
                  Monitoring
                </span>
              </td>
            </tr>

            {/* Empty Example */}
            <tr>
              <td colSpan="7" className="text-center py-20 text-gray-500">
                No additional suspicious users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Alert */}
      <div className="mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-3xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-red-500/20 p-3 rounded-2xl">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Threat Detection Rules
            </h3>

            <div className="space-y-2 text-gray-300">
              <p>
                • Users sending more than 20 requests within 1 minute are
                flagged.
              </p>

              <p>
                • Users switching between more than 2 IP addresses within 5
                minutes are flagged.
              </p>

              <p>• Detection scans run automatically in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspiciousUsers;
