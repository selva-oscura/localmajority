import React from 'react';
import ButtonLink from './ButtonLink';
import TwitterTimeline from './TwitterTimeline';
import { SocialIcon, SocialIcons } from 'react-social-icons';
let urls = [
  'http://jaketrent.com',
  'http://twitter.com/jaketrent',
  'http://linkedin.com/in/jaketrent',
  'http://www.pinterest.com/jaketrent/artsy-fartsy/'
];

const Elements = () => (
	<article>
		
		<h1>Elements: this page at ./src/components/common/Elements</h1>
		
		<hr />
		
		<h2>ButtonLink: file at ./src/components/common/ButtonLink</h2>
		<div className="row">
			<ButtonLink
				link="https://blah.com"
				kind="primary"
				label="Primary Button offsite"
				offsite={true}
			/>
			<ButtonLink
				link="https://google.com"
				kind="secondary"
				label="Secondary Button offsite no offsite param"
			/>
			<ButtonLink
				link="/issues"
				kind="secondary"
				label="Secondary Button onsite"
				offsite={false}
			/>
			<ButtonLink
				link="/districts/2"
				kind="tertiary"
				label="Tertiary Button onsite"
				offsite={false}
			/>
		</div>

		<hr />

		<h2>SocialIcon: documentation for SocialIcon (react-social-icons) can be found at <a href="http://jaketrent.github.io/react-social-icons/" target="new">http://jaketrent.github.io/react-social-icons/</a></h2>
		<h3>SocialIcon&rsquo;s css defaults are imported from the npm'd component, but <code>margin-right: 8px</code> was set in the global scope in index.css</h3>
		<h3><code>url</code> parameter generally used to determine which icon displayed</h3>
		<div className="row">
			<SocialIcon 
				url={`https://www.facebook.com/${"localmajority"}`}
			/>
			<SocialIcon 
				url={`https://www.twitter.com/${"localmajority"}`}
			/>
			<h3><code>network</code> parameter can also be used to denote network if url doesn't make it clear</h3>
			<SocialIcon 
				url="http://jaketrent.com"
				network="tumblr"
			/>
			<h3><code>color</code> parameter can be used to override default color associated with network</h3>
			<SocialIcon 
				network="twitter"
				color="#ff5a01"
			/>
			<h3>multiple icons can be set using <code>SocialIcons</code> API and an array</h3>
			<SocialIcons urls={urls} />
			<h3>color for multiple icons can be set using <code>SocialIcons</code> API, an array, and <code>color</code> parameter</h3>
			<SocialIcons urls={urls} color="black" />
		</div>

		<hr />

		<h2>TwitterTimeline: file at ./src/components/common/TwitterTimeline</h2>
		<div className="row">
			<TwitterTimeline
				twitterHandle="1_selva_oscura"
			/>
		</div>
		<hr />

	</article>	
);

export default Elements;
