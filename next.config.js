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
	
}

module.exports = nextConfig
