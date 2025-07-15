import { serverAuth } from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // 405 for unAuthenticated request
  }

  try {
    await serverAuth(req);
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const [randomMovie] = await prismadb.movie.findMany({
      take: 1, // This is similar to limit in sql
      skip: randomIndex, // This is similar to offset in sql
    });

    return res.status(200).json(randomMovie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
