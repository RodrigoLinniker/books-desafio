import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function bookcomments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const bookId = req.query.id;

    try {
      const data = await prisma.Review.findMany({
        where: {
          bookId: String(bookId),
        },
        include: {
          User: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ statusCode: 500, message: error });
    }
  }
}
