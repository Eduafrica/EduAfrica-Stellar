
import Arrow from '../../assets/svg/drawn-arrow.svg';
import Featured from '../../assets/svg/featured.svg';
import Features from '../../Component/Instructor/Features';
import Footer from '../../Component/Instructor/Footer';
import Hero from '../../Component/Instructor/Hero';
import Testimonial from '../../Component/Instructor/Testimonial';
import Navbar from '../../Component/Navbar';


const InstructorHome = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="lg:w-2/4">
            {/* Header Section */}
            <div className="text-left mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                So Many Reasons To Start
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Powerful, self-serve product and growth analytics to help you
                convert, engage, and retain more users. Trusted by over 4,000
                startups.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="space-y-4">
                <div className="flex flex-col items-start">
                  <img
                    src={Featured}
                    className="h-10 w-10 text-yellow-500 mr-2 mb-2"
                    alt=""
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Share team inboxes
                  </h3>
                </div>
                <p className="text-gray-600">
                  Whether you have a team of 2 or 200, our shared team inboxes
                  keep everyone on the same page and in the loop.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-4">
                <div className="flex flex-col items-start">
                  <img
                    src={Featured}
                    className="h-10 w-10 text-yellow-500 mr-2 mb-2"
                    alt=""
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Manage your team with reports
                  </h3>
                </div>
                <p className="text-gray-600">
                  Measure what matters with Untitled's easy-to-use reports. You
                  can filter, export, and drilldown on the data in a couple
                  clicks.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-4">
                <div className="flex flex-col items-start">
                  <img
                    src={Featured}
                    className="h-10 w-10 text-yellow-500 mr-2 mb-2"
                    alt=""
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Deliver instant answers
                  </h3>
                </div>
                <p className="text-gray-600">
                  An all-in-one customer service platform that helps you balance
                  everything your customers need to be happy.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-4">
                <div className="flex flex-col items-start">
                  <img
                    src={Featured}
                    className="h-10 w-10 text-yellow-500 mr-2 mb-2"
                    alt=""
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Connect with customers
                  </h3>
                </div>
                <p className="text-gray-600">
                  Solve a problem or close a sale in real-time with chat. If no
                  one is available, customers are seamlessly routed to email
                  without confusion.
                </p>
              </div>
            </div>
          </div>

          {/* Right Arrow Section - Hidden on mobile */}
          <div className="lg:w-1/4 hidden lg:flex items-center justify-center relative">
            {/* <svg
              className="h-64 w-auto absolute right-0 top-0"
              viewBox="0 0 100 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M90 10C70 50 70 150 90 190C110 230 70 270 50 310C30 350 70 390 90 390"
                stroke="#4F46E5"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M95 385L75 375L95 355"
                stroke="#4F46E5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            <img
              src={Arrow}
              className="h-64 w-auto absolute left-0 top-0"
              alt=""
            />
          </div>
        </div>
      </div>
      <Features />
      <Testimonial />
      <Footer />
    </>
  );
};

export default InstructorHome;
