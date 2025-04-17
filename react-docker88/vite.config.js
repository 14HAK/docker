import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true, // Enable polling for file changes
		},
		host: true, // Allow access from outside the container
		strictPort: true,
		port: 5173, // Ensure the port matches the one exposed in Docker
	},
});
