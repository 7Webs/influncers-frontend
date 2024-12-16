import React, { useState } from "react";
import "./AdditionalInfo.css";

const AdditionalInfo = ({data}) => {
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
                  <h6>Max Redeem Per User</h6>
                  <p>{data.maxPurchasePerUser}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Total Max Redeem</h6>
                  <p> {data.maxPurchaseLimit}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Available Until</h6>
                  <p> {data.availableUntil}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Offered By</h6>
                  <p>{data.shop.name}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Category</h6>
                  <p> {data.shop.category.name}</p>
                </div>
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
