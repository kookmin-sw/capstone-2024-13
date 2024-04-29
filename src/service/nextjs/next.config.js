const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	scope: '/',
	sw: '/sw.js',
	register: true,
	runtimeCaching: require('next-pwa/cache'),
	customWorkerDir: '/worker',
});

const nextConfig = withPWA({
	// Your Next.js config
});

module.exports = nextConfig;
