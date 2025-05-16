
import type { FC } from 'react';
// import Parser from 'rss-parser'; // Uncomment to use live RSS feed
import NewsCard, { type NewsItem } from './news-card';

// const RSS_FEED_URL = 'https://techcrunch.com/category/artificial-intelligence/feed/'; // Example feed

// Helper function for placeholder data
const getPlaceholderNews = (): NewsItem[] => [
  {
    title: 'AI Breakthrough: Neural Network Achieves Human-Level Text Generation',
    link: '#',
    pubDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    creator: 'Tech AI Today',
    contentSnippet: 'A new deep learning model has demonstrated unprecedented capabilities in generating coherent and contextually relevant text, rivaling human performance in several benchmarks...',
    isoDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    sourceName: 'Tech AI Today',
    imageUrl: 'https://placehold.co/600x338.png?text=AI+Breakthrough',
  },
  {
    title: 'The Ethics of AI in Creative Arts: A Growing Debate',
    link: '#',
    pubDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    creator: 'Future Forward AI',
    contentSnippet: 'As AI tools become more sophisticated in creating art, music, and literature, questions about authorship, copyright, and the role of human creativity are intensifying...',
    isoDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    sourceName: 'Future Forward AI',
    imageUrl: 'https://placehold.co/600x338.png?text=AI+Ethics',
  },
  {
    title: 'Investment in AI Startups Reaches Record High in Q3',
    link: '#',
    pubDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    creator: 'Global Tech Insights',
    contentSnippet: 'Venture capital funding for artificial intelligence startups surged in the third quarter, signaling strong investor confidence in the future of AI-driven innovation...',
    isoDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    sourceName: 'Global Tech Insights',
    imageUrl: 'https://placehold.co/600x338.png?text=AI+Investment',
  },
  {
    title: 'New AI Powered Diagnostic Tool Approved for Medical Use',
    link: '#',
    pubDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    creator: 'HealthTech Reporter',
    contentSnippet: 'Regulators have approved a novel AI-based system that can detect early signs of certain diseases with remarkable accuracy, promising to revolutionize patient care...',
    isoDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    sourceName: 'HealthTech Reporter',
    imageUrl: 'https://placehold.co/600x338.png?text=AI+Medical',
  },
  {
    title: 'How AI is Transforming the Agricultural Sector',
    link: '#',
    pubDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    creator: 'AgriTech Now',
    contentSnippet: 'From precision farming to automated crop monitoring, artificial intelligence is playing an increasingly vital role in boosting efficiency and sustainability in agriculture...',
    isoDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    sourceName: 'AgriTech Now',
    imageUrl: 'https://placehold.co/600x338.png?text=AI+Agriculture',
  },
];

async function fetchNews(): Promise<NewsItem[]> {
  // console.warn(
  //   "LatestAiNews: Using placeholder data. To fetch live news, install 'rss-parser' and uncomment the fetching logic."
  // );
  return getPlaceholderNews(); // Using placeholder data by default

  /*
  // Uncomment this block to use live RSS feed fetching:
  // 1. Ensure 'rss-parser' is installed: npm install rss-parser
  // 2. Uncomment the 'import Parser from "rss-parser";' line above.

  const parser = new Parser({
    customFields: {
      item: [['media:content', 'mediaContent', { keepArray: false }]],
    },
  });
  try {
    const feed = await parser.parseURL(RSS_FEED_URL);
    return feed.items.slice(0, 5).map(item => {
      let imageUrl;
      if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
        imageUrl = item.mediaContent.$.url;
      } else if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
        imageUrl = item.enclosure.url;
      }

      return {
        title: item.title || 'No title',
        link: item.link || '#',
        pubDate: item.pubDate,
        creator: item.creator || item.author || feed.title || 'Unknown Source',
        contentSnippet: item.contentSnippet || item.content?.substring(0, 150) || 'No description available.',
        isoDate: item.isoDate,
        sourceName: feed.title || 'Unknown Source',
        imageUrl: imageUrl || `https://placehold.co/600x338.png?text=${encodeURIComponent(item.title?.substring(0,15) || "News")}`,
      };
    });
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    return getPlaceholderNews(); // Fallback to placeholder data on error
  }
  */
}


const LatestAiNews: FC = async () => {
  const newsItems = await fetchNews();

  return (
    <section id="ai-news" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            📰 Latest AI News
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Stay updated with the most recent developments and insights in the world of Artificial Intelligence.
          </p>
        </div>
        {newsItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((item, index) => (
              <NewsCard key={item.link && item.link !== "#" ? item.link : `news-item-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">
            Could not fetch news at the moment. Please check back later.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestAiNews;
