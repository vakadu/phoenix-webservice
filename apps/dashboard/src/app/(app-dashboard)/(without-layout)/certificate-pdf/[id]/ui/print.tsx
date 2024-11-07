'use client';

import { ButtonWrapper, ImagePlaceholder } from '@webservices/ui';

export default function Print() {
	const handlePdf = async () => {
		const htmltopdf = await require('html2pdf.js');

		let element = document.querySelector('#pdf');
		htmltopdf(element);
	};

	return (
		<div className="fixed right-24 bottom-24 cursor-pointer">
			<div
				className="relative bg-white rounded-full w-[52px] h-[52px] flex items-center justify-center"
				onClick={handlePdf}
			>
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
				<ImagePlaceholder src="/images/print.svg" containerClasses="w-[42px] h-[42px]" />
			</div>
		</div>
	);
}
