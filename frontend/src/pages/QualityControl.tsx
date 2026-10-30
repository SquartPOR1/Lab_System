import { AlertTriangle, FlaskConical, TrendingUp } from 'lucide-react';

const qcRows = [
  { lot: 'CHEM-214', analyte: 'Potassium', mean: '4.1', target: '4.0', drift: '2.5%', status: 'Pass' },
  { lot: 'HEM-018', analyte: 'Hemoglobin', mean: '13.8', target: '14.0', drift: '1.4%', status: 'Pass' },
  { lot: 'QC-443', analyte: 'Glucose', mean: '98', target: '100', drift: '4.1%', status: 'Warning' },
  { lot: 'IMM-02', analyte: 'TSH', mean: '3.2', target: '3.0', drift: '3.8%', status: 'Pass' },
];

export function QualityControl() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Quality assurance</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">QC and compliance dashboard</h1>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Pass rate</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">98.6%</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Warnings</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">2</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Checks today</span>
            <FlaskConical className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">57</div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Levey-Jennings</p>
          <h2 className="text-lg font-semibold text-slate-900">Daily QC overview</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Lot #</th>
                <th className="px-4 py-2.5">Analyte</th>
                <th className="px-4 py-2.5">Mean</th>
                <th className="px-4 py-2.5">Target</th>
                <th className="px-4 py-2.5">Drift</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {qcRows.map((row) => (
                <tr key={row.lot}>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-800">{row.lot}</td>
                  <td className="px-4 py-3 text-slate-700">{row.analyte}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-800">{row.mean}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-600">{row.target}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-600">{row.drift}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                      row.status === 'Warning' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`}>{row.status}</span>
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
