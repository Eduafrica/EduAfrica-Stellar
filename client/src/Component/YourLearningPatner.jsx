import AppleIconImg from '../assets/images/appleLogg.png';
import PlayStoreIconImg from '../assets/images/googlePlayIcon.png';
import ImgOne from '../assets/images/imgOne.png';
import ImgTwo from '../assets/images/imgTwo.png';
import ImgThree from '../assets/images/imgThree.png';
import ImgFour from '../assets/images/imgFour.png';
import ImgFive from '../assets/images/imgFive.png';

function YourLearningPatner() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[64px] px-4 md:px-8 lg:px-0">
      {/* Text Content */}
      <div className="w-full lg:flex-1 flex flex-col gap-6 md:gap-[48px] text-center lg:text-left">
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 leading-tight">
          Your learning partner, each step guided by ease
        </h1>
        <p className="text-[16px] md:text-[18px] lg:text-[20px] font-light text-gray-700">
          Start your journey on <span className="text-primary">Eduafrica</span>{' '}
          and have experience of Digital learning experience
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
          <div className="btn bg-black border-black flex items-center gap-2 w-full sm:w-auto justify-center">
            <img
              alt="apple store icon"
              src={AppleIconImg}
              className="w-5 md:w-[26px]"
            />
            <div className="flex flex-col items-start">
              <p className="text-[10px] font-light">Download on the</p>
              <p className="text-[14px] md:text-[15px]">App Store</p>
            </div>
          </div>
          <div className="btn bg-black border-black flex items-center gap-2 w-full sm:w-auto justify-center">
            <img
              alt="play store icon"
              src={PlayStoreIconImg}
              className="w-5 md:w-[26px]"
            />
            <div className="flex flex-col items-start">
              <p className="text-[10px] font-light">GET IT ON</p>
              <p className="text-[14px] md:text-[15px]">Google Play</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="w-full lg:flex-1 flex flex-col gap-3 md:gap-4 justify-center items-center mt-8 lg:mt-0">
        <div className="flex items-end justify-end gap-3 md:gap-4 w-full">
          <img
            alt="image"
            src={ImgOne}
            className="w-1/2 max-w-[200px] md:max-w-none rounded-lg shadow-md"
          />
          <img
            alt="image"
            src={ImgTwo}
            className="w-1/2 max-w-[200px] md:max-w-none rounded-lg shadow-md"
          />
        </div>

        <div className="flex gap-3 md:gap-4 items-start justify-start w-full">
          <img
            alt="image"
            src={ImgThree}
            className="w-1/3 max-w-[150px] md:max-w-none rounded-lg shadow-md"
          />
          <img
            alt="image"
            src={ImgFour}
            className="w-1/3 max-w-[150px] md:max-w-none rounded-lg shadow-md"
          />
          <img
            alt="image"
            src={ImgFive}
            className="w-1/3 max-w-[150px] md:max-w-none rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default YourLearningPatner;
