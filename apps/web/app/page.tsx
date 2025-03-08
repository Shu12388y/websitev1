// app/page.js
import Image from "next/image";
import Link from "next/link";
// import { FaCalendarAlt, FaClipboardList, FaComments, FaUserMd } from 'react-icons/fa';

export default function Home() {
  const products = [
    {
      id: 1,
      image: "/product1.jpg",
      price: 49.99,
      originalPrice: 80,
      title: "Wireless Headphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Labore nobis iure obcaecati pariatur. Officiis qui, enim cupiditate aliquam...",
    },
    {
      id: 2,
      image: "/product2.jpg",
      price: 49.99,
      originalPrice: 80,
      title: "Wireless Headphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Labore nobis iure obcaecati pariatur. Officiis qui, enim cupiditate aliquam...",
    },
    {
      id: 3,
      image: "/product3.jpg",
      price: 49.99,
      originalPrice: 80,
      title: "Wireless Headphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Labore nobis iure obcaecati pariatur. Officiis qui, enim cupiditate aliquam...",
    },
  ];

  // Categories
  const categories = [
    "Erectile Dysfunction",
    "Premature Ejaculation",
    "Low Testosterone",
  ];
  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="px-8 py-4 flex items-center justify-between">
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Sexuloon Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/"
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/"
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            Home
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button aria-label="Account" className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          <button aria-label="Cart" className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <span className="text-blue-500 font-medium">
                Certificate Doctor's
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                Empowering Mens Sexual Health
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Consultation Box 1 */}
              <div className="p-4 border border-gray-200 rounded-lg flex items-start">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  {/* <FaComments className="text-blue-500 text-xl" /> */}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Get Free Consultation
                  </h3>
                  <p className="text-sm text-gray-500">
                    lorem wulki kasdflis sdfsdfrw sdasa
                  </p>
                </div>
              </div>

              {/* Consultation Box 2 */}
              <div className="p-4 border border-gray-200 rounded-lg flex items-start">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  {/* <FaClipboardList className="text-blue-500 text-xl" /> */}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Get Free Consultation
                  </h3>
                  <p className="text-sm text-gray-500">
                    lorem wulki kasdflis sdfsdfrw sdasa
                  </p>
                </div>
              </div>

              {/* Consultation Box 3 */}
              <div className="p-4 border border-gray-200 rounded-lg flex items-start">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  {/* <FaCalendarAlt className="text-blue-500 text-xl" /> */}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Get Free Consultation
                  </h3>
                  <p className="text-sm text-gray-500">
                    lorem wulki kasdflis sdfsdfrw sdasa
                  </p>
                </div>
              </div>

              {/* Consultation Box 4 */}
              <div className="p-4 border border-gray-200 rounded-lg flex items-start">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  {/* <FaUserMd className="text-blue-500 text-xl" /> */}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Get Free Consultation
                  </h3>
                  <p className="text-sm text-gray-500">
                    lorem wulki kasdflis sdfsdfrw sdasa
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full flex items-center">
                Get Started Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content - Doctor Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/doctor.jpg"
                alt="Doctor"
                width={600}
                height={650}
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </main>

      {/* feature */}
      <div className="container mx-auto px-4 py-16">
        {/* Steps Section */}
        <div className="text-center mb-16">
          <p className="text-blue-500 font-medium mb-4">Fastest Solution</p>
          <h2 className="text-4xl font-bold mb-12">
            4 Easy Step And Get Your Solution
          </h2>

          <div className="flex flex-wrap justify-center gap-12 mt-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                <Image
                  src="/chat-image.jpg"
                  alt="Chat with AI"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-medium text-lg">
                Chat With our A.I. Chat Bot
              </h3>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                <Image
                  src="/medicine-image.jpg"
                  alt="Recommended Medicine"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-medium text-lg">
                Get the Recommended Medicine
              </h3>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                <Image
                  src="/doctor-consult.jpg"
                  alt="Consult The Doctor"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-medium text-lg">Consult The Doctor</h3>
            </div>

            {/* Step 4 - Empty in the UI, but adding for completeness */}
            <div className="flex flex-col items-center max-w-xs invisible md:visible">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                <Image
                  src="/delivery-image.jpg"
                  alt="Get Delivery"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-medium text-lg">Get Fast Delivery</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Best Sellers Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-blue-500 mb-8">Best Seller's</h2>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="h-64 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <h3 className="font-medium mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                    Add to Cart
                  </button>
                  <button className="flex-1 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        {/* Doctor Consultation Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-32">
          {/* Doctor Image - Left Side */}
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/doctor-consultation.jpg"
                alt="Doctor consulting with patient"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="md:w-1/2">
            <div className="space-y-4">
              <p className="text-blue-600 font-medium uppercase tracking-wider text-sm">
                FIND YOUR DOCTOR
              </p>
              <h2 className="text-4xl font-bold text-gray-900">
                Consult With A Doctor
              </h2>
              <p className="text-gray-600">
                Get expert medical advice from licensed professionals.
              </p>

              <div className="pt-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full flex items-center transition-colors">
                  Book Now
                  {/* <FaCalendar className="ml-2" /> */}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Q&A Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content - Left Side */}
          <div className="md:w-1/2 border border-blue-100 rounded-xl p-8">
            <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-4">
              POST A QUESTION
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Post Your Questions Our Experts are ready to answer
            </h2>

            <p className="text-gray-600 mb-6">
              Curabitur gravida arcu ac tortor dignissim convallis aenean et.
              Mattis dictum at tempor commodo. Consectetur lorem donec massa
              sapien faucibus et molestie. Donec et odio pellentesque diam
              volutpat commodo sed.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <div className="bg-white rounded-full w-1.5 h-1.5"></div>
                </div>
                <span className="text-gray-700">
                  Dictum sit amet justo donec enim diam vulputate
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <div className="bg-white rounded-full w-1.5 h-1.5"></div>
                </div>
                <span className="text-gray-700">
                  Arcu cursus vitae congue mauris rhoncus aenean vel elit
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <div className="bg-white rounded-full w-1.5 h-1.5"></div>
                </div>
                <span className="text-gray-700">
                  Potenti nullam ac tortor vitae puru
                </span>
              </li>
            </ul>
          </div>

          {/* Expert Image - Right Side */}
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/expert-doctor.jpg"
                alt="Medical Expert"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
