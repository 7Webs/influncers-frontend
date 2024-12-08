import React, { useState, useEffect } from "react";
import "./Filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import Slider from "@mui/material/Slider";
import { fetchDeals } from "../../../redux/slice/dealsSlice";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([20, 69]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const categories = useSelector((state) => state.category?.list || []);
  const deals = useSelector((state) => state.deals?.list || []);

  useEffect(() => {
    const query = `take=10&skip=0`;
    dispatch(fetchDeals(null, query));
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (deals.length > 0) {
      // Get unique shop names and count their occurrences
      const shopCounts = deals.reduce((acc, deal) => {
        if (deal.shop?.name) {
          acc[deal.shop.name] = (acc[deal.shop.name] || 0) + 1;
        }
        return acc;
      }, {});

      // Convert to array of objects with name and count
      const shopBrands = Object.entries(shopCounts).map(([name, count]) => ({
        name,
        count
      }));
      
      setBrands(shopBrands);
    }
  }, [deals]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="filterSection">
        <div className="filterCategories">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Product Categories</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {categories && categories.length > 0 ? (
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
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Brands</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="searchBar">
                <BiSearch className="searchIcon" size={20} color={"#767676"} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="brandList">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand, index) => (
                    <div className="brandItem" key={index}>
                      <input
                        type="checkbox"
                        name="brand"
                        id={`brand-${index}`}
                        className="brandRadio"
                      />
                      <label htmlFor={`brand-${index}`} className="brandLabel">
                        {brand.name}
                      </label>
                      <span className="brandCount">{brand.count}</span>
                    </div>
                  ))
                ) : (
                  <div className="notFoundMessage">Not found</div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="filterPrice">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Price</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                sx={{
                  color: "black",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                    border: "2px solid black",
                    width: 18,
                    height: 18,
                  },
                }}
              />

              <div className="filterSliderPrice">
                <div className="priceRange">
                  <p>
                    Min Price: <span>${value[0]}</span>
                  </p>
                  <p>
                    Max Price: <span>${value[1]}</span>
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Filter;
