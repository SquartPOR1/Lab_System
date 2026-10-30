import { AlertTriangle, Package2 } from 'lucide-react';

const inventory = [
  { item: 'EDTA tubes', lot: 'EDTA-18', onHand: 128, parLevel: 90, status: 'Healthy' },
  { item: 'Chemistry reagent', lot: 'CHEM-214', onHand: 42, parLevel: 75, status: 'Low stock' },
  { item: 'Control serum', lot: 'CTRL-7', onHand: 18, parLevel: 40, status: 'Expiring soon' },
  { item: 'Urine dipsticks', lot: 'UR-33', onHand: 90, parLevel: 60, status: 'Healthy' },
];

export function Inventory() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Supply chain</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventory and reagents</h1>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Items tracked</span>
            <Package2 className="h-4 w-4 text-slate-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">146</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Low stock</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">4</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Expiring</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">3</div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Item</th>
              <th className="px-4 py-2.5">Lot</th>
              <th className="px-4 py-2.5">On hand</th>
              <th className="px-4 py-2.5">Par level</th>
              <th className="px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {inventory.map((item) => (
              <tr key={item.lot}>
                <td className="px-4 py-3 text-slate-800">{item.item}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-slate-600">{item.lot}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-slate-800">{item.onHand}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-slate-600">{item.parLevel}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                    item.status === 'Low stock' ? 'border-amber-200 bg-amber-50 text-amber-800' :
                    item.status === 'Expiring soon' ? 'border-rose-200 bg-rose-50 text-rose-700' :
                    'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
