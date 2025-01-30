import Image from "next/image";
import Link from "next/link";


export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover the story behind our recipe-sharing community.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative w-full flex justify-center lg:h-auto">
            <Image
              src="https://res.cloudinary.com/depy0i4bl/image/upload/v1737307479/5615615_2950171_syiru6.jpg"
              alt="Cooking together"
              objectFit="cover"
              className="rounded-lg shadow-lg"
              width={550}
              height={200}
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              A Passion for Cooking and Sharing
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Welcome to our recipe-sharing platform, where food enthusiasts,
              home cooks, and culinary professionals come together to inspire
              and be inspired. We believe cooking is more than just a daily
              task—it’s a way to connect, create, and celebrate.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
              Our mission is to provide a space where everyone, from beginners
              to experts, can share their favorite recipes, learn new skills,
              and enjoy the art of cooking. Whether you are here to find
              mouthwatering recipes, showcase your culinary creations, or
              explore cooking tips, you’re in the right place.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Community
              </h3>
              <p className="text-gray-600">
                We are committed to building a welcoming space where everyone
                feels valued and included.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Creativity
              </h3>
              <p className="text-gray-600">
                We celebrate the art of cooking and encourage innovative and
                creative culinary ideas.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Inspiration
              </h3>
              <p className="text-gray-600">
                We aim to inspire and be inspired by diverse recipes and
                cooking styles from around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            Become a part of our vibrant community and start sharing your
            culinary creations today.
          </p>
          <Link href='/register' className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300">
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}
