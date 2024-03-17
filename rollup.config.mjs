import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import {dts} from 'rollup-plugin-dts';
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import alias from '@rollup/plugin-alias';
import packageJson from './package.json' assert {type: 'json'};

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            babel({babelHelpers: 'bundled'}),
            commonjs(),
            terser(),
            typescript({tsconfig: './tsconfig.json'}),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.ts', '.tsx'],
                exclude: 'node_modules',
            }),
            svgr(),
            alias({
                entries: [
                    {find: '@root', replacement: './src'},
                    {find: '@components', replacement: './src/components/'},
                    {find: '@assets', replacement: './src/assets/'},
                    {find: '@constants', replacement: './src/constants/'},
                    {find: '@appTypes', replacement: './src/types/'},
                ],
            })
        ],
        external: ["react", "react-dom", "styled-components"],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{file: 'dist/index.d.ts', format: 'esm'}],
        plugins: [dts()],
    },
];