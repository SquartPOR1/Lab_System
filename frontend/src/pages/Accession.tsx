import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, Barcode } from 'lucide-react';

const departments = ['Hematology', 'Chemistry', 'Immunoassay', 'Microbiology', 'Urinalysis', 'Blood Bank', 'Histopathology'];

const testCatalog = [
  { code: 'LOINC 58410-2', name: 'CBC with differential', department: 'Hematology', reference: 'See report', unit: '' },
  { code: 'LOINC 33924-5', name: 'Comprehensive metabolic panel', department: 'Chemistry', reference: 'See report', unit: '' },
  { code: 'LOINC 55925-7', name: 'Troponin I, high sensitivity', department: 'Chemistry', reference: '< 0.04 ng/mL', unit: 'ng/mL' },
  { code: 'LOINC 3015-3', name: 'TSH, third generation', department: 'Immunoassay', reference: '0.40–4.50 mIU/L', unit: 'mIU/L' },
  { code: 'LOINC 26543-3', name: 'Urinalysis with microscopy', department: 'Urinalysis', reference: 'See report', unit: '' },
  { code: 'LOINC 2345-7', name: 'Glucose, serum', department: 'Chemistry', reference: '70–99 mg/dL', unit: 'mg/dL' },
  { code: 'LOINC 6298-4', name: 'Potassium, serum', department: 'Chemistry', reference: '3.5–5.0 mmol/L', unit: 'mmol/L' },
  { code: 'LOINC 718-7', name: 'Hemoglobin', department: 'Hematology', reference: '12.0–15.5 g/dL', unit: 'g/dL' },
  { code: 'LOINC 777-5', name: 'Prothrombin time (PT)', department: 'Hematology', reference: '11–13.5 seconds', unit: 'seconds' },
  { code: 'LOINC 59789-8', name: 'Sodium, serum', department: 'Chemistry', reference: '136–145 mmol/L', unit: 'mmol/L' },
];

type Priority = 'STAT' | 'Routine' | 'Timed';

type SpecimenType = '' | 'Whole blood (EDTA)' | 'Serum' | 'Plasma' | 'Urine' | 'CSF' | 'Swab' | 'Tissue';

const priorityStyles: Record<Priority, string> = {
  STAT: 'bg-rose-50 text-rose-800 border border-rose-100',
  Routine: 'bg-slate-100 text-slate-600 border border-slate-200',
  Timed: 'bg-amber-50 text-amber-800 border border-amber-100',
};

