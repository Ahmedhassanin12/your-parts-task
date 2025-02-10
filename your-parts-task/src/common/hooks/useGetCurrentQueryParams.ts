import { useSearchParams } from "next/navigation";

export function useGetCurrentQueryParams() {
  const queryParams = useSearchParams();

  return new URLSearchParams(Array.from(queryParams.entries())).toString();
}