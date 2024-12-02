import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

// Mock data for active coupons
const mockActiveCoupons = [
  {
    id: 1,
    brand: 'Fashion Nova',
    code: 'SUMMER2024',
    discount: '25%',
    activatedDate: '2024-01-15',
    deadline: '2024-01-17',
    status: 'pending_content',
    requirements: {
      instagram: true,
      tiktok: true,
      youtube: false,
    },
    contentSubmitted: false,
    redemptionCount: 45,
  },
  {
    id: 2,
    brand: 'BeautyGlow',
    code: 'GLOW50',
    discount: '$50',
    activatedDate: '2024-01-14',
    deadline: '2024-01-16',
    status: 'content_submitted',
    requirements: {
      instagram: true,
      tiktok: false,
      youtube: false,
    },
    contentSubmitted: true,
    redemptionCount: 128,
  },
  {
    id: 3,
    brand: 'FitLife',
    code: 'FIT2024',
    discount: '30%',
    activatedDate: '2024-01-13',
    deadline: '2024-01-15',
    status: 'expired',
    requirements: {
      instagram: false,
      tiktok: false,
      youtube: true,
    },
    contentSubmitted: false,
    redemptionCount: 0,
  },
];

const statusColors = {
  pending_content: 'warning',
  content_submitted: 'info',
  approved: 'success',
  expired: 'error',
};

const statusLabels = {
  pending_content: 'Pending Content',
  content_submitted: 'Under Review',
  approved: 'Approved',
  expired: 'Expired',
};

const RedemptionTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [uploadDialog, setUploadDialog] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleUpload = (coupon) => {
    setSelectedCoupon(coupon);
    setUploadDialog(true);
  };

  const handleUploadSubmit = () => {
    // TODO: Implement actual content upload logic
    setUploadDialog(false);
    // You would typically make an API call here
  };

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;
    
    if (diff < 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getProgressValue = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const activatedDate = new Date(deadlineDate);
    activatedDate.setHours(activatedDate.getHours() - 48); // 48 hours before deadline
    
    const total = deadlineDate - activatedDate;
    const elapsed = now - activatedDate;
    
    if (elapsed < 0) return 0;
    if (elapsed > total) return 100;
    
    return (elapsed / total) * 100;
  };

  const filteredCoupons = mockActiveCoupons.filter((coupon) => {
    const matchesSearch = coupon.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Redemption Tracking
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            value={statusFilter}
            onChange={handleStatusFilter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending_content">Pending Content</MenuItem>
            <MenuItem value="content_submitted">Under Review</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Active Coupons */}
      <Grid container spacing={3}>
        {filteredCoupons.map((coupon) => (
          <Grid item xs={12} md={6} key={coupon.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {coupon.brand}
                  </Typography>
                  <Chip
                    label={statusLabels[coupon.status]}
                    color={statusColors[coupon.status]}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Code: {coupon.code}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Discount: {coupon.discount}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Time Remaining:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimeIcon color={coupon.status === 'expired' ? 'error' : 'action'} sx={{ mr: 1 }} />
                    <Typography>
                      {getTimeRemaining(coupon.deadline)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue(coupon.deadline)}
                    sx={{ mt: 1 }}
                    color={coupon.status === 'expired' ? 'error' : 'primary'}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Required Content:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {coupon.requirements.instagram && (
                      <Chip
                        size="small"
                        label="Instagram"
                        icon={coupon.contentSubmitted ? <CheckIcon /> : <WarningIcon />}
                        color={coupon.contentSubmitted ? 'success' : 'warning'}
                      />
                    )}
                    {coupon.requirements.tiktok && (
                      <Chip
                        size="small"
                        label="TikTok"
                        icon={coupon.contentSubmitted ? <CheckIcon /> : <WarningIcon />}
                        color={coupon.contentSubmitted ? 'success' : 'warning'}
                      />
                    )}
                    {coupon.requirements.youtube && (
                      <Chip
                        size="small"
                        label="YouTube"
                        icon={coupon.contentSubmitted ? <CheckIcon /> : <WarningIcon />}
                        color={coupon.contentSubmitted ? 'success' : 'warning'}
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Redemptions: {coupon.redemptionCount}
                  </Typography>
                  {coupon.status === 'pending_content' && (
                    <Button
                      variant="contained"
                      startIcon={<UploadIcon />}
                      onClick={() => handleUpload(coupon)}
                    >
                      Upload Content
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Content</DialogTitle>
        <DialogContent>
          {selectedCoupon && (
            <>
              <DialogContentText sx={{ mb: 2 }}>
                Please provide links to your content for {selectedCoupon.brand} coupon ({selectedCoupon.code}).
                Make sure your content follows the brand's guidelines.
              </DialogContentText>
              
              {selectedCoupon.requirements.instagram && (
                <TextField
                  fullWidth
                  label="Instagram Post URL"
                  placeholder="https://instagram.com/p/..."
                  sx={{ mb: 2 }}
                />
              )}
              
              {selectedCoupon.requirements.tiktok && (
                <TextField
                  fullWidth
                  label="TikTok Video URL"
                  placeholder="https://tiktok.com/@..."
                  sx={{ mb: 2 }}
                />
              )}
              
              {selectedCoupon.requirements.youtube && (
                <TextField
                  fullWidth
                  label="YouTube Video URL"
                  placeholder="https://youtube.com/watch?v=..."
                  sx={{ mb: 2 }}
                />
              )}
              
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Additional Notes"
                placeholder="Add any additional information about your content..."
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button onClick={handleUploadSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RedemptionTracking;
