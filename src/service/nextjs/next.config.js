const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	scope: '/',
	sw: '/sw.js',
	register: true,
	skipWaiting: true,
	runtimeCaching: require('next-pwa/cache'),
	customWorkerDir: '/worker',
	buildExcludes: [/manifest\.json$/, /Manifest/],
});

const nextConfig = withPWA({
	// Your Next.js config
	reactStrictMode: false,
	images: {
		domains: [process.env.NEXT_PUBLIC_S3_BUCKET_URL, 'd1jmbceob3xhv5.cloudfront.net'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.NEXT_PUBLIC_S3_BUCKET_URL,
			},
		],
	},
});

module.exports = nextConfig;
