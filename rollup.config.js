import { uglify } from 'rollup-plugin-uglify';
import rollupJson from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        name: 'bid-vite',
        format: 'cjs'
    },
    watch: {
        include: 'src/**',
        exclude: 'node_modules/**'
    },
    plugins: [uglify(), rollupJson(), commonjs()]
};
