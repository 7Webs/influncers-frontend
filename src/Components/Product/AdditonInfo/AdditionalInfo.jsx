import React, { useState } from "react";
import "./AdditionalInfo.css";

const AdditionalInfo = ({ data }) => {
  const [activeTab, setActiveTab] = useState("aiTab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Description
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Additional Information
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
              <div className="aiTabDescription">
                {data.description}
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "aiTab2" && (
              <div className="aiTabAdditionalInfo">
                <div className="additionalInfoContainer">
                  <h6>Usage Limit Per User</h6>
                  <p>{data.maxPurchasePerUser}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Usage Limit Per Coupon</h6>
                  <p>{data.maxPurchaseLimit}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Available Until</h6>
                  <p>{data.availableUntil}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Offered By</h6>
                  <p>{data.shop.name}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Category</h6>
                  <p>{data.shop.category.name}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Deal Type</h6>
                  <p>{data.type}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Keywords</h6>
                  <p>{data.keywords}</p>
                </div>
                {/* <div className="additionalInfoContainer">
                  <h6>Features</h6>
                  <p>{data.features || "No features specified"}</p>
                </div> */}
                {/* <div className="additionalInfoContainer">
                  <h6>Percent Off</h6>
                  <p>{data.percentOff}%</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Upto Amount</h6>
                  <p>{data.uptoAmount}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Min Spend</h6>
                  <p>{data.minSpend}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Max Spend</h6>
                  <p>{data.maxSpend}</p>
                </div> */}
              </div>
            )}

            {/* Tab3 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
