
'use server';
/**
 * @fileOverview A flow to search for quick open tools.
 *
 * - searchQuickTools - A function that searches tools based on a query.
 * - SearchQuickToolsInput - The input type for the searchQuickTools function.
 * - SearchQuickToolsOutput - The return type for the searchQuickTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit'; // Changed from 'zod'
import { placeholderQuickTools, type QuickTool } from '@/lib/placeholder-data';

// Define input schema - NOT EXPORTED
const SearchQuickToolsInputSchema = z.object({
  query: z.string().describe('The search query for tools.'),
});
export type SearchQuickToolsInput = z.infer<typeof SearchQuickToolsInputSchema>;

// Define output schema based on the QuickTool interface - NOT EXPORTED
const SearchQuickToolsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    weblink: z.string(),
    tags: z.array(z.string()),
    dataAiHint: z.string().optional(),
  })
).describe('A list of matching tools, or an empty list if no tools match.');
export type SearchQuickToolsOutput = z.infer<typeof SearchQuickToolsOutputSchema>;


// Exported wrapper function
export async function searchQuickTools(input: SearchQuickToolsInput): Promise<SearchQuickToolsOutput> {
  return searchQuickToolsFlow(input);
}

const searchQuickToolsFlow = ai.defineFlow(
  {
    name: 'searchQuickToolsFlow',
    inputSchema: SearchQuickToolsInputSchema, // Use internal schema
    outputSchema: SearchQuickToolsOutputSchema, // Use internal schema
  },
  async (input) => {
    const { query } = input;
    const lowerCaseQuery = query.toLowerCase();
    console.log('[searchQuickToolsFlow] Received query:', query, 'Lowercase:', lowerCaseQuery);
    console.log('[searchQuickToolsFlow] Searching in tools count:', placeholderQuickTools.length);
    // console.log('[searchQuickToolsFlow] Tools data:', JSON.stringify(placeholderQuickTools.map(t => t.name)));


    if (!query.trim()) {
      console.log('[searchQuickToolsFlow] Query is blank, returning empty.');
      return []; // Return empty if query is blank
    }

    // Simplified text-based search.
    // A full RAG implementation would use vector embeddings and a vector store.
    const results = placeholderQuickTools.filter(tool =>
      tool.name.toLowerCase().includes(lowerCaseQuery) ||
      tool.description.toLowerCase().includes(lowerCaseQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    console.log('[searchQuickToolsFlow] Found results count:', results.length);
    if (results.length > 0) {
      // console.log('[searchQuickToolsFlow] Matched tools:', results.map(r => r.name));
    }
    
    const slicedResults = results.slice(0, 3);
    console.log('[searchQuickToolsFlow] Returning sliced results count:', slicedResults.length);
    return slicedResults;
  }
);

