import { Tooltip } from '@mui/material';

export default function StatCard({ title, value, icon: Icon, gradientFrom, gradientTo, change, tooltip, loading }) {
  return (
    <Tooltip title={tooltip || title} placement="top" arrow>
      <div
        className="relative overflow-hidden rounded-2xl p-5 cursor-default transition-all duration-300"
        style={{
          background: '#111827',
          border: '1px solid #1e2d45',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#1e2d45';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Background glow blob */}
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        />

        <div className="flex items-start justify-between relative">
          <div className="flex-1 min-w-0">
            <p
              className="font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#475569', fontSize: '10px' }}
            >
              {title}
            </p>

            {loading ? (
              <div
                className="h-8 w-20 rounded-lg mt-1"
                style={{ background: '#1e293b' }}
              />
            ) : (
              <p className="text-3xl font-extrabold text-white">{value}</p>
            )}

            {change !== undefined && !loading && (
              <p
                className="text-xs mt-2 font-medium"
                style={{ color: change >= 0 ? '#34d399' : '#f87171' }}
              >
                {change >= 0 ? '▲' : '▼'} {Math.abs(change)}% vs last month
              </p>
            )}
          </div>

          {/* Icon badge */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-3"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              boxShadow: `0 4px 14px ${gradientFrom}55`,
            }}
          >
            <Icon style={{ color: 'white', fontSize: '24px' }} />
          </div>
        </div>
      </div>
    </Tooltip>
  );
}