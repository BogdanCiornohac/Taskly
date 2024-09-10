import React from "react";
import "./LandingCardInfo.css";

type LandingCardInfoProps = {
  title: string;
  description: string;
  image: string;
};

const LandingCardInfo: React.FC<LandingCardInfoProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="card-landing-container">
      <div className={`card-info-img ${image}`} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default LandingCardInfo;
