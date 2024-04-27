const dest = 'public';
const register = true;
const scope = '/src/app';
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({ dest, register, scope, runtimeCaching });

module.exports = withPWA({
	// Your Next.js config
});
