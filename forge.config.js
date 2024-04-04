/* eslint-disable @typescript-eslint/no-var-requires */

// Module imports
const {
	FuseV1Options,
	FuseVersion,
} = require('@electron/fuses')
const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { PublisherGithub } = require('@electron-forge/publisher-github')
const { VitePlugin } = require('@electron-forge/plugin-vite')





// Local import
const packageData = require('./package.json')





module.exports = {
	makers: [
		{ name: '@electron-forge/maker-zip' },
	],
	packagerConfig: {
		executableName: packageData.name,
		osxNotarize: {
			tool: 'notarytool',
			appleApiKey: process.env.APPLE_API_KEY,
			appleApiKeyId: process.env.APPLE_API_KEY_ID,
			appleApiIssuer: process.env.APPLE_API_ISSUER_ID,
		},
		osxSign: {},
	},
	plugins: [
		new VitePlugin({
			build: [
				{
					entry: 'src/main/main.js',
					config: 'vite.main.config.js',
				},
				{
					entry: 'src/preload/preload.js',
					config: 'vite.preload.config.js',
				},
			],
			renderer: [
				{
					name: 'main_window',
					config: 'vite.renderer.config.js',
				},
			],
		}),
		// Fuses are used to enable/disable various Electron functionality
		// at package time, before code signing the application
		new FusesPlugin({
			version: FuseVersion.V1,
			[FuseV1Options.RunAsNode]: false,
			[FuseV1Options.EnableCookieEncryption]: true,
			[FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
			[FuseV1Options.EnableNodeCliInspectArguments]: false,
			[FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
			[FuseV1Options.OnlyLoadAppFromAsar]: true,
		}),
	],
	publishers: [
		new PublisherGithub({
			repository: {
				owner: 'trezy-studios',
				name: 'the-inn-at-nightfall',
			},
			prerelease: true,
		}),
	],
	rebuildConfig: {},
}
