/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Si tu repositorio se llama "frontend-matrix" y la URL en GitHub Pages es
  // https://tu-usuario.github.io/frontend-matrix/ , descomenta la siguiente línea:
  // basePath: '/frontend-matrix',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;