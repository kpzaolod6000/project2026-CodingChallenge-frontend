'use client';

import { useState } from 'react';

interface MatrixInputProps {
  onSubmit: (matrix: number[][]) => void;
  isLoading: boolean;
}

export default function MatrixInput({ onSubmit, isLoading }: MatrixInputProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(3).fill(null).map(() => Array(3).fill(0))
  );

  const handleSizeChange = (newRows: number, newCols: number) => {
    const newMatrix = Array(newRows).fill(null).map((_, i) =>
      Array(newCols).fill(0).map((_, j) => matrix[i]?.[j] || 0)
    );
    setMatrix(newMatrix);
    setRows(newRows);
    setCols(newCols);
  };

  const handleValueChange = (row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newMatrix = matrix.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? numValue : v))
    );
    setMatrix(newMatrix);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(matrix);
  };

  const handleTestMatrix = () => {
    const testMatrix = [[1, 1, 1], [0, 1, 1], [1, 0, -1]];
    setRows(3);
    setCols(3);
    setMatrix(testMatrix);
    onSubmit(testMatrix);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filas
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={rows}
            onChange={(e) => handleSizeChange(parseInt(e.target.value) || 1, cols)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Columnas
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={cols}
            onChange={(e) => handleSizeChange(rows, parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j} className="p-1">
                    <input
                      type="number"
                      step="any"
                      value={value}
                      onChange={(e) => handleValueChange(i, j, e.target.value)}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleTestMatrix}
          disabled={isLoading}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Probar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Procesando...' : 'Procesar Matriz'}
        </button>
      </div>
    </form>
  );
}