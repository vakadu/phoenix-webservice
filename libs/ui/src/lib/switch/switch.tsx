interface SwitchProps {
	label: string;
	value: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	activeClasses?: string;
	labelClasses?: string;
}

export function Switch({
	label,
	value,
	onChange,
	disabled = false,
	activeClasses = 'ring-brand border-brand bg-brand',
	labelClasses = '',
}: SwitchProps) {
	return (
		<section>
			<label
				className={`flex gap-8 items-center ${
					disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
				}`}
			>
				<input
					type="checkbox"
					className="hidden"
					checked={value}
					onChange={onChange}
					disabled={disabled}
				/>
				<section
					className={`relative inline-flex h-24 w-[46px] items-center rounded-full transition-all duration-150
          ${value ? activeClasses : 'bg-grey-divider'}
          `}
				>
					<span
						className={`inline-block h-20 w-20 transform rounded-full bg-white transition-all duration-150 
          ${value ? 'translate-x-[22px]' : 'translate-x-[4px]'}
          `}
					></span>
				</section>
				<span className={labelClasses}>{label}</span>
			</label>
		</section>
	);
}

export default Switch;
