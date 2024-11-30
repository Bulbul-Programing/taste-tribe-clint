import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoTimerOutline } from "react-icons/io5";

import ShortSliderSkeleton from "../Skelton/ShortSliderSkeleton";

import { useGetAllRecipesQuery } from "@/src/redux/Recipes/recipeManagementApi";
import { TRecipe } from "@/src/types/recipe";

const ShortSlider = () => {
  const { data, isLoading } = useGetAllRecipesQuery({
    sort: "cookingTime",
    limit: 8,
  });

  if (isLoading) {
    return <ShortSliderSkeleton />;
  }

  return (
    <div className="mx-5 md:mx-5 lg:mx-10">
      <div className="flex justify-center">
        <h1 className="text-4xl inline-block bg-black rounded-lg px-4 py-2 text-white font-bold">
          Cook in quick time
        </h1>
      </div>
      <div className="my-10 flex flex-col md:flex-col lg:flex-row justify-between items-center gap-y-5 gap-x-2">
        <div className=" w-full lg:w-4/6 border rounded-lg">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper"
            modules={[Pagination, Autoplay, EffectCreative]}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            parallax={true}
            spaceBetween={30}
          >
            <div>
              {data?.data?.slice(0, 5).map((recipe: TRecipe) => (
                <SwiperSlide key={recipe._id}>
                  <div className="flex flex-col-reverse md:flex-row lg:flex-row items-center">
                    <div className="p-5 md:h-3/5 lg:w-2/5">
                      <h2 className="text-2xl font-bold">{recipe.title}</h2>
                      <p className="text-base md:mt-2 lg:mt-5 text-slate-500">
                        {recipe.description.slice(0, 120)} ....
                      </p>
                      <div className="flex justify-center items-center gap-x-1 mt-3 lg:mt-5 mb-5 bg-[#1beea190] w-[115px] rounded-md py-1 px-2 text-center">
                        <IoTimerOutline className="text-base font-bold" />
                        <p className="text-xs"> {recipe.cookingTime} Minute</p>
                      </div>
                      <Link
                        className="bg-[#1BEEA2] hover:bg-[#13ce8a] px-5 py-3 rounded-lg font-medium cursor-pointer rotate-90 transition-all delay-75"
                        href={`/recipeDetails/${recipe._id}`}
                      >
                        View Details
                      </Link>
                    </div>
                    <Image
                      alt=""
                      className="w-full md:w-2/5 lg:w-3/5 object-cover md:h-[200px] lg:h-[300px] rounded-lg m-0 md:m-3 lg:m-3"
                      height={300}
                      src={recipe.image}
                      width={300}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
        <div className=" w-full lg:w-2/6 space-y-2">
          {data?.data?.slice(5, 8).map((recipe: TRecipe) => (
            <Link
              key={recipe._id}
              className="flex justify-start lg:justify-between items-center gap-x-2 border p-1 rounded-lg"
              href={`/recipeDetails/${recipe._id}`}
            >
              <Image
                alt=""
                className="w-36 h-24 object-cover rounded-lg"
                height={100}
                src={recipe.image}
                width={100}
              />
              <div>
                <p className="text-lg font-medium">
                  {recipe.title.slice(0, 18)} ...
                </p>
                <p className="text-base hidden md:block lg:hidden text-slate-500 text-sm mb-[2px]">
                  {recipe.description.slice(0, 150)} ....
                </p>
                <p className="text-base block md:hidden lg:block text-slate-500 text-sm mb-[2px]">
                  {recipe.description.slice(0, 50)} ....
                </p>
                <div className="flex justify-center items-center gap-x-1  bg-[#1beea190] w-[115px] rounded-md py-1 px-2 text-center">
                  <IoTimerOutline className="text-base font-bold" />
                  <p className="text-xs"> {recipe.cookingTime} Minute</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortSlider;
