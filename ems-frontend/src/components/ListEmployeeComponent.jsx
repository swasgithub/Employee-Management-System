import React, { useEffect, useState } from 'react';
import { deleteEmployee, ListEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { MdPeople, MdPersonAdd, MdEdit, MdDelete, MdSearch, MdRefresh } from 'react-icons/md';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigator = useNavigate();

  useEffect(() => { getAllEmployees(); }, []);

  function getAllEmployees() {
    setLoading(true);
    ListEmployees()
      .then((response) => setEmployees(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  const removeEmployee = (id) => {
    setDeletingId(id);
    deleteEmployee(id)
      .then(() => getAllEmployees())
      .catch(console.error)
      .finally(() => setDeletingId(null));
  };

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    return (
      String(e.id).includes(q) ||
      (e.firstName || '').toLowerCase().includes(q) ||
      (e.lastName  || '').toLowerCase().includes(q) ||
      (e.email     || '').toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: '100vh', background: '#080d1a', padding: '2rem' }}>

      {/* ── Page header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
          }}>
            <MdPeople style={{ color: 'white', fontSize: '24px' }} />
          </div>
          <div>
            <h1 style={{ color: 'white', fontWeight: 700, fontSize: '22px', margin: 0, letterSpacing: '-0.02em' }}>
              Employees
            </h1>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '3px 0 0' }}>
              {employees.length} total member{employees.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Refresh */}
          <button
            onClick={getAllEmployees}
            disabled={loading}
            title="Refresh"
            style={{
              height: '40px', width: '40px', borderRadius: '10px',
              border: '1px solid #1e2d45', background: 'rgba(30,45,69,0.5)',
              color: '#64748b', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; e.currentTarget.style.color = '#a78bfa'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e2d45'; e.currentTarget.style.color = '#64748b'; }}
          >
            <MdRefresh style={{ fontSize: '18px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </button>

          {/* Add Employee */}
          <button
            onClick={() => navigator('/add-employee')}
            style={{
              height: '40px', padding: '0 18px', borderRadius: '10px',
              border: '1px solid rgba(124,58,237,0.35)',
              background: 'rgba(124,58,237,0.15)', color: '#a78bfa',
              cursor: 'pointer', fontWeight: 600, fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; }}
          >
            <MdPersonAdd style={{ fontSize: '18px' }} />
            Add Employee
          </button>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div style={{
        position: 'relative', marginBottom: '1.5rem', maxWidth: '380px',
      }}>
        <MdSearch style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          color: '#475569', fontSize: '18px', pointerEvents: 'none',
        }} />
        <input
          type="text"
          placeholder="Search by name, email or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', height: '40px', borderRadius: '10px',
            border: '1px solid #1e2d45', background: '#111827',
            color: 'white', fontSize: '13px',
            paddingLeft: '38px', paddingRight: '14px',
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
          onBlur={(e)  => (e.target.style.borderColor = '#1e2d45')}
        />
      </div>

      {/* ── Table card ── */}
      <div style={{
        borderRadius: '16px', border: '1px solid #1e2d45',
        background: '#111827', overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
            <MdRefresh style={{ fontSize: '28px', animation: 'spin 1s linear infinite', marginBottom: '10px', display: 'block', margin: '0 auto 10px' }} />
            Loading employees…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
            {search ? `No results for "${search}"` : 'No employees found.'}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2d45' }}>
                {['ID', 'First Name', 'Last Name', 'Email', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: 'left',
                    fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.08em', color: '#475569',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, idx) => (
                <tr
                  key={emp.id}
                  style={{
                    borderBottom: idx < filtered.length - 1 ? '1px solid #1a2438' : 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(124,58,237,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 20px', color: '#475569', fontSize: '13px' }}>
                    <span style={{
                      background: '#1e2d45', borderRadius: '6px',
                      padding: '2px 8px', fontSize: '12px', color: '#64748b',
                    }}>#{emp.id}</span>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#e2e8f0', fontWeight: 500, fontSize: '14px' }}>
                    {emp.firstName}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#e2e8f0', fontSize: '14px' }}>
                    {emp.lastName}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '13px' }}>
                    {emp.email}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => navigator(`/edit-employee/${emp.id}`)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                          border: '1px solid rgba(14,165,233,0.35)',
                          background: 'rgba(14,165,233,0.1)', color: '#38bdf8',
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(14,165,233,0.2)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(14,165,233,0.1)')}
                      >
                        <MdEdit style={{ fontSize: '14px' }} /> Edit
                      </button>
                      <button
                        onClick={() => removeEmployee(emp.id)}
                        disabled={deletingId === emp.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                          border: '1px solid rgba(239,68,68,0.35)',
                          background: 'rgba(239,68,68,0.1)', color: '#f87171',
                          cursor: deletingId === emp.id ? 'not-allowed' : 'pointer',
                          opacity: deletingId === emp.id ? 0.6 : 1,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { if (deletingId !== emp.id) e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                      >
                        <MdDelete style={{ fontSize: '14px' }} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #334155; }
      `}</style>
    </div>
  );
};

export default ListEmployeeComponent;
