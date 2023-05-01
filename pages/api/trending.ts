import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function trending(req: NextApiRequest, res: NextApiResponse)  {
    await axios.all([
      axios.get(`${process.env.API_BASE}?q=subject:fiction&maxResults=7&key=${process.env.API_KEY}`),
      axios.get(`${process.env.API_BASE}?q=subject:Design&maxResults=7&key=${process.env.API_KEY}`),
    ]).then(axios.spread((response1, response2) => {
      res.status(200).json({listTrending : response1.data.items, listPopular: response2.data.items})
    }), error => {
      console.log(error);
    });
  }