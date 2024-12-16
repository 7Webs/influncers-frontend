import React from "react";
import "./RedeemedDealCard.css";

const RedeemedDealStatusColors = {
  pending_usage: "blue",
  pending_approval: "yellow",
  re_submission_requested: "orange",
  approved: "green",
  rejected: "red",
  canceled: "black",
  used: "blue",
};

const RedeemedDealCard = ({ deal }) => {
  const statusColor = RedeemedDealStatusColors[deal.status];
  return (
    <div className="redeemed-deal-card">
      {/* Header */}
      <div className="redeemed-deal-header">
        <h3>{deal.deal.title}</h3>
        <span className={`status-badge ${statusColor}`}>
          {deal.status.replace(/_/g, " ")}
        </span>
      </div>

      {/* Main Content */}
      <div className="redeemed-deal-body">
        {/* Deal Image */}
        <img
          className="deal-image"
          src={deal.deal.images[0]}
          alt="Deal Thumbnail"
        />
        {/* Details */}
        <div className="deal-details">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={deal.deal.shop.logo}
              alt="User Profile"
              style={{ height: "20px" }}
            />
            &nbsp;&nbsp;
            <h4>{deal.deal.shop.name}</h4>
          </div>
          <p>{deal.deal.description}</p>
          <div className="keywords">
            {deal.deal.keywords.split(",").map((keyword) => (
              <span className="keyword">{keyword}</span>
            ))}
          </div>
          <p className="short-tagline">{deal.deal.shortTagLine}</p>
          {/* <div className="user-info">
            <img
              src={deal.user.photo}
              alt="User Profile"
              className="user-avatar"
            />
            <p>{deal.user.name}</p>
          </div> */}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="redeemed-deal-footer">
        <button className="cta-button">View Details</button>
        {deal.status === "re_submission_requested" && (
          <button className="cta-button">Re-submit</button>
        )}
        {deal.status === "approved" && (
          <button className="cta-button">Mark as Used</button>
        )}
      </div> */}
    </div>
  );
};

export default RedeemedDealCard;
