import { useState, useEffect } from 'react';
import { getClients, getSitesWithPagination } from '../../services/api';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [totalSites, setTotalSites] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [recentSites, setRecentSites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientsData = await getClients();
      const { data: sitesData } = await getSitesWithPagination(1, 5); // Fetch the first 5 recent sites
      setTotalClients(clientsData.length);
      setTotalSites(sitesData.length); // Assuming the total is available in the response
      setRecentSites(sitesData);
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Client Sites Portal</h1>

      {/* Key Metrics Section */}
      <div className="metrics">
        <div className="metric-item">
          <h3>Total Sites</h3>
          <p>{totalSites}</p>
        </div>
        <div className="metric-item">
          <h3>Total Clients</h3>
          <p>{totalClients}</p>
        </div>
      </div>

      {/* Recent Sites Section */}
      <div className="recent-sites">
        <h2>Recently Added Sites</h2>
        <ul>
          {recentSites.map((site) => (
            <li key={site.id}>
              {site.title} - {new Date(site.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/sites">
          <button>View All Sites</button>
        </Link>
        <Link to="/clients">
          <button>Filter Sites by Client</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
