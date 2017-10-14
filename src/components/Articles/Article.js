// import React from 'react';
import React, { Component } from 'react';

class Article extends Component {
  componentDidMount() {
    let { article } = this.props;
    let articleSpace = document.getElementById('article-body');
    if (article.bodyText) {
      let d = document.createElement('div');
      d.id = 'article-{$i}';
      d.innerHTML = article.bodyText;
      articleSpace.appendChild(d);
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
    let { article } = this.props;
    return (
      <article className="Article">
        <h2>{article.title}</h2>
        {article.author ? (
          <h3>by {article.author}</h3>
        ): (
          <h3>MISSING AUTHOR INFORMATION</h3>
        )
        }
        <h4>Last Updated: {article.created.slice(0,10)}</h4>
        <p>{article.description}</p>
        <div id="article-body" />
      </article>
    );
  }
}

export default Article;
