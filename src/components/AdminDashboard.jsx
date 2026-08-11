import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Trash2, Download, Search, MapPin, Calendar, User, Phone, Mail, Award, CheckCircle2, ChevronRight, AlertCircle, Lock, LogOut, KeyRound } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('openandstart_admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.data || []);
      } else {
        setError(data.error || 'Failed to load applications');
      }
    } catch (err) {
      setError('Could not connect to MongoDB Atlas backend. Make sure server.js is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === 'admin' && passwordInput === 'admin') {
      sessionStorage.setItem('openandstart_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('openandstart_admin_auth');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this applicant submission?')) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.filter(app => app._id !== id));
        if (selectedApp?._id === id) setSelectedApp(null);
      }
    } catch (err) {
      alert('Failed to delete application.');
    }
  };

  const handleExportCSV = () => {
    if (!applications.length) return alert('No applications to export');
    const headers = ['First Name', 'Last Name', 'Phone', 'Email', 'District / Region', 'Industry', 'Main Goal', 'Stage', 'Booked Date', 'Booked Time', 'Submitted At'];
    const rows = applications.map(a => [
      `"${a.firstName || ''}"`,
      `"${a.lastName || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.email || ''}"`,
      `"${a.region || ''}"`,
      `"${a.industry || ''}"`,
      `"${a.mainGoal || ''}"`,
      `"${a.businessStage || ''}"`,
      `"${a.selectedDate || ''}"`,
      `"${a.selectedTime || ''}"`,
      `"${new Date(a.submittedAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `open_and_start_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApps = applications.filter(a => {
    const term = searchTerm.toLowerCase();
    return (
      (a.firstName && a.firstName.toLowerCase().includes(term)) ||
      (a.lastName && a.lastName.toLowerCase().includes(term)) ||
      (a.email && a.email.toLowerCase().includes(term)) ||
      (a.phone && a.phone.toLowerCase().includes(term)) ||
      (a.region && a.region.toLowerCase().includes(term)) ||
      (a.industry && a.industry.toLowerCase().includes(term))
    );
  });

  // 🔒 LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-neutral-950 font-sans">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500" />
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Admin Portal Login
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Enter your credentials to access MongoDB Atlas submissions.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1.5 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-3.5 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-emerald-500 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <KeyRound className="w-5 h-5 absolute left-3.5 top-3.5 text-neutral-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-emerald-500 text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all shadow-lg text-sm mt-2"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800/80 text-center">
            <p className="text-[11px] text-neutral-500">
              Default Credentials: <span className="text-neutral-300 font-mono font-bold">admin</span> / <span className="text-neutral-300 font-mono font-bold">admin</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🔓 AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-emerald-500 selection:text-neutral-950 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-neutral-800 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Database className="w-6 h-6" />
              </span>
              <span className="text-2xl font-black tracking-tight">
                open<span className="text-neutral-500 font-light">and</span>start
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-neutral-400 border border-neutral-800">
                Private Admin Portal
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              MongoDB Atlas Database Portal • Storage Cluster: <span className="text-emerald-400 font-mono">cluster0.v2nkc3l.mongodb.net</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchApplications}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold border border-neutral-800 transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>
            <button
              onClick={handleExportCSV}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-bold border border-neutral-800 transition-all flex items-center gap-1.5"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Total Submissions</span>
            <span className="text-3xl font-black text-white">{applications.length}</span>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Districts Represented</span>
            <span className="text-3xl font-black text-emerald-400">
              {new Set(applications.map(a => a.region).filter(Boolean)).size}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Status</span>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live MongoDB Atlas Sync
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by name, phone, email, district in Kerala, or sector..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl focus:outline-none focus:border-emerald-500 text-white text-sm"
          />
        </div>

        {/* Error banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Applications Table */}
        <div className="bg-neutral-900/80 rounded-3xl border border-neutral-800/80 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-950/60">
                  <th className="py-4 px-6">Applicant Name</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">District (Kerala)</th>
                  <th className="py-4 px-6">Industry / Sector</th>
                  <th className="py-4 px-6">Booked Slot</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-sm font-medium">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-neutral-500 text-sm">
                      {loading ? 'Loading applications from MongoDB Atlas...' : 'No applications found.'}
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => (
                    <tr key={app._id} className="hover:bg-neutral-850/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-400" />
                          {app.firstName} {app.lastName}
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-xs">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <Phone className="w-3.5 h-3.5 text-neutral-500" /> {app.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-neutral-500" /> {app.email}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-200 border border-neutral-700">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {app.region || 'Not specified'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-xs font-semibold text-emerald-400">
                        {app.industry || 'Tech'}
                        {app.selectedMentor && (
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Mentor: {app.selectedMentor.name}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-xs text-neutral-300">
                        {app.selectedDate ? (
                          <span className="flex items-center gap-1 font-semibold text-white">
                            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                            {app.selectedDate} @ {app.selectedTime}
                          </span>
                        ) : (
                          <span className="text-neutral-500">Not booked yet</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                            title="View Full Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {selectedApp.firstName} {selectedApp.lastName}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Submitted on {new Date(selectedApp.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-3 py-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">Phone</span>
                    <span className="font-bold text-white">{selectedApp.phone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">Email</span>
                    <span className="font-bold text-white">{selectedApp.email}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">District (Kerala)</span>
                    <span className="font-bold text-amber-300">{selectedApp.region || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">Age Range</span>
                    <span className="font-bold text-white">{selectedApp.ageRange || 'Not specified'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Main Business Goal:</span>
                    <span className="font-bold text-white">{selectedApp.mainGoal || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Business Stage:</span>
                    <span className="font-bold text-emerald-400">{selectedApp.businessStage || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Industry Matched:</span>
                    <span className="font-bold text-white">{selectedApp.industry || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Mentor Scale Preference:</span>
                    <span className="font-bold text-white">{selectedApp.mentorScale || 'Not specified'}</span>
                  </div>
                </div>

                {selectedApp.selectedDate && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                    <span className="font-bold">Scheduled Mentor Call:</span>
                    <span className="font-black text-white">{selectedApp.selectedDate} @ {selectedApp.selectedTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
