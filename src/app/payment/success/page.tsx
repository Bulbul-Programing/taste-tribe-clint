import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const page = () => {
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-lg">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Your payment has been processed successfully. Thank you for your purchase!
                </p>
                <Link href="/" className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold text-lg">
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
};

export default page;