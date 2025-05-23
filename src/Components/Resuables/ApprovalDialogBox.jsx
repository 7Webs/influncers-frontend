import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircleOutline,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../Api/apiwrapper";
import { toast } from "react-toastify";

const styles = {
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
  formContainer: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
};

const ApprovalDialogBox = ({ open, onClose, id }) => {
  const [formData, setFormData] = useState({
    socialMediaLink: "",
    additionalInfo: "",
    image: "",
    totalViews: "",
    totalLikes: "",
    totalComments: "",
    amountSpent: 0,
  });
  const [previewUrls, setPreviewUrls] = useState([]);

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

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));

    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const approveMutation = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();

      formDataToSend.append("socialMediaLink", formData.socialMediaLink);
      formDataToSend.append("additionalInfo", formData.additionalInfo);
      formDataToSend.append("totalViews", formData.totalViews);
      formDataToSend.append("totalLikes", formData.totalLikes);
      formDataToSend.append("totalComments", formData.totalComments);
      formDataToSend.append("amountSpent", formData.amountSpent);

      formData.image.forEach((file) => {
        formDataToSend.append(`image`, file);
      });

      return await apiService.patch(`/deals-redeem/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      onClose();
      toast.success("Request for approval submitted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Submit for Approval
          </Typography>
          <IconButton
            onClick={onClose}
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
          <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 1, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Media Post Details
            </Typography>

            <TextField
              name="socialMediaLink"
              label="Social Media Post Link"
              value={formData.socialMediaLink}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              placeholder="Paste your social media post link here"
            />

            <Box display="flex" gap={2} mb={2}>
              <TextField
                name="totalViews"
                label="Total Views"
                value={formData.totalViews}
                onChange={handleInputChange}
                type="number"
                fullWidth
                variant="outlined"
              />
              <TextField
                name="totalLikes"
                label="Total Likes"
                value={formData.totalLikes}
                onChange={handleInputChange}
                type="number"
                fullWidth
                variant="outlined"
              />
              <TextField
                name="totalComments"
                label="Total Comments"
                value={formData.totalComments}
                onChange={handleInputChange}
                type="number"
                fullWidth
                variant="outlined"
              />
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 1, mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: 500, color: "#1976d2" }}
            >
              Upload Screenshots (Max 10)
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please attach screenshots of your social media posts to verify the
              promotion
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
                    <IconButton
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
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}

          <TextField
            name="amountSpent"
            label="Amount Spent at Store"
            value={formData.amountSpent}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mb: 3 }}
            placeholder="Enter the amount you spent at the store"
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
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid #eee" }}>
        <Button
          onClick={onClose}
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
  );
};

export default ApprovalDialogBox;
