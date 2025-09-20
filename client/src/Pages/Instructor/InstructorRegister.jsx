import ImageSlider from "../../Component/ImageSlider"
import RegisterCard from "../../Component/InstructorAuth/RegisterCard"
import { studentAuthImgArray } from "../../data/imageArray"

function InstructorRegister() {
    const imageArray = studentAuthImgArray

  return (
    <div className="w-screen h-screen flex items-start overflow-hidden">
        <div className="flex flex-1 items-center justify-center h-full bg-primary max-phone:hidden">
            <ImageSlider imageArray={imageArray} />
        </div>

        <div className="pt-[400px] py-[10%] flex flex-1 items-center justify-center h-full overflow-y-auto scroll-bar">
            <RegisterCard />
        </div>

    </div>
  )
}

export default InstructorRegister
