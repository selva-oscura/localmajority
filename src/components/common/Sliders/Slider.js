import React from 'react';
import { Carousel } from 'react-responsive-carousel';
// general styles
import 'react-responsive-carousel/lib/styles/main.css';
// carousel styles
import 'react-responsive-carousel/lib/styles/carousel.css';

const Slider = () => (
  <div className="row">
    <section className="col-12">
      <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
        <div>
          <img src="assets/1.jpeg" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="assets/2.jpeg" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="assets/3.jpeg" />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src="assets/4.jpeg" />
          <p className="legend">Legend 4</p>
        </div>
        <div>
          <img src="assets/5.jpeg" />
          <p className="legend">Legend 5</p>
        </div>
        <div>
          <img src="assets/6.jpeg" />
          <p className="legend">Legend 6</p>
        </div>
      </Carousel>
    </section>
  </div>
);

export default Slider;
