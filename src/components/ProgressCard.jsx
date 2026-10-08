import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const progressData = [
  {
    semester: "Sem 1",
    score: 68,
  },
  {
    semester: "Sem 2",
    score: 72,
  },
  {
    semester: "Sem 3",
    score: 70,
  },
  {
    semester: "Sem 4",
    score: 76,
  },
  {
    semester: "Sem 5",
    score: 74,
  },
  {
    semester: "Sem 6",
    score: 79,
  },
  {
    semester: "Sem 7",
    score: 82,
  },
];

function ProgressCard() {
  return (
    <section className="progress-card">

      {/* Header */}
      <div className="progress-card-header">
        <div>
          <p className="card-eyebrow">ACADEMIC OVERVIEW</p>

          <h2>Campus Progress</h2>

          <p>
            Your overall academic and campus activity progress.
          </p>
        </div>

        <div className="progress-score">
          <span>Current Score</span>
          <strong>82</strong>
          <small>/ 100</small>
        </div>
      </div>


      {/* Chart */}
      <div className="progress-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={progressData}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6366f1"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#6366f1"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eef0f5"
            />

            <XAxis
              dataKey="semester"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
            />

            <YAxis
              domain={[50, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
            />

            <Tooltip
              contentStyle={{
                border: "1px solid #e8ebf2",
                borderRadius: "10px",
                boxShadow:
                  "0 10px 30px rgba(15, 23, 42, 0.08)",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value}/100`, "Progress"]}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#progressGradient)"
              dot={{
                r: 4,
                fill: "#ffffff",
                stroke: "#6366f1",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>


      {/* Footer */}
      <div className="progress-card-footer">

        <div className="progress-insight">
          <span className="insight-indicator"></span>

          <span>
            Progress increased by{" "}
            <strong>8 points</strong> this semester
          </span>
        </div>

        <span className="progress-period">
          Semester 7
        </span>

      </div>

    </section>
  );
}

export default ProgressCard;