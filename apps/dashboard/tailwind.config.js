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
				grey: {
					bg: '#F5F7FA',
				},
			},
		},
	},
	plugins: [],
};
