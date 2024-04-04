// Module imports
import ConditionalCompile from 'vite-plugin-conditional-compiler'
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import sassDts from 'vite-plugin-sass-dts'
import viteString from 'vite-plugin-string'





// Local imports
import { pluginExposeRenderer } from './vite.base.config.js'





export default defineConfig(
	/**
	 * @param {import('vite').ConfigEnv<'build'>} env Build environment variables.
	 * @returns {import('vite').UserConfig} The compiled config.
	 */
	env => {
		const {
			forgeConfigSelf,
			mode,
			root,
		} = env
		const name = forgeConfigSelf.name ?? ''

		return {
			root,
			mode,
			base: './',
			build: {
				outDir: `.vite/renderer/${name}`,
			},
			publicDir: path.resolve(process.cwd(), 'public'),
			plugins: [
				pluginExposeRenderer(name),
				viteString(),
				sassDts(),
				react({ include: /\.jsx$/u }),
				ConditionalCompile(),
			],
			resolve: {
				preserveSymlinks: true,
			},
			clearScreen: false,
		}
	},
)
