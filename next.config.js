/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Debe coincidir exactamente con el nombre de tu repositorio en GitHub:
  basePath: '/project2026-CodingChallenge-frontend',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;