"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, Download, Mail, Trash2, Calendar } from "lucide-react";

interface Contact {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  message: string | null;
  phone: string | null;
  createdAt: string;
}

interface Demo {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  demoDate: string;
  service: string | null;
  notes: string | null;
  createdAt: string;
}

type Tab = "contacts" | "demos";

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("contacts");
  const [leads, setLeads] = useState<Contact[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = useCallback(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    if (!token) return;
    setLoading(true);
    fetch("/api/admin/leads", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("adminToken");
          setAuth(false);
          return [];
        }
        return r.json();
      })
      .then((d) => setLeads(Array.isArray(d) ? d : []))
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  }, []);

  const fetchDemos = useCallback(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    if (!token) return;
    setLoading(true);
    fetch("/api/admin/demos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("adminToken");
          setAuth(false);
          return [];
        }
        return r.json();
      })
      .then((d) => setDemos(Array.isArray(d) ? d : []))
      .catch(() => setDemos([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    if (token) {
      setAuth(true);
      fetchLeads();
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, [auth, fetchLeads]);

  useEffect(() => {
    if (auth && tab === "demos") {
      fetchDemos();
    }
  }, [auth, tab, fetchDemos]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });
    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem("adminToken", data.token);
      setAuth(true);
      setLoading(true);
      fetchLeads();
    } else {
      setLoginError(data.error || "Login failed.");
    }
  }

  async function handleDeleteContact(id: string) {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    if (!token) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else if (res.status === 401) {
        sessionStorage.removeItem("adminToken");
        setAuth(false);
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDeleteDemo(id: string) {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    if (!token) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/demo/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        setDemos((prev) => prev.filter((d) => d.id !== id));
      } else if (res.status === 401) {
        sessionStorage.removeItem("adminToken");
        setAuth(false);
      }
    } finally {
      setDeletingId(null);
    }
  }

  function exportContactsCsv() {
    const headers = ["Email", "Name", "Phone", "Company", "Message", "Created"];
    const rows = leads.map((l) => [
      l.email,
      l.name ?? "",
      l.phone ?? "",
      l.company ?? "",
      (l.message ?? "").replace(/"/g, '""'),
      new Date(l.createdAt).toISOString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c)}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportDemosCsv() {
    const headers = ["Email", "Name", "Company", "Demo date", "Service", "Notes", "Created"];
    const rows = demos.map((d) => [
      d.email,
      d.name ?? "",
      d.company ?? "",
      new Date(d.demoDate).toISOString(),
      d.service ?? "",
      (d.notes ?? "").replace(/"/g, '""'),
      new Date(d.createdAt).toISOString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c)}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    setAuth(false);
    setLeads([]);
    setDemos([]);
  }

  if (auth === null || auth === false) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-primary)]">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border bg-[var(--bg-card)] p-6"
        >
          <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Admin login</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          {loginError && (
            <p className="text-sm text-red-400 mb-3">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl py-2.5 font-medium text-white hover:opacity-90 transition-colors"
            style={{ background: "var(--accent)" }}
          >
            Sign in
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab("contacts")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "contacts"
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Mail className="w-4 h-4 inline-block mr-1.5 align-middle" />
              Contacts
            </button>
            <button
              type="button"
              onClick={() => setTab("demos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "demos"
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Calendar className="w-4 h-4 inline-block mr-1.5 align-middle" />
              Demos
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={tab === "contacts" ? exportContactsCsv : exportDemosCsv}
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
          </div>
        ) : tab === "contacts" ? (
          <div className="rounded-xl border border-[var(--glass-border)] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--glass-bg)] border-b border-[var(--glass-border)]">
                <tr>
                  <th className="p-4 font-medium text-[var(--text-primary)]">Email</th>
                  <th className="p-4 font-medium text-[var(--text-primary)]">Name</th>
                  <th className="p-4 font-medium text-[var(--text-primary)] hidden sm:table-cell">Company</th>
                  <th className="p-4 font-medium text-[var(--text-primary)]">Date</th>
                  <th className="p-4 font-medium text-[var(--text-primary)] w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-[var(--glass-border)] hover:bg-[var(--bg-secondary)]">
                    <td className="p-4">
                      <a href={`mailto:${l.email}`} className="text-[var(--accent)] flex items-center gap-1 hover:underline">
                        <Mail className="w-3 h-3 shrink-0" />
                        {l.email}
                      </a>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">{l.name ?? "—"}</td>
                    <td className="p-4 text-[var(--text-secondary)] hidden sm:table-cell">{l.company ?? "—"}</td>
                    <td className="p-4 text-[var(--text-secondary)]">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(l.id)}
                        disabled={deletingId === l.id}
                        className="text-red-400 hover:text-red-300 disabled:opacity-50 p-1 rounded"
                        title="Delete"
                      >
                        {deletingId === l.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leads.length === 0 && (
              <p className="p-8 text-center text-[var(--text-secondary)]">No contact submissions yet.</p>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--glass-border)] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--glass-bg)] border-b border-[var(--glass-border)]">
                <tr>
                  <th className="p-4 font-medium text-[var(--text-primary)]">Email</th>
                  <th className="p-4 font-medium text-[var(--text-primary)]">Name</th>
                  <th className="p-4 font-medium text-[var(--text-primary)] hidden sm:table-cell">Company</th>
                  <th className="p-4 font-medium text-[var(--text-primary)]">Demo date</th>
                  <th className="p-4 font-medium text-[var(--text-primary)] hidden sm:table-cell">Service</th>
                  <th className="p-4 font-medium text-[var(--text-primary)] w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demos.map((d) => (
                  <tr key={d.id} className="border-b border-[var(--glass-border)] hover:bg-[var(--bg-secondary)]">
                    <td className="p-4">
                      <a href={`mailto:${d.email}`} className="text-[var(--accent)] flex items-center gap-1 hover:underline">
                        <Mail className="w-3 h-3 shrink-0" />
                        {d.email}
                      </a>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">{d.name ?? "—"}</td>
                    <td className="p-4 text-[var(--text-secondary)] hidden sm:table-cell">{d.company ?? "—"}</td>
                    <td className="p-4 text-[var(--text-secondary)]">
                      {new Date(d.demoDate).toLocaleString()}
                    </td>
                    <td className="p-4 text-[var(--text-secondary)] hidden sm:table-cell">{d.service ?? "—"}</td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleDeleteDemo(d.id)}
                        disabled={deletingId === d.id}
                        className="text-red-400 hover:text-red-300 disabled:opacity-50 p-1 rounded"
                        title="Delete"
                      >
                        {deletingId === d.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {demos.length === 0 && (
              <p className="p-8 text-center text-[var(--text-secondary)]">No demo bookings yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
