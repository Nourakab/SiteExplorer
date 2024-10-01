import React from 'react';
import { Link } from 'react-router-dom';
import { Site } from '../../types/Site'; // Import Site type
import './ListView.css';

interface ListViewProps {
  sites: Site[];
}

const ListView = ({ sites }: ListViewProps) => {
  return (
    <ul className="list-view">
      {sites.map((site) => (
        <li key={site.id} className="list-view-item">
          {/* Link to the details view with the site id */}
          <Link to={`/details/${site.id}`}>
            <img src={site.images[0]} alt={site.title} className="site-image" />
            <div className="site-info">
              <h3>{site.title}</h3>
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
  );
};

export default ListView;
