import { useEffect, useState } from 'react';
import StatCard from './StatCard';
import DepartmentPieChart from './DepartmentPieChart';
import EmployeeLineChart from './EmployeeLineChart';
import { ListEmployees } from '../../services/EmployeeService';
import { getAllDepartments } from '../../services/DepartmentService';
import {
  MdPeople,
  MdApartment,
  MdCheckCircle,
  MdAccessTime,
  MdRefresh,
} from 'react-icons/md';

// Stat card definitions
const BASE_STATS = [
  {
    key: 'employees',
    title: 'Total Employees',
    icon: MdPeople,
    gradientFrom: '#7c3aed',
    gradientTo: '#4f46e5',
    change: 8,
    tooltip: 'All active employees',
    live: true,
  },
  {
    key: 'departments',
    title: 'Departments',
    icon: MdApartment,
    gradientFrom: '#0ea5e9',
    gradientTo: '#06b6d4',
    change: 2,
    tooltip: 'Active departments',
    live: true,
  },
  {
    key: 'present',
    title: 'Employees Present',
    icon: MdCheckCircle,
    gradientFrom: '#10b981',
    gradientTo: '#059669',
    change: 5,
    tooltip: 'Attendance API',
    live: false,
    placeholder: '—',
  },
  {
    key: 'leaves',
    title: 'Pending Leaves',
    icon: MdAccessTime,
    gradientFrom: '#f97316',
    gradientTo: '#ec4899',
    change: -3,
    tooltip: 'Leave API ',
    live: false,
    placeholder: '—',
  },
];

// Component
export default function DashboardPage() {
  const [liveData, setLiveData]   = useState({ employees: null, departments: null });
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState(null);
  const [lastSynced, setLastSynced] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [empRes, deptRes] = await Promise.all([
        ListEmployees(),
        getAllDepartments(),
      ]);
      setLiveData({
        employees:   empRes.data.length,
        departments: deptRes.data.length,
      });
      setLastSynced(new Date());
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Could not reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Merge live counts into stat definitions
  const stats = BASE_STATS.map((s) => ({
    ...s,
    value: s.live
      ? (liveData[s.key] !== null ? String(liveData[s.key]) : '—')
      : s.placeholder,
    loading: s.live && loading,
  }));

  return (
    <div
      className="min-h-screen"
      style={{
        background: '#080d1a',
        padding: '2rem',
      }}
    >
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
            Welcome back, Admin — here's what's happening today.
          </p>
          {lastSynced && (
            <p style={{ color: '#334155', fontSize: '11px', marginTop: '4px' }}>
              Last synced: {lastSynced.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          <MdRefresh
            style={{
              fontSize: '16px',
              animation: loading ? 'spin 1s linear infinite' : 'none',
            }}
          />
          {loading ? 'Syncing…' : 'Refresh'}
        </button>
      </div>

      {/*Error banner*/}
      {error && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171',
          }}
        >
          <span>⚠</span>
          <span>{error}</span>
          <button
            onClick={fetchData}
            className="ml-auto text-xs underline"
            style={{ color: '#f87171' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
       
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Section label */}
          <div className="flex items-center gap-3">
            <p className="font-semibold uppercase tracking-widest" style={{ color: '#334155', fontSize: '10px' }}>
              Overview
            </p>
            <div className="flex-1" style={{ height: '1px', background: '#1e2d45' }} />
          </div>

          {/* Stat cards grid (2 × 2) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            {stats.map((s) => (
              <StatCard key={s.key} {...s} />
            ))}
          </div>
        </div>

        {/* Charts  */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Section label */}
          <div className="flex items-center gap-3">
            <p className="font-semibold uppercase tracking-widest" style={{ color: '#334155', fontSize: '10px' }}>
              Analytics &amp; Charts
            </p>
            <div className="flex-1" style={{ height: '1px', background: '#1e2d45' }} />
          </div>

          <DepartmentPieChart />
          <EmployeeLineChart />
        </div>
      </div>

      {/*  Spin keyframe (inline)  */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}