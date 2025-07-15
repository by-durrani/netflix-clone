import Image from "next/image";
import React, { FC } from "react";

interface MovieCardProps {
  data: Record<string, any>;
}
const MovieCard: FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span-1 relative h-[12vw]">
      <Image
        src={data.thumbnailUrl}
        alt={`thumbnail-${data.title}`}
        width={1000}
        height={1000}
        className="cursor-pointer object-contain transition duration shadow-xl rounded-xl group-hover:opacity-90 sm:group-hover:opacity-0 h-[12vw] w-full"
      />
    </div>
  );
};

export default MovieCard;
