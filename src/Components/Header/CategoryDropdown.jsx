import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(({ theme, isopen }) => ({
  backgroundColor: "transparent",
  color: "#333333",
  padding: "8px 16px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "transparent",
    color: "#1E3FE4",
  },
  "& .MuiButton-startIcon": {
    marginRight: 8,
  },
  "& .MuiButton-endIcon": {
    transition: "transform 0.3s",
    transform: isopen === "true" ? "rotate(180deg)" : "none",
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 12px",
    minWidth: "auto",
  },
}));

const DropdownPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "280px",
  zIndex: 1000,
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: "1px solid #f0f0f0",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    width: "240px",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "12px 16px",
  "&:hover": {
    backgroundColor: "#f8faff",
    "& .MuiListItemIcon-root": {
      color: "#1E3FE4",
    },
    "& .MuiListItemText-primary": {
      color: "#1E3FE4",
    },
  },
  "& .MuiListItemText-primary": {
    fontSize: "14px",
    fontWeight: 500,
  },
}));

const CategoryDropdown = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dropdownRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    navigate(`/coupons/${categoryId}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={dropdownRef}
      sx={{
        position: "relative",
        [theme.breakpoints.down("md")]: {
          position: "static",
        },
      }}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <StyledButton
        startIcon={<MenuIcon />}
        endIcon={<ArrowDownIcon />}
        isopen={isOpen.toString()}
        onClick={() => isMobile && setIsOpen(!isOpen)}
      >
        Categorías
      </StyledButton>

      <Collapse in={isOpen}>
        <DropdownPaper
          sx={{
            [theme.breakpoints.down("md")]: {
              position: "fixed",
              top: "80px",
              left: "16px",
              right: "16px",
              width: "auto",
            },
          }}
        >
          <List disablePadding>
            {categories.map((category) => (
              <StyledListItem
                key={category.id}
                button
                onClick={() => handleCategoryClick(category.id)}
              >
                <img
                  src={category.image}
                  alt=""
                  width={26}
                  height={26}
                  style={{ marginRight: 8 }}
                />
                <ListItemText primary={category.name} />
                <ArrowRightIcon sx={{ color: "#999", fontSize: 20 }} />
              </StyledListItem>
            ))}
          </List>
        </DropdownPaper>
      </Collapse>
    </Box>
  );
};

export default CategoryDropdown;