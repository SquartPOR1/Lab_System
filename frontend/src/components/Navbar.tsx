import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, User, ShieldAlert } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('lab_session');
    navigate('/login', { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-12 gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <ShieldAlert className="h-6 w-6 text-slate-900" />
            <span className="font-bold text-sm tracking-tight text-slate-900">Laboraty LIMS</span>
          </div>
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
            <NavLink to="/dashboard" end className={linkClass}>Worklist</NavLink>
            <NavLink to="/orders" className={linkClass}>Accession</NavLink>
            <NavLink to="/results" className={linkClass}>Results</NavLink>
            <NavLink to="/tracking" className={linkClass}>Tracking</NavLink>
            <NavLink to="/review" className={linkClass}>Review</NavLink>
            <NavLink to="/quality" className={linkClass}>QC</NavLink>
            <NavLink to="/inventory" className={linkClass}>Inventory</NavLink>
            <NavLink to="/admin" className={linkClass}>Admin</NavLink>
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 shrink-0">
            <User className="h-4 w-4 text-slate-400" />
            <span className="text-[11px] font-medium text-slate-700">Technician</span>
            <button type="button" onClick={handleLogout} aria-label="Sign out" title="Sign out" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
