/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.ctfassets.net' },
			{ protocol: 'https', hostname: 'assets.ctfassets.net' },
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async redirects() {
		return [
			{ source: '/projects', destination: '/articles', permanent: true },
			{ source: '/projects/:slug', destination: '/articles/:slug', permanent: true },
		];
	},
};

export default nextConfig;
