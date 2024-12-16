import React from "react";
import {
  Container,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  IconButton,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import {
  ContentCopy,
  Share,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { apiService } from "../../Api/apiwrapper";

const styles = {
  root: {
    paddingY: 4,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 4,
    padding: 3,
    display: "flex",
    alignItems: "center",
    gap: 2,
    boxShadow: "none",
    border: "1px solid #eee",
  },
  logo: {
    width: 64,
    height: 64,
    objectFit: "contain",
  },
  couponSection: {
    background: "#f8f8f8",
    padding: 4,
    textAlign: "center",
    marginBottom: 4,
    boxShadow: "none",
    border: "1px solid #eee",
  },
  dealImage: {
    height: 300,
    width: "100%",
    objectFit: "cover",
    borderRadius: 1,
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    marginY: 2,
  },
  socialIcons: {
    display: "flex",
    gap: 1,
    marginTop: 2,
  },
  userAvatar: {
    width: 80,
    height: 80,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
    marginTop: 4,
  },
  chip: {
    borderRadius: 1,
    backgroundColor: "#f8f8f8",
    border: "1px solid #eee",
    color: "#333",
    "&.MuiChip-colorSuccess": {
      backgroundColor: "#f8f8f8",
      color: "#333",
    },
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: 2,
    color: "#333",
  },
  contentCard: {
    boxShadow: "none",
    border: "1px solid #eee",
    borderRadius: 1,
    padding: 3,
    marginBottom: 4,
  },
  primaryButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 0,
    padding: "10px 24px",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  outlinedButton: {
    borderColor: "#000",
    color: "#000",
    borderRadius: 0,
    padding: "10px 24px",
    "&:hover": {
      borderColor: "#333",
      backgroundColor: "transparent",
    },
  },
  copyButton: {
    color: "#000",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#333",
    },
  },
  socialButton: {
    color: "#000",
    border: "1px solid #eee",
    "&:hover": {
      backgroundColor: "#f8f8f8",
    },
  },
};

const RedeemedDealDetail = () => {
  const { id } = useParams();

  const fetchDealDetails = async () => {
    const { data } = await apiService.get(`/deals-redeem/${id}`);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["dealDetails", id],
    queryFn: fetchDealDetails,
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress sx={{ color: "#000" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <p>Something went wrong: {error.message}</p>
      </Box>
    );
  }

  const { deal } = data;
  const { shop } = deal;

  return (
    <Box sx={styles.root}>
      <Container maxWidth="lg">
        <Paper sx={styles.header}>
          <img
            src={data.deal.images[0]}
            alt={`${data.deal.title}`}
            style={styles.logo}
          />
          <Box>
            <h1 style={styles.sectionTitle}>{data.deal.title}</h1>
            <p>{data.deal.shortTagLine}</p>
          </Box>
        </Paper>

        <Paper sx={styles.couponSection}>
          <p style={{ color: "#666" }}>Your Coupon Code</p>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <h2 style={{ color: "#000" }}>{data.couponCode}</h2>
            <IconButton sx={styles.copyButton}>
              <ContentCopy />
            </IconButton>
          </Box>
          <p style={{ color: "#666" }}>
            Use this code at checkout to claim this deal!
          </p>
        </Paper>

        <Card sx={styles.contentCard}>
          <CardContent>
            <Grid container spacing={4} marginBottom={4}>
              <Grid item xs={12} md={6}>
                <h3 style={styles.sectionTitle}>Deal Information</h3>
                <p>{deal.description}</p>
                <Box sx={styles.tagContainer}>
                  {deal.keywords.split(",").map((tag) => (
                    <Chip key={tag} label={tag} sx={styles.chip} size="small" />
                  ))}
                </Box>
                <p>
                  Available until:{" "}
                  {new Date(deal.availableUntil).toLocaleDateString()}
                </p>
                <p>Max purchases per user: {deal.maxPurchasePerUser}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  src={deal.images[0]}
                  alt="Deal Image"
                  sx={styles.dealImage}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={styles.contentCard}>
          <h3 style={styles.sectionTitle}>Shop Information</h3>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <h4>{shop.name}</h4>
              <p>{shop.description}</p>
              <p>{shop.address}</p>
              <Chip label={shop.category.name} sx={styles.chip} />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>Subscription: {shop.subscriptionStatus}</p>
              <p>Max Deals: {shop.maxDeals}</p>
            </Grid>
          </Grid>
        </Card>

        <Card sx={styles.contentCard}>
          <h3 style={styles.sectionTitle}>Redeemed By</h3>
          <Box display="flex" gap={3}>
            <Avatar
              src={data.user.photo}
              alt={data.user.name}
              sx={styles.userAvatar}
            />
            <Box>
              <h4>{data.user.name}</h4>
              <p>Email: {data.user.email}</p>
              <p>Phone: {data.user.phone}</p>
            </Box>
          </Box>
        </Card>

        <Card sx={styles.contentCard}>
          <h3 style={styles.sectionTitle}>Redemption Status</h3>
          <p>{data.status}</p>
        </Card>

        <Box sx={styles.actionButtons}>
          <Button
            variant="contained"
            startIcon={<Share />}
            size="large"
            sx={styles.primaryButton}
          >
            Share Deal
          </Button>
          <Button variant="outlined" size="large" sx={styles.outlinedButton}>
            Contact Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RedeemedDealDetail;
