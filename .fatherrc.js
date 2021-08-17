// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import builtins from 'rollup-plugin-node-builtins';

export default {
    target: 'node',
    nodeVersion: 12,
    esm: { type: 'babel', minify: true },
    cjs: { type: 'babel', minify: true },
    umd: { file: 'index', minFile: true },
    runtimeHelpers: true,
    extraRollupPlugins: [
        // builtins()
        // nodeResolve()
    ],
    nodeResolveOpts: {
        preferBuiltins: true
    }
};