export function Accession() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    sex: '',
    mrn: '',
    specimenType: '' as SpecimenType,
    department: '',
    tests: [] as string[],
    priority: 'Routine' as Priority,
    collectedAt: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.dob) e.dob = 'Date of birth is required';
    if (!form.sex) e.sex = 'Sex is required';
    if (!form.mrn.trim()) e.mrn = 'MRN is required';
    if (!form.specimenType) e.specimenType = 'Specimen type is required';
    if (!form.department) e.department = 'Department is required';
    if (form.tests.length === 0) e.tests = 'Select at least one test';
    if (!form.collectedAt) e.collectedAt = 'Collection date/time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generateBarcode = () => 'SP-' + Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBarcode(generateBarcode());
    }, 600);
  };

  const toggleTest = (code: string) => {
    setForm((prev) => ({
      ...prev,
      tests: prev.tests.includes(code) ? prev.tests.filter((c) => c !== code) : [...prev.tests, code],
    }));
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-teal-700">
          <Barcode className="h-1.5 w-1.5 text-teal-600" />
          Accession specimen
        </div>
        <div className="flex items-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900"
          >
            Back to worklist
          </button>
          {barcode && (
            <button
              type="button"
              onClick={() => {
                setBarcode(null);
                setForm({ firstName: '', lastName: '', dob: '', sex: '', mrn: '', specimenType: '', department: '', tests: [], priority: 'Routine', collectedAt: '', notes: '' });
              }}
              className="px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={submitting || barcode !== null}
            className="px-3 py-1.5 text-[12px] font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {submitting ? 'Processing…' : barcode ? 'Received' : 'Receive specimen'}
          </button>
        </div>
      </header>

      {barcode && (
        <div className="border border-teal-200 bg-teal-50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-teal-600 flex items-center justify-center">
              <Printer className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-teal-900">Specimen received</p>
              <p className="text-xs text-teal-700 font-mono">{barcode}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/results?barcode=${barcode}`)}
              className="ml-auto px-2.5 py-1 text-[11px] font-medium text-teal-700 border border-teal-200 rounded-md hover:bg-teal-100"
            >
              Enter results
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 space-y-4">
          <section className="border border-slate-200 rounded-lg p-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Patient demographics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-[10px] font-medium text-slate-500 mb-1">MRN</label>
                <input
                  value={form.mrn}
                  onChange={(e) => setForm({ ...form, mrn: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 font-mono outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="MRN-00000"
                />
                {errors.mrn && <p className="text-[10px] text-rose-600 mt-1">{errors.mrn}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">First name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="First name"
                />
                {errors.firstName && <p className="text-[10px] text-rose-600 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Last name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  placeholder="Last name"
                />
                {errors.lastName && <p className="text-[10px] text-rose-600 mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Date of birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  min="1900-01-01"
                  max={today}
                />
                {errors.dob && <p className="text-[10px] text-rose-600 mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Sex</label>
                <select
                  value={form.sex}
                  onChange={(e) => setForm({ ...form, sex: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                >
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
                {errors.sex && <p className="text-[10px] text-rose-600 mt-1">{errors.sex}</p>}
              </div>
            </div>
          </section>

          <section className="border border-slate-200 rounded-lg p-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Specimen &amp; tests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Specimen type</label>
                <select
                  value={form.specimenType}
                  onChange={(e) => setForm({ ...form, specimenType: e.target.value as SpecimenType })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                >
                  <option value="">Select type</option>
                  {['Whole blood (EDTA)', 'Serum', 'Plasma', 'Urine', 'CSF', 'Swab', 'Tissue'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.specimenType && <p className="text-[10px] text-rose-600 mt-1">{errors.specimenType}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Department</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.department && <p className="text-[10px] text-rose-600 mt-1">{errors.department}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Tests</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {testCatalog.map((test) => {
                    const selected = form.tests.includes(test.code);
                    return (
                      <button
                        key={test.code}
                        type="button"
                        onClick={() => toggleTest(test.code)}
                        className={`flex items-center gap-2 px-2 py-1.5 text-[11px] rounded-md border transition-colors ${selected ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                      >
                        <input type="checkbox" checked={selected} readOnly className="w-3 h-3" />
                        <span className="truncate">{test.name}</span>
                        <span className="ml-auto text-[10px] text-slate-400">{test.department}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.tests && <p className="text-[10px] text-rose-600 mt-1">{errors.tests}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                >
                  <option value="STAT">STAT</option>
                  <option value="Routine">Routine</option>
                  <option value="Timed">Timed</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Collection date / time</label>
                <input
                  type="datetime-local"
                  value={form.collectedAt}
                  onChange={(e) => setForm({ ...form, collectedAt: e.target.value })}
                  className="h-8 w-full border border-slate-200 rounded-md px-2 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                />
                {errors.collectedAt && <p className="text-[10px] text-rose-600 mt-1">{errors.collectedAt}</p>}
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-[12px] text-slate-800 outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                placeholder="Clinical notes, fasting status, etc."
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <section className="border border-slate-200 rounded-lg p-3 sticky top-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Order summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-600">Patient</span>
                <span className="font-medium text-slate-800">{form.firstName || '—'} {form.lastName || '—'}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-600">MRN</span>
                <span className="font-mono text-slate-800">{form.mrn || '—'}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-600">Specimen type</span>
                <span className="text-slate-800">{form.specimenType || '—'}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-600">Department</span>
                <span className="text-slate-800">{form.department || '—'}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-600">Priority</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityStyles[form.priority]}`}>{form.priority}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-600">Collected</span>
                <span className="text-slate-800">{form.collectedAt || '—'}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 mt-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 mb-2">Tests ({form.tests.length})</h3>
                <div className="space-y-1">
                  {form.tests.map((code) => {
                    const test = testCatalog.find((t) => t.code === code);
                    return (
                      <div key={code} className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-700">{test ? test.name : code}</span>
                        <span className="text-slate-500 font-mono">{code}</span>
                      </div>
                    );
                  })}
                  {form.tests.length === 0 && <span className="text-slate-400 text-[11px]">No tests selected</span>}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
