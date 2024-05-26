import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const upstream = {
	target: process.env.IMMICH_SERVER_URL || 'http://localhost:3001',
	secure: true,
	changeOrigin: true,
	logLevel: 'info',
	ws: true
};

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// connect to a remote backend during web-only development
		proxy: {
			'/api': upstream
		}
	}
});
