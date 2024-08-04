'use client';

import LoginForm from '../../components/login/form';

const Login = () => {
	return (
		<section className="flex items-center min-h-screen w-full overflow-hidden">
			<section className="w-full flex-wrap flex items-center min-h-screen overflow-y-auto">
				<section className="flex-1 relative bg-gray-100 h-full">
					<h1>Sign In</h1>
				</section>
				<section className="flex-1 relative">
					<section className="h-full flex">
						<section className="max-w-[524px] mx-auto px-[44px] py-[42px] h-full">
							<h1 className="text-[32px] leading-[48px] font-medium text-center">
								Sign In
							</h1>
							<h4 className="text-center mb-32">
								Sign in to your account to start using Pemilyy
							</h4>
							<LoginForm />
						</section>
					</section>
				</section>
			</section>
		</section>
	);
};

export default Login;
