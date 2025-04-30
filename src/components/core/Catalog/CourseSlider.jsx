import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation} from "swiper/modules"; 

import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {
        Courses?.length > 0 ? (
        <Swiper
          slidesPerView={1} 
          spaceBetween={25}
          loop={Courses.length > 3} //  Loop only if more than 3 slides
          autoplay={{ delay: 2500, disableOnInteraction: false }} 
          navigation={true} 
        //   pagination={{ clickable: true }}
          modules={[Autoplay, FreeMode, Navigation, ]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full max-h-[30rem] overflow-hidden"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;




