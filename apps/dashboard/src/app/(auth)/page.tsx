'use client';

import Image from 'next/image';
import LoginForm from '../../components/login/form';

const Login = () => {
	return (
		<section className="flex items-center min-h-screen w-full overflow-hidden">
			<section className="flex flex-1 overflow-hidden min-h-screen">
				<section className="flex-1 bg-grey-4 flex items-center justify-center h-full">
					<figure className="w-[108px] h-[61px] lg:w-[160px] lg:h-[48px] relative">
						<Image
							fill
							src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-with-caption-primary.png"
							alt="pemilyy"
							style={{
								objectFit: 'contain',
							}}
						/>
					</figure>
				</section>
				<section className="flex-1 bg-white flex items-center justify-center">
					<section className="min-w-[524px] mx-auto px-[44px] py-[42px]">
						<h1 className="text-[32px] leading-[48px] font-medium text-center">
							Sign In
						</h1>
						<h4 className="text-center mb-32 text-grey-text2">
							Sign in to your account to start using Pemilyy
						</h4>
						<LoginForm />
					</section>
				</section>
			</section>
		</section>
	);
};

export default Login;
