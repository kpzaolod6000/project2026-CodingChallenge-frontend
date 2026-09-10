/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Debe coincidir exactamente con el nombre de tu repositorio:
  basePath: '/project2026-CodingChallenge-frontend',
  assetPrefix: '/project2026-CodingChallenge-frontend/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;