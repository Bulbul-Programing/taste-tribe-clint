import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
            <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600 mb-8">
                    We would love to hear from you! Feel free to reach out using any of the methods below.
                </p>
                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-xl shadow-sm">
                        <FaEnvelope className="text-blue-600 text-2xl" />
                        <span className="text-gray-700 text-lg">support@tastetribe.com</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-xl shadow-sm">
                        <FaPhoneAlt className="text-green-600 text-2xl" />
                        <span className="text-gray-700 text-lg">+880 1333333333</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-xl shadow-sm">
                        <FaMapMarkerAlt className="text-red-600 text-2xl" />
                        <span className="text-gray-700 text-lg">Dhaka, Bangladesh</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;