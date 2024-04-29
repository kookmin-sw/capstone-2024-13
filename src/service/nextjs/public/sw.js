if (!self.define) {
	let e,
		a = {};
	const s = (s, i) => (
		(s = new URL(s + '.js', i).href),
		a[s] ||
			new Promise(a => {
				if ('document' in self) {
					const e = document.createElement('script');
					(e.src = s), (e.onload = a), document.head.appendChild(e);
				} else (e = s), importScripts(s), a();
			}).then(() => {
				let e = a[s];
				if (!e) throw new Error(`Module ${s} didn’t register its module`);
				return e;
			})
	);
	self.define = (i, n) => {
		const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
		if (a[t]) return;
		let c = {};
		const r = e => s(e, t),
			d = { module: { uri: t }, exports: c, require: r };
		a[t] = Promise.all(i.map(e => d[e] || r(e))).then(e => (n(...e), c));
	};
}
define(['./workbox-9b4d2a02'], function (e) {
	'use strict';
	importScripts('worker-KOlV7e-G-6WdX4EzoN02T.js'),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{ url: '/_next/app-build-manifest.json', revision: '162ae9e7b93e441ad0f5efa5a9f8c698' },
				{
					url: '/_next/static/KOlV7e-G-6WdX4EzoN02T/_buildManifest.js',
					revision: 'a1b7599199e2e8c82f2c6bcf8d8aca61',
				},
				{
					url: '/_next/static/KOlV7e-G-6WdX4EzoN02T/_ssgManifest.js',
					revision: 'b6652df95db52feb4daf4eca35380933',
				},
				{ url: '/_next/static/chunks/250-815efb4bc43fb6a8.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/270-0b84bfa280d704df.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/412-aa17d0bb85b88d23.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/530-3911ba177547a396.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/580-9d0ba98b4e8c338a.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/59-e0b226b3c7fbc81e.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/749-113c2c14d8af7f5d.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/782-511eebcc03d9ad5f.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{ url: '/_next/static/chunks/938-86026f6d3667bd8a.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{
					url: '/_next/static/chunks/app/(private)/album/%5Bid%5D/page-6cc73b07775e1233.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/album/diary/%5Bid%5D/page-9932de9694037be3.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/album/diary/page-42c91a951cc73f5e.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/album/page-2f45355312f945ab.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/diary/page-9c1f38a3fc6a933b.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/layout-9b65831d43366762.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/mypage/page-710c832fb6fdbf80.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/search/diary/%5Bid%5D/page-c13af4d7304b762e.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(private)/search/page-2f8bc490ef2365c4.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(public)/auth/login/callback/page-142134d0eccfb607.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(public)/auth/login/page-a0d8668c5ba6ffb8.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(public)/auth/register/page-02234b8f35cf17e4.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/(public)/layout-1b59f69536bc4c27.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/_not-found-c5547cda7bc55717.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/layout-966a5bab57e397b3.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/app/page-199d2ec9f5d277fc.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/fd9d1056-3ab72051547edebc.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/framework-4e7bd024a369b85e.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{ url: '/_next/static/chunks/main-3b20f20cdff1f385.js', revision: 'KOlV7e-G-6WdX4EzoN02T' },
				{
					url: '/_next/static/chunks/main-app-c0b1d86d4eb10240.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/pages/_error-e87e5963ec1b8011.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{
					url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
					revision: '837c0df77fd5009c9e46d446188ecfd0',
				},
				{
					url: '/_next/static/chunks/webpack-19297fd2d74b1a96.js',
					revision: 'KOlV7e-G-6WdX4EzoN02T',
				},
				{ url: '/_next/static/css/031cf1ef283e3b72.css', revision: '031cf1ef283e3b72' },
				{ url: '/_next/static/css/1527cfdab2ade1ee.css', revision: '1527cfdab2ade1ee' },
				{ url: '/_next/static/css/174f17e2968e5e31.css', revision: '174f17e2968e5e31' },
				{ url: '/_next/static/css/1b99d088773b7355.css', revision: '1b99d088773b7355' },
				{ url: '/_next/static/css/6876aad69ec3262f.css', revision: '6876aad69ec3262f' },
				{ url: '/_next/static/css/7d68d0b6e9f9ba10.css', revision: '7d68d0b6e9f9ba10' },
				{ url: '/_next/static/css/951a88c31ef0a823.css', revision: '951a88c31ef0a823' },
				{ url: '/_next/static/css/9e90955316d00e68.css', revision: '9e90955316d00e68' },
				{ url: '/_next/static/css/aa4bc172b80d215f.css', revision: 'aa4bc172b80d215f' },
				{ url: '/_next/static/css/c94814f00c5e120c.css', revision: 'c94814f00c5e120c' },
				{ url: '/_next/static/css/e52dee302c98581b.css', revision: 'e52dee302c98581b' },
				{
					url: '/_next/static/media/05a31a2ca4975f99-s.woff2',
					revision: 'f1b44860c66554b91f3b1c81556f73ca',
				},
				{
					url: '/_next/static/media/513657b02c5c193f-s.woff2',
					revision: 'c4eb7f37bc4206c901ab08601f21f0f2',
				},
				{
					url: '/_next/static/media/51ed15f9841b9f9d-s.woff2',
					revision: 'bb9d99fb9bbc695be80777ca2c1c2bee',
				},
				{
					url: '/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2',
					revision: '74c3556b9dad12fb76f84af53ba69410',
				},
				{
					url: '/_next/static/media/d6b16ce4a6175f26-s.woff2',
					revision: 'dd930bafc6297347be3213f22cc53d3e',
				},
				{
					url: '/_next/static/media/ec159349637c90ad-s.woff2',
					revision: '0e89df9522084290e01e4127495fae99',
				},
				{
					url: '/_next/static/media/fd4db3eb5472fc27-s.woff2',
					revision: '71f3fcaf22131c3368d9ec28ef839831',
				},
				{
					url: '/font/Pretendard/Pretendard-Black.woff',
					revision: 'ffac9e667a7d8415953e5982a9ab1d51',
				},
				{
					url: '/font/Pretendard/Pretendard-Bold.woff',
					revision: 'bd94b933c6839371baa27f7950ef3784',
				},
				{
					url: '/font/Pretendard/Pretendard-ExtraBold.woff',
					revision: 'b065213da09db107d456c842bcff59ad',
				},
				{
					url: '/font/Pretendard/Pretendard-ExtraLight.woff',
					revision: 'a8765fcee2563360f3f8117835300c3d',
				},
				{
					url: '/font/Pretendard/Pretendard-Light.woff',
					revision: '0fcba49d32bb9e4b3738d28bedb1bdd2',
				},
				{
					url: '/font/Pretendard/Pretendard-Medium.woff',
					revision: '4750a6d12c26201887eee28ae55ed037',
				},
				{
					url: '/font/Pretendard/Pretendard-Regular.woff',
					revision: 'f897fa3ff216e4be74648184144780b1',
				},
				{
					url: '/font/Pretendard/Pretendard-SemiBold.woff',
					revision: 'e02072832a9d8ef22f3d1d08bb917f9d',
				},
				{
					url: '/font/Pretendard/Pretendard-Thin.woff',
					revision: 'bf79f0289a1950ddb6cbca0c709b77df',
				},
				{ url: '/font/Roboto/LICENSE.txt', revision: 'd273d63619c9aeaf15cdaf76422c4f87' },
				{ url: '/font/Roboto/Roboto-Medium.woff', revision: '803b7154bbae37008e91c97c501dca70' },
				{ url: '/image/background-image.png', revision: 'd0f7ac680038ff55b41efe70868ecfb5' },
				{ url: '/image/default-image-00.png', revision: '0c8751ad28f45de998a3356b4d33b330' },
				{ url: '/image/default-image-01.png', revision: 'ee93a2e40e6d64d06392ee2d144b69fd' },
				{ url: '/image/default-image-02.png', revision: '767ff18945b15a4d9c5ba7939250f5ce' },
				{ url: '/image/default-image-03.png', revision: '029d3fd05dbc6be85a53872f828f0162' },
				{ url: '/image/default-image-04.png', revision: 'db0e62e478f4f19d2f88f68ace6862e0' },
				{ url: '/image/default-image-05.png', revision: 'b1571288ba2c160f2b614d4e67d4ee3e' },
				{ url: '/image/default-image-06.png', revision: 'b845b5865db707e9138544586a8ff675' },
				{ url: '/image/default-image-07.png', revision: '63896b1616666e788dce960333624836' },
				{ url: '/image/default-image-08.png', revision: '52009bd8a298e3aa6bb82c8cee32075d' },
				{ url: '/image/default-image-09.png', revision: '55786e787ac841b04ca609d38c6e6a98' },
				{ url: '/image/default-profile-image.png', revision: '323e4c81656f4694aab25262cfebb9d6' },
				{ url: '/image/icon-192.png', revision: '7d20225155c11d5be75ec54cd340a012' },
				{ url: '/image/icon-512.png', revision: '3b3ce2f6ef84b6d76ac520075732f67d' },
				{ url: '/image/test-image-00.png', revision: 'f37fb6975fd8d23fd990d640e0a2cada' },
				{ url: '/image/test-image-01.png', revision: '2b613fefd8799bb97d81588cde1497cd' },
				{ url: '/image/you-know-what.png', revision: '02157a3ecb7855d0d2289a39d4aa0373' },
				{ url: '/manifest.webmanifest', revision: '949a9e9d2648579c32f97703786406f0' },
				{ url: '/svg/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
				{ url: '/svg/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
			],
			{ ignoreURLParametersMatching: [] },
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({ request: e, response: a, event: s, state: i }) =>
							a && 'opaqueredirect' === a.type
								? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
								: a,
					},
				],
			}),
			'GET',
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
			}),
			'GET',
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const a = e.pathname;
				return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
			}),
			'GET',
		);
});
