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
    await prismadb.movie.update({
      where: { id: "6876201b2e57f16459d4f204" },
      data: {
        thumbnailUrl:
          "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
      },
    });
    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
