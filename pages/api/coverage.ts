// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from '../../lib/files';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // Process a POST request
    const html = readFile(req.body.filePath); 
    if (html instanceof Error) {
      res.status(500).json({ error: html.message });
      return;
    }
    res.status(200).json({ response: html });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ response: null })
  }
}
