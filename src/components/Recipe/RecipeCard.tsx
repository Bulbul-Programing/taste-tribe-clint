import Link from 'next/link';
import React from 'react';

interface RecipeCardProps {
    recipe: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    ;

    return (
        <Link
            className="relative hover:border-[#1BEEA2] transition-all border border-gray-200 rounded-lg shadow-md overflow-hidden group transform  hover:shadow-xl"
            href={`/recipeDetails/${recipe._id}`}
        >
            {/* Recipe Image */}
            <div className="h-48 overflow-hidden relative">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity"></div>
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
            </div>
        </Link>
    );
};

export default RecipeCard;
