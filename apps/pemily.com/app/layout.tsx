import { Jost } from 'next/font/google';
import localFont from 'next/font/local';
// import { Analytics } from '@vercel/analytics/react';

import './assets/css/global.css';
import './assets/css/vendors/swiper.css';
import Providers from './providers';

const sathoshi = localFont({
	src: [
		{
			path: './assets/fonts/sathoshi/Satoshi-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: './assets/fonts/sathoshi/Satoshi-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './assets/fonts/sathoshi/Satoshi-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: './assets/fonts/sathoshi/Satoshi-Bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: './assets/fonts/sathoshi/Satoshi-Black.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sathoshi'
})

export const metadata = {
	title: 'Pemily',
	description: 'Vinod Kumar',
	icons: {
		icon: [
			{ url: '/favicons/favicon.ico' },
			{ url: '/favicons/favicon-16x16.png' },
			{ url: '/favicons/favicon-32x32.png' },
		],
		shortcut: ['/favicons/favicon-16x16.png'],
		apple: [
			{ url: '/favicons/apple-touch-icon.png' },
		]
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
	generator: 'Next.js',
	applicationName: 'Pemilyy',
	referrer: 'origin-when-cross-origin',
	keywords: ['pemilyy', 'pemily', 'pemil', 'pets', 'cats', 'dogs', 'animals', 'animal', 'pet family', 'family'],
	authors: [{ name: 'Vinod Kumar', url: 'https://vakaduvinod.in' }, { name: 'Avishek Singh' }],
	colorScheme: 'light',
	creator: 'Vinod Kumar',
	publisher: 'Vinod Kumar',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: 'Pemilyy',
		description: 'Pemilyy',
		url: 'https://pemilyy.com',
		siteName: 'Pemilyy',
		images: [
			{
				url: '/favicons/android-chrome-512x512.png',
				width: 512,
				height: 512,
			}
		],
		locale: 'en_US',
		type: 'website',
	},
};

const jost = Jost({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-jost',
});

export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${sathoshi.variable} ${jost.variable} font-sathoshi`}>
			<body>
				<Providers>{children}</Providers>
				{/* <Analytics /> */}
			</body>
		</html>
	);
}
