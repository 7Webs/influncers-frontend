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
  Typography,
  Link,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  ContentCopy,
  CheckCircleOutline,
  Close as CloseIcon,
  Comment,
} from "@mui/icons-material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../Api/apiwrapper";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import { getStatusConfig } from "../../Utils/Status";
import ApprovalDialogBox from "./ApprovalDialogBox";

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
  cancelButton: {
    backgroundColor: "#ff4444",
    color: "#fff",
    borderRadius: 0,
    padding: "10px 24px",
    "&:hover": {
      backgroundColor: "#cc0000",
    },
  },
};

const CancelConfirmationDialog = ({ open, onClose, onConfirm, isLoading }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ pb: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Cancelar Oferta</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
    <DialogContent>
      <Typography>
        ¿Estás seguro de que quieres cancelar esta oferta? Esta acción no se puede deshacer.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
      <Button onClick={onClose} disabled={isLoading}>
        No, Mantenerla
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Sí, Cancelar Oferta"}
      </Button>
    </DialogActions>
  </Dialog>
);

const RedeemedDealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("¡Código de cupón copiado al portapapeles!");
      })
      .catch(() => {
        toast.error("Error al copiar el código");
      });
  };

  const fetchDealDetails = async () => {
    const { data } = await apiService.get(`/deals-redeem/${id}`);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["dealDetails", id],
    queryFn: fetchDealDetails,
  });

  const cancelDealMutation = useMutation({
    mutationFn: async () => {
      return await apiService.patch(`/deals-redeem/cancel/${id}`);
    },
    onSuccess: () => {
      toast.success("Oferta cancelada exitosamente");
      navigate("/redeemed-coupons");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error al cancelar la oferta");
    },
  });

  const handleCancelDeal = () => {
    setOpenCancelDialog(true);
  };

  const confirmCancelDeal = () => {
    cancelDealMutation.mutate();
  };

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
        <p>Algo salió mal: {error.message}</p>
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
              <h3 style={styles.sectionTitle}>Estado de Canje</h3>
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
            <Box>
              {(data.status === "used" ||
                data.status === "re_submission_requested") && (
                <Button
                  variant="contained"
                  sx={styles.primaryButton}
                  onClick={() => setOpenDialog(true)}
                  startIcon={<CheckCircleOutline />}
                >
                  Solicitar Aprobación
                </Button>
              )}
              {data.status === "pending_usage" && (
                <Button
                  variant="contained"
                  sx={styles.cancelButton}
                  onClick={handleCancelDeal}
                >
                  Cancelar Oferta
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            {data.status === "re_submission_requested" && data.adminComment && (
              <Alert
                severity="warning"
                icon={<Comment />}
                sx={{
                  mb: 2,
                  "& .MuiAlert-message": {
                    width: "100%",
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Comentario del Administrador:
                </Typography>
                <Typography variant="body1">{data.adminComment}</Typography>
              </Alert>
            )}
          </Box>

          {(data.socialMediaLink ||
            data.additionalInfo ||
            data.image ||
            data.totalViews ||
            data.totalLikes ||
            data.totalComments) && (
            <Box
              sx={{
                bgcolor: "#F8F9FA",
                p: 3,
                borderRadius: 2,
              }}
            >
              {data.socialMediaLink && (
                <Box mb={3}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#343A40" }}
                  >
                    Enlace de Redes Sociales
                  </Typography>
                  <Link
                    href={data.socialMediaLink}
                    target="_blank"
                    sx={{
                      color: "#0066CC",
                      wordBreak: "break-word",
                      fontSize: "1rem",
                    }}
                  >
                    {data.socialMediaLink}
                  </Link>
                </Box>
              )}

              {data.additionalInfo && (
                <Box mb={3}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#343A40" }}
                  >
                    Información Adicional
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#495057", lineHeight: 1.5 }}
                  >
                    {data.additionalInfo}
                  </Typography>
                </Box>
              )}

              {data.image && (
                <Box mb={3}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#343A40" }}
                  >
                    Imágenes Subidas
                  </Typography>
                  <ImageList
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                    cols={3}
                    rowHeight={164}
                  >
                    {data.image.map((url, index) => (
                      <ImageListItem key={index} sx={{ position: "relative" }}>
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          loading="lazy"
                          style={{
                            height: "164px",
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}

              {(data.totalViews || data.totalLikes || data.totalComments) && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#343A40" }}
                  >
                    Métricas de Interacción
                  </Typography>
                  <Box display="flex" flexDirection="row" gap={4}>
                    {data.totalViews !== undefined && (
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ color: "#6C757D" }}
                        >
                          Total de Visualizaciones
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#495057" }}>
                          {data.totalViews}
                        </Typography>
                      </Box>
                    )}
                    {data.totalLikes !== undefined && (
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ color: "#6C757D" }}
                        >
                          Total de Me Gusta
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#495057" }}>
                          {data.totalLikes}
                        </Typography>
                      </Box>
                    )}
                    {data.totalComments !== undefined && (
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ color: "#6C757D" }}
                        >
                          Total de Comentarios
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#495057" }}>
                          {data.totalComments}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Card>

        <Paper sx={styles.couponSection}>
          <p style={{ color: "#666" }}>Tu Código de Cupón</p>
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
            ¡Usa este código o escanea el QR en el checkout para reclamar esta oferta!
          </p>
        </Paper>

        <Card sx={styles.contentCard}>
          <CardContent>
            <Grid container spacing={4} marginBottom={4}>
              <Grid item xs={12} md={6}>
                <h3 style={styles.sectionTitle}>Información de la Oferta</h3>
                <p>{deal.description}</p>
                <Box sx={styles.tagContainer}>
                  {deal.keywords.split(",").map((tag) => (
                    <Chip key={tag} label={tag} sx={styles.chip} size="small" />
                  ))}
                </Box>
                <p>
                  Disponible hasta:{" "}
                  {new Date(deal.availableUntil).toLocaleDateString()}
                </p>
                <p>Máximo de compras por usuario: {deal.maxPurchasePerUser}</p>
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
          <h3 style={styles.sectionTitle}>Información de la Tienda</h3>
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
              <br />
              {shop.website && (
                <a
                  href={
                    shop.website?.startsWith("https")
                      ? shop.website
                      : `https://${shop.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#0066cc",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#004d99",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Visitar Sitio Web
                </a>
              )}
            </Grid>
          </Grid>
        </Card>

        <Card sx={styles.contentCard}>
          <h3 style={styles.sectionTitle}>Canjeado Por</h3>
          <Box display="flex" gap={3}>
            <Avatar
              src={data.user.photo}
              alt={data.user.name}
              sx={styles.userAvatar}
            />
            <Box>
              <h4>{data.user.name}</h4>
              <p>Correo: {data.user.email}</p>
              <p>Teléfono: {data.user.phone}</p>
            </Box>
          </Box>
        </Card>

        <ApprovalDialogBox
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          id={id}
        />

        <CancelConfirmationDialog
          open={openCancelDialog}
          onClose={() => setOpenCancelDialog(false)}
          onConfirm={confirmCancelDeal}
          isLoading={cancelDealMutation.isLoading}
        />
      </Container>
    </Box>
  );
};

export default RedeemedDealDetail;
