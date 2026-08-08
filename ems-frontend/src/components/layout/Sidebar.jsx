import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdApartment,
  MdWorkspaces,
  MdAccessTime,
  MdBarChart,
  MdMenu,
  MdChevronLeft,
} from 'react-icons/md';
import { RiPulseFill } from 'react-icons/ri';
import { useSidebar } from '../../context/SidebarContext';

const navItems = [
  { icon: MdDashboard,  label: 'Dashboard',      path: '/'            },
  { icon: MdPeople,     label: 'Total Employees', path: '/employees'   },
  { icon: MdApartment,  label: 'Departments',     path: '/departments' },
  { icon: MdWorkspaces, label: 'Projects',        path: '/projects'    },
  { icon: MdAccessTime, label: 'Attendance',      path: '/attendance'  },
  { icon: MdBarChart,   label: 'Charts',          path: '/charts'      },
];

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();

  const W = collapsed ? '72px' : '256px';

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: W,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        background: 'linear-gradient(180deg, #0b1120 0%, #080d1a 100%)',
        borderRight: '1px solid #1e2d45',
        transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}
    >
      {/* ── Logo + Hamburger row ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: collapsed ? '20px 16px' : '20px 24px',
          borderBottom: '1px solid #1e2d45',
          justifyContent: collapsed ? 'center' : 'space-between',
          transition: 'padding 0.28s',
        }}
      >
        {/* Logo icon + text (hidden when collapsed) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              boxShadow: '0 4px 14px rgba(124,58,237,0.45)',
            }}
          >
            <RiPulseFill style={{ color: 'white', fontSize: '20px' }} />
          </div>
          {!collapsed && (
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <p style={{ color: 'white', fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', margin: 0 }}>
                EMS Portal
              </p>
              <p style={{ color: '#475569', fontSize: '11px', margin: 0 }}>Management System</p>
            </div>
          )}
        </div>

        {/* Hamburger / chevron toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: '1px solid #1e2d45',
            background: 'rgba(30,45,69,0.5)',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
            e.currentTarget.style.color = '#a78bfa';
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(30,45,69,0.5)';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.borderColor = '#1e2d45';
          }}
        >
          {collapsed ? (
            <MdMenu style={{ fontSize: '18px' }} />
          ) : (
            <MdChevronLeft style={{ fontSize: '18px' }} />
          )}
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav
        style={{
          flex: 1,
          padding: '20px 12px',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {!collapsed && (
          <p
            style={{
              paddingLeft: '12px',
              marginBottom: '8px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#334155',
              fontSize: '10px',
            }}
          >
            Main Menu
          </p>
        )}

        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            title={collapsed ? label : undefined}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '10px 0' : '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              border: isActive ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
              background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
              color: isActive ? '#a78bfa' : '#64748b',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon
                  style={{
                    fontSize: '20px',
                    color: isActive ? '#a78bfa' : '#475569',
                    flexShrink: 0,
                  }}
                />
                {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                {!collapsed && isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#a78bfa',
                      flexShrink: 0,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Admin footer ── */}
      <div style={{ padding: '12px', borderTop: '1px solid #1e2d45' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : '12px',
            padding: '10px 12px',
            borderRadius: '12px',
            background: 'rgba(30,41,59,0.6)',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            }}
          >
            AD
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Admin User
              </p>
              <p style={{ color: '#475569', fontSize: '11px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                admin@ems.com
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Smooth width transition keyframe */}
      <style>{`
        aside::-webkit-scrollbar { width: 4px; }
        aside::-webkit-scrollbar-track { background: transparent; }
        aside::-webkit-scrollbar-thumb { background: #1e2d45; border-radius: 4px; }
      `}</style>
    </aside>
  );
}