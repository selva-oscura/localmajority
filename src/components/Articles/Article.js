import React, { Component } from 'react';
import axios from 'axios';


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
