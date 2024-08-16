/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "next-mdx-remote", "@repo/tailwind-config" ],
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
  compress: true,
  cleanDistDir: true,
  experimental: {
    cssChunking: "loose",
    useEarlyImport: true,
    optimizeCss: true,
    gzipSize: true,
    optimizeServerReact: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    serverMinification: true,
    cssChunking: "loose",
    swcMinify: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};
export default nextConfig