"use client";
import { useGetAllRecipesQuery } from "@/src/redux/Recipes/recipeManagementApi";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import RecipeCardSkeleton from "../Skelton/RecipeCardSkeleton";

import NoDataFound from "./NoDataFound";

import { TDecodedUser } from "@/src/types/decodedUser";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { categories } from "@/src/app/user/recipe/page";
import { useDebounce } from "@/src/utils/Debounce";
import { verifyToken } from "@/src/utils/veryfyToken";
import { TRecipe } from "@/src/types/recipe";
import { handleNavigate } from "@/src/utils/handleRecipeNavigate";
import { useUserInfoQuery } from "@/src/redux/Users/userManagementApi";

export type TFilter = {
  searchTerm?: string;
  sort?: string;
  maxValue?: string;
  minValue?: string;
  category?: string;
  page?: number;
  limit?: number;
  fields?: string;
  debounceValue?: { searchTerm?: string };
};
export type TDebounceValue = {
  searchTerm?: string;
};

const AllRecipe = () => {
  const [selectCategory, setSelectCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState<TDebounceValue>({});
  const { debounceValue, loading } = useDebounce(searchValue);
  const [sortFelid, setSortFelid] = useState<TFilter>({
    limit: itemPerPage,
    page: currentPage,
    sort: "-createdAt",
  });
  const { data, isLoading } = useGetAllRecipesQuery(sortFelid);
  const [isOpen, setIsOpen] = useState(false);

  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [userDecodedInfo, setUserDecodedInfo] = useState<TDecodedUser | any>(
    {},
  );
  const { data: userData } = useUserInfoQuery(userDecodedInfo.email, {
    skip: !userDecodedInfo?.email,
  });
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      const decodedToken = verifyToken(userToken) as TDecodedUser;

      if (decodedToken) {
        setUserDecodedInfo(decodedToken);
      } else {
        dispatch(logout());
      }
    } else {
      setUserDecodedInfo({});
    }
  }, [userToken]);

  useEffect(() => {
    if (debounceValue?.searchTerm) {
      setSortFelid({ ...sortFelid, searchTerm: debounceValue?.searchTerm });
    } else {
      setSortFelid({
        limit: itemPerPage,
        page: currentPage,
        sort: "-createdAt",
      });
    }
  }, [loading]);
  // handle infinity scroll
  let scrollCurrentPage = Math.ceil(data?.data?.length / itemPerPage) + 1;

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isLoading
    ) {
      setSortFelid({
        ...sortFelid,
        limit: itemPerPage,
        page: scrollCurrentPage,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, currentPage]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setSearchValue({ searchTerm: e.currentTarget.value });
    } else {
      setSearchValue({});
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (sortName: string) => {
    setSortFelid({ ...sortFelid, sort: sortName });
  };

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
    setSortFelid({ ...sortFelid, category: category });
  };
  const handleRecipeNavigate = (recipeData: TRecipe) => {
    handleNavigate(recipeData, userData?.data, router);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold ">All Recipes</h1>

      <div className="flex items-center my-3 gap-x-3">
        <div className=" flex  gap-x-5">
          <div className="relative">
            <input
              className="p-2 w-32 md:w-60 lg:w-60 outline-none border-2 focus:border-[#1BEEA2]/40 rounded-lg text-slate-500"
              id=""
              name=""
              placeholder="Search facility hare"
              type="text"
              onChange={handleSearch}
            />
            <FaSearch className="absolute text-slate-500 hover:text-black top-3 cursor-pointer right-3" />
          </div>
        </div>
        <div>
          <button
            className="cursor-pointer border-2 rounded-md text-slate-500 px-2 py-2  "
            onClick={toggleDropdown}
          >
            {" "}
            Short by{" "}
          </button>
          {isOpen && (
            <div className="absolute py-2 my-1 transition-all delay-300 flex flex-col w-56  z-50 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <button
                className="my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg"
                onClick={() => handleSort("title")}
              >
                A to Z
              </button>
              <button
                className="my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg"
                onClick={() => handleSort("-title")}
              >
                Z to A
              </button>
              <button
                className="my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg"
                onClick={() => handleSort("cookingTime")}
              >
                Time Low to High
              </button>
              <button
                className="my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg"
                onClick={() => handleSort("-cookingTime")}
              >
                Time High to Low
              </button>
              <button
                className="my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg"
                onClick={() => handleSort("-createdAt")}
              >
                New to Old
              </button>
              <button
                className="my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg"
                onClick={() => handleSort("createdAt")}
              >
                Old to New
              </button>
            </div>
          )}
        </div>
        <Button
          className="bg-red-400"
          onClick={() => (
            setSortFelid({
              limit: itemPerPage,
              page: scrollCurrentPage,
              sort: "-createdAt",
            }),
            setSelectCategory("")
          )}
        >
          Clear Filter
        </Button>
      </div>
      <div className="mb-3">
        <p className="text-lg font-semibold my-2">Categories :</p>
        <Swiper
          className="mySwiper"
          freeMode={true}
          modules={[FreeMode]}
          slidesPerView="auto" // Dynamic slides
          spaceBetween={20} // Adjust space between slides
        >
          {categories.map((category: { key: string; label: string }) => (
            <SwiperSlide key={category.key} style={{ width: "150px" }}>
              <button
                className={`border ${selectCategory === category.key && "bg-[#1BEEA2]"} hover:border-[#1BEEA2] transition-all text-center rounded-lg px-4 py-1 cursor-pointer`}
                onClick={() => handleSelectCategory(category.key)}
              >
                <h1>{category.label}</h1>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <div className='flex overflow-x-scroll'>
                    {
                        categories.map((category: { key: string, label: string }) => (
                            <div key={category.label} className='border flex px-3'>
                                <h1>{category.label}</h1>
                            </div>
                        ))
                    }
                </div> */}
      </div>
      {data?.data?.length < 1 ? (
        <NoDataFound />
      ) : isLoading || loading ? (
        <RecipeCardSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.data?.map((recipe: any) => (
            <div
              key={recipe._id}
              className="relative hover:border-[#1BEEA2] transition-all border border-gray-200 rounded-lg shadow-md overflow-hidden group transform  hover:shadow-xl"
              role="button"
              onClick={() => handleRecipeNavigate(recipe)}
            >
              {/* Recipe Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  src={recipe.image}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity" />
              </div>

              {/* Recipe Details */}
              <div className="p-4 transition-all duration-300">
                <h2 className="text-lg font-semibold  transition-colors">
                  {recipe.title}
                </h2>
                <p className="text-sm text-gray-600 capitalize mt-2">
                  {recipe.category}
                </p>
                <p className="text-sm mt-1 ">{recipe.cookingTime} mins</p>

                {/* Floating Badge */}
                <span className="absolute top-2 right-2 bg-[#1BEEA2] text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                  {recipe.upVote.length} Up votes
                </span>
                {recipe.premiumStatus && (
                  <span className="absolute top-1 left-1 text-xs font-semibold px-1 py-1 rounded-full shadow-md">
                    <img
                      alt=""
                      className="w-5 h-5"
                      src="https://res.cloudinary.com/depy0i4bl/image/upload/v1734539867/crown_bqhoe1.png"
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll
            {hasMore && (
                <button
                    onClick={loadMore}
                    className="mt-6 p-2 bg-primary text-white rounded-lg"
                >
                    Load More
                </button>
            )} */}
    </div>
  );
};

export default AllRecipe;
