/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats; the optimizer negotiates AVIF, then WebP, then original.
    formats: ['image/avif', 'image/webp'],
    // Trim the default ladder (which tops out at 3840w) to sizes this design
    // actually renders, so the optimizer never generates needless 4K variants.
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400, // 31 days
  },
};
export default nextConfig;
