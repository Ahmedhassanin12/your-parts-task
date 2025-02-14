import { userApi } from "@/axios_instance";

export type IUserType = {
  userId: number,
  id: number,
  email: string,
  name: string
  first_name: string
  last_name: string
  job?: string
  avatar: string | null | undefined
}




export const getUsers = async (pageNumber: number): Promise<IUserType[]> => {
  const response = await userApi.get<{ data: IUserType[] }>(`/users?page=${pageNumber}`,);
  return response.data.data
};

export const getUser = async (id: number): Promise<IUserType> => {
  const response = await userApi.get<IUserType>(`/users/${id}`,);
  return response.data
};

export const addUser = async (data: Pick<IUserType, "name" | "job">): Promise<IUserType[]> => {
  const response = await userApi.post<IUserType[]>("/users", { ...data, userId: 1 });
  return response.data
};

export const editUser = async (id: number, data: Partial<IUserType>): Promise<IUserType[]> => {
  const response = await userApi.patch<IUserType[]>(`/users/${id}`, data);
  return response.data
};

export const deleteUser = async (id: number): Promise<IUserType[]> => {
  const response = await userApi.delete<IUserType[]>(`/users/${id}`);
  return response.data
};