import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function book(req: NextApiRequest, res: NextApiResponse) {
  await axios
    .get(`${process.env.API_BASE}/${req.query.id}?key=${process.env.API_KEY}`)
    .then(
      (response) => {
        res.status(200).json(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
}
