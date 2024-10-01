const API_BASE_URL = 'https://tracktik-challenge.staffr.com';

// Fetch all sites with optional pagination, sorting, and link headers
export const getSitesWithPagination = async (
  page = 1,
  limit = 10,
  sort = 'createdAt',
  order = 'asc',
) => {
  const response = await fetch(
    `${API_BASE_URL}/sites?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&_expand=client`,
  );

  if (!response.ok) throw new Error('Failed to fetch sites');

  // Get Link header from response for pagination links (first, prev, next, last)
  const linkHeader = response.headers.get('Link');
  const paginationLinks = parseLinkHeader(linkHeader);

  const data = await response.json();
  return { data, paginationLinks };
};

// Helper function to parse the Link header
const parseLinkHeader = (header: string | null) => {
  if (!header) return {};

  const links: { [key: string]: string } = {};
  const parts = header.split(',');

  parts.forEach((part) => {
    const section = part.split(';');
    if (section.length === 2) {
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    }
  });

  return links;
};

// Fetch site details by ID
export const getSiteDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/sites/${id}`);
  if (!response.ok) throw new Error('Failed to fetch site details');
  return response.json();
};

// Fetch all clients with pagination and sorting
export const getClients = async (
  page = 1,
  limit = 10,
  sort = 'createdAt',
  order = 'asc',
) => {
  const response = await fetch(
    `${API_BASE_URL}/clients?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  if (!response.ok) throw new Error('Failed to fetch clients');
  return response.json();
};
