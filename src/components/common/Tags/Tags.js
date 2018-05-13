import React from 'react';
import { Link } from 'react-router-dom';

const Tags = ({ tags, tagRoute }) => (
  <div className="Tags flex-container flex-wrap flex-start">
    {tags.map(tag => (
      <Link key={tag} to={`/${tagRoute}/${tag}`} className="tag">{tag}
      </Link>
    ))}
  </div>
)

export default Tags;