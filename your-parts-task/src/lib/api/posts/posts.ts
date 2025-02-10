import api from "@/axios_instance";
import { isAxiosError, type AxiosResponse } from "axios";

export type IPostType = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export type ErrorInfoType = {
  errorMessage: string;
  errorResponse: AxiosResponse | undefined;
};

export type FeaturesResponseType<T> = [T | null, ErrorInfoType | null];

export const getErrorInfo = (error: unknown): ErrorInfoType => {
  if (typeof error === "string") {
    return { errorMessage: error, errorResponse: undefined };
  }
  const errorResponse =
    typeof window !== "undefined" && isAxiosError(error)
      ? error?.response
      : undefined;
  if (isAxiosError(error) && error?.response?.data?.errorMessage) {
    return {
      errorMessage: error?.response?.data?.errorMessage,
      errorResponse: errorResponse,
    };
  }

  if (isAxiosError(error) && error?.response?.data?.message) {
    if (Array.isArray(error?.response?.data?.message)) {
      return {
        errorMessage: error?.response?.data?.message
          ?.filter((message: unknown) => typeof message === "string")
          .join(", "),
        errorResponse: errorResponse,
      };
    }
    if (typeof error?.response?.data?.message === "string") {
      return {
        errorMessage: error?.response?.data?.message,
        errorResponse: errorResponse,
      };
    }

    return {
      errorMessage: "Something went wrong. Please try again later.",
      errorResponse: errorResponse,
    };
  }
  return {
    errorMessage: "Something went wrong. Please try again later.",
    errorResponse: errorResponse,
  };
};

export const getPosts = async (pageNumber: number): Promise<IPostType[]> => {

  const response = await api.get<IPostType[]>(`/posts?_limit=10&_page=${pageNumber}`,);
  return response.data

};