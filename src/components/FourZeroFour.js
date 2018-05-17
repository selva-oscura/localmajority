import React, { Component } from 'react';
import Section from './common/Section/Section';

class FourZeroFour extends Component {
	componentDidMount() {
		this.props.history.push('/');
	}
	render(){
	  return (
      <article className="FourZeroFour">
		    <Section
		      hasContainer={true}
		      spacingAbove={3}
		      spacingBelow={3}
		      background="light"
		    >
			    <div className="row">
			      <div className="col-12">
			        <p>Page Not Found</p>
			        <a href="/">Return to Home</a>
			      </div>
			    </div>
		    </Section>
	    </article>
	  );
	}
};

export default FourZeroFour;
