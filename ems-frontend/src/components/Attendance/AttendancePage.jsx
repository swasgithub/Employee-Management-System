import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MdAccessTime, MdCalendarToday, MdCheckCircle, MdDownload, MdPeople,
  MdRefresh, MdSearch, MdToday,
} from 'react-icons/md';
import { getAllAttendances } from '../../services/AttendanceService';
import { ListEmployees } from '../../services/EmployeeService';
import './AttendancePage.css';

const STATUS = {
  PRESENT: { label: 'Present', color: '#34d399', background: 'rgba(52,211,153,.12)', border: 'rgba(52,211,153,.3)' },
  ABSENT: { label: 'Absent', color: '#f87171', background: 'rgba(248,113,113,.12)', border: 'rgba(248,113,113,.3)' },
  HALF_DAY: { label: 'Half day', color: '#fbbf24', background: 'rgba(251,191,36,.12)', border: 'rgba(251,191,36,.3)' },
  ON_LEAVE: { label: 'On leave', color: '#a78bfa', background: 'rgba(167,139,250,.12)', border: 'rgba(167,139,250,.3)' },
  HOLIDAY: { label: 'Holiday', color: '#60a5fa', background: 'rgba(96,165,250,.12)', border: 'rgba(96,165,250,.3)' },
  WEEK_OFF: { label: 'Week off', color: '#94a3b8', background: 'rgba(148,163,184,.12)', border: 'rgba(148,163,184,.3)' },
};

const today = () => new Date().toISOString().slice(0, 10);
const displayDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const displayTime = (time) => {
  if (!time) return '—';
  const [hour, minute] = time.split(':').map(Number);
  return `${String(hour % 12 || 12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
};
const hoursLabel = (hours) => {
  if (hours === null || hours === undefined) return '—';
  const h = Math.floor(hours);
  return `${h}h ${String(Math.round((hours - h) * 60)).padStart(2, '0')}m`;
};
const csvValue = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export default function AttendancePage() {
  const [attendances, setAttendances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [date, setDate] = useState(today());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [attendanceResult, employeeResult] = await Promise.all([getAllAttendances(), ListEmployees()]);
      setAttendances(attendanceResult.data || []);
      setEmployees(employeeResult.data || []);
    } catch (requestError) {
      console.error('Attendance fetch error:', requestError);
      setError('Could not load attendance data. Make sure the backend is running, then try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const employeeMap = useMemo(() => new Map(employees.map((employee) => [String(employee.id), employee])), [employees]);
  const datedRecords = useMemo(() => attendances.filter((record) => record.date === date), [attendances, date]);
  const rows = useMemo(() => datedRecords.map((record) => ({
    ...record,
    employee: employeeMap.get(String(record.employeeId)),
  })).filter((record) => {
    const employee = record.employee;
    const name = employee ? `${employee.firstName} ${employee.lastName}` : `Employee #${record.employeeId}`;
    return (statusFilter === 'ALL' || record.attendanceStatus === statusFilter)
      && name.toLowerCase().includes(search.trim().toLowerCase());
  }), [datedRecords, employeeMap, search, statusFilter]);

  const stats = useMemo(() => ({
    total: datedRecords.length,
    present: datedRecords.filter((record) => record.attendanceStatus === 'PRESENT').length,
    leave: datedRecords.filter((record) => record.attendanceStatus === 'ON_LEAVE').length,
  }), [datedRecords]);

  const exportCsv = () => {
    const lines = [['Employee', 'Email', 'Date', 'Check in', 'Check out', 'Working hours', 'Status', 'Remarks']];
    rows.forEach((record) => {
      const employee = record.employee;
      lines.push([
        employee ? `${employee.firstName} ${employee.lastName}` : `Employee #${record.employeeId}`,
        employee?.email || '', date, displayTime(record.checkIn), displayTime(record.checkOut),
        hoursLabel(record.totalWorkingHours), STATUS[record.attendanceStatus]?.label || record.attendanceStatus, record.remarks || '',
      ]);
    });
    const file = new Blob([lines.map((line) => line.map(csvValue).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = `attendance-${date}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return <main className="attendance-page">
    <header className="attendance-header">
      <div className="attendance-title">
        <span className="attendance-title-icon"><MdAccessTime /></span>
        <div><h1>Attendance</h1><p>{displayDate(date)}</p></div>
      </div>
      <div className="attendance-actions">
        <button className="icon-button" onClick={refresh} disabled={loading} title="Refresh attendance"><MdRefresh className={loading ? 'spin' : ''} /></button>
        <button className="export-button" onClick={exportCsv} disabled={loading || rows.length === 0}><MdDownload /> Export CSV</button>
      </div>
    </header>

    <section className="attendance-stats">
      <Stat label="Records today" value={stats.total} note="Recorded attendance" icon={<MdPeople />} tone="purple" loading={loading} />
      <Stat label="Present" value={stats.present} note={`${stats.total ? Math.round((stats.present / stats.total) * 100) : 0}% of records`} icon={<MdCheckCircle />} tone="green" loading={loading} />
      <Stat label="On leave" value={stats.leave} note="Approved leave records" icon={<MdToday />} tone="pink" loading={loading} />
    </section>

    <section className="filter-bar">
      <label className="date-input"><MdCalendarToday /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      <label className="search-input"><MdSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employee" /></label>
      <div className="status-filters">{['ALL', ...Object.keys(STATUS)].map((status) => <button key={status} className={statusFilter === status ? 'active' : ''} onClick={() => setStatusFilter(status)}>{status === 'ALL' ? 'All' : STATUS[status].label}</button>)}</div>
    </section>

    {error && <div className="attendance-error">{error}<button onClick={refresh}>Retry</button></div>}
    <section className="attendance-table-card">
      {loading ? <div className="attendance-state"><MdRefresh className="spin" /> Loading attendance…</div>
        : rows.length === 0 ? <div className="attendance-state empty"><MdAccessTime /><h2>{datedRecords.length === 0 ? 'No attendance recorded yet' : 'No records match your filters'}</h2><p>{datedRecords.length === 0 ? 'Attendance records for this date will appear here as soon as they are added.' : 'Adjust the search or status filter to see more records.'}</p></div>
          : <div className="table-scroll"><table><thead><tr><th>Employee</th><th>Check in</th><th>Check out</th><th>Working hrs</th><th>Status</th><th>Remarks</th></tr></thead><tbody>{rows.map((record) => {
            const employee = record.employee;
            const name = employee ? `${employee.firstName} ${employee.lastName}` : `Employee #${record.employeeId}`;
            const status = STATUS[record.attendanceStatus] || { label: record.attendanceStatus, color: '#94a3b8', background: 'rgba(148,163,184,.12)', border: 'rgba(148,163,184,.3)' };
            return <tr key={record.id}><td><div className="employee-cell"><span className="avatar">{name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span><strong>{name}</strong><small>{employee?.email || `ID #${record.employeeId}`}</small></span></div></td><td>{displayTime(record.checkIn)}</td><td>{displayTime(record.checkOut)}</td><td className="working-hours">{hoursLabel(record.totalWorkingHours)}</td><td><span className="status-badge" style={{ color: status.color, background: status.background, borderColor: status.border }}><i style={{ background: status.color }} />{status.label}</span></td><td className="remarks">{record.remarks || '—'}</td></tr>;
          })}</tbody></table></div>}
    </section>
  </main>;
}

function Stat({ label, value, note, icon, tone, loading }) {
  return <article className={`attendance-stat ${tone}`}><div><p>{label}</p><strong>{loading ? '—' : value}</strong><small>{note}</small></div><span className="stat-icon">{icon}</span></article>;
}
