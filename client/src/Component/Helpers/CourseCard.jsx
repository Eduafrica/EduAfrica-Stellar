import useUserStore from "../../store/userStore"
import { notify } from "../../Utils/toast"
import { truncateText } from "../../Utils/utils"

function CourseCard({ data, setSelectedCourse }) {
    const { user } = useUserStore()
  
    
    const handleSelctCourse = (courseId) => {
        const alreadyHasCourse = user?.courses?.includes(courseId)
        if(alreadyHasCourse) {
            notify('info', 'Already Enrolled for this course')
            return
        }
        //if courseId already exist in user.courses array
        setSelectedCourse(courseId)
    }

    return (
        <div onClick={() => handleSelctCourse(data?.courseId)} className="flex flex-col gap-[10px] font-poppins w-[283px] overflow-hidden rounded-[8px] shadow-2xs cursor-pointer hover:scale-[1.05] duration-500 transition-all">
            <img className="w-full h-[124px] object-center" src={data?.image} />

            <div className="flex flex-col gap-2 p-4">
                <p className="text-[20px] text-[#364152] font-semibold">{data?.title}</p>

                <p className="text-[14px] text-[#364152] font-normal">{truncateText(data?.about,100)}</p>

                <p className="text-[#364152] text-[20px] font-bold">NGN {data?.price?.toLocaleString()}</p>

                <div>
                    {
                        user?.courses?.includes(data?.courseId) && (
                            <p className="text-gray-900 font-bold text-[15px]">Enrolled</p>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default CourseCard
