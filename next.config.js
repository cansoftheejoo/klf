/** @type {import('next').NextConfig} */

const nextConfig = {
  // generateBuildId: async() => 'constant-build-id',
  // reactStrictMode: true,
	images: {
		// unoptimized: true,
		domains: [
            'localhost',
            // process.env.NEXT_PUBLIC_HOST_URL,
            'unsplash.com',
            'images.unsplash.com',
            'thumb.midibus.kinxcdn.com',
            'admin.franchise-online.co.kr',
        ],
	},
  async rewrites() {
    return [
      {
        source: '/v2/media/:path', 
        destination: 'https://mapi.midibus.kinxcdn.com/v2/media/:path', 
      },
    ];
},
}

module.exports = nextConfig
