import { useState, useEffect } from 'react';
import { Lock, LogOut, CheckCircle, Clock, XCircle, ListFilter, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const EMPTY_STATS = {
  PENDING: 0,
  IN_REVIEW: 0,
  ACCEPTED: 0,
  REJECTED: 0,
  CLOSED: 0,
};

const STATUS_ALIASES = {
  PENDING: ['PENDING', 'PENDIENTE'],
  IN_REVIEW: ['IN_REVIEW', 'EN_REVISION'],
  ACCEPTED: ['ACCEPTED', 'ACEPTED', 'ACEPTADA'],
  REJECTED: ['REJECTED', 'RECHAZADA'],
  CLOSED: ['CLOSED', 'CERRADA'],
};

const STATUS_NORMALIZATION = Object.entries(STATUS_ALIASES).reduce((acc, [englishStatus, aliases]) => {
  aliases.forEach((alias) => {
    acc[alias] = englishStatus;
  });
  return acc;
}, {});

const readJsonSafely = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const normalizeStatus = (status) => STATUS_NORMALIZATION[status] || status;

const normalizeRequest = (request) => ({
  id: request.id,
  name: request.name || request.nombre || '',
  email: request.email || '',
  company: request.company ?? request.empresa ?? '',
  phone: request.phone ?? request.telefono ?? '',
  service: request.service ?? request.servicio ?? '',
  message: request.message ?? request.mensaje ?? '',
  status: normalizeStatus(request.status || request.estado || 'PENDING'),
  createdAt: request.createdAt || request.creadaEn || null,
  internalNotes: request.internalNotes ?? request.notasInternas ?? null,
});

const normalizeStats = (statsData) => {
  const nextStats = { ...EMPTY_STATS };

  if (!statsData || typeof statsData !== 'object') {
    return nextStats;
  }

  Object.entries(statsData).forEach(([key, value]) => {
    const normalizedKey = normalizeStatus(key);
    if (normalizedKey in nextStats) {
      nextStats[normalizedKey] = value;
    }
  });

  return nextStats;
};

const buildStatsFromRequests = (requests) => {
  const nextStats = { ...EMPTY_STATS };

  requests.forEach((request) => {
    if (request.status in nextStats) {
      nextStats[request.status] += 1;
    }
  });

  return nextStats;
};

const buildListUrls = (filter) => {
  const baseUrl = `${API_URL}/api/admin/solicitudes`;

  if (filter === 'ALL') {
    return [baseUrl];
  }

  const statuses = STATUS_ALIASES[filter] || [filter];
  const urls = [];

  statuses.forEach((status) => {
    urls.push(`${baseUrl}?status=${encodeURIComponent(status)}`);
    urls.push(`${baseUrl}?estado=${encodeURIComponent(status)}`);
  });

  return [...new Set(urls)];
};

const buildStatusUpdateUrls = (id, nextStatus) => {
  const statuses = STATUS_ALIASES[nextStatus] || [nextStatus];
  const urls = [];

  statuses.forEach((status) => {
    urls.push(`${API_URL}/api/admin/solicitudes/${id}/status?status=${encodeURIComponent(status)}`);
    urls.push(`${API_URL}/api/admin/solicitudes/${id}/estado?estado=${encodeURIComponent(status)}`);
  });

  return [...new Set(urls)];
};

const buildStatsUrls = () => ([
  `${API_URL}/api/admin/solicitudes/statistics`,
  `${API_URL}/api/admin/solicitudes/estadisticas`,
]);

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [statusActionsAvailable, setStatusActionsAvailable] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token, filter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setSolicitudes([]);
    setStats({});
    setActionError('');
    setStatusActionsAvailable(true);
  };

  const loadDashboardData = async () => {
    if (!token) return;
    
    try {
      setActionError('');
      const headers = { Authorization: `Bearer ${token}` };
      let solRes = null;

      for (const url of buildListUrls(filter)) {
        const response = await fetch(url, { headers });

        if (response.status === 401 || response.status === 403) {
          handleLogout();
          return;
        }

        if (response.ok) {
          solRes = response;
          break;
        }
      }

      if (!solRes) {
        throw new Error('Unable to load requests');
      }

      let statsRes = null;

      for (const url of buildStatsUrls()) {
        const response = await fetch(url, { headers });

        if (response.ok) {
          statsRes = response;
          break;
        }
      }

      const solData = await readJsonSafely(solRes);
      const normalizedRequests = Array.isArray(solData) ? solData.map(normalizeRequest) : [];
      const statsData = statsRes ? await readJsonSafely(statsRes) : null;
      
      setSolicitudes(normalizedRequests);
      setStats(statsData ? normalizeStats(statsData) : buildStatsFromRequests(normalizedRequests));
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      setActionError('');
      let authRejected = false;

      for (const url of buildStatusUpdateUrls(id, newStatus)) {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          setStatusActionsAvailable(true);
          loadDashboardData();
          return;
        }

        if (res.status === 401 || res.status === 403) {
          authRejected = true;
        }
      }

      if (authRejected) {
        setStatusActionsAvailable(false);
        setActionError('Status updates are unavailable in the current backend deployment. Delete is still available.');
        return;
      }

      setStatusActionsAvailable(true);
      setActionError('Unable to update the request status right now.');
    } catch (err) {
      console.error('Error updating status', err);
      setStatusActionsAvailable(true);
      setActionError('Unable to update the request status right now.');
    }
  };

  const deleteSolicitud = async (id) => {
    if(!confirm('Are you sure you want to delete this request?')) return;
    try {
      setActionError('');
      const res = await fetch(`${API_URL}/api/admin/solicitudes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        loadDashboardData();
      }
    } catch (err) {
      console.error('Error deleting', err);
      setActionError('Unable to delete the request right now.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'IN_REVIEW': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'ACCEPTED': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'REJECTED': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'CLOSED': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="glass-card p-8 w-full max-w-md border border-[var(--accent-cyan)]/30 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-purple-500 rounded-t-xl" />
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Lock className="text-[var(--accent-cyan)]" /> Admin Login
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">Secure access to QubeCore HQ</p>
          
          {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:border-[var(--accent-cyan)] outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:border-[var(--accent-cyan)] outline-none" 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Authenticating...' : 'Access Terminal'}
            </button>
            <a href="/" className="block text-center text-sm text-[var(--accent-cyan)] hover:opacity-80 mt-4">
              Return to Website
            </a>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-cyan)] to-purple-400">
              QubeCore Command Center
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">Managing quantum computing inquiries</p>
          </div>
          <div className="flex gap-4">
            <a href="/" className="btn-secondary px-4 py-2 text-sm">Back to Site</a>
            <button onClick={handleLogout} className="btn-secondary px-4 py-2 flex items-center gap-2 text-sm border-red-500/30 hover:bg-red-500/10 text-red-300">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {actionError && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {actionError}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="glass-card p-4 border border-[var(--glass-border)] rounded-xl">
              <div className="text-[var(--text-secondary)] text-xs mb-1 uppercase tracking-wider">{k.replace('_', ' ')}</div>
              <div className="text-3xl font-light text-[var(--accent-cyan)]">{v}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <ListFilter size={18} className="text-[var(--text-secondary)] mr-2" />
          {['ALL', 'PENDING', 'IN_REVIEW', 'ACCEPTED', 'REJECTED'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${filter === s ? 'bg-[var(--accent-cyan)]/20 border-[var(--accent-cyan)] text-[var(--accent-cyan)]' : 'bg-transparent border-[var(--glass-border)] text-gray-400 hover:border-gray-500'}`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass overflow-hidden rounded-xl border border-[var(--glass-border)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[var(--text-secondary)] border-b border-[var(--glass-border)]">
                <tr>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Interest Area</th>
                  <th className="p-4 font-medium">Message</th>
                  <th className="p-4 font-medium">Status / Actions</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500 italic">No incoming requests found.</td>
                  </tr>
                ) : (
                  solicitudes.map(sol => (
                    <tr key={sol.id} className="border-b border-[var(--glass-border)] hover:bg-white/[0.02]">
                      <td className="p-4 align-top">
                        <div className="font-medium text-white">{sol.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{sol.email}</div>
                      </td>
                      <td className="p-4 align-top">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs">{sol.company || 'N/A'}</span>
                      </td>
                      <td className="p-4 align-top">
                        <span className="text-gray-400 text-xs">{sol.phone || '-'}</span>
                      </td>
                      <td className="p-4 align-top">
                        <span className="bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] px-2 py-1 rounded text-xs">{sol.service || 'N/A'}</span>
                      </td>
                      <td className="p-4 align-top min-w-[200px] max-w-xs">
                        <p className="text-gray-300 text-sm line-clamp-3 hover:line-clamp-none transition-all">
                          {sol.message}
                        </p>
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase font-semibold border w-fit ${getStatusColor(sol.status)}`}>
                            {sol.status.replace('_', ' ')}
                          </span>
                          <div className="flex flex-row gap-1 mt-1">
                              {(sol.status === 'PENDING' || sol.status === 'IN_REVIEW') && (
                                <button onClick={() => changeStatus(sol.id, 'ACCEPTED')} disabled={!statusActionsAvailable} className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/40 disabled:opacity-40 disabled:cursor-not-allowed" title={statusActionsAvailable ? 'Accept' : 'Status updates unavailable'}><CheckCircle size={14}/></button>
                               )}
                               {(sol.status === 'PENDING') && (
                                <button onClick={() => changeStatus(sol.id, 'IN_REVIEW')} disabled={!statusActionsAvailable} className="p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40 disabled:opacity-40 disabled:cursor-not-allowed" title={statusActionsAvailable ? 'Review' : 'Status updates unavailable'}><Clock size={14}/></button>
                               )}
                               {(sol.status === 'PENDING' || sol.status === 'IN_REVIEW') && (
                                <button onClick={() => changeStatus(sol.id, 'REJECTED')} disabled={!statusActionsAvailable} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 disabled:opacity-40 disabled:cursor-not-allowed" title={statusActionsAvailable ? 'Reject' : 'Status updates unavailable'}><XCircle size={14}/></button>
                               )}
                             <button onClick={() => deleteSolicitud(sol.id)} className="p-1.5 bg-gray-500/20 text-gray-400 rounded hover:bg-red-500/40 hover:text-white" title="Delete"><Trash2 size={14}/></button>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-top whitespace-nowrap text-xs text-gray-500">
                        {sol.createdAt ? new Date(sol.createdAt).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
