// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFiles } from '../../lib/files';

export type Output = {
  filePath: string,
  coveragePath: string,
}

export type OutputResponse = {
  response: Output | null
}

export type ErrorResponse = {
  error: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutputResponse | ErrorResponse>
) {
  if (req.method === 'POST') {
    // Process a POST request
    const response = getFiles(req.body.folderPath, req.body.filePath); 
    if (response instanceof Error) {
      res.status(500).json({ error: response.message });
      return;
    }
    res.status(200).json({ response });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ response: null })
  }
}
