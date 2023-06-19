/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'scontent.fhan14-1.fna.fbcdn.net',
			'lh3.googleusercontent.com',
			'danviet.mediacdn.vn',
			'wallpapercave.com',
		],
	},
};

module.exports = nextConfig;
