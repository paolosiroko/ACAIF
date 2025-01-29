// frontend/pages/campaigns/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Campaign } from '../../types/campaign';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, CircularProgress, Alert, Paper, Box } from '@mui/material';
import Navbar from '../Navbar';

const CampaignDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCampaignDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Campaign>(`http://localhost:3000/api/campaigns/${id}`);
        setCampaign(response.data);
      } catch (error) {
        setError('Error fetching campaign details');
        console.error('Error fetching campaign details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  const handleSubmitContent = async () => {
    if (!submissionUrl.trim()) {
      alert('Please enter a submission URL.');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api//submissions`, {
        submissionUrl,
      });
      setSuccessMessage('Submission successful!');
      setSubmissionUrl('');
    } catch (error) {
      setError('Failed to submit content');
      console.error('Error submitting content:', error);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!campaign) return <Typography variant="h6" color="textSecondary">Campaign not found.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Navbar/>
      <Typography variant="h4" gutterBottom>
        Campaign Details: {campaign.name}
      </Typography>

      {/* Campaign Info in Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Attribute</strong></TableCell>
              <TableCell><strong>Details</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{campaign.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deadline</TableCell>
              <TableCell>{new Date(campaign.deadline).toLocaleDateString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submit Content */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6">Submit Your Post</Typography>
        <TextField
          label="Submission URL (e.g., TikTok post)"
          variant="outlined"
          fullWidth
          value={submissionUrl}
          onChange={(e) => setSubmissionUrl(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmitContent}
        >
          Submit
        </Button>
        {successMessage && <Typography color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}
      </Box>
    </Container>
  );
};

export default CampaignDetail;
