import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useFavorites = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/favorites",
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
