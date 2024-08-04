'use client';

export function TextInput({
	label,
	type = 'text',
	name,
}: {
	label: string;
	name: string;
	type?: 'numeric' | 'email' | 'search' | 'text' | 'tel' | 'url' | 'none' | 'decimal';
}) {
	return (
		<section className="relative">
			<label className="text-14 leading-14 font-medium mb-6 block">{label}</label>
			<section className="relative">
				<input type={type} />
			</section>
		</section>
	);
}

export default TextInput;
