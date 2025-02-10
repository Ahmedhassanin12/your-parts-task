import "./../../../app/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, type InputProps } from "./Input";
import { useState } from "react";

const meta: Meta<typeof Input> = {
	title: "Common/Components/Input",
	component: Input,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWithState = (args: InputProps) => {
	const [value, setValue] = useState(""); // Add state for the input value

	return (
		<Input
			{...args}
			value={value}
			onChange={(e) => setValue(e.target.value)} // Update state on change
		/>
	);
};

// Default Input with State Management
export const Default: Story = {
	render: (args) => {
		return <InputWithState {...args} />;
	},
	args: {
		label: "Username",
		placeholder: "Enter your username",
	},
};

// Input with Icon and State Management
export const WithIcon: Story = {
	render: (args) => {
		return <InputWithState {...args} />;
	},
	args: {
		label: "Username",
		placeholder: "Enter your username",
		icon: "💲",
	},
};

// Input with Feedback
export const WithFeedback: Story = {
	args: {
		label: "Password",
		value: "",
		onChange: (e) => console.log(e.target.value),
		placeholder: "Enter your password",
		feedback: true,
	},
};

// Input with Custom Classes
export const WithCustomClasses: Story = {
	args: {
		label: "Custom Styled Input",
		value: "",
		onChange: (e) => console.log(e.target.value),
		placeholder: "Enter something",
		className: "border-2 border-red-500",
		labelClassName: "text-red-500",
		inputClassName: "text-blue-500",
	},
};

// Input with Different Types
export const PasswordInput: Story = {
	args: {
		label: "Password",
		value: "",
		onChange: (e) => console.log(e.target.value),
		placeholder: "Enter your password",
		type: "password",
	},
	render: (args) => {
		return <InputWithState {...args} />;
	},
};

export const EmailInput: Story = {
	args: {
		label: "Email",
		value: "",
		onChange: (e) => console.log(e.target.value),
		placeholder: "Enter your email",
		type: "email",
	},
};

export const NumberInput: Story = {
	args: {
		label: "Age",
		value: "",
		onChange: (e) => console.log(e.target.value),
		placeholder: "Enter your age",
		type: "number",
	},
	render: (args) => {
		return <InputWithState {...args} />;
	},
};
