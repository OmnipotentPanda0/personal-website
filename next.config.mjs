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
};

export default nextConfig;
