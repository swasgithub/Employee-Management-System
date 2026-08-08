import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'HR',      value: 35 },
  { name: 'Sales',   value: 55 },
  { name: 'IT',      value: 80 },
  { name: 'Finance', value: 40 },
];

const COLORS      = ['#a78bfa', '#38bdf8', '#f472b6', '#fb923c'];
const GLOW_COLORS = ['rgba(167,139,250,0.4)', 'rgba(56,189,248,0.4)', 'rgba(244,114,182,0.4)', 'rgba(251,146,60,0.4)'];

const CustomTooltip = ({ active, payload }) => {
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
        <p className="text-sm font-semibold text-white mb-1">{payload[0].name}</p>
        <p style={{ color: '#94a3b8', fontSize: '12px' }}>{payload[0].value} employees</p>
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ cx, cy, total }) => (
  <>
    <text x={cx} y={cy - 10} textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '24px', fontWeight: 800 }}>
      {total}
    </text>
    <text x={cx} y={cy + 14} textAnchor="middle" fill="#64748b" style={{ fontSize: '11px', fontWeight: 500 }}>
      Total Employees
    </text>
  </>
);

export default function DepartmentPieChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      className="rounded-1xl p-6 flex flex-col"
      style={{ background: '#111827', border: '1px solid #1e2d45' ,padding:'11px'}}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-base font-semibold text-white">Department Distribution</h3>
          <p style={{ color: '#475569', fontSize: '12px', marginTop: '2px' }}>
            Employees across all departments
          </p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' }}
        >
          Pie Chart
        </span>
      </div>

      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="48%"
            innerRadius={72}
            outerRadius={108}
            paddingAngle={4}
            dataKey="value"
            label={false}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i]}
                stroke="none"
                style={{ filter: `drop-shadow(0 0 6px ${GLOW_COLORS[i]})` }}
              />
            ))}
          </Pie>
          {/* Center label */}
          <text x="50%" y="44%" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '26px', fontWeight: 800 }}>
            {total}
          </text>
          <text x="50%" y="53%" textAnchor="middle" fill="#64748b" style={{ fontSize: '11px' }}>
            Total
          </text>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: '16px' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Department badges */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map((dept, i) => (
          <div
            key={dept.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(30,41,59,0.5)' }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: COLORS[i] }}
            />
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>{dept.name}</span>
            <span className="ml-auto font-semibold" style={{ color: '#e2e8f0', fontSize: '12px' }}>
              {dept.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}