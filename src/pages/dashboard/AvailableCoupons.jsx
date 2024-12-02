import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalOffer as CouponIcon,
  Info as InfoIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

// Mock data for available coupons
const mockCoupons = [
  {
    id: 1,
    brand: 'Fashion Nova',
    code: 'SUMMER2024',
    discount: 25,
    type: 'percentage',
    category: 'Fashion',
    description: 'Summer collection discount for fashion influencers',
    requirements: 'Must post on Instagram and TikTok',
    expiresIn: '30 days',
    minFollowers: 5000,
  },
  {
    id: 2,
    brand: 'BeautyGlow',
    code: 'GLOW50',
    discount: 50,
    type: 'fixed',
    category: 'Beauty',
    description: 'Premium beauty products discount',
    requirements: 'Instagram story and post required',
    expiresIn: '15 days',
    minFollowers: 10000,
  },
  {
    id: 3,
    brand: 'FitLife',
    code: 'FIT2024',
    discount: 30,
    type: 'percentage',
    category: 'Fitness',
    description: 'Exclusive discount on fitness equipment',
    requirements: 'YouTube video review required',
    expiresIn: '45 days',
    minFollowers: 8000,
  },
];

const categories = ['All', 'Fashion', 'Beauty', 'Fitness', 'Technology', 'Lifestyle'];

const AvailableCoupons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [activationDialog, setActivationDialog] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInfoClick = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenDialog(true);
  };

  const handleActivate = (coupon) => {
    setSelectedCoupon(coupon);
    setActivationDialog(true);
  };

  const handleActivationConfirm = () => {
    // TODO: Implement actual coupon activation logic
    setActivationDialog(false);
    // You would typically make an API call here
  };

  const filteredCoupons = mockCoupons.filter((coupon) => {
    const matchesSearch = coupon.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || coupon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Available Coupons
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
            value={selectedCategory}
            onChange={handleCategoryChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterIcon />
                </InputAdornment>
              ),
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Coupons Grid */}
      <Grid container spacing={3}>
        {filteredCoupons.map((coupon) => (
          <Grid item xs={12} sm={6} md={4} key={coupon.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" component="div">
                    {coupon.brand}
                  </Typography>
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => handleInfoClick(coupon)}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Chip
                  icon={<CouponIcon />}
                  label={coupon.category}
                  size="small"
                  sx={{ mt: 1, mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {coupon.description}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                  {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `$${coupon.discount} OFF`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expires in: {coupon.expiresIn}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleActivate(coupon)}
                >
                  Activate Coupon
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Coupon Details</DialogTitle>
        <DialogContent>
          {selectedCoupon && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedCoupon.brand} - {selectedCoupon.code}
              </Typography>
              <DialogContentText>
                <strong>Description:</strong> {selectedCoupon.description}
              </DialogContentText>
              <DialogContentText>
                <strong>Requirements:</strong> {selectedCoupon.requirements}
              </DialogContentText>
              <DialogContentText>
                <strong>Minimum Followers:</strong> {selectedCoupon.minFollowers.toLocaleString()}
              </DialogContentText>
              <DialogContentText>
                <strong>Expires In:</strong> {selectedCoupon.expiresIn}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Activation Dialog */}
      <Dialog open={activationDialog} onClose={() => setActivationDialog(false)}>
        <DialogTitle>Activate Coupon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to activate this coupon? Once activated, you will have 48 hours to:
            <ul>
              <li>Make a purchase using the coupon</li>
              <li>Create and post the required content</li>
              <li>Submit proof of posting</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivationDialog(false)}>Cancel</Button>
          <Button onClick={handleActivationConfirm} variant="contained">
            Activate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AvailableCoupons;
