import { useNavigate, useLocation, Link } from 'react-router'
import useUserStore from '../store/userStore'
import PageLayout from './PageLayout'
import { useFetchNotification } from '../Helpers/fetch'
import { notify } from '../Utils/toast';
import { useEffect, useState } from 'react';
import Spinner from '../Component/Helpers/Spinner';

function Notification({ setSelectedCourse }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUserStore()
    const [ notificationData, setNotificationData ] = useState()


  const { data, isFetching } = useFetchNotification()
  
  useEffect(() => {
      if(data) {
        setNotificationData(data?.data?.notifications)
        console.log('notifica', data?.data?.notifications)
    }
  }, [data])

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true, 
    });
  };

  return (
    <PageLayout>
      <div className="bg-cream padx min-h-screen flex flex-col">
        <h2 className='text-[21px] mt-12 font-semibold'>Notifications</h2>
        
        {/**DIsplay notifications */}
        <div className="flex flex-col items-center justify-center">
            {
                isFetching ? (
                    <div className="flex flex-col items-center justify-center">
                        <Spinner />
                        <h1 className='text-primary text-[21px] text-center'>Fetching notifications</h1>
                    </div>
                ) : (
                    <div className="mt-8 flex items-center justify-center flex-col w-[80vw]">
                        {
                            notificationData?.map((i, idx) => (
                                <div key={idx} className="w-full flex flex-col gap-4 py-3 px-2 border-b-[1px] border-b-gray-300">
                                    <p className='text-gray-600 text-[16px]'>{i?.notification}</p>
                                    <small className='text-right font-[14px] text-gray-400'>{formatDate(i?.createdAt)}</small>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
      </div>
    </PageLayout>
  )
}

export default Notification
