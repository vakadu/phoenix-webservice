/* eslint-disable-next-line */
export interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    labelClasses?: string;
    checkboxClasses?: string;
}

export function Checkbox(props: CheckboxProps) {
    const { label, checked, onChange, labelClasses, checkboxClasses } = props;
    return (
        <label className={`flex items-center cursor-pointer text-16 ${labelClasses || ''}`}>
            <input
                type='checkbox'
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
            <span className={`relative block w-18 h-18 mr-8 border-2 rounded-4 ${checkboxClasses || ''} ${checked ? 'bg-brand border-brand' : 'bg-white border-gray-300'}`}>
                {checked && <span className="absolute -top-2 inset-0 flex items-center justify-center text-white text-18 font-semibold">&#10003;</span>}
            </span>
            {label}
        </label>
    );
}

export default Checkbox;
