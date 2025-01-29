// frontend/pages/performance.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Influencer } from '../types/influencers'; // Adjust the import path based on your types
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, Paper,  List, ListItem, ListItemText } from '@mui/material';
import Navbar from './Navbar';


const Performance = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get<Influencer[]>('http://localhost:3000/api/influencers'); // Adjust the URL if needed
        setInfluencers(response.data);
      } catch (error) {
        console.error('Error fetching influencers:', error);
        setError('Failed to fetch influencers');
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Navbar/>
      <Typography variant="h4" gutterBottom>
        Influencer List
      </Typography>

      {/* Table displaying influencer data */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Total Posts</strong></TableCell>
              <TableCell><strong>Submissions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map(influencer => (
              <TableRow key={influencer._id}>
                <TableCell>{influencer.name}</TableCell>
                <TableCell>{influencer.email}</TableCell>
                <TableCell>{influencer.submissions.length}</TableCell>
                <TableCell>
                  <List>
                    {influencer.submissions.map((submission, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`Campaign ID: ${submission.campaignId}`}
                          secondary={`Submission URL: ${submission.submissionUrl} — Date: ${new Date(submission.date).toLocaleDateString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Performance;
