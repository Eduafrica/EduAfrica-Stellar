import Avatar from '../../assets/svg/avatar.png';

const Testimonial = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="bg-[#F9FAFB] rounded-lg p-8 md:p-12">
        {/* Testimonial text */}
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-6 md:mb-8">
          <p className="before:content-['“'] after:content-['”'] before:text-4xl before:mr-2 before:text-gray-300 after:text-4xl after:ml-1 after:text-gray-300">
            Untitled has saved us thousands of hours of work. We're able to spin
            up projects and features faster.
          </p>
        </blockquote>

        {/* Author information */}
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0">
            <img src={Avatar} className="rounded-[50px] h-10 w-10" alt="" />
          </div>
          <div className="ml-4 text-center">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Mollie Hall
            </h2>
            <div className="text-sm md:text-base text-gray-600">
              Web Developer, Sisyphus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
