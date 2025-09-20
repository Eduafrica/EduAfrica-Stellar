import CourseCard from './Helpers/CourseCard'

function CoursesCard({ data, setSelectedCourse }) {
    const courseData = data || []
  return (
    <div className='flex flex-wrap gap-5 items-center justify-center'>
        { 
            courseData?.map((i, idx) => (
                <CourseCard key={idx} data={i} setSelectedCourse={setSelectedCourse} />
            ))
        }
    </div>
  )
}

export default CoursesCard
