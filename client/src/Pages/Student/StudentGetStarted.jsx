import ImageSlider from '../../Component/ImageSlider';
import GetStarted from '../../Component/StudentAuth/GetStarted';
import { studentAuthImgArray } from '../../data/imageArray';

function StudentGetStarted() {
  const imageArray = studentAuthImgArray;
  const cousrseOptions = [
    'Mathematics',
    'Teaching Methods',
    'English',
    'Teacher Student',
    'Teaching Practice',
  ];
  return (
    <div className="w-screen h-screen flex items-start">
      <div className="flex flex-1 items-center justify-center h-full bg-primary relative max-phone:hidden">
        <ImageSlider imageArray={imageArray} />

        {/**SLIDER */}
        <div className="absolute bottom-0 mb-[8px] w-full overflow-hidden">
          <div className="flex gap-4 animate-slide whitespace-nowrap">
            {/* All always at the beginning */}

            {cousrseOptions.map((i, idx) => (
              <div key={idx} className="text-white">
                {i}.
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center h-full overflow-y-auto scroll-bar">
        <GetStarted />
      </div>
    </div>
  );
}

export default StudentGetStarted;
