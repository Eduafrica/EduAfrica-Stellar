import { Link } from 'react-router';
import LogoImg from '../../assets/images/logo.png';

function GetStarted() {
  return (
    <div className="w-full md:w-[90%] lg:w-[80%] max-w-md border-[1px] border-gray-200 flex flex-col items-center justify-center gap-4 p-4 md:p-6 lg:p-[10px] rounded-lg shadow-sm">
      <div className="flex w-full">
        <div className="flex flex-col gap-4 md:gap-[18px] items-center justify-center w-full">
          <div className="flex flex-col w-full md:w-[80%] gap-6 md:gap-[28px] items-center justify-center">
            <div className="flex flex-col gap-6 md:gap-[30px] w-full">
              <div className="flex items-center justify-center">
                <img
                  alt="Edu africa logo"
                  src={LogoImg}
                  className="w-32 md:w-[175px]"
                />
              </div>

              <p className="text-lg md:text-xl lg:text-[24px] text-text-primary font-bold text-center">
                A classical Education for your future accessible anywhere,
                anytime
              </p>

              <div className="flex flex-col gap-4 md:gap-[20px] w-full">
                <Link
                  to="/instructor/register"
                  className="btn2 w-full text-center"
                >
                  I'm new here
                </Link>
                <Link to="/instructor/login" className="btn w-full text-center">
                  I have an account
                </Link>
              </div>
            </div>

            <div className="text-xs md:text-[12px] text-text-secondary font-medium text-center">
              Are you an instructor or organization?{' '}
              <Link to="/instructor/register" className="text-primary">
                Go here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
