const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
		'libs/ui/src/**/!(*.stories|*.spec).{js,ts,jsx,tsx}',
		...createGlobPatternsForDependencies(__dirname),
	],
	presets: [require('../../tailwind-workspace-preset.js')],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sathoshi: ['var(--font-sathoshi)'],
			},
			colors: {
				brand: '#007A65',
				primary: {
					1: '#007A65',
					2: '#007A6533',
					3: '#E2F0DD',
					4: '#F2FFFD',
					5: '#E7FAF4',
				},
				red: {
					1: '#B03A2E',
					2: '#F2D7D5',
				},
				black: {
					1: '#444444',
					2: '#222B45',
					3: '#000000',
				},
				grey: {
					1: '#F2F3F4',
					2: '#F5F5F5',
					3: '#B4AEAE',
					4: '#EFEFEF',
					bg1: '#F8FAFB',
					bg2: '#6B779A0D',
					bg3: '#F3F3F3',
					text1: '#D9D9D9',
					text2: '#5F5B5B',
					divider: '#D3DADD',
					border1: '#544C4C24',
					border2: '#F0F0F0',
					border3: '#E8E8E8',
					border4: '#444449',
					text3: '#9E9E9E',
				},
				boxShadow: {
					base: '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
					base2: '0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16)',
					base3: '16px 10px 40px rgba(15, 23, 42, 0.22)',
					deep: '-2px 0px 8px rgba(0, 0, 0, 0.16)',
					dropdown: '0px 4px 8px rgba(0, 0, 0, 0.08)',
					testi: '0px 4px 24px rgba(0, 0, 0, 0.06)',
				},
				transitionTimingFunction: {
					ease1: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
				},
			},
		},
	},
	variants: {
		extend: {
			transitionProperty: ['width'],
		},
	},
	plugins: [],
};
