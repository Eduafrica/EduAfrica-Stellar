import { useEffect, useState } from "react"
import { useFetchCourseDetail } from "../../Helpers/fetch"
import useUserStore from "../../store/userStore"
import LoadingPage from "./LoadingPage"
import { IoIosArrowRoundBack } from "react-icons/io"
import { IoCloseOutline } from "react-icons/io5"
import LogoImg  from '../../assets/images/logo.png'
import { notify } from "../../Utils/toast"
import { useNavigate } from "react-router"
import { coursePayment } from "../../Helpers/api"
import Spinner from "./Spinner"

function BuyCourseCard({ courseId, setSelectedCourse }) {
    const { user, setUser } = useUserStore()
    const { data, isFetching } = useFetchCourseDetail(courseId)
    const [ loading, setLoading ] = useState(false)
    const [ courseInfoData, setCourseInfoData ] = useState({})

    useEffect(() => {
        if(data) {
            setCourseInfoData(data?.data)
        }
    }, [data])

    const handleBuyWithXLM = async () => {
        if(!user) {
            notify('error', 'Please Login First')
            window.location.href = '/student/login'
            return
        }
        if(loading) return

        try {
            const formData = { courseId }
            setLoading(true)
            const res = await coursePayment(formData)
            console.log('RESSS', res)
            
            if(res.success) {
                setUser(res?.data?.user)
                notify('success', res.message)
                setTimeout(() => {
                    window.location.href = '/my-courses'
                }, 3000)
            } else {
                notify('error', 'Unable to purchase course')
            }

        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleClear = () => {
        setSelectedCourse('')
    }

  return (
    <div className="w-[80%] max-tablet:w-[90%] border-[1px] border-black-200 flex flex-col items-center justify-center gap-[10px] p-[10px]">
        { loading && <LoadingPage /> }
        <div className="flex flex-[20px] w-[80%]">
            <div className="flex flex-col gap-[18px] w-full items-center justify-center">

                <div className="flex flex-col w-[80%] gap-[28px] items-center justify-center">

                    <div className="w-full flex flex-col gap-[30px]">
                        <div className="flex items-center justify-between">
                            <div onClick={handleClear} className="">
                                <div>
                                    <IoIosArrowRoundBack className='text-[24px]' />
                                </div>
                            </div>

                            <div onClick={handleClear} className="cursor-pointer">
                                <IoCloseOutline className='text-[24px]' />
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <img alt="Edu africa logo" src={LogoImg} className='w-[150px]' /> 
                        </div>

                        <p className='text-[24px] text-text-primary font-bold text-center'>
                            Order Summary
                        </p>

                        {
                            isFetching ? (
                                <div className="flex items-center justify-center">
                                    <Spinner />
                                </div>
                            ) : (
                                <div className="w-full flex flex-col gap-[24px]">
                                    {/**COURSE INFO HERE */}
                                    <div className="flex flex-col">
                                        <img alt={courseInfoData?.title} src={courseInfoData?.image} className="w-full rounded-[4px]" />

                                        <div className="flex flex-col gap-2 mt-4">
                                            <h2 className="text-gray-700 font-semibold text-[20px]">{courseInfoData?.title}</h2>
                                            <p className="text-[13px[ text-gray-400 font-normal">{courseInfoData?.totalStudent} Enrolled</p>
                                            <h2 className="text-gray-700 font-bold text-[20px]">{courseInfoData?.price} XLM</h2>
                                        </div>
                                    </div>

                                    {/**BUTTON */}
                                    <div onClick={handleBuyWithXLM} className={`btn`}>{ loading ? 'Please Wait....' : `Pay ${courseInfoData?.price} XLM` }</div>
                                </div>
                            )
                        }

                    </div>
                    
                </div>

            </div>
        </div>
    </div>
  )
}

export default BuyCourseCard
