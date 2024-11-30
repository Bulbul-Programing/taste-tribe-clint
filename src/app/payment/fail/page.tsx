import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

const paymentFail = () => {
  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-lg">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-8">
          Unfortunately, your payment could not be processed. Please try again
          later.
        </p>
        <Link
          className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105 font-semibold text-lg"
          href="/"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default paymentFail;
