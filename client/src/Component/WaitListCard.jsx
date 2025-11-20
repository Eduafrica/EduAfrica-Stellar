import AppleIconImg from '../assets/images/appleLogg.png';
import PlayStoreIconImg from '../assets/images/googlePlayIcon.png';
import ImgOne from '../assets/images/imgOne.png';
import ImgTwo from '../assets/images/imgTwo.png';
import ImgThree from '../assets/images/imgThree.png';
import ImgFour from '../assets/images/imgFour.png';
import ImgFive from '../assets/images/imgFive.png';
import { useState } from 'react';
import { notify } from '../Utils/toast';
import { joinWaitList } from '../Helpers/api';
import { useFetchWaitListMembersCount } from '../Helpers/fetch';

function WaitListCard() {
    const [ formData, setFormData ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const handleChange = (e) => {
        setFormData({  ...formData, [e.target.id]: e.target.value })
    }

    const { data, isFetching, refetch } = useFetchWaitListMembersCount()

    const handleWaitList = async (e) => {
        e.preventDefault()
        if(!formData?.name) return notify('error', 'Provide name')
        if(!formData?.email) return notify('error', 'Provide email address')
        
        try {
            setLoading(true)
            const res = await joinWaitList(formData)
            if(res.success) {
                notify('success', res.message || 'Successfully joined join waitlist')
                setFormData({});
                e.target.reset();

                refetch()
            } else {
                notify('error', res.message || 'Unable to join waitlist')
            }
        } catch (error) {
            notify('error', 'Unable to join waitlist')
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-[64px] px-4 md:px-8 lg:px-0">
        {/* Image Grid */}
        <div className="w-full lg:flex-1 flex flex-col gap-3 md:gap-4 justify-center items-center mt-8 lg:mt-0">
            <div className="flex items-end justify-end gap-3 md:gap-4 w-full">
            <img
                alt="image"
                src={ImgFive}
                className="w-1/2 max-w-[200px] md:max-w-none rounded-lg shadow-md"
            />
            <img
                alt="image"
                src={ImgFour}
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
                src={ImgTwo}
                className="w-1/3 max-w-[150px] md:max-w-none rounded-lg shadow-md"
            />
            <img
                alt="image"
                src={ImgOne}
                className="w-1/3 max-w-[150px] md:max-w-none rounded-lg shadow-md"
            />
            </div>
        </div>

        {/* Wait list form */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 md:gap-[48px] text-center lg:text-left">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-gray-900 leading-tight">
                Join Our Wait List
            </h1>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-light text-gray-700">
                Join thousands waiting to experience personalized learning, expert-led courses, and seamless digital education on <span className="text-primary">Eduafrica</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
                <div className="flex w-full items-center justify-center">
                    <form onSubmit={handleWaitList} className='w-[80%] flex flex-col gap-5'>
                        <div className="inputGroup">
                            <label className="label">Name</label>
                            <input onChange={handleChange} id='name' type="text" className="input" placeholder='E.g Mubarak Ahmed' />
                        </div>
                        <div className="inputGroup">
                            <label className="label">Email</label>
                            <input onChange={handleChange} id='email' type="email" className="input" placeholder='E.g mubby12@gmail.com' />
                        </div>
                        <div className="inputGroup">
                            <label className="label">Mobile Number</label>
                            <input onChange={handleChange} id='mobileNumber' type="text" className="input" placeholder='+233-0937476' />
                        </div>
                        <div className="inputGroup">
                            <label className="label">Country</label>
                            <input onChange={handleChange} id='country' type="text" className="input" placeholder='E.g Ghana' />
                        </div>

                        <button disabled={loading} type='submit'  className='btn'>{ loading ? 'Please wait...' : 'Join Waitlist' }</button>
                    </form>
                </div>
            </div>
            {
                data?.data?.totalMembers && (
                    <p className="text-center -mt-4 text-[16px] md:text-[18px] lg:text-[20px] font-light text-gray-700">
                        Join <span className='text-primary font-semibold'>{data?.data?.totalMembers}</span> of other amazing users in our waitlist
                    </p>
                )
            }
        </div>


    </div>
  );
}

export default WaitListCard;
