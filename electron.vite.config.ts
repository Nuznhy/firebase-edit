import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    main: {
        resolve: {
            alias: {
                '@/lib': resolve('src/main/lib'),
                '@shared': resolve('src/shared')
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        assetsInclude: 'src/renderer/src/assets',
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
                '@shared': resolve('src/shared'),
                '@assets': resolve('src/renderer/src/assets'),
                '@components': resolve('src/renderer/src/components'),
                '@http': resolve('src/renderer/srs/http'),
                '@services': resolve('src/renderer/src/services'),
                '@store': resolve('src/renderer/src/store'),
                '@translation': resolve('src/renderer/src/translation'),
                '@views': resolve('src/renderer/src/views')
            }
        },
        plugins: [vue()]
    }
});
