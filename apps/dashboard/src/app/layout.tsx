import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import 'swiper/css';
import 'swiper/css/pagination';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

import '../assets/css/global.css';
import '../assets/css/vendors/swiper.css';
import Providers from '../core/providers/index';
import { Viewport } from 'next';

const sathoshi = localFont({
	src: [
		{
			path: '../assets/fonts/sathoshi/Satoshi-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Black.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sathoshi',
});

export const metadata = {
	title: 'Pemilyy - Your Digital Pet Clinic Companion',
	description: 'Transitioning Your Pet Clinic into the Digital Age with Our Advanced Platform',
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico' },
			{ url: '/favicon/favicon-16x16.png' },
			{ url: '/favicon/favicon-32x32.png' },
		],
		shortcut: ['/favicon/favicon-16x16.png'],
		apple: [{ url: '/favicon/apple-touch-icon.png' }],
	},
	generator: 'Next.js',
	applicationName: 'Pemilyy',
	referrer: 'origin-when-cross-origin',
	keywords: [
		'pemilyy',
		'pemily',
		'pemil',
		'pets',
		'cats',
		'dogs',
		'animals',
		'animal',
		'pet family',
		'family',
	],
	authors: [{ name: 'Vinod Kumar', url: 'https://vakaduvinod.in' }, { name: 'Avishek Singh' }],
	creator: 'Pemilyy',
	publisher: 'Pemilyy',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: 'Pemilyy - Your Digital Pet Clinic Companion',
		description:
			'Transitioning Your Pet Clinic into the Digital Age with Our Advanced Platform',
		url: 'https://pemilyy.com',
		siteName: 'Pemilyy',
		images: [
			{
				url: '/favicon/android-chrome-512x512.png',
				width: 512,
				height: 512,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	colorScheme: 'light',
}
  
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${sathoshi.variable} font-sathoshi scroll-smooth`}>
			<body>
				<Providers>{children}</Providers>
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MESSUREMENT_ID as string} />
			</body>
		</html>
	);
}
