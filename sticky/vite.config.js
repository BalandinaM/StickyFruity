import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/StickyFruity/"
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `@import "src/styles/_variables.scss";`,
	// 		},
	// 	},
	// },
});
