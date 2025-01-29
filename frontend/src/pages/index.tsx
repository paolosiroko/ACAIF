import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Navbar from './Navbar';  // Import Navbar component

export default function Page() {
  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="#f5f5f5">
      {/* Navbar at the top */}
      <Navbar />

      {/* Content Area */}
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" paragraph sx={{ color: 'gray.700' }}>
          Manage your marketing campaigns effectively.
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Link href="/campaigns" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', py: 1 }}
            >
              View Campaigns
            </Button>
          </Link>
          <Link href="/performance" passHref>
            <Button
              variant="contained"
              color="success"
              sx={{ width: '200px', py: 1 }}
            >
              View Influencers
            </Button>
          </Link>
          <Link href="/approval" passHref>
            <Button
              variant="contained"
              color="warning"
              sx={{ width: '200px', py: 1 }}
            >
              Approve Submissions
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
