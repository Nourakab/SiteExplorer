import { useState } from 'react';
import ListView from '../../components/ListView';
import Pagination from '../../components/Pagination';
import { useFetchData } from '../../hooks/useFetchData';
import './AllSitesPage.css';

const AllSitesPage = () => {
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [limit] = useState(10); // Set pagination limit to 10 per page
  const { sites, totalPages, loading, error } = useFetchData(page, limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the current page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-sites-container">
      <h1>All Sites</h1>

      {/* List all sites with pagination and sorting */}
      <ListView
        sites={sites}
        enableSorting={true} // Enable sorting
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllSitesPage;
