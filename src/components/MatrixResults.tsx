'use client';

import { MatrixResponse } from '@/lib/api';

interface MatrixResultsProps {
  results: MatrixResponse;
}

function MatrixTable({ matrix, title }: { matrix: number[][]; title: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 border border-gray-300 text-center"
                  >
                    {typeof value === 'number' ? value.toFixed(4) : value}
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