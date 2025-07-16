import { useMovie } from "@/hooks/useMovie";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { authOptions } from "../api/auth/[...nextauth]";
import { NextPageContext } from "next";

export async function getServerSideProps({ req, res }: NextPageContext) {
  const session = await getServerSession(req, res, authOptionsptions);

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

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          size={40}
          className="text-white cursor-pointer"
          onClick={() => router.push("/")}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light pr-2">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video src={data?.videoUrl} autoPlay controls className="h-full w-full" />
    </div>
  );
};

export default Watch;
