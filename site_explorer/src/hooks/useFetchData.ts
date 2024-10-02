import { useState, useEffect } from 'react';
import { getClients, getSitesWithPagination } from '../services/api';
import { Client } from '../types/Client';
import { Site } from '../types/Site';

export function useFetchData(page: number, limit: number) {
  const [clients, setClients] = useState<Client[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientsData = await getClients();
        const { data: sitesData, totalPages } = await getSitesWithPagination(
          page,
          limit,
        );
        setClients(clientsData);
        setSites(sitesData);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? 'There was an issue loading the data. Please try again.'
            : 'An unexpected error occurred.',
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { clients, sites, totalPages, loading, error };
}
