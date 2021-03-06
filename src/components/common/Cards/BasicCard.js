import React from "react";
import { Link } from "react-router-dom";
import ImageWithBackgroundPlaceholderImage from "../ImageWithBackgroundPlaceholderImage";
import CardHover from "./CardHover";
import "./BasicCard.css";

const BasicCard = ({
  title = "",
  subtitle,
  text = "",
  route = "",
  slug = "",
  imageSrc = "",
  aspectRatio = "100"
}) => (
  <Link to={`/${route}/${slug}`}>
    <CardHover>
      <div className="BasicCard">
        <ImageWithBackgroundPlaceholderImage
          imageSrc={imageSrc}
          imageAlt={title}
          aspectRatioInPercent={aspectRatio}
        />
        <div className="contents">
          <h3 className="title">{title}</h3>
          {subtitle && <h4>{subtitle}</h4>}
          {text && <p>{text}</p>}
        </div>
      </div>
    </CardHover>
  </Link>
);

export default BasicCard;
