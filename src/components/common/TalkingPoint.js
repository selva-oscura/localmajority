import React, { Component } from 'react';

class TalkingPoint extends Component {
  componentDidMount() {
    let { body } = this.props.talkingPoint;
    let tpBodySpace = document.getElementsByClassName('tpBody')[0];
    if (body) {
      let d = document.createElement('div');
      d.innerHTML = body;
      tpBodySpace.appendChild(d);
    }
  }
  render() {
    let { title } = this.props.talkingPoint;
    return (
      <div className="TalkingPoint">
        <h2>{title}</h2>
        <div className="tpBody" />
      </div>
    );
  }
}

export default TalkingPoint;
