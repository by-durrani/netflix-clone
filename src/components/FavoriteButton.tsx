/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFavorites } from "@/hooks/useFavourites";
import axios from "axios";
import React, { FC, useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list: any[] = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [movieId, currentUser]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: { movieId },
        withCredentials: true,
      });
    } else {
      response = await axios.post(
        "/api/favorite",
        { movieId },
        { withCredentials: true }
      );
    }
    const updatedFavorites = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavorites,
    });

    mutateFavorites();
  }, [movieId, currentUser, mutate, mutateFavorites, isFavorite]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer size-6 lg:size-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
