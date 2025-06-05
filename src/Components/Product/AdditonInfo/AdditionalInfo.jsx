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
                Descripción
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Información Adicional
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
              <div className="aiTabDescription">{data.description}</div>
            )}

            {/* Tab2 */}

            {activeTab === "aiTab2" && (
              <div className="aiTabAdditionalInfo">
                <div className="additionalInfoContainer">
                  <h6>Límite de Uso por Usuario</h6>
                  <p>{data.maxPurchasePerUser}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Límite de Uso por Cupón</h6>
                  <p>{data.maxPurchaseLimit}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Disponible hasta</h6>
                  <p>{data.availableUntil}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Creado por</h6>
                  <p>{data.shop.name}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Categoría</h6>
                  <p>{data.shop.category.name}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Tipo de Oferta</h6>
                  <p>{data.type}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Palabras Clave</h6>
                  <p>{data.keywords}</p>
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
