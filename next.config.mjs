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
    // Enable trailing slash to ensure compatibility with Netlify
    trailingSlash: 'ignore'
};

export default nextConfig;
