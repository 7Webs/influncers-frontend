import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { PiShareNetworkLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { apiService } from "../../../Api/apiwrapper";
import { toast } from "react-toastify";
import { useAuth } from "../../../Utils/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Chip } from "@mui/material";
import {
  Instagram as InstagramIcon,
  VideoCall as VideoIcon,
  Slideshow as StoryIcon,
  LocalOffer,
} from "@mui/icons-material";
import { FaTiktok as TiktokIcon } from "react-icons/fa";
import { useTheme } from "@emotion/react";
const influencerOptions = {
  instagram_post: { label: "Publicación de Instagram", icon: InstagramIcon },
  instagram_story: { label: "Historia de Instagram", icon: StoryIcon },
  instagram_video_post: { label: "Publicación de Video en Instagram", icon: VideoIcon },
  instagram_video_story: { label: "Historia de Video en Instagram", icon: VideoIcon },
  tiktok_post: { label: "Publicación de TikTok", icon: TiktokIcon },
  google_map_review: { label: "Reseña en Google Maps", icon: LocalOffer },
};

const Product = ({ data, isLoading, error }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const redeemDeal = async () => {
    if (user?.openRedeemedDeal) {
      setOpenDialog(true);
      return;
    }

    try {
      const response = await apiService.post("/deals-redeem", {
        dealId: data.id,
      });
      toast.success("Deal redeemed successfully");

      setTimeout(() => {
        // nav(`/redeemed-deals/${response.data.id}`);
        window.location.pathname = `/redeemed-deals/${response.data.id}`;
      }, 2000);
    } catch (error) {
      console.error("Error redeeming deal:", error);
    }
  };

  const recordShareAnalytics = async () => {
    const response = await apiService.post("/deals/analytics", {
      dealId: data.id,
      userId: user?.id,
      type: "share",
    });
  };

  const handleShare = async () => {
    try {
      await recordShareAnalytics();
      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: data.shortTagLine,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share");
    }
  };

  // Handle loading and error states
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const productImg = data.images;

  const prevImg = () => {
    if (currentImg === 0) {
      setCurrentImg(productImg.length - 1);
    } else {
      setCurrentImg(currentImg - 1);
    }
  };

  const nextImg = () => {
    if (currentImg === productImg.length - 1) {
      setCurrentImg(0);
    } else {
      setCurrentImg(currentImg + 1);
    }
  };

  const renderInfluencerRequirements = () => {
    if (!data.influencerRequirements) return null;

    const requirements = data.influencerRequirements.split(",");
    return (
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        {requirements.map((req) => {
          const option = influencerOptions[req];
          if (!option) return null;
          const Icon = option.icon;
          return (
            <Chip
              key={req}
              icon={<Icon />}
              label={option.label}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                px: 2,
                py: 2.5,
                // borderColor: theme.palette.primary.main,
                // color: theme.palette.primary.main,
                // "& .MuiChip-icon": { color: theme.palette.primary.main },
              }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          style: {
            borderRadius: "24px",
            padding: "24px",
            maxWidth: "480px",
            position: "relative",
            background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          },
        }}
      >
        <Button
          onClick={() => setOpenDialog(false)}
          sx={{
            position: "absolute",
            right: "16px",
            top: "16px",
            minWidth: "auto",
            padding: "8px",
            color: "#94a3b8",
            borderRadius: "50%",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f1f5f9",
              color: "#475569",
              transform: "scale(1.1)",
            },
          }}
        >
          ✕
        </Button>
        <DialogTitle
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#0f172a",
            textAlign: "center",
            paddingBottom: "16px",
            paddingRight: "32px",
            letterSpacing: "-0.02em",
          }}
        >
          Oferta Pendiente
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "24px 32px",
            background: "#ffffff",
            borderRadius: "16px",
            margin: "0 8px",
          }}
        >
          <p style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#475569",
            textAlign: "center",
            fontWeight: 500,
          }}>
            Tienes una oferta pendiente que necesita ser utilizada.
          </p>
          <p style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#475569",
            marginTop: "16px",
            textAlign: "center",
            fontWeight: 500,
          }}>
            Por favor, utiliza tu oferta pendiente antes de reclamar una nueva.
          </p>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "24px",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Button
            onClick={() => nav(`/redeemed-deals/${user?.openRedeemedDeal?.id}`)}
            sx={{
              textTransform: "none",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              padding: "12px 32px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 600,
              transition: "all 0.2s ease",
              boxShadow:
                "0 4px 6px -1px rgba(37,99,235,0.2), 0 2px 4px -2px rgba(37,99,235,0.1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow:
                  "0 10px 15px -3px rgba(37,99,235,0.3), 0 4px 6px -4px rgba(37,99,235,0.1)",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Ver detalles
          </Button>
        </DialogActions>
      </Dialog>

      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {productImg.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  onClick={() => setCurrentImg(index)}
                  alt=""
                />
              ))}
            </div>
            <div className="productFullImg">
              <img src={productImg[currentImg]} alt="" />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Inicio</Link>&nbsp;/&nbsp;
                <Link to="/shop">Tienda</Link>&nbsp;/&nbsp;
                {data.title}
              </div>
            </div>
            <div className="productName">
              <h1>{data.title}</h1>
            </div>

            <div className="productDescription">
              <p style={{ color: "green" }}>{data.shortTagLine}</p>
            </div>
            <div className="productSizeColor">
              <div className="productColor">
                <p>Máximo {data.maxPurchasePerUser} usos por usuario</p>
              </div>
              {data.percentOff > 0 ? (
                <div className="productColor">
                  <p>{data.percentOff}% de descuento</p>
                </div>
              ) : (
                <div className="productColor">
                  <p>Hasta ${data.uptoAmount} de descuento</p>
                </div>
              )}
              {data.minSpend > 0 ? (
                <div className="productColor">
                  <p>Gasto mínimo: ${data.minSpend}</p>
                </div>
              ) : (
                <div className="productColor">
                  <p>Sin gasto mínimo</p>
                </div>
              )}
              {renderInfluencerRequirements()}
              {data.maxSpend > 0 ? (
                <div className="productColor">
                  <p>Gasto máximo: ${data.maxSpend}</p>
                </div>
              ) : (
                <div className="productColor">
                  <p>Sin gasto máximo</p>
                </div>
              )}
            </div>

            <div className="productCartQuantity">
              <div className="productCartBtn">
                <button onClick={() => redeemDeal()}>Canjear Ahora</button>
              </div>
            </div>
            <div className="productWishShare">
              <div
                className="productShare"
                onClick={handleShare}
                style={{ cursor: "pointer" }}
              >
                <PiShareNetworkLight size={22} />
                <p>Compartir</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <img
                src={data.shop.logo}
                alt={data.shop.name}
                style={{
                  height: "50px",
                  width: "50px",
                  objectFit: "contain",
                }}
              />
              <div>
                <h4 style={{ margin: "0 0 5px 0" }}>{data.shop.name}</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  {data.shop.address}
                </p>
                {data.shop.website && (
                  <a
                    href={
                      data.shop.website?.startsWith("https")
                        ? data.shop.website
                        : `https://${data.shop.website}`
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
