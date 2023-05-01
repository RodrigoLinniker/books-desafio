import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function searchbooks(req: NextApiRequest, res: NextApiResponse)  {
    await axios.get(`${process.env.API_BASE}?q=${req.query.q}&key=${process.env.API_KEY}`).then(response => {
      res.status(200).json({items : response.data.items})
    }, error => {
      console.log(error);
    });
  }