import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
//import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [react(),
    {/*visualizer({
      filename: './dist/report.html', // path to output report
      open: true, // auto open in browser after build
    }),*/}
  ],
})
