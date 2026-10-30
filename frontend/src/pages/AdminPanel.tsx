import { Lock, ShieldCheck, Users } from 'lucide-react';

const permissions = [
  ['Technician', 'Accession', 'Result entry', 'No validation'],
  ['Supervisor', 'All specimen tasks', 'Release results', 'QC sign-off'],
  ['Pathologist', 'Result validation', 'Critical review', 'E-signature'],
];

const auditLog = [
  { user: 'T. Lee', action: 'Released potassium result', timestamp: '08:14 AM', record: 'SP-28413' },
  { user: 'J. Patel', action: 'Amended troponin result', timestamp: '07:51 AM', record: 'SP-28417' },
  { user: 'M. Jones', action: 'Rejected clotted specimen', timestamp: '07:22 AM', record: 'SP-28422' },
];

export function AdminPanel() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Administration</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users, permissions, and audit</h1>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Users</span>
            <Users className="h-4 w-4 text-slate-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">26</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Roles</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">7</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>2FA</span>
            <Lock className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">18</div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Role matrix</p>
          <h2 className="text-lg font-semibold text-slate-900">Access control summary</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Operational access</th>
                <th className="px-4 py-2.5">Clinical sign-off</th>
                <th className="px-4 py-2.5">Admin policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {permissions.map(([role, op, signOff, policy]) => (
                <tr key={role}>
                  <td className="px-4 py-3 font-medium text-slate-800">{role}</td>
                  <td className="px-4 py-3 text-slate-700">{op}</td>
                  <td className="px-4 py-3 text-slate-700">{signOff}</td>
                  <td className="px-4 py-3 text-slate-700">{policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Audit trail</p>
          <h2 className="text-lg font-semibold text-slate-900">Recent system activity</h2>
        </div>
        <div className="space-y-3">
          {auditLog.map((entry) => (
            <div key={`${entry.user}-${entry.timestamp}`} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-slate-800">{entry.action}</p>
                <p className="text-[11px] text-slate-500">{entry.user} • {entry.record}</p>
              </div>
              <span className="text-[11px] text-slate-500">{entry.timestamp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
