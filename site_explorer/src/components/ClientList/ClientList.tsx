import React from 'react';
import { Client } from '../../types/Client'; // Import Client type
import { Site } from '../../types/Site'; // Import Site type
import ListView from '../ListView/ListView'; // Import ListView to display sites

interface ClientListProps {
  clients: Client[];
  sites: Site[];
}

/*This component will receive an array of clients and an array of sites. 
It will then filter the sites based on their clientId and display them under the corresponding client. */

const ClientList = ({ clients, sites }: ClientListProps) => {
  return (
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
  );
};

export default ClientList;
