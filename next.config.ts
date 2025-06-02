// next.config.js
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "ysb0as62a1.ufs.sh", 
      "uploadthing.com",    
      "*.ufs.sh" ,
      "img.clerk.com"       
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh', 
      },
    ],
  },
};

export default nextConfig;
