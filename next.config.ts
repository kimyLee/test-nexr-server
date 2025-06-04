import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  // 禁用导出功能，因为 Vercel 不需要它
  // 这可以解决 export-detail.json 相关的错误
  distDir: '.next',
};

export default nextConfig;
