import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './components/Dashboard/DashboardPage';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import EmployeeComponent from './components/EmployeeComponent';
import ListDepartmentComponent from './components/ListDepartmentComponent';
import DepartmentComponent from './components/DepartmentComponent';
import AttendancePage from './components/Attendance/AttendancePage';
import { SidebarProvider, useSidebar } from './context/SidebarContext';

/* Inner layout reads the sidebar state to shift the main content area */
function AppLayout() {
  const { collapsed } = useSidebar();
  const sidebarW = collapsed ? '72px' : '256px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080d1a' }}>
      <Sidebar />
      {/* Content wrapper shifts right by the sidebar width */}
      <div
        style={{
          marginLeft: sidebarW,
          flex: 1,
          minWidth: 0,
          transition: 'margin-left 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <Routes>
          <Route path="/"                      element={<DashboardPage />} />
          <Route path="/employees"             element={<ListEmployeeComponent />} />
          <Route path="/add-employee"          element={<EmployeeComponent />} />
          <Route path="/edit-employee/:id"     element={<EmployeeComponent />} />
          <Route path="/departments"           element={<ListDepartmentComponent />} />
          <Route path="/add-department"        element={<DepartmentComponent />} />
          <Route path="/edit-department/:id"   element={<DepartmentComponent />} />
          <Route path="/attendance"             element={<AttendancePage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppLayout />
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
