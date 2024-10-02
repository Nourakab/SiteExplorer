import React from 'react';
import ListView from '../ListView/ListView'; // Import ListView to display sites
import SortControl from '../SortControl';
import { useSort } from '../../hooks/useSort';
import { Client } from '../../types/Client'; // Import Client type
import { Site } from '../../types/Site'; // Import Site type

interface ClientListProps {
  clients: Client[];
  sites: Site[];
}

/*This component will receive an array of clients and an array of sites. 
It will then filter the sites based on their clientId and display them under the corresponding client. */

const ClientList = ({ clients, sites }: ClientListProps) => {
  const { sortedItems, selectedField, order, handleSortChange } = useSort(
    clients,
    'givenName', // Default sorting by client name
    'asc', // Default ascending order
  );
  return (
    <div>
      <SortControl
        fields={[
          { label: 'Name', value: 'givenName' },
          { label: 'Created At', value: 'createdAt' },
          { label: 'Updated At', value: 'updatedAt' },
        ]}
        selectedField={selectedField}
        order={order}
        onSortChange={handleSortChange}
      />
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client.id} className="client-list-item">
            <h2>{client.givenName}</h2> {/* Display the client's name */}
            {/* Filter and display sites for the current client */}
            <ListView
              sites={sites.filter((site) => site.clientId === client.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
