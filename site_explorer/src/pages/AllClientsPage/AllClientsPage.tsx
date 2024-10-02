import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import ClientList from '../../components/ClientList';
import { useFetchData } from '../../hooks/useFetchData';
import './AllClientsPage.css';

const AllClientsPage = () => {
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [limit] = useState(10); // Set pagination limit to 10 per page
  const { clients, sites, totalPages, loading, error } = useFetchData(
    page,
    limit,
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the current page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-clients-page">
      <h1>All Clients</h1>

      {/* Use ClientList component to display clients and their sites */}
      <ClientList clients={clients} sites={sites} />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllClientsPage;
