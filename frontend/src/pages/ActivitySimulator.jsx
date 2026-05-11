import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MousePointerClick,
  ShieldAlert,
  TimerReset,
} from "lucide-react";
import { useState } from "react";
import { logActivity, replayCheck } from "../api/activityApi";

const actions = ["login", "logout", "view", "click", "custom"];

const ActivitySimulator = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [serverTime, setServerTime] = useState("");
  const [clientTime, setClientTime] = useState("");
  const [timeDifference, setTimeDifference] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [actionsInLast10Sec, setActionsInLast10Sec] = useState(0);

  const handleAction = async (action) => {
    try {
      const currentClientTime = new Date().toISOString();

      setClientTime(currentClientTime);

      const replayCheckRes = await replayCheck({
        action,
        clientTime: currentClientTime,
      });

      if (!replayCheckRes?.data?.allowed) {
        setError("Replay detected");
        return;
      }

      const logActivityRes = await logActivity({
        action,
        meta: {
          source: "frontend",
        },
      });

      const timeDiff =
        Math.abs(
          new Date(logActivityRes?.data?.serverTime) -
            new Date(currentClientTime),
        ) / 1000;

      setTimeDifference(timeDiff);
      setServerTime(logActivityRes?.data?.serverTime);
      setActionsInLast10Sec(logActivityRes?.data?.actionsInLast10Sec);
      setMessage(`${action.toUpperCase()} logged successfully`);
    } catch (error) {
      console.error("Error", error);

      if (error?.response?.status === 429) {
        setError("Rate limit exceeded. Buttons are disabled for 10 seconds");
        setButtonsDisabled(true);

        setTimeout(() => {
          setButtonsDisabled(false);
        }, 10000);
      } else {
        setError(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <MousePointerClick className="w-7 h-7 text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">Activity Simulator</h1>

              <p className="text-gray-400 mt-1">
                Simulate actions, replay protection, and rate-limiting behavior
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Trigger Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {actions.map((action, index) => (
              <button
                key={index}
                disabled={buttonsDisabled}
                onClick={() => handleAction(action)}
                className={`py-4 rounded-xl font-semibold transition duration-200 border
                  
                  ${
                    buttonsDisabled
                      ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 border-indigo-500"
                  }
                `}
              >
                {action.toUpperCase()}
              </button>
            ))}
          </div>

          {buttonsDisabled && (
            <div className="mt-5 flex items-center gap-2 text-red-400">
              <ShieldAlert className="w-5 h-5" />

              <p>Actions temporarily blocked due to rate limiting</p>
            </div>
          )}
        </div>

        {/* Success Message */}
        {message && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-5 mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" />

            <p>{message}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-5 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />

            <p>{error}</p>
          </div>
        )}

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Comparison */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Clock3 className="text-indigo-400 w-6 h-6" />

              <h3 className="text-xl font-semibold">Time Comparison</h3>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 text-sm mb-1">Client Time</p>

                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 text-sm break-all">
                  {clientTime || "No activity yet"}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Server Time</p>

                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 text-sm break-all">
                  {serverTime || "No activity yet"}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Difference</p>

                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700">
                  {timeDifference} seconds
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <TimerReset className="text-indigo-400 w-6 h-6" />

              <h3 className="text-xl font-semibold">Request Analytics</h3>
            </div>

            <div className="space-y-5">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
                <p className="text-gray-400 text-sm">
                  Actions in Last 10 Seconds
                </p>

                <h2 className="text-4xl font-bold mt-2 text-indigo-400">
                  {actionsInLast10Sec}
                </h2>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
                <p className="text-gray-400 text-sm mb-2">Replay Protection</p>

                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Duplicate actions blocked within 3 seconds</li>

                  <li>• Client/server time mismatch validation</li>

                  <li>• Custom backend replay detection active</li>
                </ul>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
                <p className="text-gray-400 text-sm mb-2">
                  Rate Limiting Rules
                </p>

                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Maximum 5 actions in 10 seconds</li>

                  <li>• Buttons auto-disabled on limit hit</li>

                  <li>• Re-enabled automatically after 10 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySimulator;
