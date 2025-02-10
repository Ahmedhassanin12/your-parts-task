import "./../../../app/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

const meta: Meta<typeof Button> = {
	title: "Common/Components/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		variant: "solid",
		size: "medium",
		color: "blue",

		onClick: action("clicked"),
	},
	render: (args) => {
		return (
			<Button {...args}>
				<span>Click</span>
			</Button>
		);
	},
};
export const SuccessBtn: Story = {
	args: {
		variant: "solid",
		size: "medium",
		color: "green",
		children: <span>Success</span>,
		onClick: action("clicked"),
	},
};
export const ErrorBtn: Story = {
	args: {
		variant: "solid",
		size: "medium",
		color: "red",
		children: <span>Error</span>,
		onClick: action("clicked"),
	},
};

export const LoadingBtn: Story = {
	args: {
		variant: "solid",
		size: "medium",
		children: <span>Error</span>,
		loading: true,
	},
};

export const IconBtn: Story = {
	args: {
		variant: "solid",
		size: "medium",
		color: "gray",
		children: <span>click</span>,
		onClick: action("clicked"),
		endIcon: "✅",
	},
};
