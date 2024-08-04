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
				jost: ['var(--font-jost)'],
				sathoshi: ['var(--font-sathoshi)'],
			},
			colors: {
				brand: 'rgb(var(--color-brand) / <alpha-value>)',
				secondary: '#040F0F',
				teritary: '#2D3A3A',
				beige: 'rgb(245, 239, 231)',
				tomato: '#F06543',
				black: {
					bg: '#1C2428',
					bg2: '#1C1B1E',
				},
				gray: {
					50: '#F9FAFB',
					100: '#F4F5F7',
					200: '#E5E7EB',
					300: '#D2D6DC',
					400: '#9FA6B2',
					500: '#68768A',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A',
				},
				boxShadow: {
					base: '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
					base2: '0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16)',
					base3: '16px 10px 40px rgba(15, 23, 42, 0.22)',
					deep: '-2px 0px 8px rgba(0, 0, 0, 0.16)',
					dropdown: '0px 4px 8px rgba(0, 0, 0, 0.08)',
					testi: '0px 4px 24px rgba(0, 0, 0, 0.06)',
					todo: 'rgba(235 233 241, 0.6) 0px 3px 10px 0px',
				},
			},
		},
	},
	plugins: [],
};
