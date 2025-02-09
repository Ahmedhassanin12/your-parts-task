import type { ReactNode } from "react";

type Size = "small" | "medium" | "large";

interface ButtonProps {
	children: ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	className?: string;
	size?: Size;
	iconSize?: Size;
	color?:
		| "blue"
		| "red"
		| "green"
		| "yellow"
		| "purple"
		| "indigo"
		| "pink"
		| "gray";
	variant?: "solid" | "outline";
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	type?: "submit" | "reset" | "button" | undefined;
	loading?: boolean;
}

export const Button = ({
	children,
	onClick,
	disabled = false,
	className = "",
	size = "medium",
	iconSize = "medium",
	color = "blue",
	variant = "solid",
	startIcon,
	endIcon,
	type = "button",
	loading = false,
}: ButtonProps) => {
	const sizeClasses = {
		small: "px-1.5 py-1 text-xs",
		medium: "px-3 py-2 text-sm",
		large: "px-5 py-3 text-base",
	};

	const iconSizes = {
		small: "0.75em",
		medium: "1em",
		large: "1.25em",
	};

	const colorClasses = {
		blue: {
			solid: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 text-white",
			outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
		},
		red: {
			solid: "bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white",
			outline: "border border-red-500 text-red-500 hover:bg-red-50",
		},
		green: {
			solid: "bg-green-500 hover:bg-green-600 focus:ring-green-500 text-white",
			outline: "border border-green-500 text-green-500 hover:bg-green-50",
		},
		yellow: {
			solid:
				"bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white",
			outline: "border border-yellow-500 text-yellow-500 hover:bg-yellow-50",
		},
		purple: {
			solid:
				"bg-purple-500 hover:bg-purple-600 focus:ring-purple-500 text-white",
			outline: "border border-purple-500 text-purple-500 hover:bg-purple-50",
		},
		indigo: {
			solid:
				"bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 text-white",
			outline: "border border-indigo-500 text-indigo-500 hover:bg-indigo-50",
		},
		pink: {
			solid: "bg-pink-500 hover:bg-pink-600 focus:ring-pink-500 text-white",
			outline: "border border-pink-500 text-pink-500 hover:bg-pink-50",
		},
		gray: {
			solid: "bg-gray-300 hover:bg-gray-300 focus:ring-gray-300 text-gray-600",
			outline: "border border-gray-300 text-gray-300 hover:bg-gray-50",
		},
	};

	const buttonClasses = `
    ${sizeClasses[size]} 
    ${colorClasses[color][variant]} 
    font-semibold rounded-lg focus:outline-none focus:ring-1 focus:ring-opacity-50 
    ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
    ${className}
  `;

	const finalIconSize = iconSize || iconSizes[size];

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={buttonClasses}
		>
			<div className="flex items-center justify-center">
				{loading ? (
					<>
						<span>Loading...</span>
						<span
							className={`ml-2 w-4 h-4  border rounded-full ${colorClasses[color][variant]} animate-spin`}
						/>
					</>
				) : (
					<>
						{startIcon && (
							<span className="mr-2" style={{ fontSize: finalIconSize }}>
								{startIcon}
							</span>
						)}

						{/* Button Text */}
						{children}

						{endIcon && (
							<span className="ml-2" style={{ fontSize: finalIconSize }}>
								{endIcon}
							</span>
						)}
					</>
				)}
			</div>
		</button>
	);
};

export default Button;
