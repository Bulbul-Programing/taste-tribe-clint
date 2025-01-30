import React from 'react';

const page = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions or feedback? We’d love to hear from you!
                    </p>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
                    <form className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Name"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Email"
                            />
                        </div>

                        {/* Message Input */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Message"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Details */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg mb-4">
                        Email us at <a href="mailto:support@example.com" className="text-blue-600">support@example.com</a>
                    </p>
                    <p className="text-gray-600 text-base md:text-lg">
                        Call us at <a href="tel:+123456789" className="text-blue-600">+1 234 567 89</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;