"use client";
const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-md p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-10"
        style={{
          backgroundImage: "url(https://source.unsplash.com/300x300/?abstract)",
        }}
      />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1BEEA2]   rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-30" />

      <svg
        className="h-28 w-28 text-blue-400 animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.75 9.75h4.5m-6 4.5h6m-7.5 4.5h9M4.5 6h15M4.5 21h15c.621 0 1.125-.504 1.125-1.125V4.125C20.625 3.504 20.121 3 19.5 3h-15c-.621 0-1.125.504-1.125 1.125v15.75C3.375 20.496 3.879 21 4.5 21z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Heading */}
      <h2 className="mt-6 text-2xl font-bold text-gray-700">
        Oops! No Data Found
      </h2>
      <p className="text-center text-gray-500 text-base max-w-md mt-2">
        We couldn’t find anything to display right now. Try refreshing the page
        or come back later.
      </p>
    </div>
  );
};

export default NoDataFound;
