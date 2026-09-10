# Frontend Matrix

Frontend para procesamiento de matrices con descomposición QR factorization. Se comunica con el backend Go (`go-api`), que a su vez se conecta con el servicio Node.js (`node-api`).

## Arquitectura

```
Frontend (Next.js :3001) → Go-API (:3000) → Node-API (:4000)
```

## Requisitos

- Node.js 18+
- Docker (para levantar `go-api` y `node-api`)
- PM2 (opcional, para producción)

## Instalación

```bash
cd frontend-matrix
npm install
```

## Variables de entorno

El archivo `.env.local` contiene:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_KEY=coding-challenge
```

## Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:3001`.

## Producción

```bash
npm run build
npm run start
```

## Con PM2

```bash
# Iniciar en producción con PM2
npm run pm2:start

# Detener
npm run pm2:stop

# Reiniciar
npm run pm2:restart

# Ver logs
npm run pm2:logs
```

## Endpoints del Backend

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Health check | No |
| POST | `/api/factorization` | Procesar matriz (QR) | X-API-Key |

### Ejemplo de petición

```bash
curl -X POST http://localhost:3000/api/factorization \
  -H "Content-Type: application/json" \
  -H "X-API-Key: coding-challenge" \
  -d '{"matrix": [[1, 1, 1], [0, 1, 1], [1, 0, -1]]}'
```

## Stack

- **Framework:** Next.js 16
- **Runtime:** React 19
- **Estilos:** Tailwind CSS
- **Lenguaje:** TypeScript
- **Proceso:** PM2
