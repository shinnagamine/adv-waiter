// vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path'
import path from 'path';

const folderName = path.basename(process.cwd());

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.js'),
			name: folderName,
			fileName: (format) => folderName + (format === 'es' ? '.mjs' : '.js'),
			formats: [ 'es', 'umd' ]
		},
		emptyOutDir: false
	}
});
