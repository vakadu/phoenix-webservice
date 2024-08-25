import React from 'react';
import Link from 'next/link';
import { Button } from '@webservices/ui';

const PageNotFound = () => {
	return (
		<section className="min-h-screen flex flex-col justify-center bg-white items-center text-center py-20">
			<img src="/images/404.svg" alt="" />
			<section className="max-w-[546px] mx-auto w-full mt-32">
				<h4 className="text-32 font-semibold mb-12">Page not found</h4>
				<p className="mb-10">
					The page you are looking for might have been removed had its name changed or is
					temporarily unavailable.
				</p>
			</section>
			<section className="max-w-[300px] mx-auto w-full">
				<Button>
					<Link href="/medical-records" className="">
						Go to homepage
					</Link>
				</Button>
			</section>
		</section>
	);
};

export default PageNotFound;
