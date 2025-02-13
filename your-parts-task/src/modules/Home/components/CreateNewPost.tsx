import Button from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { addPost, editPost, type IPostType } from "@/lib/api/posts/posts";
import { useMutation } from "@tanstack/react-query";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";

interface CreateNewPostProps {
	post?: IPostType; // Optional post prop for editing
	onSuccess?: () => void; // Optional callback for success
}

const CreateNewPost = ({ post, onSuccess }: CreateNewPostProps) => {
	const { mutate: addMutation, isPending: isAdding } = useMutation({
		mutationFn: async (data: Pick<IPostType, "body" | "title">) => {
			return await addPost(data);
		},
	});

	const { mutate: editMutation, isPending: isEditing } = useMutation({
		mutationFn: async (data: Partial<IPostType>) => {
			if (post) return await editPost(post?.id, data);
		},
	});
	const [formValues, setFormValues] = useState({
		title: "",
		body: "",
	});
	const dialog = useRef<HTMLDialogElement | null>(null);

	const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

	const handleClickOutside = (event: MouseEvent<HTMLDialogElement>) => {
		if (event.target === dialog.current) {
			resetForm();
			dialog.current?.close();
		}
	};

	const validateForm = () => {
		const newErrors: { title?: string; body?: string } = {};

		if (!formValues.title.trim()) {
			newErrors.title = "Title is required";
		}
		if (!formValues.body.trim()) {
			newErrors.body = "Body is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (validateForm()) {
			const mutation = post ? editMutation : addMutation;
			mutation(
				{ ...formValues, id: post?.id },
				{
					onSuccess: () => {
						if (!post) resetForm();
						dialog.current?.close();
						onSuccess?.();
					},
				},
			);
		}
	};

	const resetForm = () => {
		setFormValues({
			title: "",
			body: "",
		});
		setErrors({});
	};

	useEffect(() => {
		if (dialog.current?.open && post) {
			setFormValues({
				title: post.title,
				body: post.body,
			});
		}
	}, [post]);

	return (
		<>
			<Button
				onClick={() => {
					if (post) {
						// Pre-fill form with post data when opening the dialog
						setFormValues({
							title: post.title,
							body: post.body,
						});
					} else {
						// Reset form for adding a new post
						resetForm();
					}
					dialog.current?.showModal();
				}}
				variant="solid"
				className="items-end"
				startIcon={<MdAdd />}
			>
				{post ? "Edit" : "Add"}
			</Button>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<dialog
				onClick={handleClickOutside}
				className="w-96 backdrop:bg-gray-50 "
				style={{ width: "500px", height: "310px", padding: "16px" }}
				ref={dialog}
			>
				<h2 className="p-1 font-bold text-lg">
					{post ? "Edit Post" : "Create Post"}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="py-3">
						<Input
							label="title"
							value={formValues.title}
							onChange={(e) =>
								setFormValues((prev) => ({ ...prev, title: e.target.value }))
							}
						/>
						{errors.title ? (
							<p className="text-red-500 text-sm">{errors.title}</p>
						) : null}
					</div>

					<div className="py-3">
						<Input
							label="body"
							value={formValues.body}
							onChange={(e) =>
								setFormValues((prev) => ({ ...prev, body: e.target.value }))
							}
						/>
						{errors.body ? (
							<p className="text-red-500 text-sm">{errors.body}</p>
						) : null}
					</div>
					<div className="pt-3 flex items-center justify-center">
						{isAdding || isEditing ? (
							<Button type="button" disabled>
								{post ? "Editing..." : "Adding..."}
							</Button>
						) : (
							<Button type="submit">{post ? "Save Changes" : "Create"}</Button>
						)}
					</div>
				</form>
			</dialog>
		</>
	);
};

export default CreateNewPost;
