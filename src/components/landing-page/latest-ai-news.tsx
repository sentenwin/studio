
// IMPORTANT: This component uses placeholder data for news.
// To fetch real news:
// 1. Install 'rss-parser': `npm install rss-parser` or `yarn add rss-parser`
// 2. Uncomment the 'rss-parser' import below.
// 3. Uncomment the try-catch block within the `fetchNews` function.
// 4. Replace `RSS_FEED_URL` with your desired RSS feed if different from the example.

import type Parser from 'rss-parser'; // Step 2: Uncomment this
import type { FC } from 'react';
import NewsCard from './news-card';

// Placeholder for actual RSS feed URL - TechCrunch AI feed is a good example
const RSS_FEED_URL = 'https://techcrunch.com/category/artificial-intelligence/feed/';

interface NewsItem {
  title: string;
  link: string;
  isoDate?: string;
  contentSnippet?: string;
  creator?: string; // Can be author or publication name from the feed
}

async function fetchNews(): Promise<NewsItem[]> {
  // Step 3: Uncomment this try-catch block and remove the placeholder return below
  
  try {
    const parser = new (await import('rss-parser')).default();
    const feed = await parser.parseURL(RSS_FEED_URL);
    return feed.items.slice(0, 5).map(item => ({
      title: item.title || 'No Title Available',
      link: item.link || '#',
      isoDate: item.isoDate,
      contentSnippet: item.contentSnippet || 'No description available.',
      // Attempt to get a source name, might need adjustment based on feed structure
      creator: item.creator || (feed.title ? feed.title.replace(/TechCrunch » AI\s*$/, 'TechCrunch').trim() : 'Unknown Source'),
    }));
  } catch (error) {
    console.error("Failed to fetch or parse RSS feed:", error);
    // Log a warning to the console during development/build if fetching fails
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`
        **************************************************************************************
        *** AI NEWS SECTION: Failed to fetch live news.                                    ***
        *** Ensure the RSS feed URL is correct and accessible. Falling back to placeholders. ***
        *** Error: ${error instanceof Error ? error.message : String(error)}              ***
        **************************************************************************************
      `);
    }
    // Fallback to placeholder data on error
    return getPlaceholderNews();
  }
  
}

function getPlaceholderNews(): NewsItem[] {
  return [
    { title: 'AI Breakthrough: Models Learn Faster Than Ever Before', link: '#', isoDate: new Date().toISOString(), contentSnippet: 'Researchers have just announced a novel training methodology that significantly accelerates AI model learning capabilities, which could potentially revolutionize multiple industries across the globe.', creator: 'AI News Today' },
    { title: 'The Complex Ethics of AI in Creative Arts Explored in New Study', link: '#', isoDate: new Date(Date.now() - 86400000).toISOString(), contentSnippet: 'A comprehensive new report delves into the multifaceted ethical considerations surrounding the rapidly increasing use of artificial intelligence in fields like music, visual arts, and literature.', creator: 'Tech Chronicle' },
    { title: 'Top 5 Must-Have AI Tools for Developers in 2024', link: '#', isoDate: new Date(Date.now() - 172800000).toISOString(), contentSnippet: 'Discover the most impactful and innovative AI-powered tools that are currently empowering developers to build smarter, more efficient applications.', creator: 'Dev Weekly Digest' },
    { title: 'How Artificial Intelligence is Radically Transforming Healthcare Diagnostics', link: '#', isoDate: new Date(Date.now() - 259200000).toISOString(), contentSnippet: 'From advanced medical image analysis to sophisticated predictive modeling, AI is making significant strides in improving the accuracy and speed of medical diagnostics worldwide.', creator: 'Future Health Insights' },
    { title: 'Generative AI: Separating Hype from Reality for Modern Businesses', link: '#', isoDate: new Date(Date.now() - 345600000).toISOString(), contentSnippet: 'Industry experts weigh in on the practical applications, potential benefits, and common pitfalls of implementing generative AI technologies for businesses of all sizes.', creator: 'Enterprise AI Journal' },
  ].slice(0, 5);
}


const LatestAiNews: FC = async () => {
  const newsItems = await fetchNews();

  return (
    <section id="ai-news" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            📰 Latest AI News
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Stay updated with the most recent developments and insights in the world of Artificial Intelligence.
          </p>
        </div>
        {newsItems && newsItems.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((item) => (
              <NewsCard
                key={item.link + item.title} // Prefer unique ID from feed if available, otherwise combine link and title
                title={item.title}
                link={item.link}
                description={item.contentSnippet}
                pubDate={item.isoDate}
                sourceName={item.creator}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-foreground/70 mb-2">
              Could not load AI news at this time. 
            </p>
            <p className="text-sm text-muted-foreground">
              Please check back later or ensure news fetching is correctly configured if you are a developer.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestAiNews;
