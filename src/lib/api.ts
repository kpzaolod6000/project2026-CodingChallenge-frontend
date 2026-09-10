const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'coding-challenge';

export interface MatrixRequest {
  matrix: number[][];
}

export interface MatrixResponse {
  qr: {
    q: number[][];
    r: number[][];
  };
  stats: {
    max: number;
    min: number;
    totalSum: number;
    average: number;
    isAnyDiagonal: boolean;
    details?: {
      qIsDiagonal: boolean;
      rIsDiagonal: boolean;
    };
  };
}

export interface ApiError {
  error: string;
  details?: string;
}

export async function processMatrix(matrix: number[][]): Promise<MatrixResponse> {
  const response = await fetch(`${API_URL}/api/factorization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ matrix }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || 'Error al procesar la matriz');
  }

  const raw = await response.json();

  return {
    qr: raw.qr,
    stats: raw.stats.data || raw.stats,
  };
}

export async function checkHealth(): Promise<{ status: string; service: string }> {
  const response = await fetch(`${API_URL}/health`);
  
  if (!response.ok) {
    throw new Error('Error al verificar el estado del servicio');
  }

  return response.json();
}