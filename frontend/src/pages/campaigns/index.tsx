// frontend/pages/campaigns/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Campaign } from '../../types/campaign';
import Link from 'next/link';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Box, Alert } from '@mui/material';
import Navbar from '../Navbar';


const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Campaign[]>('http://localhost:3000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        setError('Error fetching campaigns');
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Navbar/>
      <Typography variant="h4" gutterBottom>
        Manage Campaigns
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Display Campaigns */}
      {!loading && !error && campaigns.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No ongoing campaigns found.
        </Typography>
      )}
      {!loading && !error && campaigns.length > 0 && (
        <List sx={{ mt: 4 }}>
          {campaigns.map((campaign) => (
            <ListItem key={campaign._id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItemText
                  primary={
                    <Link href={`/campaigns/${campaign._id}`} passHref>
                      <Typography variant="h6" color="primary" sx={{ textDecoration: 'none' }}>
                        {campaign.name}
                      </Typography>
                    </Link>
                  }
                  secondary={`Status: ${campaign.status}`}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      )}

    </Container>
  );
};

export default Campaigns;
