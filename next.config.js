/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
    output: 'export',
    // Add basePath
    basePath: '/github-pages',
    // images: {
    //     unoptimized: true,
    // },
}

const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	// register: true,
	// scope: '/app',
	// sw: 'service-worker.js',
})

module.exports = withPWA({
	// next.js config
	...nextConfig,
})
