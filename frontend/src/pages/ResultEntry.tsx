import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TestTube, AlertTriangle, Save } from 'lucide-react';

type Flag = 'normal' | 'abnormal' | 'critical';

const resultCatalog = [
  { code: 'LOINC 58410-2', name: 'CBC with differential', department: 'Hematology', unit: '', reference: 'See report', dataType: 'panel' },
  { code: 'LOINC 33924-5', name: 'Comprehensive metabolic panel', department: 'Chemistry', unit: '', reference: 'See report', dataType: 'panel' },
  { code: 'LOINC 55925-7', name: 'Troponin I, high sensitivity', department: 'Chemistry', unit: 'ng/mL', reference: '< 0.04', dataType: 'numeric' },
  { code: 'LOINC 3015-3', name: 'TSH, third generation', department: 'Immunoassay', unit: 'mIU/L', reference: '0.40–4.50', dataType: 'numeric' },
  { code: 'LOINC 26543-3', name: 'Urinalysis with microscopy', department: 'Urinalysis', unit: '', reference: 'See report', dataType: 'panel' },
  { code: 'LOINC 2345-7', name: 'Glucose, serum', department: 'Chemistry', unit: 'mg/dL', reference: '70–99', dataType: 'numeric' },
  { code: 'LOINC 6298-4', name: 'Potassium, serum', department: 'Chemistry', unit: 'mmol/L', reference: '3.5–5.0', dataType: 'numeric' },
  { code: 'LOINC 718-7', name: 'Hemoglobin', department: 'Hematology', unit: 'g/dL', reference: '12.0–15.5', dataType: 'numeric' },
  { code: 'LOINC 777-5', name: 'Prothrombin time (PT)', department: 'Hematology', unit: 'seconds', reference: '11–13.5', dataType: 'numeric' },
  { code: 'LOINC 59789-8', name: 'Sodium, serum', department: 'Chemistry', unit: 'mmol/L', reference: '136–145', dataType: 'numeric' },
];

type ResultEntry = {
  testCode: string;
  testName: string;
  department: string;
  unit: string;
  reference: string;
  dataType: string;
  value: string;
  flag: Flag | null;
};

const initialResults: ResultEntry[] = resultCatalog.map((t) => ({
  testCode: t.code,
  testName: t.name,
  department: t.department,
  unit: t.unit,
  reference: t.reference,
  dataType: t.dataType,
  value: '',
  flag: null,
}));

function computeFlag(value: string, reference: string): Flag | null {
  if (!value.trim()) return null;
  const num = parseFloat(value);
  if (isNaN(num)) return null;
  const match = reference.match(/([\d.]+)\s*–\s*([\d.]+)/);
  if (match) {
    const low = parseFloat(match[1]);
    const high = parseFloat(match[2]);
    if (num < low * 0.5 || num > high * 2) return 'critical';
    if (num < low || num > high) return 'abnormal';
    return 'normal';
  }
  const lessThan = reference.match(/<\s*([\d.]+)/);
  if (lessThan) {
    const high = parseFloat(lessThan[1]);
    if (num > high * 2) return 'critical';
    if (num > high) return 'abnormal';
    return 'normal';
  }
  return null;
}

function flagStyle(flag: Flag) {
  return {
    normal: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    abnormal: 'bg-amber-50 text-amber-800 border-amber-100',
    critical: 'bg-rose-50 text-rose-800 border-rose-200',
  }[flag];
}

export function ResultEntry() {
  const [searchParams] = useSearchParams();
  const initialBarcode = searchParams.get('barcode') || '';
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState(initialBarcode);
  const [results, setResults] = useState<ResultEntry[]>(initialResults);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleValueChange = (index: number, value: string) => {
    setResults((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], value };
      const ref = next[index].reference;
      next[index].flag = computeFlag(value, ref);
      return next;
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const empty = results.filter((r) => !r.value.trim());
    if (empty.length > 0) {
      setError('Please enter values for all tests before saving.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSaved(true);
    }, 500);
  };

  const criticalCount = results.filter((r) => r.flag === 'critical').length;
  const abnormalCount = results.filter((r) => r.flag === 'abnormal').length;

  return (
    <div className="mx-auto max-w-[1200px] space-y-4 px-3 pb-8 pt-4 sm:px-4 lg:px-6">
      <header className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-teal-700">
          <TestTube className="h-1.5 w-1.5 text-teal-600" />
          Result entry
        </div>
        <div className="flex items-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900"
          >
            Back to worklist
          </button>
          <div className="relative w-[200px]">
            <input
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="h-8 w-full border border-slate-200 rounded-md pl-8 pr-2 text-[12px] text-slate-800 font-mono outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              placeholder="Scan barcode…"
            />
            <TestTube className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || saved}
            className="px-3 py-1.5 text-[12px] font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {submitting ? 'Saving…' : saved ? 'Saved' : 'Save results'}
          </button>
        </div>
      </header>

      {saved && (
        <div className="border border-teal-200 bg-teal-50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <Save className="h-4 w-4 text-teal-700" />
            <div>
              <p className="text-sm font-semibold text-teal-900">Results saved</p>
              <p className="text-xs text-teal-700 font-mono">Barcode: {barcode || '—'}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="border border-rose-200 bg-rose-50 rounded-lg p-3">
          <AlertTriangle className="h-4 w-4 text-rose-700" />
          <span className="ml-1 text-xs text-rose-700">{error}</span>
        </div>
      )}

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Test</th>
              <th scope="col" className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Dept</th>
              <th scope="col" className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 text-right">Reference</th>
              <th scope="col" className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 text-right">Result</th>
              <th scope="col" className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((result, index) => (
              <tr key={result.testCode} className="transition-colors hover:bg-slate-50/70">
                <td className="px-4 py-3 text-sm text-slate-800">
                  <div className="font-medium">{result.testName}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{result.testCode}</div>
                </td>
                <td className="px-4 py-3 text-[12px] text-slate-600">{result.department}</td>
                <td className="px-4 py-3 text-right text-[12px] text-slate-600 font-mono">{result.reference}</td>
                <td className="px-4 py-3 text-right">
                  <input
                    type="text"
                    value={result.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full h-7 border border-slate-200 rounded-md px-2 text-[12px] text-right text-slate-800 font-mono outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 text-right"
                    placeholder="–"
                    spellCheck="false"
                  />
                  <span className="text-[10px] text-slate-400 ml-1">{result.unit}</span>
                </td>
                <td className="px-4 py-3">
                  {result.flag ? (
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border ${flagStyle(result.flag)}`}>
                      {result.flag === 'critical' && <AlertTriangle className="h-3 w-3" />}
                      {result.flag === 'critical' ? 'CRITICAL' : result.flag === 'abnormal' ? 'ABNORMAL' : 'NORMAL'}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {criticalCount > 0 || abnormalCount > 0 ? (
        <div className="mt-3 flex items-center gap-3 px-3 py-2 rounded-md border border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-700" />
          <div>
            <p className="text-[11px] font-semibold text-amber-800">{criticalCount} critical, {abnormalCount} abnormal result(s) require review.</p>
            <p className="text-[10px] text-amber-600">A pathologist or technologist must validate critical values before release.</p>
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-[11px] text-slate-500">Demo data — no LIS or instrument interface connected.</span>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-[11px] font-medium text-slate-500 hover:text-slate-900"
        >
          Return to worklist
        </button>
      </div>
    </div>
  );
}
