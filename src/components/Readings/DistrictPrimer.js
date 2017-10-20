// import React from 'react';
import React, { Component } from 'react';

class DistrictPrimer extends Component {
  componentDidMount() {
    let { reading } = this.props;
    let readingSpace = document.getElementById('reading-body');
    if (reading.bodyText) {
      let d = document.createElement('div');
      d.id = 'reading-{$i}';
      d.innerHTML = reading.bodyText;
      readingSpace.appendChild(d);
    }

    // this.fetchData();
    // let articles = this.state.articles;

    // let articles = [
    //   "<p>Filler text because we don't consistently have data......  Lorem ipsum, blah, blah, blah.....</p>",
    // ];
    // console.log('this.state.articles', articles);
    // if (articles.length) {
    //   let articleSpace = document.getElementById('article-space');
    //   articles.forEach((article, i) => {
    //     // console.log("count", i)
    //     let d = document.createElement('div');
    //     d.id = `article-{$i}`;
    //     d.innerHTML = article;
    //     articleSpace.appendChild(d);
    //   });
    // }
  }
  render() {
    let { title, author, description, created } = this.props.reading;
    return (
      <article className="DistrictPrimer">
        <h2>{title}</h2>
        {author ? (
          <h3>by {author}</h3>
        ) : (
          <h3>MISSING AUTHOR INFORMATION</h3>
        )}
        <h4>Last Updated: {created.slice(0, 10)}</h4>
        <p>{description}</p>
        <div id="reading-body" />
      </article>
    );
  }
}

export default DistrictPrimer;
