import { defineConfig } from 'astro/config';

// https://astro.build/config
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [vue()],
    srcDir: './website/src',
    publicDir: './website/public',
    outDir: './website/dist',
    base: 'Passbirb',
    build: {
        assets: 'assets',
    },
});
