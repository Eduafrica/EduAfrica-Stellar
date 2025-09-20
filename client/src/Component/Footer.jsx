import { Link } from 'react-router';
import LogoImg from '../assets/images/logo.png';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-gray-50 w-full padx pt-8 md:pt-[64px] pb-6 md:pb-[48px] flex flex-col gap-8 md:gap-16">
      <div className="w-full px-4 md:px-[32px] flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12">
        <div className="flex flex-col gap-6 md:gap-[32px] w-full lg:w-auto">
          <img
            alt="educafrica logo"
            src={LogoImg}
            className="w-20 md:w-[102px]"
          />

          <p className="text-[14px] md:text-[16px] font-medium text-[#1D2939] w-full lg:w-[40%]">
            Transforming learning experience with data-driven insight, AI-
            powered tools, and expertise combinedby
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-start gap-6 md:gap-[71px] w-full lg:w-auto">
          <div className="flex flex-col gap-3 md:gap-4 w-full md:w-auto">
            <p className="font-semibold text-[#344054] text-[14px]">
              Resources
            </p>

            <div className="flex flex-col gap-2 md:gap-3 text-[#344054] font-medium md:font-semibold text-[14px] md:text-[16px]">
              <Link to="/">Home</Link>
              <Link to="/">About Us</Link>
              <Link to="/courses">Courses</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 w-full md:w-auto">
            <p className="font-semibold text-[#344054] text-[14px]">Courses</p>

            <div className="flex flex-col gap-2 md:gap-3 text-[#344054] font-medium md:font-semibold text-[14px] md:text-[16px]">
              <Link>African language</Link>
              <Link>African Culture</Link>
              <Link>Product Design</Link>
              <Link>Data Analysis</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 w-full md:w-auto">
            <p className="font-semibold text-[#344054] text-[14px]">Socials</p>

            <div className="flex flex-col gap-2 md:gap-3 text-[#344054] font-medium md:font-semibold text-[14px] md:text-[16px]">
              <Link>Facebook</Link>
              <Link>Instagram</Link>
              <Link>Twitter</Link>
              <Link>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t-[1px] border-t-gray-200 pt-6 md:pt-[32px] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-[32px]">
        <div className="text-[14px] md:text-base order-2 md:order-1 text-center md:text-left">
          &copy; {year} Eduafrica. All right reserved.
        </div>

        <div className="flex items-center gap-4 font-inter font-normal text-[14px] md:text-[16px] text-gray-500 order-1 md:order-2">
          <Link>Terms</Link>
          <Link>Privacy</Link>
          <Link>Cookies</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
