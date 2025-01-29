import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <Box
      sx={{
        bgcolor: 'green.100',
        p: 2,
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green.700' }}>
        Welcome to TrendAI
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Link href="/campaigns" passHref>
          <Button variant="text" sx={{ color: 'gray.700', '&:hover': { color: 'green.600' } }}>
            📢 Campaigns
          </Button>
        </Link>
        <Link href="/performance" passHref>
          <Button variant="text" sx={{ color: 'gray.700', '&:hover': { color: 'green.600' } }}>
            🌟 Influencers
          </Button>
        </Link>
        <Link href="/approval" passHref>
          <Button variant="text" sx={{ color: 'gray.700', '&:hover': { color: 'green.600' } }}>
            ✅ Approvals
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
