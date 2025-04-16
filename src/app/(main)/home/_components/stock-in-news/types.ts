export interface NSEFeed {
  title: string;
  link: string;
  description: string;
  language: string;
  lastBuildDate: string;
  items: NSEFeedItem[];
}

export interface NewsItemProps {
  title: string;
  description?: string;
  link?: string;
  category?: string;
}

export interface NSEFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  company: string;
  category?: string;
}
