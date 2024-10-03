import React, { useEffect } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { usePagination } from '../../hooks/usePagination';
import { useFilters } from '../../hooks/useFilters';
import { useSort } from '../../hooks/useSort'; // Import sorting hook
import ListView from '../../components/ListView';
import Pagination from '../../components/Pagination';
import FilterControl from '../../components/FilterControl';
import SortControl from '../../components/SortControl'; // Import sorting control
import { useExtractTags } from '../../hooks/ useExtractTags';
import { useExtractCountries } from '../../hooks/useExtractCountries';
import './AllSitesPage.css';

const AllSitesPage: React.FC = () => {
  const { page, itemsPerPage, paginatedData, handlePageChange } = usePagination(
    1,
    10,
  );
  const { sites, allSites, loading, error } = useFetchData(page, itemsPerPage);
  const { filters, setFilters, filteredSites } = useFilters(allSites, loading);
  const allTags = useExtractTags(allSites);
  const allCountries = useExtractCountries(allSites);

  // Sorting logic
  const { sortedItems, selectedField, order, handleSortChange } = useSort(
    filteredSites,
    'title', // Default sort field
    'asc', // Default order
  );

  useEffect(() => {
    if (!loading) {
      setFilters({ ...filters }); // Initialize with current filters
    }
  }, [loading, allSites]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-sites-page">
      <h1>All Sites</h1>

      <div className="all-sites-container">
        <div className="filter-sort-header">
          {/* Filter button */}
          <FilterControl
            allTags={allTags}
            allCountries={allCountries}
            onFilterChange={setFilters} // Update filters with user selection
          />

          <SortControl
            fields={[
              { label: 'Title', value: 'title' },
              { label: 'Created At', value: 'createdAt' },
              { label: 'Updated At', value: 'updatedAt' },
            ]}
            selectedField={selectedField}
            order={order}
            onSortChange={handleSortChange}
          />
        </div>

        {/* List and pagination */}
        <div className="list-section">
          <ListView sites={paginatedData(sortedItems)} />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(sortedItems.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllSitesPage;
