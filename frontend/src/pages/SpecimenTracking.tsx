import { Activity, Clock3, MapPin } from 'lucide-react';

type TrackingItem = {
  barcode: string;
  patient: string;
  test: string;
  stage: string;
  location: string;
  updated: string;
  status: 'active' | 'alert' | 'complete';
};

const specimenFlow: TrackingItem[] = [
  {
    barcode: 'SP-28419',
    patient: 'Morgan, A.',
    test: 'CBC with differential',
    stage: 'In analyzer',
    location: 'Hematology bench 2',
    updated: '08:42 AM',
    status: 'active',
  },
  {
    barcode: 'SP-28417',
    patient: 'Chen, R.',
    test: 'Troponin I',
    stage: 'Awaiting validation',
    location: 'Validation desk',
    updated: '08:38 AM',
    status: 'alert',
  },
  {
    barcode: 'SP-28412',
    patient: 'Foster, D.',
    test: 'Hemoglobin',
    stage: 'Released',
    location: 'Result queue',
    updated: '08:10 AM',
    status: 'complete',
  },
  {
    barcode: 'SP-28415',
    patient: 'Brooks, S.',
    test: 'Urinalysis',
    stage: 'Received',
    location: 'Reception intake',
    updated: '07:54 AM',
    status: 'active',
  },
];

const stageMarkers = ['Received', 'Accessioned', 'Processed', 'In analyzer', 'Validated', 'Released'];

export function SpecimenTracking() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Specimen lifecycle</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tracking and chain of custody</h1>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Active</span>
            <Activity className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">48</div>
          <p className="mt-1 text-[11px] text-slate-500">Specimens in process</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Alerts</span>
            <MapPin className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">3</div>
          <p className="mt-1 text-[11px] text-slate-500">Location or barcode exceptions</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
            <span>Avg transit</span>
            <Clock3 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">21m</div>
          <p className="mt-1 text-[11px] text-slate-500">Across receipt to result queue</p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Lifecycle milestones</p>
          <h2 className="text-lg font-semibold text-slate-900">Barcode trace</h2>
        </div>
        <div className="grid gap-2 md:grid-cols-6">
          {stageMarkers.map((stage, index) => (
            <div key={stage} className={`rounded-lg border p-2 text-center ${index <= 3 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
              <div className="text-[10px] font-medium uppercase tracking-wide">{stage}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        {specimenFlow.map((item) => (
          <div key={item.barcode} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.barcode}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.patient}</h3>
              </div>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                item.status === 'alert' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                item.status === 'complete' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                {item.status === 'alert' ? 'Needs review' : item.status === 'complete' ? 'Complete' : 'In progress'}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-[12px] text-slate-600">
              <div><span className="font-medium text-slate-800">Test:</span> {item.test}</div>
              <div><span className="font-medium text-slate-800">Stage:</span> {item.stage}</div>
              <div><span className="font-medium text-slate-800">Location:</span> {item.location}</div>
              <div><span className="font-medium text-slate-800">Updated:</span> {item.updated}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
