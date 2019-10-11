import React, { Component } from 'react';
import ShopCard from 'components/ShopCard';
import 'components/CarouselCard/CarouselCard.css';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import petBackground from 'constants/PetBackground';

class CarouselShop extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      focusOnSelect: true
    };
    const slides = petBackground.map((item, index) => {
      return (
        <div key={index}>
          <ShopCard key={index} src={item.src} name={item.name} limit={item.limit} />
        </div>
      );
    });
    return (
      <div>
        <Slider {...settings}>{slides}</Slider>
      </div>
    );
  }
}

export default CarouselShop;
