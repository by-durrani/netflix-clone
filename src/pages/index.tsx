import { InferGetServerSidePropsType, NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import Billboard from "@/components/Billboard";
import { useMovieList } from "@/hooks/useMovieList";
import { useFavorites } from "@/hooks/useFavourites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
      },
    },
  };
}

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={user} />
      <Billboard />
      <div className="pb-40 select-none">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favorites} title="My List" />
      </div>
    </>
  );
}
