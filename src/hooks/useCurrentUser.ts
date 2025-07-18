import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "/api/current",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
