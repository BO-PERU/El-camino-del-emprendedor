import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import PortalDashboard from './pages/PortalDashboard';
import Welcome from './pages/Welcome';
import FragilityIndex from './pages/FragilityIndex';
import BusinessProfile from './pages/BusinessProfile';
import ClientProfile from './pages/ClientProfile';
import Inventory from './pages/Inventory';
import Evaluation from './pages/Evaluation';
import Map from './pages/Map';
import Journey from './pages/Journey';
import Gaps from './pages/Gaps';
import Opportunities from './pages/Opportunities';
import Validation from './pages/Validation';
import ActionPlan from './pages/ActionPlan';
import FinalReport from './pages/FinalReport';
import AdminDashboard from './pages/admin/AdminDashboard';
import ParticipantDetail from './pages/admin/ParticipantDetail';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            {/* Global Portal Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PortalDashboard />} />

            {/* Pan & Tortas Workshop Routes */}
            <Route path="/pan-y-tortas" element={<Layout />}>
              <Route path="" element={<Navigate to="welcome" replace />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="fragility" element={<FragilityIndex />} />
              <Route path="profile" element={<BusinessProfile />} />
              <Route path="client" element={<ClientProfile />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="evaluation" element={<Evaluation />} />
              <Route path="map" element={<Map />} />
              <Route path="journey" element={<Journey />} />
              <Route path="gaps" element={<Gaps />} />
              <Route path="opportunities" element={<Opportunities />} />
              <Route path="prioritization" element={<Navigate to="opportunities" replace />} />
              <Route path="validation" element={<Validation />} />
              <Route path="plan" element={<ActionPlan />} />
              <Route path="report" element={<FinalReport />} />
            </Route>

            {/* Admin / Facilitator Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="participant/:id" element={<ParticipantDetail />} />
              <Route path="settings" element={<div className="glass-panel m-4"><h2>Configuración</h2><p>En desarrollo.</p></div>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
