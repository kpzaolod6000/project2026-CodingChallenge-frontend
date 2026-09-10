'use client';

import { MatrixResponse } from '@/lib/api';

interface MatrixResultsProps {
  results: MatrixResponse;
}

function toFraction(value: number): string {
  if (value === 0) return '0';
  if (Number.isInteger(value)) return value.toString();

  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);

  const commonFractions: [number, string][] = [
    [1/6, '1/6'],
    [1/5, '1/5'],
    [1/4, '1/4'],
    [1/3, '1/3'],
    [1/2, '1/2'],
    [2/3, '2/3'],
    [3/4, '3/4'],
    [5/6, '5/6'],
    [1/Math.SQRT2, '1/√2'],
    [1/Math.sqrt(3), '1/√3'],
    [1/Math.sqrt(5), '1/√5'],
    [Math.SQRT2, '√2'],
    [Math.sqrt(3), '√3'],
    [Math.sqrt(5), '√5'],
    [Math.PI, 'π'],
    [Math.E, 'e'],
  ];

  for (const [val, frac] of commonFractions) {
    if (Math.abs(abs - val) < 0.0001) return sign + frac;
  }

  const maxDenom = 1000;
  let bestNum = Math.round(abs * 1000);
  let bestDenom = 1000;
  let bestErr = Math.abs(abs - bestNum / bestDenom);

  for (let d = 1; d <= maxDenom; d++) {
    const n = Math.round(abs * d);
    const err = Math.abs(abs - n / d);
    if (err < bestErr) {
      bestNum = n;
      bestDenom = d;
      bestErr = err;
    }
    if (bestErr < 0.0001) break;
  }

  if (bestDenom === 1) return sign + bestNum.toString();
  return `${sign}${bestNum}/${bestDenom}`;
}

function MatrixTable({ matrix, title }: { matrix: number[][]; title: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-3 py-1 border border-gray-300 text-xs text-gray-500">Decimal</th>
              <th className="px-3 py-1 border border-gray-300 text-xs text-gray-500">Fracción</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td
                    key={j}
                    className="px-2 py-1 border border-gray-300 text-center"
                  >
                    <div className="text-sm">{typeof value === 'number' ? value.toFixed(4) : value}</div>
                    <div className="text-xs text-gray-500">{typeof value === 'number' ? toFraction(value) : value}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MatrixResults({ results }: MatrixResultsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Resultados</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <MatrixTable matrix={results.qr.q} title="Matriz Q" />
          <MatrixTable matrix={results.qr.r} title="Matriz R" />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Máximo</div>
            <div className="text-2xl font-bold">{results.stats.max}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Mínimo</div>
            <div className="text-2xl font-bold">{results.stats.min}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Suma Total</div>
            <div className="text-2xl font-bold">{results.stats.totalSum}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Promedio</div>
            <div className="text-2xl font-bold">{results.stats.average.toFixed(4)}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">¿Es diagonal?</span>
            <span className={`px-2 py-1 rounded text-sm ${
              results.stats.isAnyDiagonal 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {results.stats.isAnyDiagonal ? 'Sí' : 'No'}
            </span>
          </div>
          
          {results.stats.details && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Q es diagonal: {results.stats.details.qIsDiagonal ? 'Sí' : 'No'}</p>
              <p>R es diagonal: {results.stats.details.rIsDiagonal ? 'Sí' : 'No'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}