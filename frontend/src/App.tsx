import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Accession } from './pages/Accession';
import { ResultEntry } from './pages/ResultEntry';
import { SpecimenTracking } from './pages/SpecimenTracking';
import { ReviewQueue } from './pages/ReviewQueue';
import { QualityControl } from './pages/QualityControl';
import { Inventory } from './pages/Inventory';
import { AdminPanel } from './pages/AdminPanel';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('lab_session');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Accession />} />
        <Route path="results" element={<ResultEntry />} />
        <Route path="tracking" element={<SpecimenTracking />} />
        <Route path="review" element={<ReviewQueue />} />
        <Route path="quality" element={<QualityControl />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}
