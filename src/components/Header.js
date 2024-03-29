import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToContact = () => {
    navigate("/contact");
  };

  const navigateToWorks = () => {
    navigate("/works");
  };

  const navigateToPricingAndPolicies = () => {
    navigate("/pricing-and-policies");
  };

  return (
    <div className="header">
      <div className="header__linksContainer">
        <div className="header__siteTitle" onClick={navigateToHome}>
          Curtis Ung Photography
        </div>
        <div className="header__right">
          <div className="header__works" onClick={navigateToWorks}>
            Works
          </div>
          <div className="header__contact" onClick={navigateToContact}>
            Contact
          </div>
          <div
            className="header__pricing"
            onClick={navigateToPricingAndPolicies}
          >
            Pricing
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
