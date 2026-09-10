'use client';

import { useState } from 'react';
import MatrixInput from '@/components/MatrixInput';
import MatrixResults from '@/components/MatrixResults';
import { processMatrix, MatrixResponse, ApiError } from '@/lib/api';

export default function Home() {
  const [results, setResults] = useState<MatrixResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessMatrix = async (matrix: number[][]) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await processMatrix(matrix);
      setResults(response);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Error al procesar la matriz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Entrada de Matriz</h2>
        <MatrixInput onSubmit={handleProcessMatrix} isLoading={isLoading} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {results && <MatrixResults results={results} />}
    </div>
  );
}