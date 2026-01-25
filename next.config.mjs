/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io', 'img.clerk.com'],
        remotePatterns:[
            {
                protocol:'https',
                hostname:'utfs.io',
                port:''
            },
            {
                protocol:'https',
                hostname:'img.clerk.com',
                port:''
            }
        ]
      },
    // Vercel handles routing automatically
    trailingSlash: undefined // Let Vercel handle routing
};

export default nextConfig;
