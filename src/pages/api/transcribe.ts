// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Deepgram } from "@deepgram/sdk";
import fs from 'fs'
import { PrerecordedTranscriptionResponse } from '@deepgram/sdk/dist/types';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrerecordedTranscriptionResponse['results']>
) {
  const form = formidable({});
  try {
    const [_, files] = await form.parse(req);

    if (!process.env.DEEPGRAM_API_KEY) {
      throw new Error('No Env Key')
    }
    const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

    const file = files?.file?.[0]
    const path = file?.filepath
    const name = file?.originalFilename

    if (!file || !path || !name) {
      throw new Error('Invalid File?')
    }

    const { results, err_code, err_msg } = await deepgram.transcription.preRecorded(
      {
        stream: fs.createReadStream(path),
        mimetype: 'audio/mpeg',
      },
      // TODO use a newer model? Do we need punctutate and utterances?
      { model: 'nova-2', punctuate: true, utterances: true, }
    );

    if (err_code) {
      throw new Error(err_msg ?? 'Something went wrong')
    }

    if (!results) {
      throw new Error('Invalid File?')
    }

    return res.status(200).json(results)
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Something went wrong' })
  }
}
