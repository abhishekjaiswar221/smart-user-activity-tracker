import { Activity, AlertTriangle, BarChart3, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchStats } from "../api/activityApi";

const Dashboard = () => {
  const navigate = useNavigate();

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

  const cards = [
    {
      title: "Activity Simulator",
      description: "Simulate user actions and monitor rate limits",
      icon: Activity,
      path: "/activity",
    },
    {
      title: "Analytics Stats",
      description: "View real-time activity analytics and trends",
      icon: BarChart3,
      path: "/stats",
    },
    {
      title: "Suspicious Users",
      description: "Detect abnormal activity and IP changes",
      icon: AlertTriangle,
      path: "/suspicious",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">Dashboard Overview</h2>

          <p className="text-gray-400 max-w-2xl">
            Monitor user activities, detect suspicious behavior, and analyze
            real-time system interactions through custom analytics.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Actions</p>

                <h3 className="text-3xl font-bold mt-2">
                  {stats?.totalActions}
                </h3>
              </div>

              <div className="bg-indigo-600/20 p-3 rounded-xl">
                <Activity className="text-indigo-400 w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Sessions</p>

                <h3 className="text-3xl font-bold mt-2">24</h3>
              </div>

              <div className="bg-green-600/20 p-3 rounded-xl">
                <Clock3 className="text-green-400 w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Suspicious Users</p>

                <h3 className="text-3xl font-bold mt-2">3</h3>
              </div>

              <div className="bg-red-600/20 p-3 rounded-xl">
                <AlertTriangle className="text-red-400 w-7 h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Explore Features</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  onClick={() => navigate(card.path)}
                  className="bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition duration-300 hover:-translate-y-1"
                >
                  <div className="bg-indigo-600/20 w-fit p-3 rounded-xl mb-5">
                    <Icon className="text-indigo-400 w-7 h-7" />
                  </div>

                  <h4 className="text-xl font-semibold mb-2">{card.title}</h4>

                  <p className="text-gray-400 text-sm leading-6">
                    {card.description}
                  </p>

                  <button className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition">
                    Open
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
