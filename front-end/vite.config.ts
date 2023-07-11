import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { checker } from 'vite-plugin-checker';

const projectRootDir = path.resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@root': path.resolve(projectRootDir, 'src')
		}
	},
	server: {
		proxy: {
			'/api': 'http://127.0.0.1:3001/',
		}
	},
	plugins: [react(), viteTsconfigPaths(), svgrPlugin(), checker({ typescript: true, overlay: { initialIsOpen: false } }),],
});
