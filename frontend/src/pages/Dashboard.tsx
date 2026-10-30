import { Activity, AlertTriangle, ArrowRight, Clock3, Search, ShieldCheck, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statCards = [
  { label: 'Received today', value: '184', change: '+12%', tone: 'bg-slate-900 text-white' },
  { label: 'Awaiting validation', value: '24', change: '-6%', tone: 'bg-sky-50 text-sky-800' },
  { label: 'Critical alerts', value: '5', change: '2 pending', tone: 'bg-rose-50 text-rose-700' },
  { label: 'Avg TAT', value: '1h 42m', change: '-15 min', tone: 'bg-emerald-50 text-emerald-700' },
];

const departmentLoad = [
  { name: 'Hematology', value: 82 },
  { name: 'Chemistry', value: 76 },
  { name: 'Immunoassay', value: 49 },
  { name: 'Microbiology', value: 58 },
  { name: 'Urinalysis', value: 41 },
];

const alerts = [
  'STAT troponin review needed for patient MRN-97560',
  '2 specimens rejected in accession for clotted EDTA',
  'QC failure flagged for chemistry reagent lot C-214',
];

const actionQueue = [
  { title: 'Review critical results', count: 5, route: '/review' },
  { title: 'Track specimen lifecycle', count: 18, route: '/tracking' },
  { title: 'Check inventory levels', count: 4, route: '/inventory' },
  { title: 'Review quality control', count: 3, route: '/quality' },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1440px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Operations overview</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Laboratory worklist</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-600">
            <Clock3 className="h-3.5 w-3.5 text-amber-600" />
            08:30 AM refresh
          </div>
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-slate-800"
          >
            <Search className="h-3.5 w-3.5" />
            Accession specimen
          </button>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className={`rounded-xl border border-slate-200 p-4 ${card.tone}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wide opacity-80">{card.label}</span>
              <TrendingUp className="h-4 w-4 opacity-80" />
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <span className="text-3xl font-bold tracking-tight">{card.value}</span>
              <span className="text-[11px] font-medium opacity-80">{card.change}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Department load</p>
              <h2 className="text-lg font-semibold text-slate-900">Current workload</h2>
            </div>
            <button type="button" onClick={() => navigate('/tracking')} className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900">
              View tracking <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {departmentLoad.map((dept) => (
              <div key={dept.name}>
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600">
                  <span>{dept.name}</span>
                  <span>{dept.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-900" style={{ width: `${dept.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Escalations</p>
              <h2 className="text-lg font-semibold text-slate-900">Needs attention</h2>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert} className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Live queue</p>
              <h2 className="text-lg font-semibold text-slate-900">Priority actions</h2>
            </div>
            <button type="button" onClick={() => navigate('/review')} className="text-[11px] font-medium text-slate-600 hover:text-slate-900">Open review queue</button>
          </div>
          <div className="space-y-3">
            {actionQueue.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.route)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-left transition hover:border-slate-300 hover:bg-white"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="text-[11px] text-slate-500">{item.count} items to review</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Daily metrics</p>
              <h2 className="text-lg font-semibold text-slate-900">Quality snapshot</h2>
            </div>
            <Activity className="h-5 w-5 text-sky-600" />
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Positive rate</span>
                <span>11.8%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[12%] rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>QC pass rate</span>
                <span>98.6%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[99%] rounded-full bg-teal-500" />
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Reagent expiries</span>
                <span>3 due soon</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[28%] rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Recent specimen activity</p>
            <h2 className="text-lg font-semibold text-slate-900">Today’s worklist</h2>
          </div>
          <button type="button" onClick={() => navigate('/orders')} className="text-[11px] font-medium text-slate-600 hover:text-slate-900">Add specimen</button>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2.5">Barcode</th>
                <th className="px-3 py-2.5">Patient</th>
                <th className="px-3 py-2.5">Test</th>
                <th className="px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[
                ['SP-28419', 'Morgan, A.', 'CBC with differential', 'In progress'],
                ['SP-28417', 'Chen, R.', 'Troponin I', 'Awaiting validation'],
                ['SP-28413', 'Nguyen, L.', 'Potassium, serum', 'Released'],
                ['SP-28415', 'Brooks, S.', 'Urinalysis', 'Received'],
              ].map(([barcode, patient, test, status]) => (
                <tr key={barcode} className="bg-white">
                  <td className="px-3 py-2.5 font-mono text-[12px] text-slate-800">{barcode}</td>
                  <td className="px-3 py-2.5 text-slate-700">{patient}</td>
                  <td className="px-3 py-2.5 text-slate-700">{test}</td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                      status === 'Awaiting validation' ? 'border-amber-200 bg-amber-50 text-amber-800' :
                      status === 'Released' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                      'border-sky-200 bg-sky-50 text-sky-700'}
                    `}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
