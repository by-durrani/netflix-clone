/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { FC } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  data: Record<string, any>;
}
const MovieCard: FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="group bg-zinc-900 col-span-1 relative h-[12vw]">
      <Image
        src={data.thumbnailUrl}
        alt={`thumbnail-${data.title}`}
        width={1000}
        height={1000}
        className="cursor-pointer border border-slate-700 object-fill transition duration shadow-xl
        rounded-xl group-hover:opacity-90 sm:group-hover:opacity-0 h-[12vw] w-full"
      />
      <div
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-100 w-full scale-0 group-hover:scale-110
        group-hover:-translate-y-[6vw]  group-hover:opacity-100"
      >
        <Image
          src={data?.thumbnailUrl}
          alt={`thumbnail-${data.title}`}
          width={1000}
          height={1000}
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row gap-3 items-center">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer size-6 lg:size-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-xs lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-xs lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
