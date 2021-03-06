import React, { Component } from "react";
import Paper from "material-ui/Paper";
import PropTypes from "prop-types";
import "./CardHover.css";

class CardHover extends Component {
  constructor(props) {
    super(props);
    this.state = { depth: 0 };
  }
  onMouseOver = () => this.setState({ depth: 1 });
  onMouseOut = () => this.setState({ depth: 0 });
  render() {
    let { imgShape } = this.props;
    let aspectRatio = imgShape || "";
    return (
      <div
        className={`CardHover ${aspectRatio}`}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <Paper zDepth={this.state.depth} style={{ height: "100%" }}>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}

export default CardHover;
