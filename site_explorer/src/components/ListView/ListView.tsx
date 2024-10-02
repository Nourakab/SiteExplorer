import React, { useState } from 'react';
import SortControl from '../SortControl';
import { useSort } from '../../hooks/useSort';
import { Link } from 'react-router-dom';
import { Site } from '../../types/Site'; // Import Site type
import './ListView.css';

interface ListViewProps {
  sites: Site[];
  enableSorting: boolean; // prop to control sorting
}

const ListView = ({ sites, enableSorting }: ListViewProps) => {
  const { sortedItems, selectedField, order, handleSortChange } = useSort(
    sites,
    'title', // Default sorting by title
    'asc', // Default ascending order
  );

  // Use sortedItems if sorting is enabled, otherwise just use sites directly
  const itemsToRender = enableSorting ? sortedItems : sites;

  return (
    <div>
      {enableSorting && (
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
      )}
      <ul className="list-view">
        {itemsToRender.map((site) => (
          <li key={site.id} className="list-view-item">
            {/* Link to the details view with the site id */}
            <Link to={`/details/${site.id}`}>
              <div className="site-info">
                <h3>{site.title}</h3>
                <img
                  src={site.images[0]}
                  alt={site.title}
                  className="site-image"
                />
                <p>
                  {site.address.street}, {site.address.city},{' '}
                  {site.address.country}
                </p>
                <p>
                  Contact: {site.contacts.main.firstName}{' '}
                  {site.contacts.main.lastName}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
