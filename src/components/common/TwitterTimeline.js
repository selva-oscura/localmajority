import React, { PureComponent } from 'react'
import { Timeline } from 'react-twitter-widgets'
import './TwitterTimeline.css';

class TwitterTimeline extends PureComponent {
  render () {
    return (
      <div className="TwitterTimeline">
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: this.props.twitterHandle,
          }}
          options={{
            height: '600',
          }}
        />
       <div className="mask"></div>
     </div>
    )
  }
}

export default TwitterTimeline;