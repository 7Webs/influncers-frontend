import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon,
  Checkroom as FashionIcon,
  Devices as ElectronicsIcon,
  ShoppingBag as BagsIcon,
  DirectionsWalk as FootwearIcon,
  ShoppingBasket as GroceriesIcon,
  Face as BeautyIcon,
  Spa as WellnessIcon,
  Diamond as JewelleryIcon,
  FoodBank as FootIcon,
} from "@mui/icons-material";

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

const categories = [
  { icon: <FashionIcon />, text: "Fashion" },
  { icon: <ElectronicsIcon />, text: "Electronics" },
  { icon: <BagsIcon />, text: "Bags" },
  { icon: <FootwearIcon />, text: "Footwear" },
  { icon: <GroceriesIcon />, text: "Groceries" },
  { icon: <BeautyIcon />, text: "Beauty" },
  { icon: <WellnessIcon />, text: "Wellness" },
  { icon: <JewelleryIcon />, text: "Jewellery" },
  { icon: <FootIcon />, text: "Foot" },
];

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <StyledButton
        startIcon={<MenuIcon />}
        endIcon={<ArrowDownIcon />}
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      >
        Browse All Categories
      </StyledButton>

      <Collapse in={isOpen}>
        <DropdownPaper>
          <List disablePadding>
            {categories.map((category, index) => (
              <StyledListItem
                key={index}
                button
                divider={index !== categories.length - 1}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.text} />
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
