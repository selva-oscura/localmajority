import React from 'react';
import { Carousel } from 'react-responsive-carousel';
// carousel styles
import 'react-responsive-carousel/lib/styles/carousel.css';
import './Slider.css';

const Slider = ({
  showArrows=true,
  showThumbs=false,
  showStatus=false,
  centerMode=false,
  showIndicators=true,
  interval=3000,
  transitionTime=500,
  infiniteLoop=true,
  autoPlay=true,
  emulateTouch=true,
  useKeyboardArrows=false,
  slides=[]
}) => (
  slides && slides.length
  ? (
    <div className="Slider row">
      <section className="col-12">
        <Carousel
          showArrows={showArrows}
          showThumbs={showThumbs}
          centerMode={centerMode}
          showStatus={showStatus}
          showIndicators={showIndicators}
          interval={interval}
          transitionTime={transitionTime}
          infiniteLoop={infiniteLoop}
          autoPlay={autoPlay}
          emulateTouch={emulateTouch}
          useKeyboardArrows={emulateTouch}
        >
          { slides.map((slide, i)=>(
            <div key={i}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  ) : null
);

export default Slider;
