import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductSlider = () => {
  // Use these high-quality direct links to ensure they show up
  const slides = [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&h=400&q=80",
      title: "Big Billion Days" 
    },
    { 
      id: 2, 
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&h=400&q=80",
      title: "Premium Headphones" 
    },
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&h=400&q=80",
      title: "New Smartwatch Deals" 
    }
  ];

  return (
    <div className="container mt-3 mb-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true} 
        pagination={{ clickable: true }} 
        autoplay={{ delay: 3000 }} 
        loop={true}
        className="rounded-3 shadow"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Verify that src={slide.img} matches the key in your array */}
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-100" 
              style={{ height: '300px', objectFit: 'cover' }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;