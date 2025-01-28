import React, { useState } from "react";
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

const StyledButton = styled(Button)(({ theme, isOpen }) => ({
  backgroundColor: "#E34234",
  color: "#fff",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#d13a2d",
  },
  "& .MuiButton-startIcon": {
    marginRight: 8,
  },
  "& .MuiButton-endIcon": {
    transition: "transform 0.3s",
    transform: isOpen ? "rotate(180deg)" : "none",
  },
}));

const DropdownPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "280px",
  zIndex: 1000,
  borderRadius: "0 0 4px 4px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    "& .MuiListItemIcon-root": {
      color: "#E34234",
    },
    "& .MuiListItemText-primary": {
      color: "#E34234",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: "40px",
    color: "#666",
  },
  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
  },
}));

const CategoryDropdown = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCategoryClick = (categoryId) => {
    navigate(`/coupons/${categoryId}`);
    setIsOpen(false);
  };

  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <StyledButton
        startIcon={<MenuIcon />}
        endIcon={<ArrowDownIcon />}
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      >
        {!isMobile && "All Categories"}
      </StyledButton>

      <Collapse in={isOpen}>
        <DropdownPaper>
          <List disablePadding>
            {categories.map((category, index) => (
              <StyledListItem
                key={index}
                button
                divider={index !== categories.length - 1}
                onClick={() => handleCategoryClick(category.id)}
              >
                <img src={category.image} alt="" width={26} height={26} />
                &nbsp; &nbsp;
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
