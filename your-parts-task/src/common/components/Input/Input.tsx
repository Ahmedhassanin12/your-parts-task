import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";

export type InputProps = {
	label?: string;
	value: string;
	onChange: (value: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	feedback?: boolean;
	disabled?: boolean;
	icon?: ReactNode;
	type?: HTMLInputTypeAttribute;
	disableFocusRing?: boolean;
};

export function Input(props: InputProps) {
	const {
		label,
		value,
		onChange,
		placeholder,
		labelClassName,
		inputClassName,
		className,
		feedback,
		disabled,
		icon,
		type = "text",
	} = props;

	return (
		<div>
			<div className="flex items-center gap-2">
				{label && (
					<label
						htmlFor={label}
						className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
					>
						{label}
					</label>
				)}
				{feedback && (
					<p className=" text-sm text-red-400">
						<span className="font-bold">*</span> Required
					</p>
				)}
			</div>
			<div
				className={`border border-gray-200 rounded-md flex gap-2 items-center py-1 min-w-[250px] text-gray-500 focus-within:ring-blue-300 focus-within:ring-2 duration-200 ${className}`}
			>
				<div className="flex gap-2 items-center w-full">
					{icon ?? null}
					<input
						type={type}
						id={label}
						value={value}
						onChange={(e) => onChange(e)}
						className={`rounded-lg outline-none w-full text-sm pointer-events-auto p-1 ${inputClassName}`}
						placeholder={placeholder}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
}
