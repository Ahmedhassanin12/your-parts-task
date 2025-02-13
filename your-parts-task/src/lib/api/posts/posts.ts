import api from "@/axios_instance";

export type IPostType = {
  userId: number,
  id: number,
  title: string,
  body: string
}




export const getPosts = async (pageNumber: number): Promise<IPostType[]> => {
  const response = await api.get<IPostType[]>(`/posts?_limit=10&_page=${pageNumber}`,);
  return response.data
};

export const getPost = async (id: number): Promise<IPostType> => {
  const response = await api.get<IPostType>(`/posts/${id}`,);
  return response.data
};

export const addPost = async (data: Pick<IPostType, "body" | "title">): Promise<IPostType[]> => {
  const response = await api.post<IPostType[]>("/posts", { ...data, userId: 1 });
  return response.data
};

export const editPost = async (id: number, data: Partial<IPostType>): Promise<IPostType[]> => {
  const response = await api.patch<IPostType[]>(`/posts/${id}`, data);
  return response.data
};

export const deletePost = async (id: number): Promise<IPostType[]> => {
  const response = await api.delete<IPostType[]>(`/posts/${id}`);
  return response.data
};