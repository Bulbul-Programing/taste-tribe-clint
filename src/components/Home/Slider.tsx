import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";

import { sliderData } from "./sliderJSONData";

const Slider = () => {
    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    // Mobile (screen width < 640px)
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    // Tablet (screen width between 640px and 1024px)
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                    // Laptop/PC (screen width >= 1024px)
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                className="mySwiper"
                freeMode={true}
                modules={[FreeMode, Autoplay, Pagination]}
                slidesPerView={4}
                spaceBetween={30}
            >
                {sliderData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group rounded-lg w-full overflow-hidden">
                            <Image
                                alt=""
                                className="rounded-lg overflow-hidden group-hover:scale-110 transition-all duration-250 ease-in"
                                height="250"
                                src={slide.image}
                                width="300"
                            />
                            <div className="absolute bg-black/40 inset-0 flex items-center justify-center text-white ">
                                <div>
                                    <p className="bg-[#1BEEA2] px-2 py-[2px] text-black rounded-sm text-xs">{slide.category}</p>
                                    <p className="mt-2 relative inline-block cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-500">{slide.foodName}</p>
                                    <div className="flex mt-1 text-xs items-center">
                                        <FaRegClock className="text-[#1BEEA2]" />
                                        <p className="ml-2"> {slide.createdDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
