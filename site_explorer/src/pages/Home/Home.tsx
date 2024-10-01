import { useState, useEffect } from 'react';
import { getClients, getSitesWithPagination } from '../../services/api';
import ClientList from '../../components/ClientList/ClientList';
import ListView from '../../components/ListView';
import ClientDropdown from '../../components/ClientDropdown';
import Pagination from '../../components/Pagination';
import { Client } from '../../types/Client';
import { Site } from '../../types/Site';
import './Home.css';

const Home = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'client' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
  const [limit] = useState(10); // Set pagination limit to 10 per page

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
        setTotalPages(totalPages); // Set the total pages from the API response
        setLoading(false);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  // Handle fetching sites for a specific client
  useEffect(() => {
    const fetchSitesForClient = async () => {
      if (!selectedClientId) return; // Skip if no client is selected
      try {
        setLoading(true);
        const { data: sitesData } = await getSitesWithPagination(page, limit);
        setSites(
          sitesData.filter((site: Site) => site.clientId === selectedClientId),
        );
        setLoading(false);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        );
        setLoading(false);
      }
    };

    if (viewMode === 'client') {
      fetchSitesForClient();
    }
  }, [selectedClientId, page, limit, viewMode]);

  const handleViewModeChange = (mode: 'all' | 'client') => {
    setViewMode(mode);
    setPage(1); // Reset to page 1 when switching views
  };

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClientId(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the current page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <h1>Client Sites Portal</h1>

      {/* View mode selection */}
      <div className="view-selection">
        <button onClick={() => handleViewModeChange('all')}>
          View All Sites
        </button>
        <button onClick={() => handleViewModeChange('client')}>
          Filter by Client
        </button>
      </div>

      {/* View all sites with pagination */}
      {viewMode === 'all' && (
        <>
          <ListView sites={sites} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Filter by client */}
      {viewMode === 'client' && (
        <>
          <ClientDropdown
            clients={clients}
            selectedClientId={selectedClientId}
            handleClientChange={handleClientChange}
          />
          {selectedClientId && sites.length > 0 && (
            <ListView
              sites={sites.filter((site) => site.clientId === selectedClientId)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
