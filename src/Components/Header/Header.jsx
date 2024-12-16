import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
  ListItemButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Headset as HeadsetIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CategoryDropdown from "./CategoryDropdown";
import { useAuth } from "../../Utils/AuthContext";
import logo from "../../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../Utils/CategoryContext";

// Custom styled components
const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #ddd",
  backgroundColor: "#fff",
  width: "100%",
  maxWidth: "600px",
  margin: "0 20px",
  [theme.breakpoints.down("md")]: {
    margin: "10px 0",
    maxWidth: "100%",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "80%",
    maxWidth: 300,
    backgroundColor: "#fff",
  },
}));

// Upper Section Component
const UpperSection = ({ user, openMobileMenu }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const nav = useNavigate();

  return (
    <Toolbar
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
        flexDirection: isMobile ? "column" : "row",
        padding: isMobile ? "8px 16px" : undefined,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isMobile && (
          <IconButton onClick={openMobileMenu}>
            <MenuIcon />
          </IconButton>
        )}

        <img src={logo} alt="Logo" style={{ height: 40 }} />

        {isMobile && user && (
          <Avatar
            src={user?.photo}
            alt={user?.displayName}
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              nav("/profile");
            }}
          />
        )}
      </Box>

      {(!isMobile || (isMobile && <Box sx={{ width: "100%", mt: 1 }} />)) && (
        <SearchWrapper>
          <StyledInputBase
            placeholder="Search for deals..."
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type="submit"
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <SearchIcon />
          </IconButton>
        </SearchWrapper>
      )}

      {!isMobile && user && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              nav("/profile");
            }}
          >
            <Avatar src={user?.photo} alt={user?.displayName} />
            <Typography variant="subtitle1" sx={{ ml: 0.5 }}>
              Account
            </Typography>
          </Box>
        </Box>
      )}
    </Toolbar>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, user, categories }) => {
  return (
    <MobileDrawer anchor="left" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={user?.photo} alt={user?.name} />
            <Typography variant="subtitle1">{user?.name}</Typography>
          </Box>
        )}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <ListItemButton>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: "auto", borderTop: "1px solid #eee" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HeadsetIcon />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              1900 - 888
            </Typography>
            <Typography variant="caption">24/7 Support Center</Typography>
          </Box>
        </Box>
      </Box>
    </MobileDrawer>
  );
};

// Lower Section Component
const LowerSection = ({ categories }) => {
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <Toolbar
      sx={{
        backgroundColor: "#fff",
        minHeight: "48px !important",
        borderBottom: "1px solid #eee",
      }}
    >
      <CategoryDropdown categories={categories} />

      <Box sx={{ display: "flex", gap: 3, ml: 4 }}>
        <Button color="inherit">Home</Button>
        <Button color="inherit" onClick={() => nav("/home")}>
          For You
        </Button>
        <Button color="inherit" onClick={() => nav("/shop")}>
          Shop
        </Button>
        {user.category && (
          <Button color="inherit" onClick={() => nav("/shop")}>
            {user.category.name}
          </Button>
        )}
        {user.category &&
          user.category.relatedCategories &&
          user.category.relatedCategories.map((category) => (
            <Button color="inherit" onClick={() => nav("/shop")}>
              {category.name}
            </Button>
          ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", ml: "auto", gap: 1 }}>
        <HeadsetIcon />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            1900 - 888
          </Typography>
          <Typography variant="caption">24/7 Support Center</Typography>
        </Box>
      </Box>
    </Toolbar>
  );
};

// Main Header Component
const HeaderMain = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();

  const { categories, loading } = useCategory();

  return (
    <>
      <AppBar
        sx={{ bgcolor: "#fff", color: "#333" }}
        position="fixed"
        elevation={0}
      >
        <UpperSection
          user={user}
          openMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {!isMobile && <LowerSection categories={categories} />}

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          user={user}
          categories={categories}
        />
      </AppBar>
      <div style={{ height: "140px" }} />
    </>
  );
};

export default HeaderMain;
