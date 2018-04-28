import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => (
  <section className="container">
    <div className="row">
      <h2 className="col-12">
        Loading....
        <CircularProgress />
      </h2>
    </div>
  </section>
);

export default Loading;
