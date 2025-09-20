import { Link } from 'react-router';
import LogoImg from '../../assets/images/logo.png';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-white w-full pt-8 md:pt-16 pb-6 md:pb-12 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-16">
      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">
        <div className="flex flex-col gap-4 md:gap-8 w-full md:w-auto">
          <img
            alt="educafrica logo"
            src={LogoImg}
            className="w-20 md:w-24 lg:w-28 mx-auto md:mx-0"
          />
          <p className="text-sm md:text-base font-medium text-[#1D2939] text-center md:text-left w-full md:w-80 lg:w-96">
            Transforming learning experience with data-driven insight,
            AI-powered tools, and expertise combined
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-16 w-full md:w-auto">
          <div className="flex flex-col gap-3 md:gap-4">
            <p className="font-semibold text-[#344054] text-sm md:text-base text-center sm:text-left">
              Resources
            </p>
            <div className="flex flex-col gap-2 md:gap-3 text-[#344054] font-medium text-sm md:text-base text-center sm:text-left">
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Home
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                About Us
              </Link>
              <Link
                to="/courses"
                className="hover:text-[#00BF63] transition-colors"
              >
                Courses
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <p className="font-semibold text-[#344054] text-sm md:text-base text-center sm:text-left">
              Courses
            </p>
            <div className="flex flex-col gap-2 md:gap-3 text-[#344054] font-medium text-sm md:text-base text-center sm:text-left">
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                African language
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                African Culture
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Product Design
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Data Analysis
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <p className="font-semibold text-[#344054] text-sm md:text-base text-center sm:text-left">
              Socials
            </p>
            <div className="flex flex-col gap-2 md:gap-3 text-[#344054] font-medium text-sm md:text-base text-center sm:text-left">
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Facebook
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Instagram
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Twitter
              </Link>
              <Link to="/" className="hover:text-[#00BF63] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 pt-4 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-xs md:text-sm text-gray-600 text-center md:text-left">
          &copy; {year} Eduafrica. All right reserved.
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
          <Link to="/" className="hover:text-[#00BF63] transition-colors">
            Terms
          </Link>
          <Link to="/" className="hover:text-[#00BF63] transition-colors">
            Privacy
          </Link>
          <Link to="/" className="hover:text-[#00BF63] transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
