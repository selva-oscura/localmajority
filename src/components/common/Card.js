import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { depth: 2 };
  }
  onMouseOver = () => this.setState({ depth: 3 });
  onMouseOut = () => this.setState({ depth: 2 });
  render() {
    let {
      id,
      cardTitle,
      cardSubtitle,
      cardText,
      imgSrc,
      category,
      slug,
      imgShape,
    } = this.props;
    let aspectRatio = imgShape || '';
    return (
      <div
        className={`Card ${aspectRatio}`}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <Paper zDepth={this.state.depth}>
          <Link to={`/${category}/${slug}`}>
            <div className="image-holder">
              <img
                className="placeholder-image"
                alt={`placeholder for ${cardTitle}`}
                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23CCC%22%20d%3D%22M21%2019V5c0-1.1-.9-2-2-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2zM8.5%2013.5l2.5%203.01L14.5%2012l4.5%206H5l3.5-4.5z%22%2F%3E%3C%2Fsvg%3E"
              />
              <img className="actual-image" src={imgSrc} alt={cardTitle} />
            </div>
            <h3>{cardTitle}</h3>
            {cardSubtitle && <h4>{cardSubtitle}</h4>}
            <p>{cardText}</p>
          </Link>
        </Paper>
      </div>
    );
  }
}

export default Card;
