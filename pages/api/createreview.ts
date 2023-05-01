import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

export default async function createreview(req: NextApiRequest, res: NextApiResponse)  {
    
    if (req.method === "POST") {
        const { bookId, userId, rating, comment  } = req.body;
        try{
            
        const existingReview = await prisma.review.findFirst({
                where: {
                  bookId,
                  userId,
                },
        })

        if(existingReview){
            return res.status(400).json({ error: 'Você já deixou um review para esse livro.' })
        }

        await prisma.review.create({
            data: {
                bookId, userId, rating, comment
            },
          });
    
        return res.status(200).json({ message: "Success" });
    
        } catch (error){
          console.error(error);
    
          return res.status(500).json({ statusCode: 500, message: error });
        }
      } 
}