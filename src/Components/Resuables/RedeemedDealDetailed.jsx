import React, { useState } from "react";
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Link,
  ImageList,
  ImageListItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import {
  ContentCopy,
  Share,
  Close as CloseIcon,
  CheckCircleOutline,
} from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiService } from "../../Api/apiwrapper";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import { getStatusConfig } from "../../Utils/Status";

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
  qrCode: {
    marginTop: 2,
    marginBottom: 2,
  },
  formContainer: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
};

const RedeemedDealDetail = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    socialMediaLink: "",
    additionalInfo: "",
    image: "",
  });
  const [previewUrls, setPreviewUrls] = useState([]); // Store preview URLs separately

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = formData.image.length + files.length;

    if (totalFiles > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    // Create preview URLs for new images
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    // Store the actual file objects
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleCopyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("Coupon code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy code");
      });
  };

  const approveMutation = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();

      formDataToSend.append("socialMediaLink", formData.socialMediaLink);
      formDataToSend.append("additionalInfo", formData.additionalInfo);

      // Append each image file individually
      formData.image.forEach((file, index) => {
        formDataToSend.append(`image`, file); // Use the same field name for all images
      });

      return await apiService.patch(`/deals-redeem/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      setOpenDialog(false);
      toast.success("Request for approval submitted successfully");
      setTimeout(() => {
        // window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const fetchDealDetails = async () => {
    const { data } = await apiService.get(`/deals-redeem/${id}`);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["dealDetails", id],
    queryFn: fetchDealDetails,
  });

  const handleRemoveImage = (index) => {
    // Remove image and its preview
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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
  const statusConfig = getStatusConfig(null, data.status);

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

        <Card sx={styles.contentCard}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box>
              <h3 style={styles.sectionTitle}>Redemption Status</h3>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: `${statusConfig.color}20`,
                  color: statusConfig.color,
                  textTransform: "capitalize",
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {statusConfig.icon}
                {statusConfig.label}
              </Box>
            </Box>
            {data.status === "used" && (
              <Button
                variant="contained"
                sx={styles.primaryButton}
                onClick={() => setOpenDialog(true)}
                startIcon={<CheckCircleOutline />}
              >
                Request for Approval
              </Button>
            )}
          </Box>

          {(data.socialMediaLink || data.additionalInfo || data.image) && (
            <Box
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 1,
              }}
            >
              {data.socialMediaLink && (
                <Box mb={data.additionalInfo ? 2 : 0}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Social Media Link
                  </Typography>
                  <Link
                    href={data.socialMediaLink}
                    target="_blank"
                    sx={{
                      color: "#0066CC",
                      wordBreak: "break-all",
                    }}
                  >
                    {data.socialMediaLink}
                  </Link>
                </Box>
              )}

              {data.additionalInfo && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Additional Information
                  </Typography>
                  <Typography variant="body2">{data.additionalInfo}</Typography>
                </Box>
              )}

              {data.image && (
                <Box mt={2}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Uploaded Image
                  </Typography>
                  <ImageList
                    sx={{ width: "100%", height: "auto" }}
                    cols={3}
                    rowHeight={164}
                  >
                    {data.image.map((url, index) => (
                      <ImageListItem key={index} sx={{ position: "relative" }}>
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          loading="lazy"
                          style={{ height: "164px", objectFit: "cover" }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}
            </Box>
          )}
        </Card>

        <Paper sx={styles.couponSection}>
          <p style={{ color: "#666" }}>Your Coupon Code</p>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <h2 style={{ color: "#000" }}>{data.couponCode}</h2>
            <IconButton
              sx={styles.copyButton}
              onClick={() => handleCopyCode(data.couponCode)}
            >
              <ContentCopy />
            </IconButton>
          </Box>
          <Box sx={styles.qrCode}>
            <QRCodeCanvas value={data.couponCode} size={128} level="H" />
          </Box>
          <p style={{ color: "#666" }}>
            Use this code or scan QR at checkout to claim this deal!
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
              <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
                <img src={shop.logo} alt={shop.name} style={styles.logo} />
                <Box>
                  <h4>{shop.name}</h4>
                  <p>{shop.description}</p>
                </Box>
              </Box>
              <p>{shop.address}</p>
              <Chip label={shop.category.name} sx={styles.chip} />
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

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Submit for Approval
              </Typography>
              <IconButton
                onClick={() => setOpenDialog(false)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Box sx={styles.formContainer}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Please provide the following information
              </Typography>

              <TextField
                name="socialMediaLink"
                label="Social Media Link"
                value={formData.socialMediaLink}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="Paste your social media post link here"
              />

              <TextField
                name="additionalInfo"
                label="Additional Information"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{ mb: 3 }}
                placeholder="Add any additional details about your post"
              />

              <Box
                sx={{
                  p: 2,
                  bgcolor: "#f8f9fa",
                  borderRadius: 1,
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 2, fontWeight: 500, color: "#1976d2" }}
                >
                  Upload Screenshots (Max 10)
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Please attach screenshots of your social media posts to verify
                  the promotion
                </Typography>

                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    startIcon={
                      formData.image.length > 0 ? (
                        <CheckCircleOutline color="success" />
                      ) : null
                    }
                    sx={{
                      ...styles.outlinedButton,
                      bgcolor: "#fff",
                      "&:hover": {
                        bgcolor: "#fafafa",
                      },
                    }}
                  >
                    {formData.image.length > 0
                      ? `${formData.image.length} Image${
                          formData.image.length !== 1 ? "s" : ""
                        } Selected`
                      : "Choose Images"}
                  </Button>
                </label>
              </Box>

              {previewUrls.length > 0 && (
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    bgcolor: "#fff",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Preview:
                  </Typography>
                  <ImageList
                    sx={{ width: "100%", height: "auto" }}
                    cols={3}
                    rowHeight={164}
                  >
                    {previewUrls.map((url, index) => (
                      <ImageListItem key={index} sx={{ position: "relative" }}>
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          loading="lazy"
                          style={{ height: "164px", objectFit: "cover" }}
                        />
                        <MuiIconButton
                          sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            bgcolor: "rgba(255, 255, 255, 0.8)",
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.9)",
                            },
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <DeleteIcon />
                        </MuiIconButton>
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: "1px solid #eee" }}>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{
                mr: 2,
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                ...styles.primaryButton,
                minWidth: "120px",
              }}
              onClick={() => approveMutation.mutate()}
              disabled={approveMutation.isLoading || !formData.image}
            >
              {approveMutation.isLoading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default RedeemedDealDetail;
