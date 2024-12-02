import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  LocalOffer as CouponIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const mockPerformanceData = [
  { month: 'Jan', redemptions: 4 },
  { month: 'Feb', redemptions: 3 },
  { month: 'Mar', redemptions: 7 },
  { month: 'Apr', redemptions: 5 },
  { month: 'May', redemptions: 9 },
  { month: 'Jun', redemptions: 6 },
];

const mockActivities = [
  {
    id: 1,
    type: 'coupon_activated',
    message: 'Summer Fashion Collection coupon activated',
    status: 'active',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'redemption_completed',
    message: 'Beauty Products coupon redeemed successfully',
    status: 'completed',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    type: 'pending_upload',
    message: 'Pending content upload for Sports Gear promotion',
    status: 'pending',
    timestamp: '2 days ago',
  },
];

const Dashboard = () => {
  const [activities] = useState(mockActivities);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CouponIcon color="primary" />;
      case 'completed':
        return <CompletedIcon color="success" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      default:
        return <TimelineIcon />;
    }
  };

  const getStatusChip = (status) => {
    const statusProps = {
      active: { color: 'primary', label: 'Active' },
      completed: { color: 'success', label: 'Completed' },
      pending: { color: 'warning', label: 'Pending' },
    };
    const { color, label } = statusProps[status] || { color: 'default', label: status };
    return <Chip size="small" color={color} label={label} />;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Coupons
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Redemptions
              </Typography>
              <Typography variant="h4">34</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Uploads
              </Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Engagement Rate
              </Typography>
              <Typography variant="h4">4.8%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Redemption Performance
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="redemptions" fill="#83C9F4" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Recent Activity */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Recent Activity
          </Typography>
          <Button color="primary">View All</Button>
        </Box>
        <List>
          {activities.map((activity) => (
            <ListItem
              key={activity.id}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <ListItemIcon>
                {getStatusIcon(activity.status)}
              </ListItemIcon>
              <ListItemText
                primary={activity.message}
                secondary={activity.timestamp}
              />
              {getStatusChip(activity.status)}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard;
