import { Link } from "react-router"

function Hero() {
  return (
    <div className="w-full h-[427px] bg-primary text-white text-center flex items-center justify-center flex-col font-poppins">
        <div className="flex flex-col gap-5 w-[40%] max-phone:w-[70%] items-center justify-center">
            <div className="font-semibold text-[36px] text-center">
                Skill up and take your career to the next level.
            </div>

            <div className="text-[16px] text-center font-normal">
                Unlock a vast library of expert-led courses, personalized coaching, and verified credentials with a single subscription
            </div>
            
            <div className="flex items-center gap-5 max-phone:flex-col">
                <Link className="btn bg-white text-primary border-white">Choose a Career Path</Link>
                <Link to='/courses' className="btn2 border-white text-white">Explore Course</Link>
            </div>
        </div>
    </div>
  )
}

export default Hero
