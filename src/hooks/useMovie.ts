import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useMovie = (id?: string) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
