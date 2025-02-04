## Needed Env Variables

The application uses deepgram for audio transcription:

Create a `.env` file in the root directory and add this ENV var: `DEEPGRAM_API_KEY`
This value will need to be a valid deepgram API key, instructions for getting one are here: https://developers.deepgram.com/docs/make-your-first-api-request

You should get $200 worth of credit for free when you sign up for a new deepgram account

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
