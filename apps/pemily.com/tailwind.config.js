const { join } = require('path');

const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

module.exports = {
    mode: 'jit',
    content: [
		join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
		join(__dirname, 'components/**/*.{js,ts,jsx,tsx,mdx}'),
		'libs/ui/src/**/!(*.stories|*.spec).{js,ts,jsx,tsx}',
		...createGlobPatternsForDependencies(__dirname),
    ],
    presets: [require('../../tailwind-workspace-preset.js')],
    darkMode: 'class',
    theme: {
		extend: {
			fontFamily: {
			  	jost: ['var(--font-jost)'],
				sathoshi: ['var(--font-sathoshi)']
			},
			colors: {
				brand: 'rgb(var(--color-brand) / <alpha-value>)',
				secondary: '#040F0F',
				teritary: '#2D3A3A',
				beige: 'rgb(245, 239, 231)',
				tomato: '#F06543'
			},
			keyframes: {
				spinnerline: {
					'0%': {
						width: 0,
						left: 0,
						right: 'auto'
					},
					'50%': {
						width: '100%',
						left: 0,
						right: 'auto',
					},
					'51%': {
						width: '100%',
						left: 'auto',
						right: 0,
					},
					'100%': {
						width: 0,
						left: 'auto',
						right: 0,
					}
				}
			},
			animation: {
				spinnerline: 'spinnerline 1s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite',
			},
			backgroundImage: {
				ass: 'linear-gradient(0deg, #FFFFFF 0%, #F0EBE3 100%);'
			}
		},
	},
  	plugins: [],
}