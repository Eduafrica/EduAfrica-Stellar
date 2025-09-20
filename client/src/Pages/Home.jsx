import PageLayout from './PageLayout'
import Hero from '../Component/Hero'
import HomeCourses from '../Component/HomeCourses'
import YourLearningPatner from '../Component/YourLearningPatner'

function Home({ setSelectedCourse }) {
  return (
    <PageLayout>
        <div className="">
            <Hero />
            <HomeCourses setSelectedCourse={setSelectedCourse} />
            {/**YOUR LEARNING PATNER */}
            <div className="padx bg-white">
                <div className="py-[96px]">
                    <YourLearningPatner />
                </div>
            </div>
        </div>
    </PageLayout>
  )
}

export default Home
