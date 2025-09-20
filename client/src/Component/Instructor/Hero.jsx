import React from 'react';
import { Link } from 'react-router';
import useUserStore from '../../store/userStore';

function Hero() {
    const { user, clearUser } = useUserStore()

  return (
    <section className="bg-[#00BF63] py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Main Heading */}
          <h1 className="text-2xl font-bold text-white mb-6 leading-tight">
            Become an Instructor with us
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed">
            Join our team of instructors and transform lives, starting with your
            own.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            {
                user?.accountType?.toLowerCase() === 'instructor' ? (
                    <Link to='/instructor-courses' className="bg-white hover:bg-white hover:text-[#00BF63] text-[#00BF63] font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                        My Courses
                    </Link>
                ) : (
                    <Link to='/instructor/register' className="bg-white hover:bg-white hover:text-[#00BF63] text-[#00BF63] font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                      Get Started
                    </Link>
                )
            }

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
