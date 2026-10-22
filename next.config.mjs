/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  ...(process.env.KHADAFI_CONSTRAINED_BUILD === "true"
    ? { experimental: { cpus: 1, webpackMemoryOptimizations: true } }
    : {}),
};

export default nextConfig;
