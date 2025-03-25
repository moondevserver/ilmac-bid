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
};
