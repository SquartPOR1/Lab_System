import { AlertTriangle, CheckCircle2, FileText } from 'lucide-react';

const queue = [
  { patient: 'Chen, R.', barcode: 'SP-28417', test: 'Troponin I', result: '0.42 ng/mL', priority: 'Critical', reviewer: 'Dr. Patel' },
  { patient: 'Okafor, T.', barcode: 'SP-28414', test: 'Glucose, serum', result: '112 mg/dL', priority: 'Abnormal', reviewer: 'Technologist Lee' },
  { patient: 'Nguyen, L.', barcode: 'SP-28413', test: 'Potassium', result: '6.2 mmol/L', priority: 'Critical', reviewer: 'Supervisor Jones' },
  { patient: 'Rivera, M.', barcode: 'SP-28416', test: 'TSH', result: '5.4 mIU/L', priority: 'Abnormal', reviewer: 'Technologist Smith' },
];

export function ReviewQueue() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Validation workflow</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Result review queue</h1>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Pending</span>
            <FileText className="h-4 w-4 text-slate-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">12</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Critical</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">4</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Approved</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">86</div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Patient</th>
              <th className="px-4 py-2.5">Barcode</th>
              <th className="px-4 py-2.5">Test</th>
              <th className="px-4 py-2.5">Result</th>
              <th className="px-4 py-2.5">Priority</th>
              <th className="px-4 py-2.5">Reviewer</th>
              <th className="px-4 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {queue.map((row) => (
              <tr key={row.barcode}>
                <td className="px-4 py-3 text-slate-800">{row.patient}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-slate-600">{row.barcode}</td>
                <td className="px-4 py-3 text-slate-700">{row.test}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-slate-800">{row.result}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                    row.priority === 'Critical' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-amber-200 bg-amber-50 text-amber-800'
                  }`}>{row.priority}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.reviewer}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50">Hold</button>
                    <button className="rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white hover:bg-slate-800">Approve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
