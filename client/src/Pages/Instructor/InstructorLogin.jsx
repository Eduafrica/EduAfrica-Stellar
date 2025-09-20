import ImageSlider from "../../Component/ImageSlider"
import LoginCard from "../../Component/InstructorAuth/LoginCard"
import { studentAuthImgArray } from "../../data/imageArray"

function InstructorLogin() {
    const imageArray = studentAuthImgArray

  return (
    <div className="w-screen h-screen flex items-start">
        <div className="flex flex-1 items-center justify-center h-full bg-primary max-phone:hidden">
            <ImageSlider imageArray={imageArray} />
        </div>

        <div className="flex flex-1 items-center justify-center h-full overflow-y-auto scroll-bar">
            <LoginCard />
        </div>

    </div>
  )
}

export default InstructorLogin
