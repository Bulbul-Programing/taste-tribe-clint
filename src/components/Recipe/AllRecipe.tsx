"use client"
import { useGetAllRecipesQuery } from '@/src/redux/Recipes/recipeManagementApi';
import RecipeCard from './RecipeCard';
import { useState } from 'react';

const AllRecipe = () => {
    const { data, isLoading } = useGetAllRecipesQuery(undefined)
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-primary mb-6">All Recipes</h1>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    className="border border-gray-300 p-2 rounded-lg flex-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border border-gray-300 p-2 rounded-lg"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="name">Sort by Name</option>
                    <option value="cookingTime">Sort by Cooking Time</option>
                    <option value="category">Sort by Category</option>
                    <option value="upVote">Sort by Upvotes</option>
                </select>
                <select
                    className="border border-gray-300 p-2 rounded-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="desserts">Desserts</option>
                    <option value="appetizers">Appetizers</option>
                    {/* Add other categories */}
                </select>
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