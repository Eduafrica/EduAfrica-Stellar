import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import CoursesCard from '../../Component/CoursesCard';
import Spinner from '../../Component/Helpers/Spinner';
import YourLearningPatner from '../../Component/YourLearningPatner';
import PageLayout from '../PageLayout';
import {
  useFetchCategories,
  useFetchInstructorCourse,
} from '../../Helpers/fetch';
import useUserStore from '../../store/userStore';

function InstructorCourses({ setSelectedCourse }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  // Extract ?search= from URL
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    // Reset search term when switching category
    setSearchTerm('');
    navigate('/instructor-courses'); // clear search query from URL
  };

  // Handle search navigation
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(
        `/instructor-courses?search=${encodeURIComponent(searchTerm.trim())}`
      );
    } else {
      navigate('/instructor-courses');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const { data, isFetching } = useFetchCategories();
  const categories = data?.data?.categories || [];

  // 🔑 Priority: searchTerm from query > category
  const { data: courseData, isFetching: isFetchingCourses } =
    useFetchInstructorCourse(searchTerm || selectedCategory);
  const courses = courseData?.data?.courses || [];

  return (
    <PageLayout>
      <div className="bg-cream padx min-h-screen">
        <div className="pt-16 md:pt-[4rem]">
          {/* SEARCH */}
          <div className="mt-6 w-full md:w-[80%] lg:w-[60%]">
            <div className="flex items-start gap-2 flex-col">
              <p className="text-[#0F1114] text-2xl md:text-[32px] font-medium whitespace-nowrap">
                Hello {user?.name}, Your Courses{' '}
                <span className="text-sm md:text-[14px] font-medium text-gray-700">
                  ({courses?.length} courses)
                </span>
              </p>
              <div className="flex flex-col md:flex-row items-center gap-2 w-full mt-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search your course here?"
                  className="input font-normal w-full"
                />
                <div
                  onClick={handleSearch}
                  className="btn cursor-pointer w-full md:w-auto text-center"
                >
                  Search
                </div>
              </div>
            </div>
          </div>

          {/**NEW COURSE BTN */}
          <div className="flex items-center justify-end w-full mt-6">
            <Link
              to="/new-course"
              className="btn flex items-end justify-end w-full md:w-auto text-center"
            >
              Add New Course
            </Link>
          </div>

          {/* COURSES LIST */}
          <div className="">
            {isFetchingCourses ? (
              <div className="flex items-center justify-center h-[50vh]">
                <Spinner />
              </div>
            ) : (
              <div className="mt-8 md:mt-[6rem] flex items-center justify-center">
                {courses?.length < 1 ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <h2 className="text-primary font-semibold text-lg md:text-[21px] text-center">
                      No Course Found
                    </h2>
                    <Link to="/courses" className="btn">
                      Explore courses
                    </Link>
                  </div>
                ) : (
                  <CoursesCard
                    setSelectedCourse={setSelectedCourse}
                    data={courses}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/**YOUR LEARNING PATNER */}
      <div className="padx bg-white">
        <div className="py-12 md:py-[96px]">
          <YourLearningPatner />
        </div>
      </div>
    </PageLayout>
  );
}

export default InstructorCourses;
