//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	images: {
		domains: [
			'pemilyy-assets.s3.ap-south-1.amazonaws.com',
			'pemily-test-docs.s3.ap-south-1.amazonaws.com',
		],
	},
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
