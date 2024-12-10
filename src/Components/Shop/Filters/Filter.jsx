import React, { useState } from "react";
import "./Filter.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { useCategory } from "../../../Utils/CategoryContext";
import { useShop } from "../../../Utils/ShopContext";

const Filter = ({ onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const { categories, loading } = useCategory();
  const { shops } = useShop();

    const handleBrandChange = (brand) => {
      setSelectedBrands((prev) =>
        prev.includes(brand)
          ? prev.filter((b) => b !== brand)
          : [...prev, brand]
      );
    };

  return (
    <div className="filterSection">
      <div className="filterCategories">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h5 className="filterHeading">Product Categories</h5>
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <p>Loading...</p>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <p key={index}>{category.name}</p>
              ))
            ) : (
              <p>No categories found</p>
            )}
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="filterBrands">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h5 className="filterHeading">Brands</h5>
          </AccordionSummary>
          <AccordionDetails>
            <div className="searchBar">

              <div className="brandList">
                {shops.length > 0 ? (
                  shops.map((brand) => (
                    <div key={brand.name}>
                      <input
                        type="checkbox"
                        id={brand.name}
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => handleBrandChange(brand.name)}
                      />
                      <label htmlFor={brand.name}>{brand.name}</label>
                    </div>
                  ))
                ) : (
                  <p>No brands found</p>
                )}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;
