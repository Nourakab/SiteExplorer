//The DetailsView component will show detailed information for a single site.

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSiteDetails } from '../../services/api';
import { Site } from '../../types/Site';

const DetailsView = () => {
  const { id } = useParams<{ id: string }>(); // Explicitly define id as string in useParams
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Check if id exists
      const fetchSiteDetails = async () => {
        try {
          const data = await getSiteDetails(id); // Fetch site details using the API
          setSite(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Failed to load site details');
          setLoading(false);
        }
      };

      fetchSiteDetails();
    } else {
      setError('No site ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="details-view">
      <img src={site?.images[0]} alt={site?.title} className="details-image" />
      <h1>{site?.title}</h1>
      <p>
        {site?.address.street}, {site?.address.city}, {site?.address.country}
      </p>

      <div className="contact-info">
        <p>
          Contact: {site?.contacts.main.firstName}{' '}
          {site?.contacts.main.lastName}
        </p>
        <p>Job Title: {site?.contacts.main.jobTitle}</p>
        <p>Phone: {site?.contacts.main.phoneNumber}</p>
        <p>Email: {site?.contacts.main.email}</p>
      </div>
    </div>
  );
};

export default DetailsView;
