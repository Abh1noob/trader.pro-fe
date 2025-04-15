export type SearchResult = {
  _id: string;
  short_name: string;
  company_name: string;
  exchange_code: string;
};

export type SearchResponse = {
  results: SearchResult[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type NavLink = {
  href: string;
  label: string;
  isActive?: boolean;
};

export type NavigationLinksProps = {
  links: NavLink[];
  isMobile?: boolean;
};
