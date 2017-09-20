import React, { Component } from 'react';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App"
      >
        <Header 
          props={this.props.children}
        />
        {this.props.children}
      </div>
    );
  }
}

export default App;
