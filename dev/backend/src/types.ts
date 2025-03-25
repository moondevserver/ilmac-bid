// Notice Types
export type Notice = {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
  status: "NEW" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
};

// Scraping Types
export type ScrapingSite = {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  lastScrapedAt: Date;
  scrapingConfig: ScrapingConfig;
};

export type ScrapingConfig = {
  selectors: {
    list: string;
    title: string;
    content: string;
    date: string;
  };
  pagination?: {
    selector: string;
    type: "CLICK" | "URL";
    pattern?: string;
  };
};

// Settings Types
export type Settings = {
  id: string;
  key: string;
  value: string;
  description: string;
};

// API Response Types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
