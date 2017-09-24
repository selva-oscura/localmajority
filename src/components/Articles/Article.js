import React, { Component } from 'react';

class Article extends Component {
	render() {
		console.log('props', this.props);
		return (
			<article className="Article">
				article
			</article>
		)
	}

}

export default Article;
