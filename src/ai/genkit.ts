
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// IMPORTANT: For production, it's highly recommended to use environment variables for API keys.
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_KEY = "AIzaSyBczYBnwEKfiGT5mKOAVD8KRR4eTbPnccA";

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
