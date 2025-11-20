import PageLayout from './PageLayout'
import Hero from '../Component/Hero'
import WaitListPage from '../Component/WaitList'

function WaitList({ setSelectedCourse }) {
  return (
    <PageLayout>
        <div className="">
            {/**WAIT LIST */}
            <div className="padx bg-white">
                <div className="py-[96px]">
                    <WaitListPage />
                </div>
            </div>
        </div>
    </PageLayout>
  )
}

export default WaitList
