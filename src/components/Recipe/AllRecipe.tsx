"use client"
import { useGetAllRecipesQuery } from '@/src/redux/Recipes/recipeManagementApi';
import RecipeCard from './RecipeCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@/src/utils/Debounce';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'sonner';
import { SearchIcon } from '../UI/icons';
import { categories } from '@/src/app/user/recipe/page';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, FreeMode } from 'swiper/modules';
import { Button } from '@nextui-org/react';

export type TFilter = {
    searchTerm?: string;
    sort?: string;
    maxValue?: string;
    minValue?: string;
    category?: string;
    page?: number;
    limit?: number;
    fields?: string;
    debounceValue?: { searchTerm?: string }
}
type TDebounceValue = {
    searchTerm?: string
}

const AllRecipe = () => {
    const [selectCategory, setSelectCategory] = useState('')
    const [modalLoading, setModalLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    const [searchValue, setSearchValue] = useState<TDebounceValue>({});
    const { debounceValue, loading } = useDebounce(searchValue);
    const [sortFelid, setSortFelid] = useState<TFilter>({ limit: itemPerPage, page: currentPage, sort: "-createdAt" })
    const { data, isLoading } = useGetAllRecipesQuery(sortFelid)
    const [isOpen, setIsOpen] = useState(false)
    console.log(data);
    const numberOfPage = Math.ceil(Number(data?.data.length) / itemPerPage);
    // const pages = [...Array(numberOfPage).keys()];

    // const handleMinMax = (e: any) => {
    //     e.preventDefault();
    //     const minValue = e.currentTarget.minimum.value;
    //     const maxValue = e.currentTarget.maximum.value;

    //     if (!minValue || !maxValue) {
    //         return toast.error("Please Set Price Value");
    //     }
    //     if (Number(maxValue) <= Number(minValue)) {
    //         return toast.error("Please provide grater then value form minimum value");
    //     }
    //     setSortFelid({
    //         ...sortFelid,
    //         minValue: minValue,
    //         maxValue: maxValue,
    //     });
    //     setCurrentPage(1);
    // };

    useEffect(() => {
        if (debounceValue.searchTerm) {
            setSortFelid({ ...sortFelid, searchTerm: debounceValue?.searchTerm })
        }
        else {
            setSortFelid({ limit: itemPerPage, page: currentPage, sort: "-createdAt" })
        }
    }, [loading])

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 0) {
            setSearchValue({ searchTerm: e.currentTarget.value });
        } else {
            setSearchValue({});
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleSort = (sortName: string) => {
        setSortFelid({ ...sortFelid, sort: sortName })
    }

    const handleSelectCategory = (category: string) => {
        setSelectCategory(category)
        setSortFelid({ ...sortFelid, category: category })
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold ">All Recipes</h1>

            <div className='flex items-center my-3 gap-x-3'>
                <div className=" flex  gap-x-5">
                    <div className="relative">
                        <input onChange={handleSearch} placeholder="Search facility hare" className="p-2 w-32 md:w-60 lg:w-60 outline-none border-2 focus:border-[#1BEEA2]/40 rounded-lg text-slate-500" type="text" name="" id="" />
                        <FaSearch className="absolute text-slate-500 hover:text-black top-3 cursor-pointer right-3"></FaSearch>
                    </div>
                </div>
                <div>
                    <button className="cursor-pointer border-2 rounded-md text-slate-500 px-2 py-2  " onClick={toggleDropdown}> Short by </button>
                    {isOpen && (
                        <div className='absolute py-2 my-1 transition-all delay-300 flex flex-col w-56  z-50 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
                            <button onClick={() => handleSort('title')} className='my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg'>A to Z</button>
                            <button onClick={() => handleSort('-title')} className='my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg'>Z to A</button>
                            <button onClick={() => handleSort('cookingTime')} className='my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg'>Time Low to High</button>
                            <button onClick={() => handleSort('-cookingTime')} className='my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg'>Time High to Low</button>
                            <button onClick={() => handleSort('-createdAt')} className='my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg'>New to Old</button>
                            <button onClick={() => handleSort('createdAt')} className='my-1 w-[95%] hover:bg-[#1BEEA2] mx-auto py-1 border rounded-lg'>Old to New</button>
                        </div>
                    )}
                </div>
                <Button onClick={() => setSortFelid({ limit: itemPerPage, page: currentPage, sort: "-createdAt" })} className='bg-red-400'>Clear Filter</Button>
            </div>
            <div className='mb-3'>
                <p className='text-lg font-semibold my-2'>Categories :</p>
                <Swiper
                    slidesPerView="auto" // Dynamic slides
                    spaceBetween={20} // Adjust space between slides
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    {categories.map((category: { key: string; label: string }) => (
                        <SwiperSlide key={category.key} style={{ width: "150px" }}>
                            <button onClick={() => handleSelectCategory(category.key)} className={`border ${selectCategory === category.key && 'bg-[#1BEEA2]'} hover:border-[#1BEEA2] transition-all text-center rounded-lg px-4 py-1 cursor-pointer`}>
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
            {/* Recipe Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.data?.map((recipe: any) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>

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