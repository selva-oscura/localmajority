import React from "react";
import { Link } from "react-router-dom";
import { strToTitleCase } from "../../../utils/functions";
import "./Tags.css";

const Tags = ({ tags, tagRoute }) => (
  <div className="Tags flex-container flex-wrap flex-start">
    {tags.map(tag => (
      <Link key={tag.slug} to={`/${tagRoute}/${tag.slug}`} className="tag">
        {strToTitleCase(tag.title)}
      </Link>
    ))}
  </div>
);

export default Tags;
