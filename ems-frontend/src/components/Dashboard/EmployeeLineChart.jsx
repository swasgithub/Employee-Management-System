import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', joined: 12 },
  { month: 'Feb', joined: 19 },
  { month: 'Mar', joined: 15 },
  { month: 'Apr', joined: 28 },
  { month: 'May', joined: 22 },
  { month: 'Jun', joined: 35 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '4px' }}>{label} 2025</p>
        <p className="text-sm font-bold" style={{ color: '#a78bfa' }}>
          {payload[0].value} employees joined
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#7c3aed"
      stroke="#a78bfa"
      strokeWidth={2}
    />
  );
};

const CustomActiveDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#a78bfa"
      stroke="#7c3aed"
      strokeWidth={2}
    />
  );
};

export default function EmployeeLineChart() {
  const maxJoined = Math.max(...data.map((d) => d.joined));

  return (
    <div
      className="rounded-1xl p-6 flex flex-col"
      style={{ background: '#111827', border: '1px solid #1e2d45' ,padding:'11px'}}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white">Employees Joined</h3>
          <p style={{ color: '#475569', fontSize: '12px', marginTop: '2px' }}>
            Monthly onboarding trend
          </p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)' }}
        >
          Line Chart
        </span>
      </div>

      <ResponsiveContainer width="100%" height={270}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="gradJoined" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e2d45"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />

          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, maxJoined + 5]}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="joined"
            stroke="#7c3aed"
            strokeWidth={2.5}
            fill="url(#gradJoined)"
            dot={<CustomDot />}
            activeDot={<CustomActiveDot />}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: 'Total Joined',  value: data.reduce((s, d) => s + d.joined, 0) },
          { label: 'Avg / Month',   value: Math.round(data.reduce((s, d) => s + d.joined, 0) / data.length) },
          { label: 'Best Month',    value: maxJoined },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="text-center rounded-xl py-3"
            style={{ background: 'rgba(30,41,59,0.5)' }}
          >
            <p className="text-lg font-bold text-white">{value}</p>
            <p style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}