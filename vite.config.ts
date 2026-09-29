import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {WEDDING_DATA} from './src/data/weddingData';

// Thay ngày cưới trong index.html bằng giá trị từ src/data/weddingData.ts
function weddingDateHtml(): Plugin {
  return {
    name: 'wedding-date-html',
    transformIndexHtml(html) {
      return html
        .replaceAll('%WEDDING_DATE_DOT%', WEDDING_DATA.event.dateDot)
        .replaceAll('%WEDDING_DATE_SLASH%', WEDDING_DATA.event.dateSlash);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), weddingDateHtml()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
